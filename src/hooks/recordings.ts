import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useRef, useState } from 'react';
import { uploadFile } from '../client.js';
import type { CreateJobInput, RecordingFilter, RequestUploadInput } from '../gen/graphql.js';
import {
  CancelJobMutation,
  CreateJobMutation,
  DeleteRecordingMutation,
  JobsQuery,
  RecordingCountsQuery,
  RecordingQuery,
  RecordingsQuery,
  RequestUploadMutation,
} from '../operations/recordings.js';
import { useLikho } from '../provider.js';

export const recordingKeys = {
  all: ['recordings'] as const,
  list: (filter: RecordingFilter | undefined, first: number) =>
    ['recordings', 'list', filter ?? {}, first] as const,
  counts: ['recordings', 'counts'] as const,
  one: (id: string) => ['recordings', 'one', id] as const,
  jobs: (recordingId?: string) => ['jobs', recordingId ?? 'all'] as const,
};

/** The recordings of the workspace, newest first, page by page. */
export function useRecordings(filter?: RecordingFilter, first = 50) {
  const client = useLikho();
  return useInfiniteQuery({
    queryKey: recordingKeys.list(filter, first),
    queryFn: async ({ pageParam }) =>
      (await client.request(RecordingsQuery, { filter, first, after: pageParam })).recordings,
    initialPageParam: null as string | null,
    getNextPageParam: (page) => (page.hasMore ? page.endCursor : null),
  });
}

export function useRecordingCounts() {
  const client = useLikho();
  return useQuery({
    queryKey: recordingKeys.counts,
    queryFn: async () => (await client.request(RecordingCountsQuery)).recordingCounts,
  });
}

export function useRecording(id: string | undefined) {
  const client = useLikho();
  return useQuery({
    queryKey: recordingKeys.one(id ?? ''),
    queryFn: async () => (await client.request(RecordingQuery, { id: id! })).recording,
    enabled: Boolean(id),
  });
}

export function useJobs(recordingId?: string) {
  const client = useLikho();
  return useQuery({
    queryKey: recordingKeys.jobs(recordingId),
    queryFn: async () =>
      (await client.request(JobsQuery, { recordingId: recordingId ?? null, status: null })).jobs,
  });
}

/** Refreshes every list, count and detail of recordings and jobs. */
export function useRefreshRecordings() {
  const queries = useQueryClient();
  return useCallback(
    (recordingId?: string) => {
      void queries.invalidateQueries({ queryKey: recordingKeys.all });
      void queries.invalidateQueries({ queryKey: ['jobs'] });
      if (recordingId) void queries.invalidateQueries({ queryKey: recordingKeys.one(recordingId) });
    },
    [queries],
  );
}

export function useCreateJob() {
  const client = useLikho();
  const refresh = useRefreshRecordings();
  return useMutation({
    mutationFn: (input: CreateJobInput) => client.request(CreateJobMutation, { input }),
    onSuccess: (data) => refresh(data.createJob.recordingId),
  });
}

export function useCancelJob() {
  const client = useLikho();
  const refresh = useRefreshRecordings();
  return useMutation({
    mutationFn: (input: { id: string }) => client.request(CancelJobMutation, input),
    onSuccess: (data) => refresh(data.cancelJob.recordingId),
  });
}

export function useDeleteRecording() {
  const client = useLikho();
  const refresh = useRefreshRecordings();
  return useMutation({
    mutationFn: (input: { id: string }) => client.request(DeleteRecordingMutation, input),
    onSuccess: () => refresh(),
  });
}

export type UploadState = 'waiting' | 'uploading' | 'done' | 'duplicate' | 'failed';

export interface UploadItem {
  /** A key for the list; the file's name and size. */
  key: string;
  name: string;
  sizeBytes: number;
  state: UploadState;
  /** 0..1 while uploading. */
  progress: number;
  recordingId?: string;
  /** The recording that already had this content. */
  duplicateOfId?: string;
  error?: string;
}

/**
 * Uploads files one after the other: asks the API for a link, sends the file to it, and reports
 * each file's progress. The list is kept until `clear()`.
 */
export function useUploader(options: { source?: 'upload'; onUploaded?: (recordingId: string) => void } = {}) {
  const client = useLikho();
  const refresh = useRefreshRecordings();
  const [items, setItems] = useState<UploadItem[]>([]);
  const queue = useRef<Promise<void>>(Promise.resolve());

  const update = (key: string, patch: Partial<UploadItem>) =>
    setItems((list) => list.map((item) => (item.key === key ? { ...item, ...patch } : item)));

  const uploadOne = async (key: string, file: File) => {
    update(key, { state: 'uploading', progress: 0 });
    try {
      const input: RequestUploadInput = {
        originalName: file.name,
        sizeBytes: file.size,
        contentType: file.type || null,
      };
      const { requestUpload } = await client.request(RequestUploadMutation, { input });
      if (!requestUpload.uploadUrl) {
        update(key, {
          state: 'duplicate',
          progress: 1,
          recordingId: requestUpload.recording.id,
          duplicateOfId: requestUpload.duplicateOf?.id,
        });
        refresh();
        return;
      }
      const answer = await uploadFile(requestUpload.uploadUrl, file, {
        onProgress: (fraction) => update(key, { progress: fraction }),
      });
      update(key, {
        state: 'done',
        progress: 1,
        recordingId: requestUpload.recording.id,
        duplicateOfId: answer.duplicateOf,
      });
      refresh(requestUpload.recording.id);
      options.onUploaded?.(requestUpload.recording.id);
    } catch (error) {
      update(key, { state: 'failed', error: error instanceof Error ? error.message : String(error) });
    }
  };

  const add = useCallback(
    (files: FileList | File[]) => {
      const list = Array.from(files);
      const fresh = list.map<UploadItem>((file) => ({
        key: `${file.name}-${file.size}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        name: file.name,
        sizeBytes: file.size,
        state: 'waiting',
        progress: 0,
      }));
      setItems((current) => [...current, ...fresh]);
      for (const [i, file] of list.entries()) {
        const key = fresh[i]!.key;
        queue.current = queue.current.then(() => uploadOne(key, file));
      }
    },
    [client],
  );

  const clear = useCallback(
    () => setItems((list) => list.filter((item) => item.state === 'uploading' || item.state === 'waiting')),
    [],
  );
  return { items, add, clear };
}
