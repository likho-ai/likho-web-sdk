import { keepPreviousData, useQuery } from '@tanstack/react-query';
import type { AnalyticsBucket, AnalyticsDimension, AnalyticsFacts, AnalyticsMetric } from '../gen/graphql.js';
import {
  AnalyticsBreakdownQuery,
  AnalyticsOverviewQuery,
  AnalyticsTimeseriesQuery,
} from '../operations/analytics.js';
import { useLikho } from '../provider.js';

/** A window of call time: since included, until not; ISO strings. */
export interface AnalyticsWindow {
  since: string;
  until: string;
}

const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

/** The last `days` whole days up to and including today, in the browser's zone. */
export function lastDays(days: number, today = new Date()): AnalyticsWindow {
  const until = startOfDay(today);
  until.setDate(until.getDate() + 1);
  const since = new Date(until);
  since.setDate(since.getDate() - days);
  return { since: since.toISOString(), until: until.toISOString() };
}

/** Yesterday, in the browser's zone. */
export function yesterday(today = new Date()): AnalyticsWindow {
  const until = startOfDay(today);
  const since = new Date(until);
  since.setDate(since.getDate() - 1);
  return { since: since.toISOString(), until: until.toISOString() };
}

export const analyticsKeys = {
  overview: (w: AnalyticsWindow, facts: AnalyticsFacts | undefined) =>
    ['analytics', 'overview', w.since, w.until, facts ?? {}] as const,
  timeseries: (metric: string, bucket: string, w: AnalyticsWindow, facts: AnalyticsFacts | undefined) =>
    ['analytics', 'timeseries', metric, bucket, w.since, w.until, facts ?? {}] as const,
  breakdown: (by: string, w: AnalyticsWindow, facts: AnalyticsFacts | undefined, limit: number | undefined) =>
    ['analytics', 'breakdown', by, w.since, w.until, facts ?? {}, limit ?? 0] as const,
};

const ready = (w: AnalyticsWindow) => Boolean(w.since && w.until);

/** What happened to the calls in the window: how many, transcribed, minutes, speed, analysed, score, moods, languages. */
export function useAnalyticsOverview(window: AnalyticsWindow, facts?: AnalyticsFacts) {
  const client = useLikho();
  return useQuery({
    queryKey: analyticsKeys.overview(window, facts),
    queryFn: async () =>
      (await client.request(AnalyticsOverviewQuery, { ...window, facts })).analyticsOverview,
    enabled: ready(window),
    staleTime: 60_000,
    placeholderData: keepPreviousData,
  });
}

/** One metric per day (or hour) across the window, empty buckets at 0: a chart. */
export function useAnalyticsTimeseries(
  metric: AnalyticsMetric,
  window: AnalyticsWindow,
  facts?: AnalyticsFacts,
  bucket: AnalyticsBucket = 'day',
) {
  const client = useLikho();
  return useQuery({
    queryKey: analyticsKeys.timeseries(metric, bucket, window, facts),
    queryFn: async () =>
      (await client.request(AnalyticsTimeseriesQuery, { metric, bucket, ...window, facts }))
        .analyticsTimeseries,
    enabled: ready(window),
    staleTime: 60_000,
    placeholderData: keepPreviousData,
  });
}

/** The window's calls by agent, campaign, disposition, language, sentiment or source, most calls first. */
export function useAnalyticsBreakdown(
  by: AnalyticsDimension,
  window: AnalyticsWindow,
  facts?: AnalyticsFacts,
  limit?: number,
) {
  const client = useLikho();
  return useQuery({
    queryKey: analyticsKeys.breakdown(by, window, facts, limit),
    queryFn: async () =>
      (await client.request(AnalyticsBreakdownQuery, { by, ...window, facts, limit })).analyticsBreakdown,
    enabled: ready(window),
    staleTime: 60_000,
    placeholderData: keepPreviousData,
  });
}
