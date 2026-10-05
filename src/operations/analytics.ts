import { graphql } from '../gen/index.js';

export const AnalyticsOverviewQuery = graphql(`
  query AnalyticsOverview($since: DateTime!, $until: DateTime!, $facts: AnalyticsFacts) {
    analyticsOverview(since: $since, until: $until, facts: $facts) {
      calls
      transcribed
      failed
      minutes
      realtimeFactor
      analysed
      score
      sentiments {
        key
        count
      }
      languages {
        key
        count
      }
    }
  }
`);

export const AnalyticsTimeseriesQuery = graphql(`
  query AnalyticsTimeseries(
    $metric: AnalyticsMetric!
    $bucket: AnalyticsBucket
    $since: DateTime!
    $until: DateTime!
    $facts: AnalyticsFacts
  ) {
    analyticsTimeseries(metric: $metric, bucket: $bucket, since: $since, until: $until, facts: $facts) {
      at
      value
    }
  }
`);

export const AnalyticsBreakdownQuery = graphql(`
  query AnalyticsBreakdown(
    $by: AnalyticsDimension!
    $since: DateTime!
    $until: DateTime!
    $facts: AnalyticsFacts
    $limit: Int
  ) {
    analyticsBreakdown(by: $by, since: $since, until: $until, facts: $facts, limit: $limit) {
      key
      calls
      transcribed
      minutes
      analysed
      score
      negative
    }
  }
`);
