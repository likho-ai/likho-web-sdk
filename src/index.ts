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
export * from './hooks/analytics.js';
export * from './hooks/dialer.js';
export type {
  AnalyticsBucket,
  AnalyticsDimension,
  AnalyticsFacts,
  AnalyticsMetric,
  AuditFilterInput,
  CorrectSegmentInput,
  CreateJobInput,
  DialerCallsFilter,
  DialerSettingsInput,
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
  SettingsInput,
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
/** A campaign of the dialer with its calls in a window. */
export type DialerCampaign = import('./gen/graphql.js').DialerCampaignsQuery['dialerCampaigns'][number];
/** An agent of the dialer with the calls taken in a window. */
export type DialerAgent = import('./gen/graphql.js').DialerAgentsQuery['dialerAgents'][number];
/** One leg of a call as the dialer logged it, with its recording when Likho has it. */
export type DialerCall = import('./gen/graphql.js').DialerCallsQuery['dialerCalls']['items'][number];
/** What the dialer connector is doing. */
export type DialerStatus = import('./gen/graphql.js').DialerStatusQuery['dialerStatus'];
/** Every setting of the workspace. */
export type WorkspaceSettings = import('./gen/graphql.js').SettingsQuery['settings'];
/** Whether each service answers. */
export type SystemStatus = import('./gen/graphql.js').SystemStatusQuery['systemStatus'];
/** What happened to the calls in a window. */
export type AnalyticsOverview = import('./gen/graphql.js').AnalyticsOverviewQuery['analyticsOverview'];
/** One bucket of a timeseries. */
export type AnalyticsPoint =
  import('./gen/graphql.js').AnalyticsTimeseriesQuery['analyticsTimeseries'][number];
/** One line of a breakdown. */
export type AnalyticsRow = import('./gen/graphql.js').AnalyticsBreakdownQuery['analyticsBreakdown'][number];
/** A recording with its insights (null until analysed), as the insights page lists them. */
export type RecordingWithInsights =
  import('./gen/graphql.js').RecordingsWithInsightsQuery['recordings']['items'][number];
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
