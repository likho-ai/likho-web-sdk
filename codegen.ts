import type { CodegenConfig } from '@graphql-codegen/cli';

// Typed documents and result types from likho-api's schema. Run `pnpm codegen` after changing
// an operation in src/operations or pulling a new schema.
const config: CodegenConfig = {
  schema: 'schema/schema.graphql',
  documents: ['src/operations/**/*.ts'],
  generates: {
    'src/gen/': {
      preset: 'client',
      presetConfig: { fragmentMasking: false },
      config: { scalars: { DateTime: 'string' }, enumsAsTypes: true },
    },
  },
};
export default config;
