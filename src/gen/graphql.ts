/* eslint-disable */
/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> =
  T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type AnalyticsBucket = 'day' | 'hour';

export type AnalyticsDimension = 'agent' | 'campaign' | 'disposition' | 'language' | 'sentiment' | 'source';

/** Narrows to calls with these facts; a field left out means any. */
export type AnalyticsFacts = {
  agent?: string | null | undefined;
  campaign?: string | null | undefined;
  disposition?: string | null | undefined;
  /** The language detected (ISO 639-1). */
  language?: string | null | undefined;
  /** upload, api, or a connector’s name. */
  source?: string | null | undefined;
};

/** calls that arrived; calls with a transcript; minutes of audio transcribed; seconds of work per second of audio; calls the model analysed; their mean score (0 to 1); analysed calls in a negative mood. */
export type AnalyticsMetric =
  'analysed' | 'calls' | 'minutes' | 'negative' | 'realtimeFactor' | 'score' | 'transcribed';

export type AttributeInput = {
  key: string;
  value: string;
};

export type AuditFilterInput = {
  action?: string | null | undefined;
  actorId?: string | null | undefined;
  targetId?: string | null | undefined;
  targetKind?: string | null | undefined;
};

export type CorrectSegmentInput = {
  layer: Layer;
  segmentIndex: number;
  /** What the line should read. */
  text: string;
  /** The version being looked at; it must be the latest. */
  transcriptId: string;
};

export type CreateJobInput = {
  /** Transcribe again even if a transcript exists. */
  force?: boolean | null | undefined;
  /** "auto" or a language code to force. */
  languagePolicy?: string | null | undefined;
  /** Empty = the default model. */
  modelRegistryId?: string | null | undefined;
  recordingId: string;
};

export type GlossaryTermInput = {
  enabled?: boolean | null | undefined;
  /** Empty: a new term, or the one with the same text. */
  id?: string | null | undefined;
  language?: string | null | undefined;
  note?: string | null | undefined;
  term: string;
};

export type ImportStatus = 'completed' | 'failed' | 'requested';

export type InviteUserInput = {
  email: string;
  name?: string | null | undefined;
  role: Role;
};

export type JobStatus = 'cancelled' | 'done' | 'failed' | 'queued' | 'running';

/** script: as spoken, in its script. roman: the Hinglish. */
export type Layer = 'roman' | 'script';

export type RecordingFilter = {
  /** The agent attribute, exactly. */
  agent?: string | null | undefined;
  /** The campaign attribute, exactly. */
  campaign?: string | null | undefined;
  /** The disposition attribute, exactly. */
  disposition?: string | null | undefined;
  /** Part of the file name or the external id. */
  search?: string | null | undefined;
  /** Calls from this moment (their call time). */
  since?: string | null | undefined;
  /** Where the call came from: upload, api, or a connector’s name. */
  source?: string | null | undefined;
  status?: Array<RecordingStatus> | null | undefined;
  /** Calls up to this moment (their call time). */
  until?: string | null | undefined;
};

export type RecordingStatus =
  'done' | 'failed' | 'queued' | 'ready' | 'transcribing' | 'uploaded' | 'uploading';

export type RequestImportInput = {
  /** The call’s id in the dialer (its crt_object_id). */
  externalId: string;
  /** Which connector; empty = the default one. */
  source?: string | null | undefined;
  /** Transcribe once stored (default true). */
  transcribe?: boolean | null | undefined;
};

export type RequestUploadInput = {
  /** Facts about the call: campaign, agent, ... */
  attributes?: Array<AttributeInput> | null | undefined;
  contentType?: string | null | undefined;
  /** Your own id for the call. */
  externalId?: string | null | undefined;
  originalName: string;
  /** When known: the same content is not uploaded twice. */
  sha256?: string | null | undefined;
  sizeBytes: number;
  /** Where the call comes from (a connector’s name); API keys only. */
  source?: string | null | undefined;
};

/** admin manages people and settings; member works with recordings; viewer reads and searches. */
export type Role = 'admin' | 'member' | 'viewer';

export type SaveSearchInput = {
  filter?: SearchFilter | null | undefined;
  /** A short name, e.g. "refunds, sales, last week". */
  name: string;
  /** The words to search for. */
  query: string;
};

export type SearchFilter = {
  /** The agent attribute, exactly. */
  agent?: string | null | undefined;
  /** Calls from this moment (their call time). */
  callSince?: string | null | undefined;
  /** Calls up to this moment (their call time). */
  callUntil?: string | null | undefined;
  /** The campaign attribute, exactly. */
  campaign?: string | null | undefined;
  /** The disposition attribute, exactly. */
  disposition?: string | null | undefined;
  /** A detected language (ISO 639-1). */
  language?: string | null | undefined;
  /** Only this recording. */
  recordingId?: string | null | undefined;
  /** Transcripts created from this moment. */
  since?: string | null | undefined;
  /** Where the call came from: upload, api, or a connector’s name. */
  source?: string | null | undefined;
  /** Transcripts created up to this moment. */
  until?: string | null | undefined;
};

export type SpellingInput = {
  enabled?: boolean | null | undefined;
  id?: string | null | undefined;
  source: string;
  target: string;
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  me: {
    id: string | null;
    email: string;
    name: string;
    role: string;
    workspace: { id: string; name: string };
  };
};

export type LoginMutationVariables = Exact<{
  email: string;
  password: string;
}>;

