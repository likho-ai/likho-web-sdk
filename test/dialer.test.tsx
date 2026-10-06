import { QueryClient } from '@tanstack/react-query';
import { act, renderHook, waitFor } from '@testing-library/react';
import type { ReactNode } from 'react';
import { LikhoClient } from '../src/client.js';
import { useSettings, useSystemStatus, useUpdateSettings } from '../src/hooks/account.js';
import {
  useDialerAgents,
  useDialerCalls,
  useDialerCampaigns,
  useDialerStatus,
  useRequestImports,
} from '../src/hooks/dialer.js';
import { LikhoProvider } from '../src/provider.js';

type Answer = (variables: Record<string, unknown>) => unknown;

function fakeApi(answers: Record<string, Answer>) {
  const asked: { name: string; variables: Record<string, unknown> }[] = [];
  const impl = (async (_url: string, init: RequestInit) => {
    const { query, variables } = JSON.parse(init.body as string) as {
      query: string;
      variables: Record<string, unknown>;
    };
    const name = /(?:query|mutation) (\w+)/.exec(query)![1]!;
    asked.push({ name, variables });
    const answer = answers[name];
    if (!answer)
      return new Response(
        JSON.stringify({ errors: [{ message: `no answer for ${name}`, extensions: { code: 'not_found' } }] }),
      );
    return new Response(JSON.stringify({ data: answer(variables) }));
  }) as unknown as typeof fetch;
  return { client: new LikhoClient({ baseUrl: 'http://x', fetch: impl }), asked };
}

const wrapperFor = (client: LikhoClient) => {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return ({ children }: { children: ReactNode }) => (
    <LikhoProvider client={client} queryClient={queryClient}>
      {children}
    </LikhoProvider>
  );
};

const call = (crt: string, extra: Record<string, unknown> = {}) => ({
  crtObjectId: crt,
  callId: `c-${crt}`,
  callTime: '2026-10-02 10:00:00',
  campaign: 'Sales',
  transferredCampaign: '',
  agent: 'asha',
  agentId: 'u1',
  disposition: 'Sale',
  callType: 'inbound.call.dial',
  connected: true,
  talkSeconds: 120,
  phone: '…3210',
  hangupBy: 'customer',
  queue: '',
  recordingId: null,
  recordingStatus: null,
  ...extra,
});

describe('the dialer hooks', () => {
  const window = { since: '2026-10-01T18:30:00.000Z', until: '2026-10-02T18:30:00.000Z' };

  it('ask for the campaigns, the agents of one, and the calls page after page', async () => {
    const { client, asked } = fakeApi({
      DialerCampaigns: () => ({
        dialerCampaigns: [{ name: 'Sales', calls: 3, connected: 2, interactions: 3, talkSeconds: 160 }],
      }),
      DialerAgents: () => ({
        dialerAgents: [{ id: 'u1', name: 'asha', calls: 2, connected: 1, talkSeconds: 120 }],
      }),
      DialerCalls: (v) => ({
        dialerCalls: v.after
          ? { items: [call('crt-1')], nextCursor: null }
          : { items: [call('crt-2', { recordingId: 'rec_1', recordingStatus: 'done' })], nextCursor: '1' },
      }),
    });
    const wrapper = wrapperFor(client);
    const campaigns = renderHook(() => useDialerCampaigns(window), { wrapper });
    await waitFor(() => expect(campaigns.result.current.data?.[0]?.name).toBe('Sales'));
    const agents = renderHook(() => useDialerAgents(window, 'Sales'), { wrapper });
    await waitFor(() => expect(agents.result.current.data).toHaveLength(1));
    expect(asked.find((a) => a.name === 'DialerAgents')!.variables).toEqual({ ...window, campaign: 'Sales' });

    const calls = renderHook(() => useDialerCalls({ ...window, campaign: 'Sales', connectedOnly: true }, 1), {
      wrapper,
    });
    await waitFor(() => expect(calls.result.current.data?.pages).toHaveLength(1));
    expect(calls.result.current.data!.pages[0]!.items[0]!.recordingId).toBe('rec_1');
    expect(calls.result.current.hasNextPage).toBe(true);
    await act(async () => {
      await calls.result.current.fetchNextPage();
    });
    await waitFor(() =>
      expect(calls.result.current.data!.pages.map((p) => p.items[0]!.crtObjectId)).toEqual([
        'crt-2',
        'crt-1',
      ]),
    );
    expect(calls.result.current.hasNextPage).toBe(false);
    expect(asked.filter((a) => a.name === 'DialerCalls').map((a) => a.variables.after)).toEqual([null, '1']);
  });

  it('fetch several calls at once, read the status, and change the dialer settings', async () => {
    let settings = {
      autoTranscribe: true,
      dialer: {
        scheduleEnabled: false,
        campaigns: [] as string[],
        minTalkSeconds: 20,
        dailyLimit: 200,
        batchLimit: 50,
        pollIntervalSeconds: 300,
        phoneDigits: 4,
        writebackEnabled: false,
      },
    };
    const { client, asked } = fakeApi({
      RequestImports: (v) => ({
        requestImports: (v.externalIds as string[]).map((id, i) => ({
          id: `imp_${i}`,
          externalId: id,
          status: 'requested',
        })),
      }),
      DialerStatus: () => ({
        dialerStatus: {
          databaseConfigured: true,
          scheduleEnabled: false,
          cursor: '',
          importedToday: 3,
          dailyLimit: 200,
          campaigns: [],
          minTalkSeconds: 20,
          writebackEnabled: false,
          archiveEnabled: true,
          version: '0.4.0',
          lastRunAt: null,
          lastRunSummary: '',
        },
      }),
      SystemStatus: () => ({
        systemStatus: {
          version: '0.11.0',
          checkedAt: new Date().toISOString(),
          services: [{ name: 'likho-media', address: 'x', ok: true, detail: 'answers', latencyMs: 3 }],
        },
      }),
      Settings: () => ({ settings }),
      UpdateSettings: (v) => {
        const input = v.input as { dialer?: Partial<typeof settings.dialer> };
        settings = { ...settings, dialer: { ...settings.dialer, ...input.dialer } };
        return { updateSettings: settings };
      },
    });
    const wrapper = wrapperFor(client);
    const fetchMany = renderHook(() => useRequestImports(), { wrapper });
    let made: unknown[] = [];
    await act(async () => {
      made = await fetchMany.result.current.mutateAsync(['crt-1', 'crt-2']);
    });
    expect(made).toHaveLength(2);
    const status = renderHook(() => useDialerStatus(), { wrapper });
    await waitFor(() => expect(status.result.current.data?.version).toBe('0.4.0'));
    const system = renderHook(() => useSystemStatus(), { wrapper });
    await waitFor(() => expect(system.result.current.data?.services[0]?.ok).toBe(true));

    const read = renderHook(() => useSettings(), { wrapper });
    await waitFor(() => expect(read.result.current.data?.dialer.dailyLimit).toBe(200));
    const update = renderHook(() => useUpdateSettings(), { wrapper });
    await act(async () => {
      await update.result.current.mutateAsync({ dialer: { scheduleEnabled: true, campaigns: ['Sales'] } });
    });
    expect(asked.find((a) => a.name === 'UpdateSettings')!.variables).toEqual({
      input: { dialer: { scheduleEnabled: true, campaigns: ['Sales'] } },
    });
    await waitFor(() => expect(read.result.current.data?.dialer.scheduleEnabled).toBe(true));
  });
});
