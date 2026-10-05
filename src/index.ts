export { LikhoClient, LikhoError, uploadFile, type ClientOptions, type ErrorCode } from './client.js';
export { LikhoProvider, useLikho, type LikhoProviderProps } from './provider.js';
export {
  parseLiveEvent,
  subscribeLive,
  type LiveEvent,
  type LiveImport,
  type LiveInsights,
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
export * from './hooks/insights.js';
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
  SaveSearchInput,
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
  SavedSearchFieldsFragment as SavedSearch,
  InsightsFieldsFragment as Insights,
} from './gen/graphql.js';
/** One yes/no observation of the auditor's form, answered from the transcript with the line that shows it. */
export type InsightCheck = import('./gen/graphql.js').InsightsFieldsFragment['checks'][number];
/** One scored point of the auditor's form, with the reason. */
export type InsightScore = import('./gen/graphql.js').InsightsFieldsFragment['scores'][number];
/** Whether insights are made at all (a model is configured) and by which model. */
export type InsightsStatus = import('./gen/graphql.js').InsightsStatusQuery['insightsStatus'];
/** One value of a fact about the calls, with how many recordings have it. */
export type FacetValue = import('./gen/graphql.js').RecordingFacetsQuery['recordingFacets'][number];
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
