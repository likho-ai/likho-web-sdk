import { graphql } from '../gen/index.js';

export const TranscriptFields = graphql(`
  fragment TranscriptFields on Transcript {
    id
    recordingId
    jobId
    version
    modelRegistryId
    engine
    compute
    script
    createdAt
    language {
      detected
      probability
      decodedAs
      policy
      candidates {
        language
        probability
      }
    }
    stats {
      audioSeconds
      elapsedSeconds
      realtimeFactor
      chunks
      silenceSkippedSeconds
    }
  }
`);

export const TranscriptQuery = graphql(`
  query Transcript($id: String!) {
    transcript(id: $id) {
      ...TranscriptFields
      segments {
        index
        startSeconds
        endSeconds
        textScript
        textRoman
      }
    }
  }
`);

export const TranscriptVersionsQuery = graphql(`
  query TranscriptVersions($recordingId: String!) {
    transcriptVersions(recordingId: $recordingId) {
      ...TranscriptFields
    }
  }
`);

export const RetransliterateMutation = graphql(`
  mutation Retransliterate($transcriptId: String!) {
    retransliterate(transcriptId: $transcriptId) {
      ...TranscriptFields
      segments {
        index
        startSeconds
        endSeconds
        textScript
        textRoman
      }
    }
  }
`);

export const EnginesQuery = graphql(`
  query Engines {
    engines {
      registryId
      engine
      available
      isDefault
    }
  }
`);

export const CorrectionFields = graphql(`
  fragment CorrectionFields on Correction {
    id
    recordingId
    transcriptId
    correctedTranscriptId
    segmentIndex
    layer
    before
    after
    userId
    createdAt
  }
`);

export const CorrectSegmentMutation = graphql(`
  mutation CorrectSegment($input: CorrectSegmentInput!) {
    correctSegment(input: $input) {
      ...TranscriptFields
      segments {
        index
        startSeconds
        endSeconds
        textScript
        textRoman
      }
    }
  }
`);

export const CorrectionsQuery = graphql(`
  query Corrections($recordingId: String!) {
    corrections(recordingId: $recordingId) {
      ...CorrectionFields
    }
  }
`);
