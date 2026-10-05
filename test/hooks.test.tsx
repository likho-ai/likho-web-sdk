import { QueryClient } from '@tanstack/react-query';
import { act, renderHook, waitFor } from '@testing-library/react';
import type { ReactNode } from 'react';
import { LikhoClient } from '../src/client.js';
import { useLogin, useMe } from '../src/hooks/account.js';
import { useImports, useRequestImport } from '../src/hooks/imports.js';
import { useRecordings, useUploader } from '../src/hooks/recordings.js';
import { useCorrectSegment, useTranscript } from '../src/hooks/transcripts.js';
import { useAnalyseRecording, useInsights, useInsightsStatus } from '../src/hooks/insights.js';
import { useRecordingLive } from '../src/hooks/live.js';
import { useSearch } from '../src/hooks/search.js';
import {
  useAcceptInvitation,
  useAuditLog,
  useInvitations,
  useInviteUser,
  useSetUserRole,
  useUsers,
} from '../src/hooks/users.js';
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

  it('useInsights reads them, useAnalyseRecording asks and keeps the answer, useRecordingLive hears it', async () => {
    const insights = {
      id: 'ins_1',
      transcriptId: 'trn_1',
      recordingId: 'rec_1',
      transcriptVersion: 1,
      summary: 'A customer ordered a product.',
      intent: 'order',
      products: ['Ashwagandha'],
      sentiment: 'positive',
      checks: [{ key: 'greeting', label: 'Greeted', answer: 'yes', evidence: 'namaste' }],
      scores: [{ key: 'resolution', label: 'Handled', score: 9, max: 10, reason: 'Ordered.' }],
      scoreTotal: 9,
      scoreMax: 10,
      model: 'fake/one',
      inputTokens: 100,
      outputTokens: 50,
      formVersion: 'example-1',
      createdAt: '2026-10-05T12:00:00.000Z',
    };
    let made: typeof insights | null = null;
    const asked: Record<string, unknown>[] = [];
    const client = fakeApi({
      Insights: () => ({ insights: made }),
      AnalyseRecording: (v) => {
        asked.push(v);
        made = insights;
        return { analyseRecording: insights };
      },
      InsightsStatus: () => ({
        insightsStatus: { enabled: true, model: 'fake/one', formVersion: 'example-1' },
      }),
    });
    const wrapper = wrapperFor(client);
    const read = renderHook(() => useInsights('rec_1'), { wrapper });
    await waitFor(() => expect(read.result.current.isSuccess).toBe(true));
    expect(read.result.current.data).toBeNull();
    const status = renderHook(() => useInsightsStatus(), { wrapper });
    await waitFor(() =>
      expect(status.result.current.data).toEqual({
        enabled: true,
        model: 'fake/one',
        formVersion: 'example-1',
      }),
    );

    const analyse = renderHook(() => useAnalyseRecording(), { wrapper });
    await act(() => analyse.result.current.mutateAsync({ id: 'rec_1', force: true }));
    expect(asked).toEqual([{ id: 'rec_1', force: true }]);
    await waitFor(() => expect(read.result.current.data?.id).toBe('ins_1'));

    // The page hears the model's answer and reads the insights again.
    const listeners: Record<string, (e: Event) => void> = {};
    class FakeSource {
      onopen: null | (() => void) = null;
      onerror: null | (() => void) = null;
      constructor(readonly url: string) {}
      addEventListener(type: string, listener: (e: Event) => void) {
        listeners[type] = listener;
      }
      close() {}
    }
    const original = globalThis.EventSource;
    globalThis.EventSource = FakeSource as unknown as typeof EventSource;
    try {
      made = { ...insights, sentiment: 'mixed' };
      const live = renderHook(() => useRecordingLive('rec_1'), { wrapper });
      await waitFor(() => expect(listeners.insights).toBeDefined());
      act(() =>
        listeners.insights!(
          new MessageEvent('insights', {
            data: JSON.stringify({
              recordingId: 'rec_1',
              transcriptId: 'trn_1',
              status: 'done',
              insightsId: 'ins_1',
            }),
          }),
        ),
      );
      expect(live.result.current.insights).toMatchObject({ status: 'done', insightsId: 'ins_1' });
      await waitFor(() => expect(read.result.current.data?.sentiment).toBe('mixed'));
    } finally {
      globalThis.EventSource = original;
    }
  });

  it('useSearch asks only with words, and useRequestImport refreshes the imports', async () => {
    const asked: Record<string, unknown>[] = [];
    const client = fakeApi({
      Search: (v) => {
        asked.push(v);
        return {
          search: {
            total: 1,
            page: 1,
            pageSize: 20,
            processingMs: 3,
            hits: [
              {
                recording: { id: 'rec_1', originalName: 'call.mp3', status: 'done', attributes: [] },
                transcriptId: 'trn_1',
                segmentIndex: 2,
                startSeconds: 10,
                endSeconds: 12,
                textRoman: 'order confirm hai',
                textScript: 'ऑर्डर कन्फर्म है',
                highlightRoman: '<mark>order</mark> confirm hai',
                highlightScript: 'ऑर्डर कन्फर्म है',
                language: 'hi',
              },
            ],
          },
        };
      },
      RequestImport: (v) => ({
        requestImport: {
          id: 'imp_1',
          source: 'ameyo',
          externalId: (v.input as { externalId: string }).externalId,
          transcribe: true,
          status: 'requested',
          recordingId: '',
          reason: '',
          code: '',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      }),
      Imports: () => ({ imports: { items: [], hasMore: false } }),
    });
    const wrapper = wrapperFor(client);
    const empty = renderHook(() => useSearch('   '), { wrapper });
    expect(empty.result.current.fetchStatus).toBe('idle');
    const { result } = renderHook(() => useSearch('order', { language: 'hi' }), { wrapper });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data!.hits[0]!.highlightRoman).toBe('<mark>order</mark> confirm hai');
    expect(asked[0]).toMatchObject({ query: 'order', filter: { language: 'hi' }, page: 1, pageSize: 20 });

    const imports = renderHook(() => useImports(), { wrapper });
    await waitFor(() => expect(imports.result.current.isSuccess).toBe(true));
    const request = renderHook(() => useRequestImport(), { wrapper });
    const made = await act(() => request.result.current.mutateAsync({ externalId: 'd000-1' }));
    expect(made).toMatchObject({ id: 'imp_1', externalId: 'd000-1', status: 'requested' });
  });

  it('useCorrectSegment puts the new version in the cache', async () => {
    const version = (id: string, n: number, roman: string) => ({
      id,
      recordingId: 'rec_1',
      jobId: '',
      version: n,
      modelRegistryId: 'm',
      engine: 'e',
      compute: 'int8',
      script: 'devanagari',
      createdAt: new Date().toISOString(),
      language: { detected: 'hi', probability: 0.9, decodedAs: 'hi', policy: 'auto', candidates: [] },
      stats: { audioSeconds: 1, elapsedSeconds: 1, realtimeFactor: 1, chunks: 1, silenceSkippedSeconds: 0 },
      segments: [{ index: 0, startSeconds: 0, endSeconds: 1, textScript: 'नमस्ते', textRoman: roman }],
    });
    const client = fakeApi({
      CorrectSegment: (v) => ({
        correctSegment: version('trn_2', 2, (v.input as { text: string }).text),
      }),
      Transcript: () => ({ transcript: version('trn_2', 2, 'namaskar') }),
    });
    const wrapper = wrapperFor(client);
    const correct = renderHook(() => useCorrectSegment(), { wrapper });
    const made = await act(() =>
      correct.result.current.mutateAsync({
        transcriptId: 'trn_1',
        segmentIndex: 0,
        layer: 'roman',
        text: 'namaskar',
      }),
    );
    expect(made.correctSegment.segments[0]!.textRoman).toBe('namaskar');
    const read = renderHook(() => useTranscript('trn_2'), { wrapper });
    await waitFor(() => expect(read.result.current.data?.version).toBe(2));
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

  it('people: an invitation refreshes the list, a role change the people, accepting signs in', async () => {
    const invitations: Record<string, unknown>[] = [];
    const users = [
      { id: 'usr_1', email: 'a@b.c', name: 'A', role: 'admin', createdAt: 't', disabledAt: null },
    ];
    const client = fakeApi({
      Users: () => ({ users }),
      Invitations: () => ({ invitations }),
      InviteUser: (v) => {
        const input = v.input as { email: string; role: string };
        const invitation = {
          id: 'inv_1',
          email: input.email,
          name: '',
          role: input.role,
          invitedBy: 'usr_1',
          createdAt: 't',
          expiresAt: 't',
          acceptedAt: null,
          revokedAt: null,
        };
        invitations.push(invitation);
        return { inviteUser: { invitation, link: 'http://x/invite/tok', sent: false } };
      },
      SetUserRole: (v) => {
        users[0]!.role = v.role as string;
        return { setUserRole: users[0] };
      },
      AcceptInvitation: (v) => ({
        acceptInvitation: { ...person, id: 'usr_2', email: 'v@b.c', name: v.name, role: 'viewer' },
      }),
      Me: () => null,
    });
    const wrapper = wrapperFor(client);
    const list = renderHook(() => useInvitations(), { wrapper });
    await waitFor(() => expect(list.result.current.isSuccess).toBe(true));
    expect(list.result.current.data).toEqual([]);
    const invite = renderHook(() => useInviteUser(), { wrapper });
    const made = await act(() => invite.result.current.mutateAsync({ email: 'v@b.c', role: 'viewer' }));
    expect(made).toMatchObject({ link: 'http://x/invite/tok', sent: false });
    await waitFor(() => expect(list.result.current.data).toHaveLength(1));

    const people = renderHook(() => useUsers(), { wrapper });
    await waitFor(() => expect(people.result.current.data?.[0]?.role).toBe('admin'));
    const setRole = renderHook(() => useSetUserRole(), { wrapper });
    await act(() => setRole.result.current.mutateAsync({ userId: 'usr_1', role: 'member' }));
    await waitFor(() => expect(people.result.current.data?.[0]?.role).toBe('member'));

    const me = renderHook(() => useMe(), { wrapper });
    await waitFor(() => expect(me.result.current.isSuccess).toBe(true));
    expect(me.result.current.data).toBeNull();
    const accept = renderHook(() => useAcceptInvitation(), { wrapper });
    await act(() => accept.result.current.mutateAsync({ token: 'tok', name: 'Vee', password: 'pw-pw-pw-1' }));
    await waitFor(() => expect(me.result.current.data?.email).toBe('v@b.c'));
  });

  it('useAuditLog pages with the cursor and sends the filter', async () => {
    const asked: Record<string, unknown>[] = [];
    const entry = (id: string) => ({
      id,
      actorKind: 'user',
      actorId: 'usr_1',
      actorName: 'A',
      action: 'recording.deleted',
      targetKind: 'recording',
      targetId: 'rec_1',
      details: '{"originalName":"call.mp3"}',
      ip: '127.0.0.1',
      createdAt: 't',
    });
    const client = fakeApi({
      AuditLog: (v) => {
        asked.push(v);
        return v.after
          ? { auditLog: { items: [entry('aud_1')], hasMore: false, endCursor: 'aud_1' } }
          : { auditLog: { items: [entry('aud_2')], hasMore: true, endCursor: 'aud_2' } };
      },
    });
    const { result } = renderHook(() => useAuditLog({ action: 'recording.deleted' }, 1), {
      wrapper: wrapperFor(client),
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(asked[0]).toEqual({ filter: { action: 'recording.deleted' }, first: 1, after: null });
    expect(result.current.hasNextPage).toBe(true);
    await act(() => result.current.fetchNextPage());
    await waitFor(() => expect(result.current.data!.pages).toHaveLength(2));
    expect(result.current.data!.pages.flatMap((p) => p.items.map((e) => e.id))).toEqual(['aud_2', 'aud_1']);
    expect(asked[1]!.after).toBe('aud_2');
  });
});
