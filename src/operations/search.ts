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
