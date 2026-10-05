import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { SaveSearchInput, SearchFilter } from '../gen/graphql.js';
import {
  DeleteSavedSearchMutation,
  SaveSearchMutation,
  SavedSearchesQuery,
  SearchQuery,
} from '../operations/search.js';
import { useLikho } from '../provider.js';

export const searchKeys = {
  page: (query: string, filter: SearchFilter | undefined, page: number, pageSize: number) =>
    ['search', query, filter ?? {}, page, pageSize] as const,
  saved: ['search', 'saved'] as const,
};

/**
 * Transcript lines matching a few words (either layer, typos allowed), best first, a page at a
 * time, narrowed by language, recording, campaign, agent, disposition, source or when the call
 * happened. Nothing is asked while the query is empty; the previous page stays while the next loads.
 */
export function useSearch(query: string, filter?: SearchFilter, page = 1, pageSize = 20) {
  const client = useLikho();
  const text = query.trim();
  return useQuery({
    queryKey: searchKeys.page(text, filter, page, pageSize),
    queryFn: async () => (await client.request(SearchQuery, { query: text, filter, page, pageSize })).search,
    enabled: text.length > 0,
    placeholderData: keepPreviousData,
  });
}

/** The searches kept for later, newest first; shared by the workspace. */
export function useSavedSearches() {
  const client = useLikho();
  return useQuery({
    queryKey: searchKeys.saved,
    queryFn: async () => (await client.request(SavedSearchesQuery)).savedSearches,
  });
}

/** Keeps a search (the words and the filter) under a name. */
export function useSaveSearch() {
  const client = useLikho();
  const queries = useQueryClient();
  return useMutation({
    mutationFn: async (input: SaveSearchInput) =>
      (await client.request(SaveSearchMutation, { input })).saveSearch,
    onSuccess: () => queries.invalidateQueries({ queryKey: searchKeys.saved }),
  });
}

/** Removes a saved search (who saved it, or an admin). */
export function useDeleteSavedSearch() {
  const client = useLikho();
  const queries = useQueryClient();
  return useMutation({
    mutationFn: (input: { id: string }) => client.request(DeleteSavedSearchMutation, input),
    onSuccess: () => queries.invalidateQueries({ queryKey: searchKeys.saved }),
  });
}
