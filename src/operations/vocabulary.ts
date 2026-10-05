import { graphql } from '../gen/index.js';

export const GlossaryTermFields = graphql(`
  fragment GlossaryTermFields on GlossaryTerm {
    id
    term
    language
    enabled
    note
    isPhrase
    heard
    lastHeardAt
  }
`);

export const SpellingFields = graphql(`
  fragment SpellingFields on Spelling {
    id
    source
    target
    isPhrase
    enabled
    applied
    lastAppliedAt
    examples {
      recordingId
      segmentIndex
      before
      after
      heardAt
    }
  }
`);

export const GlossaryQuery = graphql(`
  query Glossary {
    glossary {
      ...GlossaryTermFields
    }
  }
`);

export const UpsertGlossaryTermMutation = graphql(`
  mutation UpsertGlossaryTerm($input: GlossaryTermInput!) {
    upsertGlossaryTerm(input: $input) {
      ...GlossaryTermFields
    }
  }
`);

export const DeleteGlossaryTermMutation = graphql(`
  mutation DeleteGlossaryTerm($id: String!) {
    deleteGlossaryTerm(id: $id)
  }
`);

export const ImportGlossaryCsvMutation = graphql(`
  mutation ImportGlossaryCsv($csv: String!) {
    importGlossaryCsv(csv: $csv) {
      added
      updated
    }
  }
`);

export const GlossaryCsvQuery = graphql(`
  query GlossaryCsv {
    glossaryCsv
  }
`);

export const SpellingsQuery = graphql(`
  query Spellings {
    spellings {
      ...SpellingFields
    }
  }
`);

export const UpsertSpellingMutation = graphql(`
  mutation UpsertSpelling($input: SpellingInput!) {
    upsertSpelling(input: $input) {
      ...SpellingFields
    }
  }
`);

export const DeleteSpellingMutation = graphql(`
  mutation DeleteSpelling($id: String!) {
    deleteSpelling(id: $id)
  }
`);

export const ImportSpellingsCsvMutation = graphql(`
  mutation ImportSpellingsCsv($csv: String!) {
    importSpellingsCsv(csv: $csv) {
      added
      updated
    }
  }
`);

export const SpellingsCsvQuery = graphql(`
  query SpellingsCsv {
    spellingsCsv
  }
`);
