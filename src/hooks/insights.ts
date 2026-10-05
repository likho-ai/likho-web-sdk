import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import type { RecordingFilter } from '../gen/graphql.js';
import {
  AnalyseRecordingMutation,
  InsightsQuery,
  InsightsStatusQuery,
  RecordingsWithInsightsQuery,
} from '../operations/insights.js';
import { useLikho } from '../provider.js';

export const insightsKeys = {
  of: (recordingId: string) => ['insights', recordingId] as const,
  status: ['insights', 'status'] as const,
  list: (filter: RecordingFilter | undefined, first: number, after: string | undefined) =>
    ['insights', 'list', filter ?? {}, first, after ?? ''] as const,
};

/**
 * The recordings, newest first, each with its insights (or null): what the insights page lists
 * for a day, a campaign or an agent. The same filter as `useRecordings`; the previous page stays
 * while the next loads.
 */
export function useRecordingsWithInsights(filter?: RecordingFilter, first = 50, after?: string) {
  const client = useLikho();
  return useQuery({
    queryKey: insightsKeys.list(filter, first, after),
    queryFn: async () =>
      (await client.request(RecordingsWithInsightsQuery, { filter, first, after })).recordings,
    placeholderData: keepPreviousData,
  });
}

/**
 * What a language model says about a recording's call: a summary, the products, the customer's
 * mood and the auditor's form pre-filled. `null` while the call has no insights yet (or insights
 * are off). Mount `useRecordingLive(recordingId)` beside it to hear when they arrive.
 */
export function useInsights(recordingId: string | undefined | null) {
  const client = useLikho();
  return useQuery({
    queryKey: insightsKeys.of(recordingId ?? ''),
    queryFn: async () => (await client.request(InsightsQuery, { recordingId: recordingId! })).insights,
    enabled: Boolean(recordingId),
  });
}

/** Whether insights are made at all: a model is configured, and which. Without one, no transcript text leaves. */
export function useInsightsStatus() {
  const client = useLikho();
  return useQuery({
    queryKey: insightsKeys.status,
    queryFn: async () => (await client.request(InsightsStatusQuery)).insightsStatus,
    staleTime: 60_000,
  });
}

/** Asks for a recording's insights now; with `force`, again even when it has some. Answers when they are in. */
export function useAnalyseRecording() {
  const client = useLikho();
  const queries = useQueryClient();
  return useMutation({
    mutationFn: async (input: { id: string; force?: boolean }) =>
      (await client.request(AnalyseRecordingMutation, { id: input.id, force: input.force ?? false }))
        .analyseRecording,
    onSuccess: (insights) => queries.setQueryData(insightsKeys.of(insights.recordingId), insights),
  });
}

/** A function that refetches a recording's insights (what the live stream calls). */
export function useRefreshInsights() {
  const queries = useQueryClient();
  return useCallback(
    (recordingId: string) => queries.invalidateQueries({ queryKey: insightsKeys.of(recordingId) }),
    [queries],
  );
}
