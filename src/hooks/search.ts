import { keepPreviousData, useQuery } from '@tanstack/react-query';
import type { SearchFilter } from '../gen/graphql.js';
import { SearchQuery } from '../operations/search.js';
import { useLikho } from '../provider.js';

export const searchKeys = {
  page: (query: string, filter: SearchFilter | undefined, page: number, pageSize: number) =>
    ['search', query, filter ?? {}, page, pageSize] as const,
};

/**
 * Transcript lines matching a few words (either layer, typos allowed), best first, a page at a
 * time. Nothing is asked while the query is empty; the previous page stays while the next loads.
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
