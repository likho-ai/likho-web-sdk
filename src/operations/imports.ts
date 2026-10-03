import { graphql } from '../gen/index.js';

export const ImportFields = graphql(`
  fragment ImportFields on Import {
    id
    source
    externalId
    transcribe
    status
    recordingId
    reason
    code
    createdAt
    updatedAt
  }
`);

export const RequestImportMutation = graphql(`
  mutation RequestImport($input: RequestImportInput!) {
    requestImport(input: $input) {
      ...ImportFields
    }
  }
`);

export const ImportsQuery = graphql(`
  query Imports($status: [ImportStatus!], $first: Int, $after: String) {
    imports(status: $status, first: $first, after: $after) {
      items {
        ...ImportFields
      }
      hasMore
    }
  }
`);

export const ImportQuery = graphql(`
  query Import($id: String!) {
    import(id: $id) {
      ...ImportFields
    }
  }
`);
