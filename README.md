# likho-web-sdk

`@likho-ai/web-sdk`: how the Likho web apps talk to [likho-api](https://github.com/likho-ai/likho-api).
Typed GraphQL operations generated from the API's `schema.graphql`, React hooks on
[TanStack Query](https://tanstack.com/query), the file upload, and the live updates.

```json
"@likho-ai/web-sdk": "https://github.com/likho-ai/likho-web-sdk/releases/download/v0.7.0/likho-ai-web-sdk-0.7.0.tgz"
```

## Use

```tsx
import { LikhoProvider, useLogin, useRecordings, useUploader, useJobLive } from '@likho-ai/web-sdk';

<LikhoProvider baseUrl="http://localhost:8080" onUnauthenticated={() => navigate('/login')}>
  <App />
</LikhoProvider>;
```

| Hook | What |
| --- | --- |
| `useMe`, `useLogin`, `useLogout` | Who is signed in (`null` when nobody is), sign in, sign out |
| `useRecordings(filter, first)`, `useRecordingCounts`, `useRecording(id)` | The library, page by page; counts per status; one recording with its jobs and playback links |
| `useUploader()` | `add(files)` asks for a link per file, sends it with progress, and reports duplicates; `items` is the queue |
| `useCreateJob`, `useCancelJob`, `useDeleteRecording` | Jobs and deletion |
| `useTranscript(id)`, `useTranscriptVersions(recordingId)`, `useRetransliterate`, `useEngines` | Transcripts |
| `useCorrectSegment`, `useCorrections(recordingId)` | A line as a person wrote it: a new version, the correction kept |
| `useGlossary`, `useSpellings` and their upsert/delete mutations | The workspace vocabulary |
| `useSettings`, `useUpdateSettings`, `useApiKeys`, `useCreateApiKey`, `useRevokeApiKey` | Settings and API keys |
| `useJobLive(jobId)` | The lines of a running job as they arrive, its progress and its end. On `done`, read the stored transcript: a line may still be in flight behind the end |
| `useSearch(query, filter, page, pageSize)` | Transcript lines matching a few words (either layer, typos allowed), best first, with the matches inside `<mark>`; each hit carries its recording |
| `useImports(status)`, `useImport(id)`, `useRequestImport` | Calls asked for from the dialer by their id; the recording appears when the connector has fetched it |
| `useWorkspaceLive()` | Keeps every recordings and imports query fresh while the page is open |
| `useInsights(recordingId)`, `useInsightsStatus()`, `useAnalyseRecording` | What a language model says about the call: a summary, the products, the customer's mood and the auditor's form pre-filled (`null` until it has been analysed); whether a model is configured at all (without one no transcript text leaves); ask for them now, or again with `force` |
| `useRecordingLive(recordingId)` | Follows one recording while its page is open: a job or status change refreshes it, the model's answer refreshes its insights (and says when it failed, with why) |
| `useUsers`, `useInvitations`, `useInviteUser`, `useRevokeInvitation`, `useSetUserRole`, `useDisableUser`, `useEnableUser` | The people of the workspace (admins): invite by email with a role, change roles, disable and enable |
| `useInvitation(token)`, `useAcceptInvitation`, `useRequestPasswordReset`, `useResetPassword`, `useChangePassword` | Signing in through an invitation or reset link (no sign-in needed), changing your own password |
| `useAuditLog(filter, first)` | Who changed what, newest first, page by page (admins) |

Also: `LikhoClient` (the plain client, for code outside React), `uploadFile`, `subscribeLive`,
and `toTxt` / `toSrt` / `saveTextFile` for downloads.

Errors are `LikhoError` with the API's code (`unauthenticated`, `forbidden`, `not_found`,
`invalid`, `conflict`, `service_unavailable`), plus `network` when the server cannot be reached.

## Develop

```bash
pnpm install
pnpm schema:pull v0.1.0     # schema/schema.graphql from a likho-api version
pnpm codegen                # src/gen from the schema and src/operations
pnpm test && pnpm lint && pnpm typecheck && pnpm build
```

The generated code is committed. The tests use a fake API; nothing here needs the stack.