export type LoginMutation = {
  login: {
    id: string | null;
    email: string;
    name: string;
    role: string;
    workspace: { id: string; name: string };
  };
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { logout: boolean };

export type SettingsQueryVariables = Exact<{ [key: string]: never }>;

export type SettingsQuery = { settings: { autoTranscribe: boolean } };

export type UpdateSettingsMutationVariables = Exact<{
  autoTranscribe: boolean;
}>;

export type UpdateSettingsMutation = { updateSettings: { autoTranscribe: boolean } };

export type ApiKeysQueryVariables = Exact<{ [key: string]: never }>;

export type ApiKeysQuery = {
  apiKeys: Array<{
    id: string;
    name: string;
    createdAt: string;
    lastUsedAt: string | null;
    revokedAt: string | null;
  }>;
};

export type CreateApiKeyMutationVariables = Exact<{
  name: string;
}>;

export type CreateApiKeyMutation = { createApiKey: { id: string; key: string } };

export type RevokeApiKeyMutationVariables = Exact<{
  id: string;
}>;

export type RevokeApiKeyMutation = { revokeApiKey: boolean };

export type AnalyticsOverviewQueryVariables = Exact<{
  since: string;
  until: string;
  facts?: AnalyticsFacts | null | undefined;
}>;

export type AnalyticsOverviewQuery = {
  analyticsOverview: {
    calls: number;
    transcribed: number;
    failed: number;
    minutes: number;
    realtimeFactor: number;
    analysed: number;
    score: number;
    sentiments: Array<{ key: string; count: number }>;
    languages: Array<{ key: string; count: number }>;
  };
};

export type AnalyticsTimeseriesQueryVariables = Exact<{
  metric: AnalyticsMetric;
  bucket?: AnalyticsBucket | null | undefined;
  since: string;
  until: string;
  facts?: AnalyticsFacts | null | undefined;
}>;

export type AnalyticsTimeseriesQuery = { analyticsTimeseries: Array<{ at: string; value: number }> };

export type AnalyticsBreakdownQueryVariables = Exact<{
  by: AnalyticsDimension;
  since: string;
  until: string;
  facts?: AnalyticsFacts | null | undefined;
  limit?: number | null | undefined;
}>;

export type AnalyticsBreakdownQuery = {
  analyticsBreakdown: Array<{
    key: string;
    calls: number;
    transcribed: number;
    minutes: number;
    analysed: number;
    score: number;
    negative: number;
  }>;
};

export type ImportFieldsFragment = {
  id: string;
  source: string;
  externalId: string;
  transcribe: boolean;
  status: ImportStatus;
  recordingId: string;
  reason: string;
  code: string;
  createdAt: string;
  updatedAt: string;
};

export type RequestImportMutationVariables = Exact<{
  input: RequestImportInput;
}>;

export type RequestImportMutation = {
  requestImport: {
    id: string;
    source: string;
    externalId: string;
    transcribe: boolean;
    status: ImportStatus;
    recordingId: string;
    reason: string;
    code: string;
    createdAt: string;
    updatedAt: string;
  };
};

export type ImportsQueryVariables = Exact<{
  status?: Array<ImportStatus> | ImportStatus | null | undefined;
  first?: number | null | undefined;
  after?: string | null | undefined;
}>;

export type ImportsQuery = {
  imports: {
    hasMore: boolean;
    items: Array<{
      id: string;
      source: string;
      externalId: string;
      transcribe: boolean;
      status: ImportStatus;
      recordingId: string;
      reason: string;
      code: string;
      createdAt: string;
      updatedAt: string;
    }>;
  };
};

export type ImportQueryVariables = Exact<{
  id: string;
}>;

export type ImportQuery = {
  import: {
    id: string;
    source: string;
    externalId: string;
    transcribe: boolean;
    status: ImportStatus;
    recordingId: string;
    reason: string;
    code: string;
    createdAt: string;
    updatedAt: string;
  };
};

export type InsightsFieldsFragment = {
  id: string;
  transcriptId: string;
  recordingId: string;
  transcriptVersion: number;
  summary: string;
  intent: string;
  products: Array<string>;
  sentiment: string;
  scoreTotal: number;
  scoreMax: number;
  model: string;
  inputTokens: number;
  outputTokens: number;
  formVersion: string;
  createdAt: string | null;
  checks: Array<{ key: string; label: string; answer: string; evidence: string }>;
  scores: Array<{ key: string; label: string; score: number; max: number; reason: string }>;
};

export type InsightsQueryVariables = Exact<{
  recordingId: string;
}>;

export type InsightsQuery = {
  insights: {
    id: string;
    transcriptId: string;
    recordingId: string;
    transcriptVersion: number;
    summary: string;
    intent: string;
    products: Array<string>;
    sentiment: string;
    scoreTotal: number;
    scoreMax: number;
    model: string;
    inputTokens: number;
    outputTokens: number;
    formVersion: string;
    createdAt: string | null;
    checks: Array<{ key: string; label: string; answer: string; evidence: string }>;
    scores: Array<{ key: string; label: string; score: number; max: number; reason: string }>;
  } | null;
};

export type RecordingsWithInsightsQueryVariables = Exact<{
  filter?: RecordingFilter | null | undefined;
  first?: number | null | undefined;
  after?: string | null | undefined;
}>;

export type RecordingsWithInsightsQuery = {
  recordings: {
    hasMore: boolean;
    endCursor: string | null;
    items: Array<{
      id: string;
      originalName: string;
      mediaId: string;
      sizeBytes: number;
      sha256: string;
      durationSeconds: number;
      channels: number;
      sampleRate: number;
      source: string;
      externalId: string;
      status: RecordingStatus;
      failureReason: string;
      latestTranscriptId: string;
      detectedLanguage: string;
      languageProbability: number;
      callTime: string;
      createdAt: string;
      updatedAt: string;
      insights: {
        id: string;
        transcriptId: string;
        recordingId: string;
        transcriptVersion: number;
        summary: string;
        intent: string;
        products: Array<string>;
        sentiment: string;
        scoreTotal: number;
        scoreMax: number;
        model: string;
        inputTokens: number;
        outputTokens: number;
        formVersion: string;
        createdAt: string | null;
        checks: Array<{ key: string; label: string; answer: string; evidence: string }>;
        scores: Array<{ key: string; label: string; score: number; max: number; reason: string }>;
      } | null;
      attributes: Array<{ key: string; value: string }>;
    }>;
  };
};

export type InsightsStatusQueryVariables = Exact<{ [key: string]: never }>;

export type InsightsStatusQuery = {
  insightsStatus: { enabled: boolean; model: string; formVersion: string };
};

export type AnalyseRecordingMutationVariables = Exact<{
  id: string;
  force?: boolean | null | undefined;
}>;

export type AnalyseRecordingMutation = {
  analyseRecording: {
    id: string;
    transcriptId: string;
    recordingId: string;
    transcriptVersion: number;
    summary: string;
    intent: string;
    products: Array<string>;
    sentiment: string;
    scoreTotal: number;
    scoreMax: number;
    model: string;
    inputTokens: number;
    outputTokens: number;
    formVersion: string;
    createdAt: string | null;
    checks: Array<{ key: string; label: string; answer: string; evidence: string }>;
    scores: Array<{ key: string; label: string; score: number; max: number; reason: string }>;
  };
};

export type RecordingFieldsFragment = {
  id: string;
  originalName: string;
  mediaId: string;
  sizeBytes: number;
  sha256: string;
  durationSeconds: number;
  channels: number;
  sampleRate: number;
  source: string;
  externalId: string;
  status: RecordingStatus;
  failureReason: string;
  latestTranscriptId: string;
  detectedLanguage: string;
  languageProbability: number;
  callTime: string;
  createdAt: string;
  updatedAt: string;
  attributes: Array<{ key: string; value: string }>;
};

export type RecordingFacetsQueryVariables = Exact<{
  key: string;
  filter?: RecordingFilter | null | undefined;
}>;

export type RecordingFacetsQuery = { recordingFacets: Array<{ value: string; count: number }> };

export type JobFieldsFragment = {
  id: string;
  recordingId: string;
  status: JobStatus;
  modelRegistryId: string;
  languagePolicy: string;
  force: boolean;
  progressSeconds: number;
  totalSeconds: number;
  errorCode: string;
  errorMessage: string;
  transcriptId: string;
  createdAt: string;
  startedAt: string | null;
  finishedAt: string | null;
};

export type RecordingsQueryVariables = Exact<{
  filter?: RecordingFilter | null | undefined;
  first?: number | null | undefined;
  after?: string | null | undefined;
}>;

export type RecordingsQuery = {
  recordings: {
    hasMore: boolean;
    endCursor: string | null;
    items: Array<{
      id: string;
      originalName: string;
      mediaId: string;
      sizeBytes: number;
      sha256: string;
      durationSeconds: number;
      channels: number;
      sampleRate: number;
      source: string;
      externalId: string;
      status: RecordingStatus;
      failureReason: string;
      latestTranscriptId: string;
      detectedLanguage: string;
      languageProbability: number;
      callTime: string;
      createdAt: string;
      updatedAt: string;
      jobs: Array<{
        id: string;
        recordingId: string;
        status: JobStatus;
        modelRegistryId: string;
        languagePolicy: string;
        force: boolean;
        progressSeconds: number;
        totalSeconds: number;
        errorCode: string;
        errorMessage: string;
        transcriptId: string;
        createdAt: string;
        startedAt: string | null;
        finishedAt: string | null;
      }>;
      attributes: Array<{ key: string; value: string }>;
    }>;
  };
};

export type RecordingCountsQueryVariables = Exact<{ [key: string]: never }>;

export type RecordingCountsQuery = {
  recordingCounts: {
    uploading: number;
    uploaded: number;
    ready: number;
    failed: number;
    queued: number;
    transcribing: number;
    done: number;
  };
};

export type RecordingQueryVariables = Exact<{
  id: string;
}>;

export type RecordingQuery = {
  recording: {
    playbackUrl: string | null;
    peaksUrl: string | null;
    id: string;
    originalName: string;
    mediaId: string;
    sizeBytes: number;
    sha256: string;
    durationSeconds: number;
    channels: number;
    sampleRate: number;
    source: string;
    externalId: string;
    status: RecordingStatus;
    failureReason: string;
    latestTranscriptId: string;
    detectedLanguage: string;
    languageProbability: number;
    callTime: string;
    createdAt: string;
    updatedAt: string;
    jobs: Array<{
      id: string;
      recordingId: string;
      status: JobStatus;
      modelRegistryId: string;
      languagePolicy: string;
      force: boolean;
      progressSeconds: number;
      totalSeconds: number;
      errorCode: string;
      errorMessage: string;
      transcriptId: string;
      createdAt: string;
      startedAt: string | null;
      finishedAt: string | null;
    }>;
    attributes: Array<{ key: string; value: string }>;
  };
};

export type RequestUploadMutationVariables = Exact<{
  input: RequestUploadInput;
}>;

export type RequestUploadMutation = {
  requestUpload: {
    uploadUrl: string;
    expiresAt: string | null;
    recording: {
      id: string;
      originalName: string;
      mediaId: string;
      sizeBytes: number;
      sha256: string;
      durationSeconds: number;
      channels: number;
      sampleRate: number;
      source: string;
      externalId: string;
      status: RecordingStatus;
      failureReason: string;
      latestTranscriptId: string;
      detectedLanguage: string;
      languageProbability: number;
      callTime: string;
      createdAt: string;
      updatedAt: string;
      attributes: Array<{ key: string; value: string }>;
    };
    duplicateOf: { id: string; originalName: string } | null;
  };
};

export type DeleteRecordingMutationVariables = Exact<{
  id: string;
}>;

export type DeleteRecordingMutation = { deleteRecording: boolean };

export type JobsQueryVariables = Exact<{
  recordingId?: string | null | undefined;
  status?: Array<JobStatus> | JobStatus | null | undefined;
}>;

export type JobsQuery = {
  jobs: Array<{
    id: string;
    recordingId: string;
    status: JobStatus;
    modelRegistryId: string;
    languagePolicy: string;
    force: boolean;
    progressSeconds: number;
    totalSeconds: number;
    errorCode: string;
    errorMessage: string;
    transcriptId: string;
    createdAt: string;
    startedAt: string | null;
    finishedAt: string | null;
  }>;
};

export type CreateJobMutationVariables = Exact<{
  input: CreateJobInput;
}>;

export type CreateJobMutation = {
  createJob: {
    id: string;
    recordingId: string;
    status: JobStatus;
    modelRegistryId: string;
    languagePolicy: string;
    force: boolean;
    progressSeconds: number;
    totalSeconds: number;
    errorCode: string;
    errorMessage: string;
    transcriptId: string;
    createdAt: string;
    startedAt: string | null;
    finishedAt: string | null;
  };
};

export type CancelJobMutationVariables = Exact<{
  id: string;
}>;

export type CancelJobMutation = {
  cancelJob: {
    id: string;
    recordingId: string;
    status: JobStatus;
    modelRegistryId: string;
    languagePolicy: string;
    force: boolean;
    progressSeconds: number;
    totalSeconds: number;
    errorCode: string;
    errorMessage: string;
    transcriptId: string;
    createdAt: string;
    startedAt: string | null;
    finishedAt: string | null;
  };
};

export type SearchQueryVariables = Exact<{
  query: string;
  filter?: SearchFilter | null | undefined;
  page?: number | null | undefined;
  pageSize?: number | null | undefined;
}>;

export type SearchQuery = {
  search: {
    total: number;
    page: number;
    pageSize: number;
    processingMs: number;
    hits: Array<{
      transcriptId: string;
      segmentIndex: number;
      startSeconds: number;
      endSeconds: number;
      textRoman: string;
      textScript: string;
      highlightRoman: string;
      highlightScript: string;
      language: string;
      recording: {
        id: string;
        originalName: string;
        mediaId: string;
        sizeBytes: number;
        sha256: string;
        durationSeconds: number;
        channels: number;
        sampleRate: number;
        source: string;
        externalId: string;
        status: RecordingStatus;
        failureReason: string;
        latestTranscriptId: string;
        detectedLanguage: string;
        languageProbability: number;
        callTime: string;
        createdAt: string;
        updatedAt: string;
        attributes: Array<{ key: string; value: string }>;
      };
    }>;
  };
};

export type SavedSearchFieldsFragment = {
  id: string;
  name: string;
  query: string;
  createdBy: string | null;
  createdAt: string;
  filter: {
    language: string | null;
    recordingId: string | null;
    campaign: string | null;
    agent: string | null;
    disposition: string | null;
    source: string | null;
    since: string | null;
    until: string | null;
    callSince: string | null;
    callUntil: string | null;
  };
};

export type SavedSearchesQueryVariables = Exact<{ [key: string]: never }>;

export type SavedSearchesQuery = {
  savedSearches: Array<{
    id: string;
    name: string;
    query: string;
    createdBy: string | null;
    createdAt: string;
    filter: {
      language: string | null;
      recordingId: string | null;
      campaign: string | null;
      agent: string | null;
      disposition: string | null;
      source: string | null;
      since: string | null;
      until: string | null;
      callSince: string | null;
      callUntil: string | null;
    };
  }>;
};

export type SaveSearchMutationVariables = Exact<{
  input: SaveSearchInput;
}>;

export type SaveSearchMutation = {
  saveSearch: {
    id: string;
    name: string;
    query: string;
    createdBy: string | null;
    createdAt: string;
    filter: {
      language: string | null;
      recordingId: string | null;
      campaign: string | null;
      agent: string | null;
      disposition: string | null;
      source: string | null;
      since: string | null;
      until: string | null;
      callSince: string | null;
      callUntil: string | null;
    };
  };
};

export type DeleteSavedSearchMutationVariables = Exact<{
  id: string;
}>;

export type DeleteSavedSearchMutation = { deleteSavedSearch: boolean };

export type TranscriptFieldsFragment = {
  id: string;
  recordingId: string;
  jobId: string;
  version: number;
  modelRegistryId: string;
  engine: string;
  compute: string;
  script: string;
  createdAt: string | null;
  language: {
    detected: string;
    probability: number;
    decodedAs: string;
    policy: string;
    candidates: Array<{ language: string; probability: number }>;
  };
  stats: {
    audioSeconds: number;
    elapsedSeconds: number;
    realtimeFactor: number;
    chunks: number;
    silenceSkippedSeconds: number;
  };
};

export type TranscriptQueryVariables = Exact<{
  id: string;
}>;

export type TranscriptQuery = {
  transcript: {
    id: string;
    recordingId: string;
    jobId: string;
    version: number;
    modelRegistryId: string;
    engine: string;
    compute: string;
    script: string;
    createdAt: string | null;
    segments: Array<{
      index: number;
      startSeconds: number;
      endSeconds: number;
      textScript: string;
      textRoman: string;
    }>;
    language: {
      detected: string;
      probability: number;
      decodedAs: string;
      policy: string;
      candidates: Array<{ language: string; probability: number }>;
    };
    stats: {
      audioSeconds: number;
      elapsedSeconds: number;
      realtimeFactor: number;
      chunks: number;
      silenceSkippedSeconds: number;
    };
  };
};

export type TranscriptVersionsQueryVariables = Exact<{
  recordingId: string;
}>;

export type TranscriptVersionsQuery = {
  transcriptVersions: Array<{
    id: string;
    recordingId: string;
    jobId: string;
    version: number;
    modelRegistryId: string;
    engine: string;
    compute: string;
    script: string;
    createdAt: string | null;
    language: {
      detected: string;
      probability: number;
      decodedAs: string;
      policy: string;
      candidates: Array<{ language: string; probability: number }>;
    };
    stats: {
      audioSeconds: number;
      elapsedSeconds: number;
      realtimeFactor: number;
      chunks: number;
      silenceSkippedSeconds: number;
    };
  }>;
};

export type RetransliterateMutationVariables = Exact<{
  transcriptId: string;
}>;

export type RetransliterateMutation = {
  retransliterate: {
    id: string;
    recordingId: string;
    jobId: string;
    version: number;
    modelRegistryId: string;
    engine: string;
    compute: string;
    script: string;
    createdAt: string | null;
    segments: Array<{
      index: number;
      startSeconds: number;
      endSeconds: number;
      textScript: string;
      textRoman: string;
    }>;
    language: {
      detected: string;
      probability: number;
      decodedAs: string;
      policy: string;
      candidates: Array<{ language: string; probability: number }>;
    };
    stats: {
      audioSeconds: number;
      elapsedSeconds: number;
      realtimeFactor: number;
      chunks: number;
      silenceSkippedSeconds: number;
    };
  };
};

export type EnginesQueryVariables = Exact<{ [key: string]: never }>;

export type EnginesQuery = {
  engines: Array<{ registryId: string; engine: string; available: boolean; isDefault: boolean }>;
};

export type CorrectionFieldsFragment = {
  id: string;
  recordingId: string;
  transcriptId: string;
  correctedTranscriptId: string;
  segmentIndex: number;
  layer: Layer;
  before: string;
  after: string;
  userId: string;
  createdAt: string;
};

export type CorrectSegmentMutationVariables = Exact<{
  input: CorrectSegmentInput;
}>;

export type CorrectSegmentMutation = {
  correctSegment: {
    id: string;
    recordingId: string;
    jobId: string;
    version: number;
    modelRegistryId: string;
    engine: string;
    compute: string;
    script: string;
    createdAt: string | null;
    segments: Array<{
      index: number;
      startSeconds: number;
      endSeconds: number;
      textScript: string;
      textRoman: string;
    }>;
    language: {
      detected: string;
      probability: number;
      decodedAs: string;
      policy: string;
      candidates: Array<{ language: string; probability: number }>;
    };
    stats: {
      audioSeconds: number;
      elapsedSeconds: number;
      realtimeFactor: number;
      chunks: number;
      silenceSkippedSeconds: number;
    };
  };
};

export type CorrectionsQueryVariables = Exact<{
  recordingId: string;
}>;

export type CorrectionsQuery = {
  corrections: Array<{
    id: string;
    recordingId: string;
    transcriptId: string;
    correctedTranscriptId: string;
    segmentIndex: number;
    layer: Layer;
    before: string;
    after: string;
    userId: string;
    createdAt: string;
  }>;
};

export type UserFieldsFragment = {
  id: string;
  email: string;
  name: string;
  role: Role;
  createdAt: string;
  disabledAt: string | null;
};

export type InvitationFieldsFragment = {
  id: string;
  email: string;
  name: string;
  role: Role;
  invitedBy: string | null;
  createdAt: string;
  expiresAt: string;
  acceptedAt: string | null;
  revokedAt: string | null;
};

export type UsersQueryVariables = Exact<{ [key: string]: never }>;

export type UsersQuery = {
  users: Array<{
    id: string;
    email: string;
    name: string;
    role: Role;
    createdAt: string;
    disabledAt: string | null;
  }>;
};

export type InvitationsQueryVariables = Exact<{ [key: string]: never }>;

export type InvitationsQuery = {
  invitations: Array<{
    id: string;
    email: string;
    name: string;
    role: Role;
    invitedBy: string | null;
    createdAt: string;
    expiresAt: string;
    acceptedAt: string | null;
    revokedAt: string | null;
  }>;
};

export type InviteUserMutationVariables = Exact<{
  input: InviteUserInput;
}>;

export type InviteUserMutation = {
  inviteUser: {
    link: string;
    sent: boolean;
    invitation: {
      id: string;
      email: string;
      name: string;
      role: Role;
      invitedBy: string | null;
      createdAt: string;
      expiresAt: string;
      acceptedAt: string | null;
      revokedAt: string | null;
    };
  };
};

export type RevokeInvitationMutationVariables = Exact<{
  id: string;
}>;

export type RevokeInvitationMutation = { revokeInvitation: boolean };

export type SetUserRoleMutationVariables = Exact<{
  userId: string;
  role: Role;
}>;

export type SetUserRoleMutation = {
  setUserRole: {
    id: string;
    email: string;
    name: string;
    role: Role;
    createdAt: string;
    disabledAt: string | null;
  };
};

export type DisableUserMutationVariables = Exact<{
  userId: string;
}>;

export type DisableUserMutation = {
  disableUser: {
    id: string;
    email: string;
    name: string;
    role: Role;
    createdAt: string;
    disabledAt: string | null;
  };
};

export type EnableUserMutationVariables = Exact<{
  userId: string;
}>;

export type EnableUserMutation = {
  enableUser: {
    id: string;
    email: string;
    name: string;
    role: Role;
    createdAt: string;
    disabledAt: string | null;
  };
};

export type InvitationQueryVariables = Exact<{
  token: string;
}>;

export type InvitationQuery = { invitation: { email: string; name: string; role: Role; workspace: string } };

export type AcceptInvitationMutationVariables = Exact<{
  token: string;
  name: string;
  password: string;
}>;

export type AcceptInvitationMutation = {
  acceptInvitation: {
    id: string | null;
    email: string;
    name: string;
    role: string;
    workspace: { id: string; name: string };
  };
};

export type RequestPasswordResetMutationVariables = Exact<{
  email: string;
}>;

export type RequestPasswordResetMutation = { requestPasswordReset: boolean };

export type ResetPasswordMutationVariables = Exact<{
  token: string;
  password: string;
}>;

export type ResetPasswordMutation = {
  resetPassword: {
    id: string | null;
    email: string;
    name: string;
    role: string;
    workspace: { id: string; name: string };
  };
};

export type ChangePasswordMutationVariables = Exact<{
  currentPassword: string;
  newPassword: string;
}>;

export type ChangePasswordMutation = { changePassword: boolean };

export type AuditLogQueryVariables = Exact<{
  filter?: AuditFilterInput | null | undefined;
  first?: number | null | undefined;
  after?: string | null | undefined;
}>;

export type AuditLogQuery = {
  auditLog: {
    hasMore: boolean;
    endCursor: string | null;
    items: Array<{
      id: string;
      actorKind: string;
      actorId: string;
      actorName: string;
      action: string;
      targetKind: string;
      targetId: string;
      details: string;
      ip: string;
      createdAt: string;
    }>;
  };
};

export type GlossaryTermFieldsFragment = {
  id: string;
  term: string;
  language: string;
  enabled: boolean;
  note: string;
  isPhrase: boolean;
  heard: number;
  lastHeardAt: string | null;
};

export type SpellingFieldsFragment = {
  id: string;
  source: string;
  target: string;
  isPhrase: boolean;
  enabled: boolean;
  applied: number;
  lastAppliedAt: string | null;
  examples: Array<{
    recordingId: string;
    segmentIndex: number;
    before: string;
    after: string;
    heardAt: string | null;
  }>;
};

export type GlossaryQueryVariables = Exact<{ [key: string]: never }>;

export type GlossaryQuery = {
  glossary: Array<{
    id: string;
    term: string;
    language: string;
    enabled: boolean;
    note: string;
    isPhrase: boolean;
    heard: number;
    lastHeardAt: string | null;
  }>;
};

export type UpsertGlossaryTermMutationVariables = Exact<{
  input: GlossaryTermInput;
}>;

export type UpsertGlossaryTermMutation = {
  upsertGlossaryTerm: {
    id: string;
    term: string;
    language: string;
    enabled: boolean;
    note: string;
    isPhrase: boolean;
    heard: number;
    lastHeardAt: string | null;
  };
};

export type DeleteGlossaryTermMutationVariables = Exact<{
  id: string;
}>;

export type DeleteGlossaryTermMutation = { deleteGlossaryTerm: boolean };

export type ImportGlossaryCsvMutationVariables = Exact<{
  csv: string;
}>;

export type ImportGlossaryCsvMutation = { importGlossaryCsv: { added: number; updated: number } };

export type GlossaryCsvQueryVariables = Exact<{ [key: string]: never }>;

export type GlossaryCsvQuery = { glossaryCsv: string };

export type SpellingsQueryVariables = Exact<{ [key: string]: never }>;

export type SpellingsQuery = {
  spellings: Array<{
    id: string;
    source: string;
    target: string;
    isPhrase: boolean;
    enabled: boolean;
    applied: number;
    lastAppliedAt: string | null;
    examples: Array<{
      recordingId: string;
      segmentIndex: number;
      before: string;
      after: string;
      heardAt: string | null;
    }>;
  }>;
};

export type UpsertSpellingMutationVariables = Exact<{
  input: SpellingInput;
}>;

export type UpsertSpellingMutation = {
  upsertSpelling: {
    id: string;
    source: string;
    target: string;
    isPhrase: boolean;
    enabled: boolean;
    applied: number;
    lastAppliedAt: string | null;
    examples: Array<{
      recordingId: string;
      segmentIndex: number;
      before: string;
      after: string;
      heardAt: string | null;
    }>;
  };
};

export type DeleteSpellingMutationVariables = Exact<{
  id: string;
}>;

export type DeleteSpellingMutation = { deleteSpelling: boolean };

export type ImportSpellingsCsvMutationVariables = Exact<{
  csv: string;
}>;

export type ImportSpellingsCsvMutation = { importSpellingsCsv: { added: number; updated: number } };

export type SpellingsCsvQueryVariables = Exact<{ [key: string]: never }>;

export type SpellingsCsvQuery = { spellingsCsv: string };

export const ImportFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ImportFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Import' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'source' } },
          { kind: 'Field', name: { kind: 'Name', value: 'externalId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'transcribe' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          { kind: 'Field', name: { kind: 'Name', value: 'recordingId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'reason' } },
          { kind: 'Field', name: { kind: 'Name', value: 'code' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ImportFieldsFragment, unknown>;
export const InsightsFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'InsightsFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Insights' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'transcriptId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'recordingId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'transcriptVersion' } },
          { kind: 'Field', name: { kind: 'Name', value: 'summary' } },
          { kind: 'Field', name: { kind: 'Name', value: 'intent' } },
          { kind: 'Field', name: { kind: 'Name', value: 'products' } },
          { kind: 'Field', name: { kind: 'Name', value: 'sentiment' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'checks' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'key' } },
                { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                { kind: 'Field', name: { kind: 'Name', value: 'answer' } },
                { kind: 'Field', name: { kind: 'Name', value: 'evidence' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'scores' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'key' } },
                { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                { kind: 'Field', name: { kind: 'Name', value: 'score' } },
                { kind: 'Field', name: { kind: 'Name', value: 'max' } },
                { kind: 'Field', name: { kind: 'Name', value: 'reason' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'scoreTotal' } },
          { kind: 'Field', name: { kind: 'Name', value: 'scoreMax' } },
          { kind: 'Field', name: { kind: 'Name', value: 'model' } },
          { kind: 'Field', name: { kind: 'Name', value: 'inputTokens' } },
          { kind: 'Field', name: { kind: 'Name', value: 'outputTokens' } },
          { kind: 'Field', name: { kind: 'Name', value: 'formVersion' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<InsightsFieldsFragment, unknown>;
export const RecordingFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'RecordingFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Recording' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'originalName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'mediaId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'sizeBytes' } },
          { kind: 'Field', name: { kind: 'Name', value: 'sha256' } },
          { kind: 'Field', name: { kind: 'Name', value: 'durationSeconds' } },
          { kind: 'Field', name: { kind: 'Name', value: 'channels' } },
          { kind: 'Field', name: { kind: 'Name', value: 'sampleRate' } },
          { kind: 'Field', name: { kind: 'Name', value: 'source' } },
          { kind: 'Field', name: { kind: 'Name', value: 'externalId' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'attributes' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'key' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          { kind: 'Field', name: { kind: 'Name', value: 'failureReason' } },
          { kind: 'Field', name: { kind: 'Name', value: 'latestTranscriptId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'detectedLanguage' } },
          { kind: 'Field', name: { kind: 'Name', value: 'languageProbability' } },
          { kind: 'Field', name: { kind: 'Name', value: 'callTime' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RecordingFieldsFragment, unknown>;
export const JobFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'JobFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Job' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'recordingId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          { kind: 'Field', name: { kind: 'Name', value: 'modelRegistryId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'languagePolicy' } },
          { kind: 'Field', name: { kind: 'Name', value: 'force' } },
          { kind: 'Field', name: { kind: 'Name', value: 'progressSeconds' } },
          { kind: 'Field', name: { kind: 'Name', value: 'totalSeconds' } },
          { kind: 'Field', name: { kind: 'Name', value: 'errorCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'errorMessage' } },
          { kind: 'Field', name: { kind: 'Name', value: 'transcriptId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'startedAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'finishedAt' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<JobFieldsFragment, unknown>;
export const SavedSearchFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SavedSearchFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'SavedSearch' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'query' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'filter' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'language' } },
                { kind: 'Field', name: { kind: 'Name', value: 'recordingId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'campaign' } },
                { kind: 'Field', name: { kind: 'Name', value: 'agent' } },
                { kind: 'Field', name: { kind: 'Name', value: 'disposition' } },
                { kind: 'Field', name: { kind: 'Name', value: 'source' } },
                { kind: 'Field', name: { kind: 'Name', value: 'since' } },
                { kind: 'Field', name: { kind: 'Name', value: 'until' } },
                { kind: 'Field', name: { kind: 'Name', value: 'callSince' } },
                { kind: 'Field', name: { kind: 'Name', value: 'callUntil' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'createdBy' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SavedSearchFieldsFragment, unknown>;
export const TranscriptFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'TranscriptFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Transcript' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'recordingId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'jobId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'version' } },
          { kind: 'Field', name: { kind: 'Name', value: 'modelRegistryId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'engine' } },
          { kind: 'Field', name: { kind: 'Name', value: 'compute' } },
          { kind: 'Field', name: { kind: 'Name', value: 'script' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'language' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'detected' } },
                { kind: 'Field', name: { kind: 'Name', value: 'probability' } },
                { kind: 'Field', name: { kind: 'Name', value: 'decodedAs' } },
                { kind: 'Field', name: { kind: 'Name', value: 'policy' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'candidates' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'language' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'probability' } },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'stats' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'audioSeconds' } },
                { kind: 'Field', name: { kind: 'Name', value: 'elapsedSeconds' } },
                { kind: 'Field', name: { kind: 'Name', value: 'realtimeFactor' } },
                { kind: 'Field', name: { kind: 'Name', value: 'chunks' } },
                { kind: 'Field', name: { kind: 'Name', value: 'silenceSkippedSeconds' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TranscriptFieldsFragment, unknown>;
export const CorrectionFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CorrectionFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Correction' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'recordingId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'transcriptId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'correctedTranscriptId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'segmentIndex' } },
          { kind: 'Field', name: { kind: 'Name', value: 'layer' } },
          { kind: 'Field', name: { kind: 'Name', value: 'before' } },
          { kind: 'Field', name: { kind: 'Name', value: 'after' } },
          { kind: 'Field', name: { kind: 'Name', value: 'userId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CorrectionFieldsFragment, unknown>;
export const UserFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'UserFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'User' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'role' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'disabledAt' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UserFieldsFragment, unknown>;
export const InvitationFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'InvitationFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Invitation' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'role' } },
          { kind: 'Field', name: { kind: 'Name', value: 'invitedBy' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'expiresAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'acceptedAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'revokedAt' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<InvitationFieldsFragment, unknown>;
export const GlossaryTermFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'GlossaryTermFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'GlossaryTerm' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'term' } },
          { kind: 'Field', name: { kind: 'Name', value: 'language' } },
          { kind: 'Field', name: { kind: 'Name', value: 'enabled' } },
          { kind: 'Field', name: { kind: 'Name', value: 'note' } },
          { kind: 'Field', name: { kind: 'Name', value: 'isPhrase' } },
          { kind: 'Field', name: { kind: 'Name', value: 'heard' } },
          { kind: 'Field', name: { kind: 'Name', value: 'lastHeardAt' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GlossaryTermFieldsFragment, unknown>;
export const SpellingFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SpellingFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Spelling' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'source' } },
          { kind: 'Field', name: { kind: 'Name', value: 'target' } },
          { kind: 'Field', name: { kind: 'Name', value: 'isPhrase' } },
          { kind: 'Field', name: { kind: 'Name', value: 'enabled' } },
          { kind: 'Field', name: { kind: 'Name', value: 'applied' } },
          { kind: 'Field', name: { kind: 'Name', value: 'lastAppliedAt' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'examples' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'recordingId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'segmentIndex' } },
                { kind: 'Field', name: { kind: 'Name', value: 'before' } },
                { kind: 'Field', name: { kind: 'Name', value: 'after' } },
                { kind: 'Field', name: { kind: 'Name', value: 'heardAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SpellingFieldsFragment, unknown>;
export const MeDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Me' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'me' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'role' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'workspace' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const LoginDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'Login' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'email' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'password' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'login' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'email' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'email' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'password' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'password' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'role' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'workspace' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'Logout' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [{ kind: 'Field', name: { kind: 'Name', value: 'logout' } }],
      },
    },
  ],
} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const SettingsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Settings' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'settings' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'autoTranscribe' } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SettingsQuery, SettingsQueryVariables>;
export const UpdateSettingsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateSettings' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'autoTranscribe' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateSettings' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'autoTranscribe' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'autoTranscribe' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'autoTranscribe' } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateSettingsMutation, UpdateSettingsMutationVariables>;
export const ApiKeysDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'ApiKeys' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'apiKeys' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'lastUsedAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'revokedAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ApiKeysQuery, ApiKeysQueryVariables>;
export const CreateApiKeyDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateApiKey' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createApiKey' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'name' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'key' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateApiKeyMutation, CreateApiKeyMutationVariables>;
export const RevokeApiKeyDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'RevokeApiKey' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'revokeApiKey' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RevokeApiKeyMutation, RevokeApiKeyMutationVariables>;
export const AnalyticsOverviewDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'AnalyticsOverview' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'since' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'DateTime' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'until' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'DateTime' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'facts' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'AnalyticsFacts' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'analyticsOverview' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'since' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'since' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'until' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'until' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'facts' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'facts' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'calls' } },
                { kind: 'Field', name: { kind: 'Name', value: 'transcribed' } },
                { kind: 'Field', name: { kind: 'Name', value: 'failed' } },
                { kind: 'Field', name: { kind: 'Name', value: 'minutes' } },
                { kind: 'Field', name: { kind: 'Name', value: 'realtimeFactor' } },
                { kind: 'Field', name: { kind: 'Name', value: 'analysed' } },
                { kind: 'Field', name: { kind: 'Name', value: 'score' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'sentiments' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'key' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'count' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'languages' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'key' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'count' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AnalyticsOverviewQuery, AnalyticsOverviewQueryVariables>;
export const AnalyticsTimeseriesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'AnalyticsTimeseries' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'metric' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'AnalyticsMetric' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'bucket' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'AnalyticsBucket' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'since' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'DateTime' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'until' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'DateTime' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'facts' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'AnalyticsFacts' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'analyticsTimeseries' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'metric' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'metric' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'bucket' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'bucket' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'since' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'since' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'until' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'until' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'facts' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'facts' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'at' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AnalyticsTimeseriesQuery, AnalyticsTimeseriesQueryVariables>;
export const AnalyticsBreakdownDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'AnalyticsBreakdown' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'by' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'AnalyticsDimension' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'since' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'DateTime' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'until' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'DateTime' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'facts' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'AnalyticsFacts' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'analyticsBreakdown' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'by' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'by' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'since' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'since' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'until' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'until' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'facts' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'facts' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'key' } },
                { kind: 'Field', name: { kind: 'Name', value: 'calls' } },
                { kind: 'Field', name: { kind: 'Name', value: 'transcribed' } },
                { kind: 'Field', name: { kind: 'Name', value: 'minutes' } },
                { kind: 'Field', name: { kind: 'Name', value: 'analysed' } },
                { kind: 'Field', name: { kind: 'Name', value: 'score' } },
                { kind: 'Field', name: { kind: 'Name', value: 'negative' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AnalyticsBreakdownQuery, AnalyticsBreakdownQueryVariables>;
export const RequestImportDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'RequestImport' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'RequestImportInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'requestImport' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'ImportFields' } }],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ImportFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Import' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'source' } },
          { kind: 'Field', name: { kind: 'Name', value: 'externalId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'transcribe' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          { kind: 'Field', name: { kind: 'Name', value: 'recordingId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'reason' } },
          { kind: 'Field', name: { kind: 'Name', value: 'code' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RequestImportMutation, RequestImportMutationVariables>;
export const ImportsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Imports' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'status' } },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: { kind: 'NamedType', name: { kind: 'Name', value: 'ImportStatus' } },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'first' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'after' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'imports' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'status' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'status' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'first' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'first' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'after' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'after' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'items' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'ImportFields' } }],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'hasMore' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ImportFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Import' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'source' } },
          { kind: 'Field', name: { kind: 'Name', value: 'externalId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'transcribe' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          { kind: 'Field', name: { kind: 'Name', value: 'recordingId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'reason' } },
          { kind: 'Field', name: { kind: 'Name', value: 'code' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ImportsQuery, ImportsQueryVariables>;
export const ImportDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Import' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'import' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'ImportFields' } }],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ImportFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Import' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'source' } },
          { kind: 'Field', name: { kind: 'Name', value: 'externalId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'transcribe' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          { kind: 'Field', name: { kind: 'Name', value: 'recordingId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'reason' } },
          { kind: 'Field', name: { kind: 'Name', value: 'code' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ImportQuery, ImportQueryVariables>;
export const InsightsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Insights' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'recordingId' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'insights' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'recordingId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'recordingId' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'InsightsFields' } }],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'InsightsFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Insights' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'transcriptId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'recordingId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'transcriptVersion' } },
          { kind: 'Field', name: { kind: 'Name', value: 'summary' } },
          { kind: 'Field', name: { kind: 'Name', value: 'intent' } },
          { kind: 'Field', name: { kind: 'Name', value: 'products' } },
          { kind: 'Field', name: { kind: 'Name', value: 'sentiment' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'checks' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'key' } },
                { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                { kind: 'Field', name: { kind: 'Name', value: 'answer' } },
                { kind: 'Field', name: { kind: 'Name', value: 'evidence' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'scores' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'key' } },
                { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                { kind: 'Field', name: { kind: 'Name', value: 'score' } },
                { kind: 'Field', name: { kind: 'Name', value: 'max' } },
                { kind: 'Field', name: { kind: 'Name', value: 'reason' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'scoreTotal' } },
          { kind: 'Field', name: { kind: 'Name', value: 'scoreMax' } },
          { kind: 'Field', name: { kind: 'Name', value: 'model' } },
          { kind: 'Field', name: { kind: 'Name', value: 'inputTokens' } },
          { kind: 'Field', name: { kind: 'Name', value: 'outputTokens' } },
          { kind: 'Field', name: { kind: 'Name', value: 'formVersion' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<InsightsQuery, InsightsQueryVariables>;
export const RecordingsWithInsightsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'RecordingsWithInsights' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'RecordingFilter' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'first' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'after' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'recordings' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filter' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'first' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'first' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'after' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'after' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'items' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'RecordingFields' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'insights' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'FragmentSpread', name: { kind: 'Name', value: 'InsightsFields' } },
                          ],
                        },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'hasMore' } },
                { kind: 'Field', name: { kind: 'Name', value: 'endCursor' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'RecordingFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Recording' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'originalName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'mediaId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'sizeBytes' } },
          { kind: 'Field', name: { kind: 'Name', value: 'sha256' } },
          { kind: 'Field', name: { kind: 'Name', value: 'durationSeconds' } },
          { kind: 'Field', name: { kind: 'Name', value: 'channels' } },
          { kind: 'Field', name: { kind: 'Name', value: 'sampleRate' } },
          { kind: 'Field', name: { kind: 'Name', value: 'source' } },
          { kind: 'Field', name: { kind: 'Name', value: 'externalId' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'attributes' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'key' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          { kind: 'Field', name: { kind: 'Name', value: 'failureReason' } },
          { kind: 'Field', name: { kind: 'Name', value: 'latestTranscriptId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'detectedLanguage' } },
          { kind: 'Field', name: { kind: 'Name', value: 'languageProbability' } },
          { kind: 'Field', name: { kind: 'Name', value: 'callTime' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'InsightsFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Insights' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'transcriptId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'recordingId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'transcriptVersion' } },
          { kind: 'Field', name: { kind: 'Name', value: 'summary' } },
          { kind: 'Field', name: { kind: 'Name', value: 'intent' } },
          { kind: 'Field', name: { kind: 'Name', value: 'products' } },
          { kind: 'Field', name: { kind: 'Name', value: 'sentiment' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'checks' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'key' } },
                { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                { kind: 'Field', name: { kind: 'Name', value: 'answer' } },
                { kind: 'Field', name: { kind: 'Name', value: 'evidence' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'scores' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'key' } },
                { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                { kind: 'Field', name: { kind: 'Name', value: 'score' } },
                { kind: 'Field', name: { kind: 'Name', value: 'max' } },
                { kind: 'Field', name: { kind: 'Name', value: 'reason' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'scoreTotal' } },
          { kind: 'Field', name: { kind: 'Name', value: 'scoreMax' } },
          { kind: 'Field', name: { kind: 'Name', value: 'model' } },
          { kind: 'Field', name: { kind: 'Name', value: 'inputTokens' } },
          { kind: 'Field', name: { kind: 'Name', value: 'outputTokens' } },
          { kind: 'Field', name: { kind: 'Name', value: 'formVersion' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RecordingsWithInsightsQuery, RecordingsWithInsightsQueryVariables>;
export const InsightsStatusDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'InsightsStatus' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'insightsStatus' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'enabled' } },
                { kind: 'Field', name: { kind: 'Name', value: 'model' } },
                { kind: 'Field', name: { kind: 'Name', value: 'formVersion' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<InsightsStatusQuery, InsightsStatusQueryVariables>;
export const AnalyseRecordingDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AnalyseRecording' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'force' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'analyseRecording' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'force' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'force' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'InsightsFields' } }],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'InsightsFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Insights' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'transcriptId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'recordingId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'transcriptVersion' } },
          { kind: 'Field', name: { kind: 'Name', value: 'summary' } },
          { kind: 'Field', name: { kind: 'Name', value: 'intent' } },
          { kind: 'Field', name: { kind: 'Name', value: 'products' } },
          { kind: 'Field', name: { kind: 'Name', value: 'sentiment' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'checks' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'key' } },
                { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                { kind: 'Field', name: { kind: 'Name', value: 'answer' } },
                { kind: 'Field', name: { kind: 'Name', value: 'evidence' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'scores' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'key' } },
                { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                { kind: 'Field', name: { kind: 'Name', value: 'score' } },
                { kind: 'Field', name: { kind: 'Name', value: 'max' } },
                { kind: 'Field', name: { kind: 'Name', value: 'reason' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'scoreTotal' } },
          { kind: 'Field', name: { kind: 'Name', value: 'scoreMax' } },
          { kind: 'Field', name: { kind: 'Name', value: 'model' } },
          { kind: 'Field', name: { kind: 'Name', value: 'inputTokens' } },
          { kind: 'Field', name: { kind: 'Name', value: 'outputTokens' } },
          { kind: 'Field', name: { kind: 'Name', value: 'formVersion' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AnalyseRecordingMutation, AnalyseRecordingMutationVariables>;
export const RecordingFacetsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'RecordingFacets' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'key' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'RecordingFilter' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'recordingFacets' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'key' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'key' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filter' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                { kind: 'Field', name: { kind: 'Name', value: 'count' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RecordingFacetsQuery, RecordingFacetsQueryVariables>;
export const RecordingsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Recordings' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'RecordingFilter' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'first' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'after' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'recordings' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filter' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'first' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'first' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'after' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'after' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'items' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'RecordingFields' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'jobs' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'FragmentSpread', name: { kind: 'Name', value: 'JobFields' } },
                          ],
                        },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'hasMore' } },
                { kind: 'Field', name: { kind: 'Name', value: 'endCursor' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'RecordingFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Recording' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'originalName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'mediaId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'sizeBytes' } },
          { kind: 'Field', name: { kind: 'Name', value: 'sha256' } },
          { kind: 'Field', name: { kind: 'Name', value: 'durationSeconds' } },
          { kind: 'Field', name: { kind: 'Name', value: 'channels' } },
          { kind: 'Field', name: { kind: 'Name', value: 'sampleRate' } },
          { kind: 'Field', name: { kind: 'Name', value: 'source' } },
          { kind: 'Field', name: { kind: 'Name', value: 'externalId' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'attributes' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'key' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          { kind: 'Field', name: { kind: 'Name', value: 'failureReason' } },
          { kind: 'Field', name: { kind: 'Name', value: 'latestTranscriptId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'detectedLanguage' } },
          { kind: 'Field', name: { kind: 'Name', value: 'languageProbability' } },
          { kind: 'Field', name: { kind: 'Name', value: 'callTime' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'JobFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Job' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'recordingId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          { kind: 'Field', name: { kind: 'Name', value: 'modelRegistryId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'languagePolicy' } },
          { kind: 'Field', name: { kind: 'Name', value: 'force' } },
          { kind: 'Field', name: { kind: 'Name', value: 'progressSeconds' } },
          { kind: 'Field', name: { kind: 'Name', value: 'totalSeconds' } },
          { kind: 'Field', name: { kind: 'Name', value: 'errorCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'errorMessage' } },
          { kind: 'Field', name: { kind: 'Name', value: 'transcriptId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'startedAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'finishedAt' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RecordingsQuery, RecordingsQueryVariables>;
export const RecordingCountsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'RecordingCounts' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'recordingCounts' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'uploading' } },
                { kind: 'Field', name: { kind: 'Name', value: 'uploaded' } },
                { kind: 'Field', name: { kind: 'Name', value: 'ready' } },
                { kind: 'Field', name: { kind: 'Name', value: 'failed' } },
                { kind: 'Field', name: { kind: 'Name', value: 'queued' } },
                { kind: 'Field', name: { kind: 'Name', value: 'transcribing' } },
                { kind: 'Field', name: { kind: 'Name', value: 'done' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RecordingCountsQuery, RecordingCountsQueryVariables>;
export const RecordingDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Recording' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'recording' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'RecordingFields' } },
                { kind: 'Field', name: { kind: 'Name', value: 'playbackUrl' } },
                { kind: 'Field', name: { kind: 'Name', value: 'peaksUrl' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'jobs' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'JobFields' } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'RecordingFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Recording' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'originalName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'mediaId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'sizeBytes' } },
          { kind: 'Field', name: { kind: 'Name', value: 'sha256' } },
          { kind: 'Field', name: { kind: 'Name', value: 'durationSeconds' } },
          { kind: 'Field', name: { kind: 'Name', value: 'channels' } },
          { kind: 'Field', name: { kind: 'Name', value: 'sampleRate' } },
          { kind: 'Field', name: { kind: 'Name', value: 'source' } },
          { kind: 'Field', name: { kind: 'Name', value: 'externalId' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'attributes' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'key' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          { kind: 'Field', name: { kind: 'Name', value: 'failureReason' } },
          { kind: 'Field', name: { kind: 'Name', value: 'latestTranscriptId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'detectedLanguage' } },
          { kind: 'Field', name: { kind: 'Name', value: 'languageProbability' } },
          { kind: 'Field', name: { kind: 'Name', value: 'callTime' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'JobFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Job' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'recordingId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          { kind: 'Field', name: { kind: 'Name', value: 'modelRegistryId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'languagePolicy' } },
          { kind: 'Field', name: { kind: 'Name', value: 'force' } },
          { kind: 'Field', name: { kind: 'Name', value: 'progressSeconds' } },
          { kind: 'Field', name: { kind: 'Name', value: 'totalSeconds' } },
          { kind: 'Field', name: { kind: 'Name', value: 'errorCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'errorMessage' } },
          { kind: 'Field', name: { kind: 'Name', value: 'transcriptId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'startedAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'finishedAt' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RecordingQuery, RecordingQueryVariables>;
export const RequestUploadDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'RequestUpload' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'RequestUploadInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'requestUpload' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'uploadUrl' } },
                { kind: 'Field', name: { kind: 'Name', value: 'expiresAt' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'recording' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'RecordingFields' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'duplicateOf' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'originalName' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'RecordingFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Recording' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'originalName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'mediaId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'sizeBytes' } },
          { kind: 'Field', name: { kind: 'Name', value: 'sha256' } },
          { kind: 'Field', name: { kind: 'Name', value: 'durationSeconds' } },
          { kind: 'Field', name: { kind: 'Name', value: 'channels' } },
          { kind: 'Field', name: { kind: 'Name', value: 'sampleRate' } },
          { kind: 'Field', name: { kind: 'Name', value: 'source' } },
          { kind: 'Field', name: { kind: 'Name', value: 'externalId' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'attributes' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'key' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          { kind: 'Field', name: { kind: 'Name', value: 'failureReason' } },
          { kind: 'Field', name: { kind: 'Name', value: 'latestTranscriptId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'detectedLanguage' } },
          { kind: 'Field', name: { kind: 'Name', value: 'languageProbability' } },
          { kind: 'Field', name: { kind: 'Name', value: 'callTime' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RequestUploadMutation, RequestUploadMutationVariables>;
export const DeleteRecordingDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'DeleteRecording' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deleteRecording' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeleteRecordingMutation, DeleteRecordingMutationVariables>;
export const JobsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Jobs' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'recordingId' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'status' } },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: { kind: 'NamedType', name: { kind: 'Name', value: 'JobStatus' } },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'jobs' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'recordingId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'recordingId' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'status' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'status' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'JobFields' } }],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'JobFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Job' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'recordingId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          { kind: 'Field', name: { kind: 'Name', value: 'modelRegistryId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'languagePolicy' } },
          { kind: 'Field', name: { kind: 'Name', value: 'force' } },
          { kind: 'Field', name: { kind: 'Name', value: 'progressSeconds' } },
          { kind: 'Field', name: { kind: 'Name', value: 'totalSeconds' } },
          { kind: 'Field', name: { kind: 'Name', value: 'errorCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'errorMessage' } },
          { kind: 'Field', name: { kind: 'Name', value: 'transcriptId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'startedAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'finishedAt' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<JobsQuery, JobsQueryVariables>;
export const CreateJobDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateJob' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'CreateJobInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createJob' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'JobFields' } }],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'JobFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Job' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'recordingId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          { kind: 'Field', name: { kind: 'Name', value: 'modelRegistryId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'languagePolicy' } },
          { kind: 'Field', name: { kind: 'Name', value: 'force' } },
          { kind: 'Field', name: { kind: 'Name', value: 'progressSeconds' } },
          { kind: 'Field', name: { kind: 'Name', value: 'totalSeconds' } },
          { kind: 'Field', name: { kind: 'Name', value: 'errorCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'errorMessage' } },
          { kind: 'Field', name: { kind: 'Name', value: 'transcriptId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'startedAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'finishedAt' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateJobMutation, CreateJobMutationVariables>;
export const CancelJobDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CancelJob' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'cancelJob' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'JobFields' } }],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'JobFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Job' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'recordingId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          { kind: 'Field', name: { kind: 'Name', value: 'modelRegistryId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'languagePolicy' } },
          { kind: 'Field', name: { kind: 'Name', value: 'force' } },
          { kind: 'Field', name: { kind: 'Name', value: 'progressSeconds' } },
          { kind: 'Field', name: { kind: 'Name', value: 'totalSeconds' } },
          { kind: 'Field', name: { kind: 'Name', value: 'errorCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'errorMessage' } },
          { kind: 'Field', name: { kind: 'Name', value: 'transcriptId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'startedAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'finishedAt' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CancelJobMutation, CancelJobMutationVariables>;
export const SearchDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Search' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'query' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'SearchFilter' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'page' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'pageSize' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'search' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'query' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'query' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filter' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'page' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'page' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'pageSize' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'pageSize' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                { kind: 'Field', name: { kind: 'Name', value: 'page' } },
                { kind: 'Field', name: { kind: 'Name', value: 'pageSize' } },
                { kind: 'Field', name: { kind: 'Name', value: 'processingMs' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'hits' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'recording' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'FragmentSpread', name: { kind: 'Name', value: 'RecordingFields' } },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'transcriptId' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'segmentIndex' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'startSeconds' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'endSeconds' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'textRoman' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'textScript' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'highlightRoman' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'highlightScript' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'language' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'RecordingFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Recording' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'originalName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'mediaId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'sizeBytes' } },
          { kind: 'Field', name: { kind: 'Name', value: 'sha256' } },
          { kind: 'Field', name: { kind: 'Name', value: 'durationSeconds' } },
          { kind: 'Field', name: { kind: 'Name', value: 'channels' } },
          { kind: 'Field', name: { kind: 'Name', value: 'sampleRate' } },
          { kind: 'Field', name: { kind: 'Name', value: 'source' } },
          { kind: 'Field', name: { kind: 'Name', value: 'externalId' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'attributes' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'key' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          { kind: 'Field', name: { kind: 'Name', value: 'failureReason' } },
          { kind: 'Field', name: { kind: 'Name', value: 'latestTranscriptId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'detectedLanguage' } },
          { kind: 'Field', name: { kind: 'Name', value: 'languageProbability' } },
          { kind: 'Field', name: { kind: 'Name', value: 'callTime' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SearchQuery, SearchQueryVariables>;
export const SavedSearchesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'SavedSearches' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'savedSearches' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'SavedSearchFields' } }],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SavedSearchFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'SavedSearch' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'query' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'filter' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'language' } },
                { kind: 'Field', name: { kind: 'Name', value: 'recordingId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'campaign' } },
                { kind: 'Field', name: { kind: 'Name', value: 'agent' } },
                { kind: 'Field', name: { kind: 'Name', value: 'disposition' } },
                { kind: 'Field', name: { kind: 'Name', value: 'source' } },
                { kind: 'Field', name: { kind: 'Name', value: 'since' } },
                { kind: 'Field', name: { kind: 'Name', value: 'until' } },
                { kind: 'Field', name: { kind: 'Name', value: 'callSince' } },
                { kind: 'Field', name: { kind: 'Name', value: 'callUntil' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'createdBy' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SavedSearchesQuery, SavedSearchesQueryVariables>;
export const SaveSearchDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'SaveSearch' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'SaveSearchInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'saveSearch' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'SavedSearchFields' } }],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SavedSearchFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'SavedSearch' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'query' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'filter' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'language' } },
                { kind: 'Field', name: { kind: 'Name', value: 'recordingId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'campaign' } },
                { kind: 'Field', name: { kind: 'Name', value: 'agent' } },
                { kind: 'Field', name: { kind: 'Name', value: 'disposition' } },
                { kind: 'Field', name: { kind: 'Name', value: 'source' } },
                { kind: 'Field', name: { kind: 'Name', value: 'since' } },
                { kind: 'Field', name: { kind: 'Name', value: 'until' } },
                { kind: 'Field', name: { kind: 'Name', value: 'callSince' } },
                { kind: 'Field', name: { kind: 'Name', value: 'callUntil' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'createdBy' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SaveSearchMutation, SaveSearchMutationVariables>;
export const DeleteSavedSearchDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'DeleteSavedSearch' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deleteSavedSearch' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeleteSavedSearchMutation, DeleteSavedSearchMutationVariables>;
export const TranscriptDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Transcript' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'transcript' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'TranscriptFields' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'segments' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'index' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'startSeconds' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'endSeconds' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'textScript' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'textRoman' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'TranscriptFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Transcript' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'recordingId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'jobId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'version' } },
          { kind: 'Field', name: { kind: 'Name', value: 'modelRegistryId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'engine' } },
          { kind: 'Field', name: { kind: 'Name', value: 'compute' } },
          { kind: 'Field', name: { kind: 'Name', value: 'script' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'language' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'detected' } },
                { kind: 'Field', name: { kind: 'Name', value: 'probability' } },
                { kind: 'Field', name: { kind: 'Name', value: 'decodedAs' } },
                { kind: 'Field', name: { kind: 'Name', value: 'policy' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'candidates' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'language' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'probability' } },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'stats' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'audioSeconds' } },
                { kind: 'Field', name: { kind: 'Name', value: 'elapsedSeconds' } },
                { kind: 'Field', name: { kind: 'Name', value: 'realtimeFactor' } },
                { kind: 'Field', name: { kind: 'Name', value: 'chunks' } },
                { kind: 'Field', name: { kind: 'Name', value: 'silenceSkippedSeconds' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TranscriptQuery, TranscriptQueryVariables>;
export const TranscriptVersionsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'TranscriptVersions' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'recordingId' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'transcriptVersions' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'recordingId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'recordingId' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'TranscriptFields' } }],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'TranscriptFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Transcript' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'recordingId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'jobId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'version' } },
          { kind: 'Field', name: { kind: 'Name', value: 'modelRegistryId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'engine' } },
          { kind: 'Field', name: { kind: 'Name', value: 'compute' } },
          { kind: 'Field', name: { kind: 'Name', value: 'script' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'language' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'detected' } },
                { kind: 'Field', name: { kind: 'Name', value: 'probability' } },
                { kind: 'Field', name: { kind: 'Name', value: 'decodedAs' } },
                { kind: 'Field', name: { kind: 'Name', value: 'policy' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'candidates' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'language' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'probability' } },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'stats' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'audioSeconds' } },
                { kind: 'Field', name: { kind: 'Name', value: 'elapsedSeconds' } },
                { kind: 'Field', name: { kind: 'Name', value: 'realtimeFactor' } },
                { kind: 'Field', name: { kind: 'Name', value: 'chunks' } },
                { kind: 'Field', name: { kind: 'Name', value: 'silenceSkippedSeconds' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TranscriptVersionsQuery, TranscriptVersionsQueryVariables>;
export const RetransliterateDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'Retransliterate' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'transcriptId' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'retransliterate' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'transcriptId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'transcriptId' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'TranscriptFields' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'segments' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'index' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'startSeconds' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'endSeconds' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'textScript' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'textRoman' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'TranscriptFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Transcript' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'recordingId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'jobId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'version' } },
          { kind: 'Field', name: { kind: 'Name', value: 'modelRegistryId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'engine' } },
          { kind: 'Field', name: { kind: 'Name', value: 'compute' } },
          { kind: 'Field', name: { kind: 'Name', value: 'script' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'language' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'detected' } },
                { kind: 'Field', name: { kind: 'Name', value: 'probability' } },
                { kind: 'Field', name: { kind: 'Name', value: 'decodedAs' } },
                { kind: 'Field', name: { kind: 'Name', value: 'policy' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'candidates' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'language' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'probability' } },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'stats' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'audioSeconds' } },
                { kind: 'Field', name: { kind: 'Name', value: 'elapsedSeconds' } },
                { kind: 'Field', name: { kind: 'Name', value: 'realtimeFactor' } },
                { kind: 'Field', name: { kind: 'Name', value: 'chunks' } },
                { kind: 'Field', name: { kind: 'Name', value: 'silenceSkippedSeconds' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RetransliterateMutation, RetransliterateMutationVariables>;
export const EnginesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Engines' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'engines' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'registryId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'engine' } },
                { kind: 'Field', name: { kind: 'Name', value: 'available' } },
                { kind: 'Field', name: { kind: 'Name', value: 'isDefault' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<EnginesQuery, EnginesQueryVariables>;
export const CorrectSegmentDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CorrectSegment' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'CorrectSegmentInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'correctSegment' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'TranscriptFields' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'segments' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'index' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'startSeconds' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'endSeconds' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'textScript' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'textRoman' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'TranscriptFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Transcript' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'recordingId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'jobId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'version' } },
          { kind: 'Field', name: { kind: 'Name', value: 'modelRegistryId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'engine' } },
          { kind: 'Field', name: { kind: 'Name', value: 'compute' } },
          { kind: 'Field', name: { kind: 'Name', value: 'script' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'language' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'detected' } },
                { kind: 'Field', name: { kind: 'Name', value: 'probability' } },
                { kind: 'Field', name: { kind: 'Name', value: 'decodedAs' } },
                { kind: 'Field', name: { kind: 'Name', value: 'policy' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'candidates' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'language' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'probability' } },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'stats' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'audioSeconds' } },
                { kind: 'Field', name: { kind: 'Name', value: 'elapsedSeconds' } },
                { kind: 'Field', name: { kind: 'Name', value: 'realtimeFactor' } },
                { kind: 'Field', name: { kind: 'Name', value: 'chunks' } },
                { kind: 'Field', name: { kind: 'Name', value: 'silenceSkippedSeconds' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CorrectSegmentMutation, CorrectSegmentMutationVariables>;
export const CorrectionsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Corrections' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'recordingId' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'corrections' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'recordingId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'recordingId' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'CorrectionFields' } }],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CorrectionFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Correction' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'recordingId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'transcriptId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'correctedTranscriptId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'segmentIndex' } },
          { kind: 'Field', name: { kind: 'Name', value: 'layer' } },
          { kind: 'Field', name: { kind: 'Name', value: 'before' } },
          { kind: 'Field', name: { kind: 'Name', value: 'after' } },
          { kind: 'Field', name: { kind: 'Name', value: 'userId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CorrectionsQuery, CorrectionsQueryVariables>;
export const UsersDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Users' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'users' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'UserFields' } }],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'UserFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'User' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'role' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'disabledAt' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UsersQuery, UsersQueryVariables>;
export const InvitationsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Invitations' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'invitations' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'InvitationFields' } }],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'InvitationFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Invitation' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'role' } },
          { kind: 'Field', name: { kind: 'Name', value: 'invitedBy' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'expiresAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'acceptedAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'revokedAt' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<InvitationsQuery, InvitationsQueryVariables>;
export const InviteUserDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'InviteUser' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'InviteUserInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'inviteUser' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'invitation' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'InvitationFields' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'link' } },
                { kind: 'Field', name: { kind: 'Name', value: 'sent' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'InvitationFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Invitation' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'role' } },
          { kind: 'Field', name: { kind: 'Name', value: 'invitedBy' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'expiresAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'acceptedAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'revokedAt' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<InviteUserMutation, InviteUserMutationVariables>;
export const RevokeInvitationDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'RevokeInvitation' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'revokeInvitation' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RevokeInvitationMutation, RevokeInvitationMutationVariables>;
export const SetUserRoleDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'SetUserRole' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'userId' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'role' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Role' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'setUserRole' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'userId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'userId' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'role' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'role' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'UserFields' } }],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'UserFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'User' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'role' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'disabledAt' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SetUserRoleMutation, SetUserRoleMutationVariables>;
export const DisableUserDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'DisableUser' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'userId' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'disableUser' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'userId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'userId' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'UserFields' } }],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'UserFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'User' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'role' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'disabledAt' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DisableUserMutation, DisableUserMutationVariables>;
export const EnableUserDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'EnableUser' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'userId' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'enableUser' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'userId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'userId' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'UserFields' } }],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'UserFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'User' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'role' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'disabledAt' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<EnableUserMutation, EnableUserMutationVariables>;
export const InvitationDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Invitation' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'token' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'invitation' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'token' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'token' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'role' } },
                { kind: 'Field', name: { kind: 'Name', value: 'workspace' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<InvitationQuery, InvitationQueryVariables>;
export const AcceptInvitationDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AcceptInvitation' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'token' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'password' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'acceptInvitation' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'token' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'token' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'name' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'password' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'password' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'role' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'workspace' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AcceptInvitationMutation, AcceptInvitationMutationVariables>;
export const RequestPasswordResetDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'RequestPasswordReset' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'email' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'requestPasswordReset' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'email' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'email' } },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RequestPasswordResetMutation, RequestPasswordResetMutationVariables>;
export const ResetPasswordDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'ResetPassword' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'token' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'password' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'resetPassword' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'token' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'token' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'password' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'password' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'role' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'workspace' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const ChangePasswordDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'ChangePassword' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'currentPassword' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'newPassword' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'changePassword' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'currentPassword' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'currentPassword' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'newPassword' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'newPassword' } },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const AuditLogDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'AuditLog' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'AuditFilterInput' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'first' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'after' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'auditLog' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filter' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'first' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'first' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'after' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'after' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'items' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'actorKind' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'actorId' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'actorName' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'action' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'targetKind' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'targetId' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'details' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'ip' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'hasMore' } },
                { kind: 'Field', name: { kind: 'Name', value: 'endCursor' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AuditLogQuery, AuditLogQueryVariables>;
export const GlossaryDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Glossary' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'glossary' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'GlossaryTermFields' } }],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'GlossaryTermFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'GlossaryTerm' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'term' } },
          { kind: 'Field', name: { kind: 'Name', value: 'language' } },
          { kind: 'Field', name: { kind: 'Name', value: 'enabled' } },
          { kind: 'Field', name: { kind: 'Name', value: 'note' } },
          { kind: 'Field', name: { kind: 'Name', value: 'isPhrase' } },
          { kind: 'Field', name: { kind: 'Name', value: 'heard' } },
          { kind: 'Field', name: { kind: 'Name', value: 'lastHeardAt' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GlossaryQuery, GlossaryQueryVariables>;
export const UpsertGlossaryTermDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpsertGlossaryTerm' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'GlossaryTermInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'upsertGlossaryTerm' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'GlossaryTermFields' } }],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'GlossaryTermFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'GlossaryTerm' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'term' } },
          { kind: 'Field', name: { kind: 'Name', value: 'language' } },
          { kind: 'Field', name: { kind: 'Name', value: 'enabled' } },
          { kind: 'Field', name: { kind: 'Name', value: 'note' } },
          { kind: 'Field', name: { kind: 'Name', value: 'isPhrase' } },
          { kind: 'Field', name: { kind: 'Name', value: 'heard' } },
          { kind: 'Field', name: { kind: 'Name', value: 'lastHeardAt' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpsertGlossaryTermMutation, UpsertGlossaryTermMutationVariables>;
export const DeleteGlossaryTermDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'DeleteGlossaryTerm' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deleteGlossaryTerm' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeleteGlossaryTermMutation, DeleteGlossaryTermMutationVariables>;
export const ImportGlossaryCsvDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'ImportGlossaryCsv' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'csv' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'importGlossaryCsv' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'csv' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'csv' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'added' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updated' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ImportGlossaryCsvMutation, ImportGlossaryCsvMutationVariables>;
export const GlossaryCsvDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GlossaryCsv' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [{ kind: 'Field', name: { kind: 'Name', value: 'glossaryCsv' } }],
      },
    },
  ],
} as unknown as DocumentNode<GlossaryCsvQuery, GlossaryCsvQueryVariables>;
export const SpellingsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Spellings' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'spellings' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'SpellingFields' } }],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SpellingFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Spelling' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'source' } },
          { kind: 'Field', name: { kind: 'Name', value: 'target' } },
          { kind: 'Field', name: { kind: 'Name', value: 'isPhrase' } },
          { kind: 'Field', name: { kind: 'Name', value: 'enabled' } },
          { kind: 'Field', name: { kind: 'Name', value: 'applied' } },
          { kind: 'Field', name: { kind: 'Name', value: 'lastAppliedAt' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'examples' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'recordingId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'segmentIndex' } },
                { kind: 'Field', name: { kind: 'Name', value: 'before' } },
                { kind: 'Field', name: { kind: 'Name', value: 'after' } },
                { kind: 'Field', name: { kind: 'Name', value: 'heardAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SpellingsQuery, SpellingsQueryVariables>;
export const UpsertSpellingDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpsertSpelling' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'SpellingInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'upsertSpelling' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'SpellingFields' } }],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SpellingFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Spelling' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'source' } },
          { kind: 'Field', name: { kind: 'Name', value: 'target' } },
          { kind: 'Field', name: { kind: 'Name', value: 'isPhrase' } },
          { kind: 'Field', name: { kind: 'Name', value: 'enabled' } },
          { kind: 'Field', name: { kind: 'Name', value: 'applied' } },
          { kind: 'Field', name: { kind: 'Name', value: 'lastAppliedAt' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'examples' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'recordingId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'segmentIndex' } },
                { kind: 'Field', name: { kind: 'Name', value: 'before' } },
                { kind: 'Field', name: { kind: 'Name', value: 'after' } },
                { kind: 'Field', name: { kind: 'Name', value: 'heardAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpsertSpellingMutation, UpsertSpellingMutationVariables>;
export const DeleteSpellingDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'DeleteSpelling' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deleteSpelling' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeleteSpellingMutation, DeleteSpellingMutationVariables>;
export const ImportSpellingsCsvDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'ImportSpellingsCsv' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'csv' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'importSpellingsCsv' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'csv' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'csv' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'added' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updated' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ImportSpellingsCsvMutation, ImportSpellingsCsvMutationVariables>;
export const SpellingsCsvDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'SpellingsCsv' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [{ kind: 'Field', name: { kind: 'Name', value: 'spellingsCsv' } }],
      },
    },
  ],
} as unknown as DocumentNode<SpellingsCsvQuery, SpellingsCsvQueryVariables>;
