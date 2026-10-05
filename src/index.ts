export { LikhoClient, LikhoError, uploadFile, type ClientOptions, type ErrorCode } from './client.js';
export { LikhoProvider, useLikho, type LikhoProviderProps } from './provider.js';
export {
  parseLiveEvent,
  subscribeLive,
  type LiveEvent,
  type LiveImport,
  type LiveJob,
  type LiveRecording,
  type LiveSegment,
  type LiveSubscription,
} from './live.js';
export { clock, saveTextFile, toSrt, toTxt, type Layer, type Line } from './download.js';
export * from './hooks/account.js';
export * from './hooks/recordings.js';
export * from './hooks/transcripts.js';
export * from './hooks/live.js';
export * from './hooks/search.js';
export * from './hooks/imports.js';
export * from './hooks/users.js';
export type {
  AuditFilterInput,
  CorrectSegmentInput,
  CreateJobInput,
  GlossaryTermInput,
  ImportStatus,
  InviteUserInput,
  Layer as CorrectionLayer,
  JobStatus,
  RecordingFilter,
  RecordingStatus,
  RequestImportInput,
  RequestUploadInput,
  Role,
  SearchFilter,
  SpellingInput,
} from './gen/graphql.js';
export type {
  RecordingFieldsFragment as Recording,
  JobFieldsFragment as Job,
  TranscriptFieldsFragment as TranscriptSummary,
  ImportFieldsFragment as Import,
  CorrectionFieldsFragment as Correction,
  UserFieldsFragment as User,
  InvitationFieldsFragment as Invitation,
  GlossaryTermFieldsFragment as GlossaryTerm,
  SpellingFieldsFragment as Spelling,
} from './gen/graphql.js';
/** One of the last lines a spelling was applied to: before (as the model wrote it) and after (Hinglish). */
export type SpellingExample = import('./gen/graphql.js').SpellingFieldsFragment['examples'][number];
/** What a CSV import did. */
export type ImportResult = import('./gen/graphql.js').ImportGlossaryCsvMutation['importGlossaryCsv'];
export type {
  TranscriptQuery as TranscriptResult,
  RecordingQuery as RecordingResult,
  SearchQuery as SearchResult,
  AuditLogQuery as AuditLogResult,
  MeQuery as MeResult,
} from './gen/graphql.js';
/** One line of the audit log. */
export type AuditEntry = import('./gen/graphql.js').AuditLogQuery['auditLog']['items'][number];
