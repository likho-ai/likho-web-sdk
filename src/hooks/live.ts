import { useEffect, useRef, useState } from 'react';
import { subscribeLive, type LiveEvent, type LiveSegment } from '../live.js';
import { useLikho } from '../provider.js';
import { useRefreshImports } from './imports.js';
import { useRefreshRecordings } from './recordings.js';

export interface JobLive {
  /** The lines so far, in order, without repeats. */
  lines: LiveSegment[];
  /** The job's status as last reported: queued, running, done, failed, cancelled. */
  status: string | null;
  totalSeconds: number;
  /** The end of the last line written. */
  progressSeconds: number;
  transcriptId: string | null;
  error: string | null;
  connection: 'connecting' | 'open' | 'error';
}

const initial: JobLive = {
  lines: [],
  status: null,
  totalSeconds: 0,
  progressSeconds: 0,
  transcriptId: null,
  error: null,
  connection: 'connecting',
};

/**
 * Follows one job: the lines as they are transcribed and its end. Stops listening once the job
 * is over. When `done` arrives, fetch the stored transcript: a line or two may still be in
 * flight behind it, and the transcript is what counts.
 */
export function useJobLive(jobId: string | undefined | null, enabled = true): JobLive {
  const client = useLikho();
  const refresh = useRefreshRecordings();
  const [live, setLive] = useState<JobLive>(initial);
  const over = useRef(false);

  useEffect(() => {
    if (!jobId || !enabled) return;
    over.current = false;
    setLive(initial);
    const subscription = subscribeLive(
      client.eventsUrl(`/events/jobs/${jobId}`),
      (event: LiveEvent) => {
        if (event.type === 'segment') {
          setLive((state) => {
            if (state.lines.some((line) => line.index === event.index)) return state;
            const lines = [...state.lines, event].sort((a, b) => a.index - b.index);
            return {
              ...state,
              lines,
              totalSeconds: event.totalSeconds || state.totalSeconds,
              progressSeconds: Math.max(state.progressSeconds, event.endSeconds),
            };
          });
        } else if (event.type === 'job') {
          setLive((state) => ({
            ...state,
            status: event.status ?? state.status,
            totalSeconds: event.totalSeconds ?? state.totalSeconds,
            transcriptId: event.transcriptId ?? state.transcriptId,
            error: event.message ?? state.error,
          }));
          if (event.status && ['done', 'failed', 'cancelled'].includes(event.status)) {
            over.current = true;
            subscription.close();
            refresh(event.recordingId);
          }
        }
      },
      (connection) => {
        if (!over.current) setLive((state) => ({ ...state, connection }));
      },
    );
    return () => subscription.close();
  }, [client, jobId, enabled, refresh]);

  return live;
}

/**
 * Keeps the recordings list fresh: every change in the workspace refreshes the queries.
 * Mount it once per page that shows recordings.
 */
export function useWorkspaceLive(enabled = true): 'connecting' | 'open' | 'error' {
  const client = useLikho();
  const refresh = useRefreshRecordings();
  const refreshImports = useRefreshImports();
  const [connection, setConnection] = useState<'connecting' | 'open' | 'error'>('connecting');

  useEffect(() => {
    if (!enabled) return;
    let timer: ReturnType<typeof setTimeout> | null = null;
    const pending = new Set<string>();
    // Many events arrive together while a job runs; one refresh per 500 ms is enough.
    const schedule = (recordingId: string) => {
      pending.add(recordingId);
      if (timer) return;
      timer = setTimeout(() => {
        timer = null;
        const ids = [...pending];
        pending.clear();
        refresh();
        ids.forEach((id) => refresh(id));
      }, 500);
    };
    const subscription = subscribeLive(
      client.eventsUrl('/events/recordings'),
      (event) => {
        if (event.type === 'import') refreshImports();
        else if (event.type !== 'segment') schedule(event.recordingId);
      },
      setConnection,
    );
    return () => {
      subscription.close();
      if (timer) clearTimeout(timer);
    };
  }, [client, enabled, refresh, refreshImports]);

  return connection;
}
