import { graphql } from '../gen/index.js';

export const SearchQuery = graphql(`
  query Search($query: String!, $filter: SearchFilter, $page: Int, $pageSize: Int) {
    search(query: $query, filter: $filter, page: $page, pageSize: $pageSize) {
      total
      page
      pageSize
      processingMs
      hits {
        recording {
          ...RecordingFields
        }
        transcriptId
        segmentIndex
        startSeconds
        endSeconds
        textRoman
        textScript
        highlightRoman
        highlightScript
        language
      }
    }
  }
`);

export const SavedSearchFields = graphql(`
  fragment SavedSearchFields on SavedSearch {
    id
    name
    query
    filter {
      language
      recordingId
      campaign
      agent
      disposition
      source
      since
      until
      callSince
      callUntil
    }
    createdBy
    createdAt
  }
`);

export const SavedSearchesQuery = graphql(`
  query SavedSearches {
    savedSearches {
      ...SavedSearchFields
    }
  }
`);

export const SaveSearchMutation = graphql(`
  mutation SaveSearch($input: SaveSearchInput!) {
    saveSearch(input: $input) {
      ...SavedSearchFields
    }
  }
`);

export const DeleteSavedSearchMutation = graphql(`
  mutation DeleteSavedSearch($id: String!) {
    deleteSavedSearch(id: $id)
  }
`);
