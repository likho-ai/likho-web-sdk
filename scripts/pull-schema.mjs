// Fetches the GraphQL schema of a likho-api version:  node scripts/pull-schema.mjs v0.1.0
import { writeFileSync } from 'node:fs';

const tag = process.argv[2] ?? 'main';
const url = `https://raw.githubusercontent.com/likho-ai/likho-api/${tag}/schema.graphql`;
const response = await fetch(url);
if (!response.ok) throw new Error(`${url}: ${response.status}`);
writeFileSync('schema/schema.graphql', await response.text());
console.log(`schema/schema.graphql <- likho-api ${tag}`);
