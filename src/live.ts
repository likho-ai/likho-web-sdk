/**
 * Live updates from likho-api (server-sent events), as plain objects:
 *
 *   segment    a transcribed line: index, startSeconds, endSeconds, textScript, textRoman, totalSeconds
 *   job        status, progress or the end of a job (status, transcriptId, code, message, totalSeconds)
 *   recording  a recording changed (status, ...)
 *   import     a call asked for from the dialer changed (requested, completed, failed)
 *   insights   the model's answer about a recording is in (done: sentiment, score), or not (failed: code, message)
 */

export interface LiveSegment {
  type: 'segment';
  jobId: string;
  recordingId: string;
  index: number;
  startSeconds: number;
  endSeconds: number;
  textScript: string;
  textRoman: string;
  totalSeconds: number;
}

export interface LiveJob {
  type: 'job';
  jobId: string;
  recordingId: string;
  status?: string;
  transcriptId?: string;
  totalSeconds?: number;
  code?: string;
  message?: string;
}

export interface LiveRecording {
  type: 'recording';
  recordingId: string;
  status?: string;
  deleted?: boolean;
  [key: string]: unknown;
}

export interface LiveImport {
  type: 'import';
  id: string;
  recordingId: string;
  source: string;
  externalId: string;
  status: 'requested' | 'completed' | 'failed';
  reason: string;
  code: string;
}

export interface LiveInsights {
  type: 'insights';
  recordingId: string;
  transcriptId: string;
  status: 'done' | 'failed';
  insightsId: string;
  sentiment: string;
  scoreTotal: number;
  scoreMax: number;
  model: string;
  code: string;
  message: string;
}

export type LiveEvent = LiveSegment | LiveJob | LiveRecording | LiveImport | LiveInsights;

/** Turns one server-sent event into a LiveEvent, or null when it is not one. */
export function parseLiveEvent(type: string, data: string): LiveEvent | null {
  let body: Record<string, unknown>;
  try {
    body = JSON.parse(data) as Record<string, unknown>;
  } catch {
    return null;
  }
  if (type === 'segment') {
    return {
      type,
      jobId: String(body.jobId ?? ''),
      recordingId: String(body.recordingId ?? ''),
      index: Number(body.index ?? 0),
      startSeconds: Number(body.startSeconds ?? 0),
      endSeconds: Number(body.endSeconds ?? 0),
      textScript: String(body.textScript ?? ''),
      textRoman: String(body.textRoman ?? ''),
      totalSeconds: Number(body.totalSeconds ?? 0),
    };
  }
  if (type === 'job') {
    return {
      type,
      jobId: String(body.jobId ?? ''),
      recordingId: String(body.recordingId ?? ''),
      status: body.status === undefined ? undefined : String(body.status),
      transcriptId: body.transcriptId === undefined ? undefined : String(body.transcriptId),
      totalSeconds: body.totalSeconds === undefined ? undefined : Number(body.totalSeconds),
      code: body.code === undefined ? undefined : String(body.code),
      message: body.message === undefined ? undefined : String(body.message),
    };
  }
  if (type === 'recording') {
    return { ...body, type, recordingId: String(body.recordingId ?? '') };
  }
  if (type === 'import') {
    const status = String(body.status ?? 'requested');
    return {
      type,
      id: String(body.id ?? ''),
      recordingId: String(body.recordingId ?? ''),
      source: String(body.source ?? ''),
      externalId: String(body.externalId ?? ''),
      status: status === 'completed' || status === 'failed' ? status : 'requested',
      reason: String(body.reason ?? ''),
      code: String(body.code ?? ''),
    };
  }
  if (type === 'insights') {
    return {
      type,
      recordingId: String(body.recordingId ?? ''),
      transcriptId: String(body.transcriptId ?? ''),
      status: body.status === 'failed' ? 'failed' : 'done',
      insightsId: String(body.insightsId ?? ''),
      sentiment: String(body.sentiment ?? ''),
      scoreTotal: Number(body.scoreTotal ?? 0),
      scoreMax: Number(body.scoreMax ?? 0),
      model: String(body.model ?? ''),
      code: String(body.code ?? ''),
      message: String(body.message ?? ''),
    };
  }
  return null;
}

export interface LiveSubscription {
  close(): void;
}

/**
 * Opens a stream and hands each event to `onEvent`. The browser's EventSource reconnects by
 * itself; `onState` reports open/closed/error so a page can show it.
 */
export function subscribeLive(
  url: string,
  onEvent: (event: LiveEvent) => void,
  onState?: (state: 'open' | 'error') => void,
  EventSourceImpl: typeof EventSource = EventSource,
): LiveSubscription {
  const source = new EventSourceImpl(url, { withCredentials: true });
  const handle = (type: string) => (raw: Event) => {
    const event = parseLiveEvent(type, (raw as MessageEvent<string>).data);
    if (event) onEvent(event);
  };
  for (const type of ['segment', 'job', 'recording', 'import', 'insights'])
    source.addEventListener(type, handle(type));
  source.onopen = () => onState?.('open');
  source.onerror = () => onState?.('error');
  return { close: () => source.close() };
}
