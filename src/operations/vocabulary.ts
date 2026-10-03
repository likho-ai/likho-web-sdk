import { graphql } from '../gen/index.js';

export const GlossaryQuery = graphql(`
  query Glossary {
    glossary {
      id
      term
      language
      enabled
      note
    }
  }
`);

export const UpsertGlossaryTermMutation = graphql(`
  mutation UpsertGlossaryTerm($input: GlossaryTermInput!) {
    upsertGlossaryTerm(input: $input) {
      id
      term
      language
      enabled
      note
    }
  }
`);

export const DeleteGlossaryTermMutation = graphql(`
  mutation DeleteGlossaryTerm($id: String!) {
    deleteGlossaryTerm(id: $id)
  }
`);

export const SpellingsQuery = graphql(`
  query Spellings {
    spellings {
      id
      source
      target
      isPhrase
      enabled
    }
  }
`);

export const UpsertSpellingMutation = graphql(`
  mutation UpsertSpelling($input: SpellingInput!) {
    upsertSpelling(input: $input) {
      id
      source
      target
      isPhrase
      enabled
    }
  }
`);

export const DeleteSpellingMutation = graphql(`
  mutation DeleteSpelling($id: String!) {
    deleteSpelling(id: $id)
  }
`);
