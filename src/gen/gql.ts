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
  '\n  fragment ImportFields on Import {\n    id\n    source\n    externalId\n    transcribe\n    status\n    recordingId\n    reason\n    code\n    createdAt\n    updatedAt\n  }\n': typeof types.ImportFieldsFragmentDoc;
  '\n  mutation RequestImport($input: RequestImportInput!) {\n    requestImport(input: $input) {\n      ...ImportFields\n    }\n  }\n': typeof types.RequestImportDocument;
  '\n  query Imports($status: [ImportStatus!], $first: Int, $after: String) {\n    imports(status: $status, first: $first, after: $after) {\n      items {\n        ...ImportFields\n      }\n      hasMore\n    }\n  }\n': typeof types.ImportsDocument;
  '\n  query Import($id: String!) {\n    import(id: $id) {\n      ...ImportFields\n    }\n  }\n': typeof types.ImportDocument;
  '\n  fragment RecordingFields on Recording {\n    id\n    originalName\n    mediaId\n    sizeBytes\n    sha256\n    durationSeconds\n    channels\n    sampleRate\n    source\n    externalId\n    attributes {\n      key\n      value\n    }\n    status\n    failureReason\n    latestTranscriptId\n    detectedLanguage\n    languageProbability\n    createdAt\n    updatedAt\n  }\n': typeof types.RecordingFieldsFragmentDoc;
  '\n  fragment JobFields on Job {\n    id\n    recordingId\n    status\n    modelRegistryId\n    languagePolicy\n    force\n    progressSeconds\n    totalSeconds\n    errorCode\n    errorMessage\n    transcriptId\n    createdAt\n    startedAt\n    finishedAt\n  }\n': typeof types.JobFieldsFragmentDoc;
  '\n  query Recordings($filter: RecordingFilter, $first: Int, $after: String) {\n    recordings(filter: $filter, first: $first, after: $after) {\n      items {\n        ...RecordingFields\n        jobs {\n          ...JobFields\n        }\n      }\n      hasMore\n      endCursor\n    }\n  }\n': typeof types.RecordingsDocument;
  '\n  query RecordingCounts {\n    recordingCounts {\n      uploading\n      uploaded\n      ready\n      failed\n      queued\n      transcribing\n      done\n    }\n  }\n': typeof types.RecordingCountsDocument;
  '\n  query Recording($id: String!) {\n    recording(id: $id) {\n      ...RecordingFields\n      playbackUrl\n      peaksUrl\n      jobs {\n        ...JobFields\n      }\n    }\n  }\n': typeof types.RecordingDocument;
  '\n  mutation RequestUpload($input: RequestUploadInput!) {\n    requestUpload(input: $input) {\n      uploadUrl\n      expiresAt\n      recording {\n        ...RecordingFields\n      }\n      duplicateOf {\n        id\n        originalName\n      }\n    }\n  }\n': typeof types.RequestUploadDocument;
  '\n  mutation DeleteRecording($id: String!) {\n    deleteRecording(id: $id)\n  }\n': typeof types.DeleteRecordingDocument;
  '\n  query Jobs($recordingId: String, $status: [JobStatus!]) {\n    jobs(recordingId: $recordingId, status: $status) {\n      ...JobFields\n    }\n  }\n': typeof types.JobsDocument;
  '\n  mutation CreateJob($input: CreateJobInput!) {\n    createJob(input: $input) {\n      ...JobFields\n    }\n  }\n': typeof types.CreateJobDocument;
  '\n  mutation CancelJob($id: String!) {\n    cancelJob(id: $id) {\n      ...JobFields\n    }\n  }\n': typeof types.CancelJobDocument;
  '\n  query Search($query: String!, $filter: SearchFilter, $page: Int, $pageSize: Int) {\n    search(query: $query, filter: $filter, page: $page, pageSize: $pageSize) {\n      total\n      page\n      pageSize\n      processingMs\n      hits {\n        recording {\n          ...RecordingFields\n        }\n        transcriptId\n        segmentIndex\n        startSeconds\n        endSeconds\n        textRoman\n        textScript\n        highlightRoman\n        highlightScript\n        language\n      }\n    }\n  }\n': typeof types.SearchDocument;
  '\n  fragment TranscriptFields on Transcript {\n    id\n    recordingId\n    jobId\n    version\n    modelRegistryId\n    engine\n    compute\n    script\n    createdAt\n    language {\n      detected\n      probability\n      decodedAs\n      policy\n      candidates {\n        language\n        probability\n      }\n    }\n    stats {\n      audioSeconds\n      elapsedSeconds\n      realtimeFactor\n      chunks\n      silenceSkippedSeconds\n    }\n  }\n': typeof types.TranscriptFieldsFragmentDoc;
  '\n  query Transcript($id: String!) {\n    transcript(id: $id) {\n      ...TranscriptFields\n      segments {\n        index\n        startSeconds\n        endSeconds\n        textScript\n        textRoman\n      }\n    }\n  }\n': typeof types.TranscriptDocument;
  '\n  query TranscriptVersions($recordingId: String!) {\n    transcriptVersions(recordingId: $recordingId) {\n      ...TranscriptFields\n    }\n  }\n': typeof types.TranscriptVersionsDocument;
  '\n  mutation Retransliterate($transcriptId: String!) {\n    retransliterate(transcriptId: $transcriptId) {\n      ...TranscriptFields\n      segments {\n        index\n        startSeconds\n        endSeconds\n        textScript\n        textRoman\n      }\n    }\n  }\n': typeof types.RetransliterateDocument;
  '\n  query Engines {\n    engines {\n      registryId\n      engine\n      available\n      isDefault\n    }\n  }\n': typeof types.EnginesDocument;
  '\n  fragment CorrectionFields on Correction {\n    id\n    recordingId\n    transcriptId\n    correctedTranscriptId\n    segmentIndex\n    layer\n    before\n    after\n    userId\n    createdAt\n  }\n': typeof types.CorrectionFieldsFragmentDoc;
  '\n  mutation CorrectSegment($input: CorrectSegmentInput!) {\n    correctSegment(input: $input) {\n      ...TranscriptFields\n      segments {\n        index\n        startSeconds\n        endSeconds\n        textScript\n        textRoman\n      }\n    }\n  }\n': typeof types.CorrectSegmentDocument;
  '\n  query Corrections($recordingId: String!) {\n    corrections(recordingId: $recordingId) {\n      ...CorrectionFields\n    }\n  }\n': typeof types.CorrectionsDocument;
  '\n  fragment UserFields on User {\n    id\n    email\n    name\n    role\n    createdAt\n    disabledAt\n  }\n': typeof types.UserFieldsFragmentDoc;
  '\n  fragment InvitationFields on Invitation {\n    id\n    email\n    name\n    role\n    invitedBy\n    createdAt\n    expiresAt\n    acceptedAt\n    revokedAt\n  }\n': typeof types.InvitationFieldsFragmentDoc;
  '\n  query Users {\n    users {\n      ...UserFields\n    }\n  }\n': typeof types.UsersDocument;
  '\n  query Invitations {\n    invitations {\n      ...InvitationFields\n    }\n  }\n': typeof types.InvitationsDocument;
  '\n  mutation InviteUser($input: InviteUserInput!) {\n    inviteUser(input: $input) {\n      invitation {\n        ...InvitationFields\n      }\n      link\n      sent\n    }\n  }\n': typeof types.InviteUserDocument;
  '\n  mutation RevokeInvitation($id: String!) {\n    revokeInvitation(id: $id)\n  }\n': typeof types.RevokeInvitationDocument;
  '\n  mutation SetUserRole($userId: String!, $role: Role!) {\n    setUserRole(userId: $userId, role: $role) {\n      ...UserFields\n    }\n  }\n': typeof types.SetUserRoleDocument;
  '\n  mutation DisableUser($userId: String!) {\n    disableUser(userId: $userId) {\n      ...UserFields\n    }\n  }\n': typeof types.DisableUserDocument;
  '\n  mutation EnableUser($userId: String!) {\n    enableUser(userId: $userId) {\n      ...UserFields\n    }\n  }\n': typeof types.EnableUserDocument;
  '\n  query Invitation($token: String!) {\n    invitation(token: $token) {\n      email\n      name\n      role\n      workspace\n    }\n  }\n': typeof types.InvitationDocument;
  '\n  mutation AcceptInvitation($token: String!, $name: String!, $password: String!) {\n    acceptInvitation(token: $token, name: $name, password: $password) {\n      id\n      email\n      name\n      role\n      workspace {\n        id\n        name\n      }\n    }\n  }\n': typeof types.AcceptInvitationDocument;
  '\n  mutation RequestPasswordReset($email: String!) {\n    requestPasswordReset(email: $email)\n  }\n': typeof types.RequestPasswordResetDocument;
  '\n  mutation ResetPassword($token: String!, $password: String!) {\n    resetPassword(token: $token, password: $password) {\n      id\n      email\n      name\n      role\n      workspace {\n        id\n        name\n      }\n    }\n  }\n': typeof types.ResetPasswordDocument;
  '\n  mutation ChangePassword($currentPassword: String!, $newPassword: String!) {\n    changePassword(currentPassword: $currentPassword, newPassword: $newPassword)\n  }\n': typeof types.ChangePasswordDocument;
  '\n  query AuditLog($filter: AuditFilterInput, $first: Int, $after: String) {\n    auditLog(filter: $filter, first: $first, after: $after) {\n      items {\n        id\n        actorKind\n        actorId\n        actorName\n        action\n        targetKind\n        targetId\n        details\n        ip\n        createdAt\n      }\n      hasMore\n      endCursor\n    }\n  }\n': typeof types.AuditLogDocument;
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
  '\n  fragment ImportFields on Import {\n    id\n    source\n    externalId\n    transcribe\n    status\n    recordingId\n    reason\n    code\n    createdAt\n    updatedAt\n  }\n':
    types.ImportFieldsFragmentDoc,
  '\n  mutation RequestImport($input: RequestImportInput!) {\n    requestImport(input: $input) {\n      ...ImportFields\n    }\n  }\n':
    types.RequestImportDocument,
  '\n  query Imports($status: [ImportStatus!], $first: Int, $after: String) {\n    imports(status: $status, first: $first, after: $after) {\n      items {\n        ...ImportFields\n      }\n      hasMore\n    }\n  }\n':
    types.ImportsDocument,
  '\n  query Import($id: String!) {\n    import(id: $id) {\n      ...ImportFields\n    }\n  }\n':
    types.ImportDocument,
  '\n  fragment RecordingFields on Recording {\n    id\n    originalName\n    mediaId\n    sizeBytes\n    sha256\n    durationSeconds\n    channels\n    sampleRate\n    source\n    externalId\n    attributes {\n      key\n      value\n    }\n    status\n    failureReason\n    latestTranscriptId\n    detectedLanguage\n    languageProbability\n    createdAt\n    updatedAt\n  }\n':
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
  '\n  query Search($query: String!, $filter: SearchFilter, $page: Int, $pageSize: Int) {\n    search(query: $query, filter: $filter, page: $page, pageSize: $pageSize) {\n      total\n      page\n      pageSize\n      processingMs\n      hits {\n        recording {\n          ...RecordingFields\n        }\n        transcriptId\n        segmentIndex\n        startSeconds\n        endSeconds\n        textRoman\n        textScript\n        highlightRoman\n        highlightScript\n        language\n      }\n    }\n  }\n':
    types.SearchDocument,
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
  '\n  fragment CorrectionFields on Correction {\n    id\n    recordingId\n    transcriptId\n    correctedTranscriptId\n    segmentIndex\n    layer\n    before\n    after\n    userId\n    createdAt\n  }\n':
    types.CorrectionFieldsFragmentDoc,
  '\n  mutation CorrectSegment($input: CorrectSegmentInput!) {\n    correctSegment(input: $input) {\n      ...TranscriptFields\n      segments {\n        index\n        startSeconds\n        endSeconds\n        textScript\n        textRoman\n      }\n    }\n  }\n':
    types.CorrectSegmentDocument,
  '\n  query Corrections($recordingId: String!) {\n    corrections(recordingId: $recordingId) {\n      ...CorrectionFields\n    }\n  }\n':
    types.CorrectionsDocument,
  '\n  fragment UserFields on User {\n    id\n    email\n    name\n    role\n    createdAt\n    disabledAt\n  }\n':
    types.UserFieldsFragmentDoc,
  '\n  fragment InvitationFields on Invitation {\n    id\n    email\n    name\n    role\n    invitedBy\n    createdAt\n    expiresAt\n    acceptedAt\n    revokedAt\n  }\n':
    types.InvitationFieldsFragmentDoc,
  '\n  query Users {\n    users {\n      ...UserFields\n    }\n  }\n': types.UsersDocument,
  '\n  query Invitations {\n    invitations {\n      ...InvitationFields\n    }\n  }\n':
    types.InvitationsDocument,
  '\n  mutation InviteUser($input: InviteUserInput!) {\n    inviteUser(input: $input) {\n      invitation {\n        ...InvitationFields\n      }\n      link\n      sent\n    }\n  }\n':
    types.InviteUserDocument,
  '\n  mutation RevokeInvitation($id: String!) {\n    revokeInvitation(id: $id)\n  }\n':
    types.RevokeInvitationDocument,
  '\n  mutation SetUserRole($userId: String!, $role: Role!) {\n    setUserRole(userId: $userId, role: $role) {\n      ...UserFields\n    }\n  }\n':
    types.SetUserRoleDocument,
  '\n  mutation DisableUser($userId: String!) {\n    disableUser(userId: $userId) {\n      ...UserFields\n    }\n  }\n':
    types.DisableUserDocument,
  '\n  mutation EnableUser($userId: String!) {\n    enableUser(userId: $userId) {\n      ...UserFields\n    }\n  }\n':
    types.EnableUserDocument,
  '\n  query Invitation($token: String!) {\n    invitation(token: $token) {\n      email\n      name\n      role\n      workspace\n    }\n  }\n':
    types.InvitationDocument,
  '\n  mutation AcceptInvitation($token: String!, $name: String!, $password: String!) {\n    acceptInvitation(token: $token, name: $name, password: $password) {\n      id\n      email\n      name\n      role\n      workspace {\n        id\n        name\n      }\n    }\n  }\n':
    types.AcceptInvitationDocument,
  '\n  mutation RequestPasswordReset($email: String!) {\n    requestPasswordReset(email: $email)\n  }\n':
    types.RequestPasswordResetDocument,
  '\n  mutation ResetPassword($token: String!, $password: String!) {\n    resetPassword(token: $token, password: $password) {\n      id\n      email\n      name\n      role\n      workspace {\n        id\n        name\n      }\n    }\n  }\n':
    types.ResetPasswordDocument,
  '\n  mutation ChangePassword($currentPassword: String!, $newPassword: String!) {\n    changePassword(currentPassword: $currentPassword, newPassword: $newPassword)\n  }\n':
    types.ChangePasswordDocument,
  '\n  query AuditLog($filter: AuditFilterInput, $first: Int, $after: String) {\n    auditLog(filter: $filter, first: $first, after: $after) {\n      items {\n        id\n        actorKind\n        actorId\n        actorName\n        action\n        targetKind\n        targetId\n        details\n        ip\n        createdAt\n      }\n      hasMore\n      endCursor\n    }\n  }\n':
    types.AuditLogDocument,
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
  source: '\n  fragment ImportFields on Import {\n    id\n    source\n    externalId\n    transcribe\n    status\n    recordingId\n    reason\n    code\n    createdAt\n    updatedAt\n  }\n',
): (typeof documents)['\n  fragment ImportFields on Import {\n    id\n    source\n    externalId\n    transcribe\n    status\n    recordingId\n    reason\n    code\n    createdAt\n    updatedAt\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation RequestImport($input: RequestImportInput!) {\n    requestImport(input: $input) {\n      ...ImportFields\n    }\n  }\n',
): (typeof documents)['\n  mutation RequestImport($input: RequestImportInput!) {\n    requestImport(input: $input) {\n      ...ImportFields\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query Imports($status: [ImportStatus!], $first: Int, $after: String) {\n    imports(status: $status, first: $first, after: $after) {\n      items {\n        ...ImportFields\n      }\n      hasMore\n    }\n  }\n',
): (typeof documents)['\n  query Imports($status: [ImportStatus!], $first: Int, $after: String) {\n    imports(status: $status, first: $first, after: $after) {\n      items {\n        ...ImportFields\n      }\n      hasMore\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query Import($id: String!) {\n    import(id: $id) {\n      ...ImportFields\n    }\n  }\n',
): (typeof documents)['\n  query Import($id: String!) {\n    import(id: $id) {\n      ...ImportFields\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment RecordingFields on Recording {\n    id\n    originalName\n    mediaId\n    sizeBytes\n    sha256\n    durationSeconds\n    channels\n    sampleRate\n    source\n    externalId\n    attributes {\n      key\n      value\n    }\n    status\n    failureReason\n    latestTranscriptId\n    detectedLanguage\n    languageProbability\n    createdAt\n    updatedAt\n  }\n',
): (typeof documents)['\n  fragment RecordingFields on Recording {\n    id\n    originalName\n    mediaId\n    sizeBytes\n    sha256\n    durationSeconds\n    channels\n    sampleRate\n    source\n    externalId\n    attributes {\n      key\n      value\n    }\n    status\n    failureReason\n    latestTranscriptId\n    detectedLanguage\n    languageProbability\n    createdAt\n    updatedAt\n  }\n'];
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
  source: '\n  query Search($query: String!, $filter: SearchFilter, $page: Int, $pageSize: Int) {\n    search(query: $query, filter: $filter, page: $page, pageSize: $pageSize) {\n      total\n      page\n      pageSize\n      processingMs\n      hits {\n        recording {\n          ...RecordingFields\n        }\n        transcriptId\n        segmentIndex\n        startSeconds\n        endSeconds\n        textRoman\n        textScript\n        highlightRoman\n        highlightScript\n        language\n      }\n    }\n  }\n',
): (typeof documents)['\n  query Search($query: String!, $filter: SearchFilter, $page: Int, $pageSize: Int) {\n    search(query: $query, filter: $filter, page: $page, pageSize: $pageSize) {\n      total\n      page\n      pageSize\n      processingMs\n      hits {\n        recording {\n          ...RecordingFields\n        }\n        transcriptId\n        segmentIndex\n        startSeconds\n        endSeconds\n        textRoman\n        textScript\n        highlightRoman\n        highlightScript\n        language\n      }\n    }\n  }\n'];
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
  source: '\n  fragment CorrectionFields on Correction {\n    id\n    recordingId\n    transcriptId\n    correctedTranscriptId\n    segmentIndex\n    layer\n    before\n    after\n    userId\n    createdAt\n  }\n',
): (typeof documents)['\n  fragment CorrectionFields on Correction {\n    id\n    recordingId\n    transcriptId\n    correctedTranscriptId\n    segmentIndex\n    layer\n    before\n    after\n    userId\n    createdAt\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation CorrectSegment($input: CorrectSegmentInput!) {\n    correctSegment(input: $input) {\n      ...TranscriptFields\n      segments {\n        index\n        startSeconds\n        endSeconds\n        textScript\n        textRoman\n      }\n    }\n  }\n',
): (typeof documents)['\n  mutation CorrectSegment($input: CorrectSegmentInput!) {\n    correctSegment(input: $input) {\n      ...TranscriptFields\n      segments {\n        index\n        startSeconds\n        endSeconds\n        textScript\n        textRoman\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query Corrections($recordingId: String!) {\n    corrections(recordingId: $recordingId) {\n      ...CorrectionFields\n    }\n  }\n',
): (typeof documents)['\n  query Corrections($recordingId: String!) {\n    corrections(recordingId: $recordingId) {\n      ...CorrectionFields\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment UserFields on User {\n    id\n    email\n    name\n    role\n    createdAt\n    disabledAt\n  }\n',
): (typeof documents)['\n  fragment UserFields on User {\n    id\n    email\n    name\n    role\n    createdAt\n    disabledAt\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment InvitationFields on Invitation {\n    id\n    email\n    name\n    role\n    invitedBy\n    createdAt\n    expiresAt\n    acceptedAt\n    revokedAt\n  }\n',
): (typeof documents)['\n  fragment InvitationFields on Invitation {\n    id\n    email\n    name\n    role\n    invitedBy\n    createdAt\n    expiresAt\n    acceptedAt\n    revokedAt\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query Users {\n    users {\n      ...UserFields\n    }\n  }\n',
): (typeof documents)['\n  query Users {\n    users {\n      ...UserFields\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query Invitations {\n    invitations {\n      ...InvitationFields\n    }\n  }\n',
): (typeof documents)['\n  query Invitations {\n    invitations {\n      ...InvitationFields\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation InviteUser($input: InviteUserInput!) {\n    inviteUser(input: $input) {\n      invitation {\n        ...InvitationFields\n      }\n      link\n      sent\n    }\n  }\n',
): (typeof documents)['\n  mutation InviteUser($input: InviteUserInput!) {\n    inviteUser(input: $input) {\n      invitation {\n        ...InvitationFields\n      }\n      link\n      sent\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation RevokeInvitation($id: String!) {\n    revokeInvitation(id: $id)\n  }\n',
): (typeof documents)['\n  mutation RevokeInvitation($id: String!) {\n    revokeInvitation(id: $id)\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation SetUserRole($userId: String!, $role: Role!) {\n    setUserRole(userId: $userId, role: $role) {\n      ...UserFields\n    }\n  }\n',
): (typeof documents)['\n  mutation SetUserRole($userId: String!, $role: Role!) {\n    setUserRole(userId: $userId, role: $role) {\n      ...UserFields\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation DisableUser($userId: String!) {\n    disableUser(userId: $userId) {\n      ...UserFields\n    }\n  }\n',
): (typeof documents)['\n  mutation DisableUser($userId: String!) {\n    disableUser(userId: $userId) {\n      ...UserFields\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation EnableUser($userId: String!) {\n    enableUser(userId: $userId) {\n      ...UserFields\n    }\n  }\n',
): (typeof documents)['\n  mutation EnableUser($userId: String!) {\n    enableUser(userId: $userId) {\n      ...UserFields\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query Invitation($token: String!) {\n    invitation(token: $token) {\n      email\n      name\n      role\n      workspace\n    }\n  }\n',
): (typeof documents)['\n  query Invitation($token: String!) {\n    invitation(token: $token) {\n      email\n      name\n      role\n      workspace\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation AcceptInvitation($token: String!, $name: String!, $password: String!) {\n    acceptInvitation(token: $token, name: $name, password: $password) {\n      id\n      email\n      name\n      role\n      workspace {\n        id\n        name\n      }\n    }\n  }\n',
): (typeof documents)['\n  mutation AcceptInvitation($token: String!, $name: String!, $password: String!) {\n    acceptInvitation(token: $token, name: $name, password: $password) {\n      id\n      email\n      name\n      role\n      workspace {\n        id\n        name\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation RequestPasswordReset($email: String!) {\n    requestPasswordReset(email: $email)\n  }\n',
): (typeof documents)['\n  mutation RequestPasswordReset($email: String!) {\n    requestPasswordReset(email: $email)\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation ResetPassword($token: String!, $password: String!) {\n    resetPassword(token: $token, password: $password) {\n      id\n      email\n      name\n      role\n      workspace {\n        id\n        name\n      }\n    }\n  }\n',
): (typeof documents)['\n  mutation ResetPassword($token: String!, $password: String!) {\n    resetPassword(token: $token, password: $password) {\n      id\n      email\n      name\n      role\n      workspace {\n        id\n        name\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation ChangePassword($currentPassword: String!, $newPassword: String!) {\n    changePassword(currentPassword: $currentPassword, newPassword: $newPassword)\n  }\n',
): (typeof documents)['\n  mutation ChangePassword($currentPassword: String!, $newPassword: String!) {\n    changePassword(currentPassword: $currentPassword, newPassword: $newPassword)\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query AuditLog($filter: AuditFilterInput, $first: Int, $after: String) {\n    auditLog(filter: $filter, first: $first, after: $after) {\n      items {\n        id\n        actorKind\n        actorId\n        actorName\n        action\n        targetKind\n        targetId\n        details\n        ip\n        createdAt\n      }\n      hasMore\n      endCursor\n    }\n  }\n',
): (typeof documents)['\n  query AuditLog($filter: AuditFilterInput, $first: Int, $after: String) {\n    auditLog(filter: $filter, first: $first, after: $after) {\n      items {\n        id\n        actorKind\n        actorId\n        actorName\n        action\n        targetKind\n        targetId\n        details\n        ip\n        createdAt\n      }\n      hasMore\n      endCursor\n    }\n  }\n'];
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
