import { QueryClient } from '@tanstack/react-query';
import { act, renderHook, waitFor } from '@testing-library/react';
import type { ReactNode } from 'react';
import { LikhoClient } from '../src/client.js';
import { useLogin, useMe } from '../src/hooks/account.js';
import { useRecordings, useUploader } from '../src/hooks/recordings.js';
import { LikhoProvider } from '../src/provider.js';

type Answer = (variables: Record<string, unknown>) => unknown;

/** A fake API: answers each operation by name; an answer that returns `null` means "not signed in". */
function fakeApi(answers: Record<string, Answer>) {
  const impl = (async (_url: string, init: RequestInit) => {
    const { query, variables } = JSON.parse(init.body as string) as {
      query: string;
      variables: Record<string, unknown>;
    };
    const name = /(?:query|mutation) (\w+)/.exec(query)![1]!;
    const answer = answers[name];
    const errors = (code: string, message: string) =>
      new Response(JSON.stringify({ errors: [{ message, extensions: { code } }] }));
    if (!answer) return errors('not_found', `no answer for ${name}`);
    const data = answer(variables);
    if (data === null) return errors('unauthenticated', 'Sign in first.');
    return new Response(JSON.stringify({ data }));
  }) as unknown as typeof fetch;
  return new LikhoClient({ baseUrl: 'http://x', fetch: impl });
}

const wrapperFor = (client: LikhoClient) => {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return ({ children }: { children: ReactNode }) => (
    <LikhoProvider client={client} queryClient={queryClient}>
      {children}
    </LikhoProvider>
  );
};

const person = {
  id: 'usr_1',
  email: 'a@b.c',
  name: 'A',
  role: 'admin',
  workspace: { id: 'wsp_1', name: 'W' },
};

describe('hooks', () => {
  it('useMe is null when nobody is signed in, and set after login', async () => {
    let signedIn = false;
    const client = fakeApi({
      Me: () => (signedIn ? { me: person } : null),
      Login: () => {
        signedIn = true;
        return { login: person };
      },
    });
    const wrapper = wrapperFor(client);
    const me = renderHook(() => useMe(), { wrapper });
    await waitFor(() => expect(me.result.current.isSuccess).toBe(true));
    expect(me.result.current.data).toBeNull();

    const login = renderHook(() => useLogin(), { wrapper });
    await act(() => login.result.current.mutateAsync({ email: 'a@b.c', password: 'pw' }));
    await waitFor(() => expect(me.result.current.data?.email).toBe('a@b.c'));
  });

  it('useRecordings pages with the cursor', async () => {
    const page = (id: string, name: string, hasMore: boolean) => ({
      recordings: { items: [{ id, originalName: name, status: 'done', jobs: [] }], hasMore, endCursor: id },
    });
    const client = fakeApi({
      Recordings: (v) => (v.after ? page('rec_2', 'b.mp3', false) : page('rec_1', 'a.mp3', true)),
    });
    const { result } = renderHook(() => useRecordings(undefined, 1), { wrapper: wrapperFor(client) });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data!.pages[0]!.items[0]!.id).toBe('rec_1');
    expect(result.current.hasNextPage).toBe(true);
    await act(() => result.current.fetchNextPage());
    await waitFor(() => expect(result.current.data!.pages).toHaveLength(2));
    expect(result.current.data!.pages[1]!.items[0]!.id).toBe('rec_2');
    expect(result.current.hasNextPage).toBe(false);
  });

  it('useUploader asks for a link, sends the file with progress, and reports duplicates', async () => {
    const sent: { url: string; body: unknown }[] = [];
    class FakeXhr {
      upload = { onprogress: null as null | ((e: ProgressEvent) => void) };
      onload: null | (() => void) = null;
      onerror: null | (() => void) = null;
      onabort: null | (() => void) = null;
      status = 201;
      responseText = JSON.stringify({ media_id: 'med_1', sha256: 'abc', size_bytes: 3, status: 'uploaded' });
      url = '';
      open(_method: string, url: string) {
        this.url = url;
      }
      setRequestHeader() {}
      send(body: unknown) {
        sent.push({ url: this.url, body });
        this.upload.onprogress?.({ lengthComputable: true, loaded: 1, total: 2 } as ProgressEvent);
        setTimeout(() => this.onload?.(), 0);
      }
      abort() {}
    }
    vi.stubGlobal('XMLHttpRequest', FakeXhr);
    const ticket = (id: string, name: string, url: string, duplicate: boolean) => ({
      requestUpload: {
        uploadUrl: url,
        expiresAt: null,
        recording: { id, originalName: name },
        duplicateOf: duplicate ? { id, originalName: name } : null,
      },
    });
    const client = fakeApi({
      RequestUpload: (v) => {
        const input = v.input as { originalName: string };
        return input.originalName === 'same.mp3'
          ? ticket('rec_old', 'same.mp3', '', true)
          : ticket('rec_new', input.originalName, 'http://media/upload/med_1?token=t', false);
      },
    });
    const uploaded: string[] = [];
    const { result } = renderHook(() => useUploader({ onUploaded: (id) => uploaded.push(id) }), {
      wrapper: wrapperFor(client),
    });
    act(() =>
      result.current.add([
        new File(['abc'], 'call.mp3', { type: 'audio/mpeg' }),
        new File(['abc'], 'same.mp3'),
      ]),
    );
    await waitFor(() =>
      expect(result.current.items.every((i) => i.state === 'done' || i.state === 'duplicate')).toBe(true),
    );
    expect(result.current.items[0]).toMatchObject({
      name: 'call.mp3',
      state: 'done',
      progress: 1,
      recordingId: 'rec_new',
    });
    expect(result.current.items[1]).toMatchObject({
      name: 'same.mp3',
      state: 'duplicate',
      recordingId: 'rec_old',
      duplicateOfId: 'rec_old',
    });
    expect(sent).toHaveLength(1);
    expect(sent[0]!.url).toBe('http://media/upload/med_1?token=t');
    expect(uploaded).toEqual(['rec_new']);
    vi.unstubAllGlobals();
  });
});
