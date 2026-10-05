import { LikhoClient } from '../src/client.js';
import { MeQuery } from '../src/operations/account.js';

describe('a client with a token', () => {
  it('sends it as a bearer on every request, and nothing when there is none', async () => {
    const seen: Record<string, string>[] = [];
    const fetchImpl = (async (_url: string, init: RequestInit) => {
      seen.push(init.headers as Record<string, string>);
      return new Response(JSON.stringify({ data: { me: null } }));
    }) as unknown as typeof fetch;
    await new LikhoClient({ baseUrl: 'http://x', fetch: fetchImpl, token: ' lt_abc ' }).request(MeQuery);
    await new LikhoClient({ baseUrl: 'http://x', fetch: fetchImpl }).request(MeQuery);
    expect(seen[0]!.authorization).toBe('Bearer lt_abc');
    expect(seen[1]!.authorization).toBeUndefined();
    expect(seen[0]!['content-type']).toBe('application/json');
  });
});
