/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
  '\n  query Me {\n    me {\n      id\n      email\n      name\n      role\n      workspace {\n        id\n        name\n      }\n    }\n  }\n': typeof types.MeDocument;
  '\n  mutation Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      id\n      email\n      name\n      role\n      workspace {\n        id\n        name\n      }\n    }\n  }\n': typeof types.LoginDocument;
  '\n  mutation Logout {\n    logout\n  }\n': typeof types.LogoutDocument;
  '\n  query Settings {\n    settings {\n      autoTranscribe\n    }\n  }\n': typeof types.SettingsDocument;
  '\n  mutation UpdateSettings($autoTranscribe: Boolean!) {\n    updateSettings(autoTranscribe: $autoTranscribe) {\n      autoTranscribe\n    }\n  }\n': typeof types.UpdateSettingsDocument;
  '\n  query ApiKeys {\n    apiKeys {\n      id\n      name\n      createdAt\n      lastUsedAt\n      revokedAt\n    }\n  }\n': typeof types.ApiKeysDocument;
  '\n  mutation CreateApiKey($name: String!) {\n    createApiKey(name: $name) {\n      id\n      key\n    }\n  }\n': typeof types.CreateApiKeyDocument;
  '\n  mutation RevokeApiKey($id: String!) {\n    revokeApiKey(id: $id)\n  }\n': typeof types.RevokeApiKeyDocument;
  '\n  fragment RecordingFields on Recording {\n    id\n    originalName\n    mediaId\n    sizeBytes\n    sha256\n    durationSeconds\n    channels\n    sampleRate\n    source\n    externalId\n    status\n    failureReason\n    latestTranscriptId\n    detectedLanguage\n    languageProbability\n    createdAt\n    updatedAt\n  }\n': typeof types.RecordingFieldsFragmentDoc;
  '\n  fragment JobFields on Job {\n    id\n    recordingId\n    status\n    modelRegistryId\n    languagePolicy\n    force\n    progressSeconds\n    totalSeconds\n    errorCode\n    errorMessage\n    transcriptId\n    createdAt\n    startedAt\n    finishedAt\n  }\n': typeof types.JobFieldsFragmentDoc;
  '\n  query Recordings($filter: RecordingFilter, $first: Int, $after: String) {\n    recordings(filter: $filter, first: $first, after: $after) {\n      items {\n        ...RecordingFields\n        jobs {\n          ...JobFields\n        }\n      }\n      hasMore\n      endCursor\n    }\n  }\n': typeof types.RecordingsDocument;
  '\n  query RecordingCounts {\n    recordingCounts {\n      uploading\n      uploaded\n      ready\n      failed\n      queued\n      transcribing\n      done\n    }\n  }\n': typeof types.RecordingCountsDocument;
  '\n  query Recording($id: String!) {\n    recording(id: $id) {\n      ...RecordingFields\n      playbackUrl\n      peaksUrl\n      jobs {\n        ...JobFields\n      }\n    }\n  }\n': typeof types.RecordingDocument;
  '\n  mutation RequestUpload($input: RequestUploadInput!) {\n    requestUpload(input: $input) {\n      uploadUrl\n      expiresAt\n      recording {\n        ...RecordingFields\n      }\n      duplicateOf {\n        id\n        originalName\n      }\n    }\n  }\n': typeof types.RequestUploadDocument;
  '\n  mutation DeleteRecording($id: String!) {\n    deleteRecording(id: $id)\n  }\n': typeof types.DeleteRecordingDocument;
  '\n  query Jobs($recordingId: String, $status: [JobStatus!]) {\n    jobs(recordingId: $recordingId, status: $status) {\n      ...JobFields\n    }\n  }\n': typeof types.JobsDocument;
  '\n  mutation CreateJob($input: CreateJobInput!) {\n    createJob(input: $input) {\n      ...JobFields\n    }\n  }\n': typeof types.CreateJobDocument;
  '\n  mutation CancelJob($id: String!) {\n    cancelJob(id: $id) {\n      ...JobFields\n    }\n  }\n': typeof types.CancelJobDocument;
  '\n  fragment TranscriptFields on Transcript {\n    id\n    recordingId\n    jobId\n    version\n    modelRegistryId\n    engine\n    compute\n    script\n    createdAt\n    language {\n      detected\n      probability\n      decodedAs\n      policy\n      candidates {\n        language\n        probability\n      }\n    }\n    stats {\n      audioSeconds\n      elapsedSeconds\n      realtimeFactor\n      chunks\n      silenceSkippedSeconds\n    }\n  }\n': typeof types.TranscriptFieldsFragmentDoc;
  '\n  query Transcript($id: String!) {\n    transcript(id: $id) {\n      ...TranscriptFields\n      segments {\n        index\n        startSeconds\n        endSeconds\n        textScript\n        textRoman\n      }\n    }\n  }\n': typeof types.TranscriptDocument;
  '\n  query TranscriptVersions($recordingId: String!) {\n    transcriptVersions(recordingId: $recordingId) {\n      ...TranscriptFields\n    }\n  }\n': typeof types.TranscriptVersionsDocument;
  '\n  mutation Retransliterate($transcriptId: String!) {\n    retransliterate(transcriptId: $transcriptId) {\n      ...TranscriptFields\n      segments {\n        index\n        startSeconds\n        endSeconds\n        textScript\n        textRoman\n      }\n    }\n  }\n': typeof types.RetransliterateDocument;
  '\n  query Engines {\n    engines {\n      registryId\n      engine\n      available\n      isDefault\n    }\n  }\n': typeof types.EnginesDocument;
  '\n  query Glossary {\n    glossary {\n      id\n      term\n      language\n      enabled\n      note\n    }\n  }\n': typeof types.GlossaryDocument;
  '\n  mutation UpsertGlossaryTerm($input: GlossaryTermInput!) {\n    upsertGlossaryTerm(input: $input) {\n      id\n      term\n      language\n      enabled\n      note\n    }\n  }\n': typeof types.UpsertGlossaryTermDocument;
  '\n  mutation DeleteGlossaryTerm($id: String!) {\n    deleteGlossaryTerm(id: $id)\n  }\n': typeof types.DeleteGlossaryTermDocument;
  '\n  query Spellings {\n    spellings {\n      id\n      source\n      target\n      isPhrase\n      enabled\n    }\n  }\n': typeof types.SpellingsDocument;
  '\n  mutation UpsertSpelling($input: SpellingInput!) {\n    upsertSpelling(input: $input) {\n      id\n      source\n      target\n      isPhrase\n      enabled\n    }\n  }\n': typeof types.UpsertSpellingDocument;
  '\n  mutation DeleteSpelling($id: String!) {\n    deleteSpelling(id: $id)\n  }\n': typeof types.DeleteSpellingDocument;
};
const documents: Documents = {
  '\n  query Me {\n    me {\n      id\n      email\n      name\n      role\n      workspace {\n        id\n        name\n      }\n    }\n  }\n':
    types.MeDocument,
  '\n  mutation Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      id\n      email\n      name\n      role\n      workspace {\n        id\n        name\n      }\n    }\n  }\n':
    types.LoginDocument,
  '\n  mutation Logout {\n    logout\n  }\n': types.LogoutDocument,
  '\n  query Settings {\n    settings {\n      autoTranscribe\n    }\n  }\n': types.SettingsDocument,
  '\n  mutation UpdateSettings($autoTranscribe: Boolean!) {\n    updateSettings(autoTranscribe: $autoTranscribe) {\n      autoTranscribe\n    }\n  }\n':
    types.UpdateSettingsDocument,
  '\n  query ApiKeys {\n    apiKeys {\n      id\n      name\n      createdAt\n      lastUsedAt\n      revokedAt\n    }\n  }\n':
    types.ApiKeysDocument,
  '\n  mutation CreateApiKey($name: String!) {\n    createApiKey(name: $name) {\n      id\n      key\n    }\n  }\n':
    types.CreateApiKeyDocument,
  '\n  mutation RevokeApiKey($id: String!) {\n    revokeApiKey(id: $id)\n  }\n': types.RevokeApiKeyDocument,
  '\n  fragment RecordingFields on Recording {\n    id\n    originalName\n    mediaId\n    sizeBytes\n    sha256\n    durationSeconds\n    channels\n    sampleRate\n    source\n    externalId\n    status\n    failureReason\n    latestTranscriptId\n    detectedLanguage\n    languageProbability\n    createdAt\n    updatedAt\n  }\n':
    types.RecordingFieldsFragmentDoc,
  '\n  fragment JobFields on Job {\n    id\n    recordingId\n    status\n    modelRegistryId\n    languagePolicy\n    force\n    progressSeconds\n    totalSeconds\n    errorCode\n    errorMessage\n    transcriptId\n    createdAt\n    startedAt\n    finishedAt\n  }\n':
    types.JobFieldsFragmentDoc,
  '\n  query Recordings($filter: RecordingFilter, $first: Int, $after: String) {\n    recordings(filter: $filter, first: $first, after: $after) {\n      items {\n        ...RecordingFields\n        jobs {\n          ...JobFields\n        }\n      }\n      hasMore\n      endCursor\n    }\n  }\n':
    types.RecordingsDocument,
  '\n  query RecordingCounts {\n    recordingCounts {\n      uploading\n      uploaded\n      ready\n      failed\n      queued\n      transcribing\n      done\n    }\n  }\n':
    types.RecordingCountsDocument,
  '\n  query Recording($id: String!) {\n    recording(id: $id) {\n      ...RecordingFields\n      playbackUrl\n      peaksUrl\n      jobs {\n        ...JobFields\n      }\n    }\n  }\n':
    types.RecordingDocument,
  '\n  mutation RequestUpload($input: RequestUploadInput!) {\n    requestUpload(input: $input) {\n      uploadUrl\n      expiresAt\n      recording {\n        ...RecordingFields\n      }\n      duplicateOf {\n        id\n        originalName\n      }\n    }\n  }\n':
    types.RequestUploadDocument,
  '\n  mutation DeleteRecording($id: String!) {\n    deleteRecording(id: $id)\n  }\n':
    types.DeleteRecordingDocument,
  '\n  query Jobs($recordingId: String, $status: [JobStatus!]) {\n    jobs(recordingId: $recordingId, status: $status) {\n      ...JobFields\n    }\n  }\n':
    types.JobsDocument,
  '\n  mutation CreateJob($input: CreateJobInput!) {\n    createJob(input: $input) {\n      ...JobFields\n    }\n  }\n':
    types.CreateJobDocument,
  '\n  mutation CancelJob($id: String!) {\n    cancelJob(id: $id) {\n      ...JobFields\n    }\n  }\n':
    types.CancelJobDocument,
  '\n  fragment TranscriptFields on Transcript {\n    id\n    recordingId\n    jobId\n    version\n    modelRegistryId\n    engine\n    compute\n    script\n    createdAt\n    language {\n      detected\n      probability\n      decodedAs\n      policy\n      candidates {\n        language\n        probability\n      }\n    }\n    stats {\n      audioSeconds\n      elapsedSeconds\n      realtimeFactor\n      chunks\n      silenceSkippedSeconds\n    }\n  }\n':
    types.TranscriptFieldsFragmentDoc,
  '\n  query Transcript($id: String!) {\n    transcript(id: $id) {\n      ...TranscriptFields\n      segments {\n        index\n        startSeconds\n        endSeconds\n        textScript\n        textRoman\n      }\n    }\n  }\n':
    types.TranscriptDocument,
  '\n  query TranscriptVersions($recordingId: String!) {\n    transcriptVersions(recordingId: $recordingId) {\n      ...TranscriptFields\n    }\n  }\n':
    types.TranscriptVersionsDocument,
  '\n  mutation Retransliterate($transcriptId: String!) {\n    retransliterate(transcriptId: $transcriptId) {\n      ...TranscriptFields\n      segments {\n        index\n        startSeconds\n        endSeconds\n        textScript\n        textRoman\n      }\n    }\n  }\n':
    types.RetransliterateDocument,
  '\n  query Engines {\n    engines {\n      registryId\n      engine\n      available\n      isDefault\n    }\n  }\n':
    types.EnginesDocument,
  '\n  query Glossary {\n    glossary {\n      id\n      term\n      language\n      enabled\n      note\n    }\n  }\n':
    types.GlossaryDocument,
  '\n  mutation UpsertGlossaryTerm($input: GlossaryTermInput!) {\n    upsertGlossaryTerm(input: $input) {\n      id\n      term\n      language\n      enabled\n      note\n    }\n  }\n':
    types.UpsertGlossaryTermDocument,
  '\n  mutation DeleteGlossaryTerm($id: String!) {\n    deleteGlossaryTerm(id: $id)\n  }\n':
    types.DeleteGlossaryTermDocument,
  '\n  query Spellings {\n    spellings {\n      id\n      source\n      target\n      isPhrase\n      enabled\n    }\n  }\n':
    types.SpellingsDocument,
  '\n  mutation UpsertSpelling($input: SpellingInput!) {\n    upsertSpelling(input: $input) {\n      id\n      source\n      target\n      isPhrase\n      enabled\n    }\n  }\n':
    types.UpsertSpellingDocument,
  '\n  mutation DeleteSpelling($id: String!) {\n    deleteSpelling(id: $id)\n  }\n':
    types.DeleteSpellingDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query Me {\n    me {\n      id\n      email\n      name\n      role\n      workspace {\n        id\n        name\n      }\n    }\n  }\n',
): (typeof documents)['\n  query Me {\n    me {\n      id\n      email\n      name\n      role\n      workspace {\n        id\n        name\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      id\n      email\n      name\n      role\n      workspace {\n        id\n        name\n      }\n    }\n  }\n',
): (typeof documents)['\n  mutation Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      id\n      email\n      name\n      role\n      workspace {\n        id\n        name\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation Logout {\n    logout\n  }\n',
): (typeof documents)['\n  mutation Logout {\n    logout\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query Settings {\n    settings {\n      autoTranscribe\n    }\n  }\n',
): (typeof documents)['\n  query Settings {\n    settings {\n      autoTranscribe\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation UpdateSettings($autoTranscribe: Boolean!) {\n    updateSettings(autoTranscribe: $autoTranscribe) {\n      autoTranscribe\n    }\n  }\n',
): (typeof documents)['\n  mutation UpdateSettings($autoTranscribe: Boolean!) {\n    updateSettings(autoTranscribe: $autoTranscribe) {\n      autoTranscribe\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query ApiKeys {\n    apiKeys {\n      id\n      name\n      createdAt\n      lastUsedAt\n      revokedAt\n    }\n  }\n',
): (typeof documents)['\n  query ApiKeys {\n    apiKeys {\n      id\n      name\n      createdAt\n      lastUsedAt\n      revokedAt\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation CreateApiKey($name: String!) {\n    createApiKey(name: $name) {\n      id\n      key\n    }\n  }\n',
): (typeof documents)['\n  mutation CreateApiKey($name: String!) {\n    createApiKey(name: $name) {\n      id\n      key\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation RevokeApiKey($id: String!) {\n    revokeApiKey(id: $id)\n  }\n',
): (typeof documents)['\n  mutation RevokeApiKey($id: String!) {\n    revokeApiKey(id: $id)\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment RecordingFields on Recording {\n    id\n    originalName\n    mediaId\n    sizeBytes\n    sha256\n    durationSeconds\n    channels\n    sampleRate\n    source\n    externalId\n    status\n    failureReason\n    latestTranscriptId\n    detectedLanguage\n    languageProbability\n    createdAt\n    updatedAt\n  }\n',
): (typeof documents)['\n  fragment RecordingFields on Recording {\n    id\n    originalName\n    mediaId\n    sizeBytes\n    sha256\n    durationSeconds\n    channels\n    sampleRate\n    source\n    externalId\n    status\n    failureReason\n    latestTranscriptId\n    detectedLanguage\n    languageProbability\n    createdAt\n    updatedAt\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment JobFields on Job {\n    id\n    recordingId\n    status\n    modelRegistryId\n    languagePolicy\n    force\n    progressSeconds\n    totalSeconds\n    errorCode\n    errorMessage\n    transcriptId\n    createdAt\n    startedAt\n    finishedAt\n  }\n',
): (typeof documents)['\n  fragment JobFields on Job {\n    id\n    recordingId\n    status\n    modelRegistryId\n    languagePolicy\n    force\n    progressSeconds\n    totalSeconds\n    errorCode\n    errorMessage\n    transcriptId\n    createdAt\n    startedAt\n    finishedAt\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query Recordings($filter: RecordingFilter, $first: Int, $after: String) {\n    recordings(filter: $filter, first: $first, after: $after) {\n      items {\n        ...RecordingFields\n        jobs {\n          ...JobFields\n        }\n      }\n      hasMore\n      endCursor\n    }\n  }\n',
): (typeof documents)['\n  query Recordings($filter: RecordingFilter, $first: Int, $after: String) {\n    recordings(filter: $filter, first: $first, after: $after) {\n      items {\n        ...RecordingFields\n        jobs {\n          ...JobFields\n        }\n      }\n      hasMore\n      endCursor\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query RecordingCounts {\n    recordingCounts {\n      uploading\n      uploaded\n      ready\n      failed\n      queued\n      transcribing\n      done\n    }\n  }\n',
): (typeof documents)['\n  query RecordingCounts {\n    recordingCounts {\n      uploading\n      uploaded\n      ready\n      failed\n      queued\n      transcribing\n      done\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query Recording($id: String!) {\n    recording(id: $id) {\n      ...RecordingFields\n      playbackUrl\n      peaksUrl\n      jobs {\n        ...JobFields\n      }\n    }\n  }\n',
): (typeof documents)['\n  query Recording($id: String!) {\n    recording(id: $id) {\n      ...RecordingFields\n      playbackUrl\n      peaksUrl\n      jobs {\n        ...JobFields\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation RequestUpload($input: RequestUploadInput!) {\n    requestUpload(input: $input) {\n      uploadUrl\n      expiresAt\n      recording {\n        ...RecordingFields\n      }\n      duplicateOf {\n        id\n        originalName\n      }\n    }\n  }\n',
): (typeof documents)['\n  mutation RequestUpload($input: RequestUploadInput!) {\n    requestUpload(input: $input) {\n      uploadUrl\n      expiresAt\n      recording {\n        ...RecordingFields\n      }\n      duplicateOf {\n        id\n        originalName\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation DeleteRecording($id: String!) {\n    deleteRecording(id: $id)\n  }\n',
): (typeof documents)['\n  mutation DeleteRecording($id: String!) {\n    deleteRecording(id: $id)\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query Jobs($recordingId: String, $status: [JobStatus!]) {\n    jobs(recordingId: $recordingId, status: $status) {\n      ...JobFields\n    }\n  }\n',
): (typeof documents)['\n  query Jobs($recordingId: String, $status: [JobStatus!]) {\n    jobs(recordingId: $recordingId, status: $status) {\n      ...JobFields\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation CreateJob($input: CreateJobInput!) {\n    createJob(input: $input) {\n      ...JobFields\n    }\n  }\n',
): (typeof documents)['\n  mutation CreateJob($input: CreateJobInput!) {\n    createJob(input: $input) {\n      ...JobFields\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation CancelJob($id: String!) {\n    cancelJob(id: $id) {\n      ...JobFields\n    }\n  }\n',
): (typeof documents)['\n  mutation CancelJob($id: String!) {\n    cancelJob(id: $id) {\n      ...JobFields\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment TranscriptFields on Transcript {\n    id\n    recordingId\n    jobId\n    version\n    modelRegistryId\n    engine\n    compute\n    script\n    createdAt\n    language {\n      detected\n      probability\n      decodedAs\n      policy\n      candidates {\n        language\n        probability\n      }\n    }\n    stats {\n      audioSeconds\n      elapsedSeconds\n      realtimeFactor\n      chunks\n      silenceSkippedSeconds\n    }\n  }\n',
): (typeof documents)['\n  fragment TranscriptFields on Transcript {\n    id\n    recordingId\n    jobId\n    version\n    modelRegistryId\n    engine\n    compute\n    script\n    createdAt\n    language {\n      detected\n      probability\n      decodedAs\n      policy\n      candidates {\n        language\n        probability\n      }\n    }\n    stats {\n      audioSeconds\n      elapsedSeconds\n      realtimeFactor\n      chunks\n      silenceSkippedSeconds\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query Transcript($id: String!) {\n    transcript(id: $id) {\n      ...TranscriptFields\n      segments {\n        index\n        startSeconds\n        endSeconds\n        textScript\n        textRoman\n      }\n    }\n  }\n',
): (typeof documents)['\n  query Transcript($id: String!) {\n    transcript(id: $id) {\n      ...TranscriptFields\n      segments {\n        index\n        startSeconds\n        endSeconds\n        textScript\n        textRoman\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query TranscriptVersions($recordingId: String!) {\n    transcriptVersions(recordingId: $recordingId) {\n      ...TranscriptFields\n    }\n  }\n',
): (typeof documents)['\n  query TranscriptVersions($recordingId: String!) {\n    transcriptVersions(recordingId: $recordingId) {\n      ...TranscriptFields\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation Retransliterate($transcriptId: String!) {\n    retransliterate(transcriptId: $transcriptId) {\n      ...TranscriptFields\n      segments {\n        index\n        startSeconds\n        endSeconds\n        textScript\n        textRoman\n      }\n    }\n  }\n',
): (typeof documents)['\n  mutation Retransliterate($transcriptId: String!) {\n    retransliterate(transcriptId: $transcriptId) {\n      ...TranscriptFields\n      segments {\n        index\n        startSeconds\n        endSeconds\n        textScript\n        textRoman\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query Engines {\n    engines {\n      registryId\n      engine\n      available\n      isDefault\n    }\n  }\n',
): (typeof documents)['\n  query Engines {\n    engines {\n      registryId\n      engine\n      available\n      isDefault\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query Glossary {\n    glossary {\n      id\n      term\n      language\n      enabled\n      note\n    }\n  }\n',
): (typeof documents)['\n  query Glossary {\n    glossary {\n      id\n      term\n      language\n      enabled\n      note\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation UpsertGlossaryTerm($input: GlossaryTermInput!) {\n    upsertGlossaryTerm(input: $input) {\n      id\n      term\n      language\n      enabled\n      note\n    }\n  }\n',
): (typeof documents)['\n  mutation UpsertGlossaryTerm($input: GlossaryTermInput!) {\n    upsertGlossaryTerm(input: $input) {\n      id\n      term\n      language\n      enabled\n      note\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation DeleteGlossaryTerm($id: String!) {\n    deleteGlossaryTerm(id: $id)\n  }\n',
): (typeof documents)['\n  mutation DeleteGlossaryTerm($id: String!) {\n    deleteGlossaryTerm(id: $id)\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query Spellings {\n    spellings {\n      id\n      source\n      target\n      isPhrase\n      enabled\n    }\n  }\n',
): (typeof documents)['\n  query Spellings {\n    spellings {\n      id\n      source\n      target\n      isPhrase\n      enabled\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation UpsertSpelling($input: SpellingInput!) {\n    upsertSpelling(input: $input) {\n      id\n      source\n      target\n      isPhrase\n      enabled\n    }\n  }\n',
): (typeof documents)['\n  mutation UpsertSpelling($input: SpellingInput!) {\n    upsertSpelling(input: $input) {\n      id\n      source\n      target\n      isPhrase\n      enabled\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation DeleteSpelling($id: String!) {\n    deleteSpelling(id: $id)\n  }\n',
): (typeof documents)['\n  mutation DeleteSpelling($id: String!) {\n    deleteSpelling(id: $id)\n  }\n'];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
