import { graphql } from '../gen/index.js';

export const RecordingFields = graphql(`
  fragment RecordingFields on Recording {
    id
    originalName
    mediaId
    sizeBytes
    sha256
    durationSeconds
    channels
    sampleRate
    source
    externalId
    attributes {
      key
      value
    }
    status
    failureReason
    latestTranscriptId
    detectedLanguage
    languageProbability
    createdAt
    updatedAt
  }
`);

export const JobFields = graphql(`
  fragment JobFields on Job {
    id
    recordingId
    status
    modelRegistryId
    languagePolicy
    force
    progressSeconds
    totalSeconds
    errorCode
    errorMessage
    transcriptId
    createdAt
    startedAt
    finishedAt
  }
`);

export const RecordingsQuery = graphql(`
  query Recordings($filter: RecordingFilter, $first: Int, $after: String) {
    recordings(filter: $filter, first: $first, after: $after) {
      items {
        ...RecordingFields
        jobs {
          ...JobFields
        }
      }
      hasMore
      endCursor
    }
  }
`);

export const RecordingCountsQuery = graphql(`
  query RecordingCounts {
    recordingCounts {
      uploading
      uploaded
      ready
      failed
      queued
      transcribing
      done
    }
  }
`);

export const RecordingQuery = graphql(`
  query Recording($id: String!) {
    recording(id: $id) {
      ...RecordingFields
      playbackUrl
      peaksUrl
      jobs {
        ...JobFields
      }
    }
  }
`);

export const RequestUploadMutation = graphql(`
  mutation RequestUpload($input: RequestUploadInput!) {
    requestUpload(input: $input) {
      uploadUrl
      expiresAt
      recording {
        ...RecordingFields
      }
      duplicateOf {
        id
        originalName
      }
    }
  }
`);

export const DeleteRecordingMutation = graphql(`
  mutation DeleteRecording($id: String!) {
    deleteRecording(id: $id)
  }
`);

export const JobsQuery = graphql(`
  query Jobs($recordingId: String, $status: [JobStatus!]) {
    jobs(recordingId: $recordingId, status: $status) {
      ...JobFields
    }
  }
`);

export const CreateJobMutation = graphql(`
  mutation CreateJob($input: CreateJobInput!) {
    createJob(input: $input) {
      ...JobFields
    }
  }
`);

export const CancelJobMutation = graphql(`
  mutation CancelJob($id: String!) {
    cancelJob(id: $id) {
      ...JobFields
    }
  }
`);
