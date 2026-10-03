import { LikhoClient, LikhoError } from '../src/client.js';
import { MeQuery } from '../src/operations/account.js';
import { RecordingQuery } from '../src/operations/recordings.js';

function fakeFetch(status: number, body: unknown) {
  const calls: { url: string; init: RequestInit }[] = [];
  const impl = (async (url: string, init: RequestInit) => {
    calls.push({ url, init });
    return new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });
  }) as unknown as typeof fetch;
  return { impl, calls };
}

describe('LikhoClient', () => {
  it('posts the operation to /graphql with the session cookie and returns the data', async () => {
    const { impl, calls } = fakeFetch(200, { data: { recording: { id: 'rec_1', status: 'done' } } });
    const client = new LikhoClient({ baseUrl: 'http://gateway.test/', fetch: impl });
    const data = await client.request(RecordingQuery, { id: 'rec_1' });
    expect(data.recording.id).toBe('rec_1');
    expect(calls[0]!.url).toBe('http://gateway.test/graphql');
    expect(calls[0]!.init.credentials).toBe('include');
    const sent = JSON.parse(calls[0]!.init.body as string);
    expect(sent.variables).toEqual({ id: 'rec_1' });
    expect(sent.query).toContain('query Recording(');
  });

  it("carries the API's error code and tells the app when nobody is signed in", async () => {
    const { impl } = fakeFetch(200, {
      errors: [{ message: 'Sign in first.', extensions: { code: 'unauthenticated' } }],
    });
    let told = false;
    const client = new LikhoClient({
      baseUrl: 'http://gateway.test',
      fetch: impl,
      onUnauthenticated: () => {
        told = true;
      },
    });
    await expect(client.request(MeQuery)).rejects.toMatchObject({
      code: 'unauthenticated',
      message: 'Sign in first.',
    });
    expect(told).toBe(true);

    told = false;
    await expect(client.request(MeQuery, undefined, { probe: true })).rejects.toMatchObject({
      code: 'unauthenticated',
    });
    expect(told).toBe(false);
  });

  it('turns unknown errors and unreachable servers into plain messages', async () => {
    const { impl } = fakeFetch(200, {
      errors: [{ message: 'boom', extensions: { code: 'INTERNAL_SERVER_ERROR' } }],
    });
    await expect(
      new LikhoClient({ baseUrl: 'http://x', fetch: impl }).request(MeQuery),
    ).rejects.toMatchObject({
      code: 'error',
    });
    const down = (async () => {
      throw new TypeError('fetch failed');
    }) as unknown as typeof fetch;
    const error = await new LikhoClient({ baseUrl: 'http://x', fetch: down })
      .request(MeQuery)
      .catch((e) => e);
    expect(error).toBeInstanceOf(LikhoError);
    expect(error.code).toBe('network');
  });
});
