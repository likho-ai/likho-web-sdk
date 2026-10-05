import { graphql } from '../gen/index.js';
import './recordings.js'; // RecordingFields, used below

export const InsightsFields = graphql(`
  fragment InsightsFields on Insights {
    id
    transcriptId
    recordingId
    transcriptVersion
    summary
    intent
    products
    sentiment
    checks {
      key
      label
      answer
      evidence
    }
    scores {
      key
      label
      score
      max
      reason
    }
    scoreTotal
    scoreMax
    model
    inputTokens
    outputTokens
    formVersion
    createdAt
  }
`);

export const InsightsQuery = graphql(`
  query Insights($recordingId: String!) {
    insights(recordingId: $recordingId) {
      ...InsightsFields
    }
  }
`);

export const RecordingsWithInsightsQuery = graphql(`
  query RecordingsWithInsights($filter: RecordingFilter, $first: Int, $after: String) {
    recordings(filter: $filter, first: $first, after: $after) {
      items {
        ...RecordingFields
        insights {
          ...InsightsFields
        }
      }
      hasMore
      endCursor
    }
  }
`);

export const InsightsStatusQuery = graphql(`
  query InsightsStatus {
    insightsStatus {
      enabled
      model
      formVersion
    }
  }
`);

export const AnalyseRecordingMutation = graphql(`
  mutation AnalyseRecording($id: String!, $force: Boolean) {
    analyseRecording(id: $id, force: $force) {
      ...InsightsFields
    }
  }
`);
