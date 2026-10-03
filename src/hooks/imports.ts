import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { ImportStatus, RequestImportInput } from '../gen/graphql.js';
import { ImportQuery, ImportsQuery, RequestImportMutation } from '../operations/imports.js';
import { useLikho } from '../provider.js';
import { recordingKeys } from './recordings.js';

export const importKeys = {
  all: ['imports'] as const,
  list: (status: ImportStatus[] | undefined, first: number) =>
    ['imports', 'list', status ?? [], first] as const,
  one: (id: string) => ['imports', 'one', id] as const,
};

/** Calls asked for from the dialer, newest first. */
export function useImports(status?: ImportStatus[], first = 50) {
  const client = useLikho();
  return useQuery({
    queryKey: importKeys.list(status, first),
    queryFn: async () =>
      (await client.request(ImportsQuery, { status: status ?? null, first, after: null })).imports,
  });
}

export function useImport(id: string | undefined) {
  const client = useLikho();
  return useQuery({
    queryKey: importKeys.one(id ?? ''),
    queryFn: async () => (await client.request(ImportQuery, { id: id! })).import,
    enabled: Boolean(id),
  });
}

/** Asks the dialer connector for a call by its id; the recording appears when it arrives. */
export function useRequestImport() {
  const client = useLikho();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: RequestImportInput) =>
      (await client.request(RequestImportMutation, { input })).requestImport,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: importKeys.all });
    },
  });
}

/** Refreshes the imports and the recordings, for a live update about an import. */
export function useRefreshImports() {
  const queryClient = useQueryClient();
  return () => {
    void queryClient.invalidateQueries({ queryKey: importKeys.all });
    void queryClient.invalidateQueries({ queryKey: recordingKeys.all });
  };
}
