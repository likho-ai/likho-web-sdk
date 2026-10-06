import {
  keepPreviousData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import type { DialerCallsFilter } from '../gen/graphql.js';
import {
  DialerAgentsQuery,
  DialerCampaignsQuery,
  DialerCallsQuery,
  DialerStatusQuery,
  RequestImportsMutation,
} from '../operations/dialer.js';
import { useLikho } from '../provider.js';
import { importKeys } from './imports.js';
import { recordingKeys } from './recordings.js';

/** A window of the dialer's call time: since included, until not; ISO strings. */
export interface DialerWindow {
  since: string;
  until: string;
}

export const dialerKeys = {
  all: ['dialer'] as const,
  campaigns: (w: DialerWindow) => ['dialer', 'campaigns', w.since, w.until] as const,
  agents: (w: DialerWindow, campaign: string) => ['dialer', 'agents', w.since, w.until, campaign] as const,
  calls: (filter: DialerCallsFilter, first: number) => ['dialer', 'calls', filter, first] as const,
  status: ['dialer', 'status'] as const,
};

const ready = (w: DialerWindow) => Boolean(w.since && w.until);

/** The dialer's campaigns of a window, with their counts, most calls first: what people choose from. */
export function useDialerCampaigns(window: DialerWindow) {
  const client = useLikho();
  return useQuery({
    queryKey: dialerKeys.campaigns(window),
    queryFn: async () => (await client.request(DialerCampaignsQuery, window)).dialerCampaigns,
    enabled: ready(window),
    staleTime: 60_000,
    placeholderData: keepPreviousData,
  });
}

/** The dialer's agents of a window (of one campaign when given). */
export function useDialerAgents(window: DialerWindow, campaign = '') {
  const client = useLikho();
  return useQuery({
    queryKey: dialerKeys.agents(window, campaign),
    queryFn: async () =>
      (await client.request(DialerAgentsQuery, { ...window, campaign: campaign || null })).dialerAgents,
    enabled: ready(window),
    staleTime: 60_000,
    placeholderData: keepPreviousData,
  });
}

/** The dialer's calls of a window, newest first, page after page; each says whether Likho has it. */
export function useDialerCalls(filter: DialerCallsFilter, first = 50) {
  const client = useLikho();
  return useInfiniteQuery({
    queryKey: dialerKeys.calls(filter, first),
    queryFn: async ({ pageParam }) =>
      (await client.request(DialerCallsQuery, { filter, first, after: pageParam || null })).dialerCalls,
    initialPageParam: '',
    getNextPageParam: (last) => last.nextCursor ?? undefined,
    enabled: Boolean(filter.since && filter.until),
    staleTime: 30_000,
  });
}

/** What the dialer connector is doing: its schedule, budget and cursor. */
export function useDialerStatus(enabled = true) {
  const client = useLikho();
  return useQuery({
    queryKey: dialerKeys.status,
    queryFn: async () => (await client.request(DialerStatusQuery)).dialerStatus,
    enabled,
    refetchInterval: 30_000,
  });
}

/** Fetches several dialer calls at once (at most 200); the lists and the library follow. */
export function useRequestImports() {
  const client = useLikho();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (externalIds: string[]) =>
      (await client.request(RequestImportsMutation, { externalIds })).requestImports,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: importKeys.all });
      void queryClient.invalidateQueries({ queryKey: dialerKeys.all });
      void queryClient.invalidateQueries({ queryKey: recordingKeys.all });
    },
  });
}
