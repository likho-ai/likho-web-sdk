import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { CorrectSegmentInput, GlossaryTermInput, SpellingInput } from '../gen/graphql.js';
import {
  CorrectionsQuery,
  CorrectSegmentMutation,
  EnginesQuery,
  RetransliterateMutation,
  TranscriptQuery,
  TranscriptVersionsQuery,
} from '../operations/transcripts.js';
import {
  DeleteGlossaryTermMutation,
  DeleteSpellingMutation,
  GlossaryQuery,
  SpellingsQuery,
  UpsertGlossaryTermMutation,
  UpsertSpellingMutation,
} from '../operations/vocabulary.js';
import { useLikho } from '../provider.js';
import { recordingKeys } from './recordings.js';

export const transcriptKeys = {
  one: (id: string) => ['transcripts', 'one', id] as const,
  versions: (recordingId: string) => ['transcripts', 'versions', recordingId] as const,
  corrections: (recordingId: string) => ['transcripts', 'corrections', recordingId] as const,
  engines: ['engines'] as const,
  glossary: ['glossary'] as const,
  spellings: ['spellings'] as const,
};

export function useTranscript(id: string | undefined | null) {
  const client = useLikho();
  return useQuery({
    queryKey: transcriptKeys.one(id ?? ''),
    queryFn: async () => (await client.request(TranscriptQuery, { id: id! })).transcript,
    enabled: Boolean(id),
    staleTime: Infinity, // a version never changes
  });
}

export function useTranscriptVersions(recordingId: string | undefined) {
  const client = useLikho();
  return useQuery({
    queryKey: transcriptKeys.versions(recordingId ?? ''),
    queryFn: async () =>
      (await client.request(TranscriptVersionsQuery, { recordingId: recordingId! })).transcriptVersions,
    enabled: Boolean(recordingId),
  });
}

export function useRetransliterate() {
  const client = useLikho();
  const queries = useQueryClient();
  return useMutation({
    mutationFn: (input: { transcriptId: string }) => client.request(RetransliterateMutation, input),
    onSuccess: (data) => {
      const transcript = data.retransliterate;
      queries.setQueryData(transcriptKeys.one(transcript.id), transcript);
      void queries.invalidateQueries({ queryKey: transcriptKeys.versions(transcript.recordingId) });
      void queries.invalidateQueries({ queryKey: recordingKeys.one(transcript.recordingId) });
    },
  });
}

/**
 * Replaces one line with what the person wrote: the answer is the new version with every line,
 * put straight into the cache; the versions, the corrections and the recording are refreshed.
 */
export function useCorrectSegment() {
  const client = useLikho();
  const queries = useQueryClient();
  return useMutation({
    mutationFn: (input: CorrectSegmentInput) => client.request(CorrectSegmentMutation, { input }),
    onSuccess: (data) => {
      const transcript = data.correctSegment;
      queries.setQueryData(transcriptKeys.one(transcript.id), transcript);
      void queries.invalidateQueries({ queryKey: transcriptKeys.versions(transcript.recordingId) });
      void queries.invalidateQueries({ queryKey: transcriptKeys.corrections(transcript.recordingId) });
      void queries.invalidateQueries({ queryKey: recordingKeys.one(transcript.recordingId) });
    },
  });
}

/** Every correction made to a recording's transcripts, newest first. */
export function useCorrections(recordingId: string | undefined) {
  const client = useLikho();
  return useQuery({
    queryKey: transcriptKeys.corrections(recordingId ?? ''),
    queryFn: async () => (await client.request(CorrectionsQuery, { recordingId: recordingId! })).corrections,
    enabled: Boolean(recordingId),
  });
}

export function useEngines() {
  const client = useLikho();
  return useQuery({
    queryKey: transcriptKeys.engines,
    queryFn: async () => (await client.request(EnginesQuery)).engines,
    staleTime: 300_000,
  });
}

export function useGlossary() {
  const client = useLikho();
  return useQuery({
    queryKey: transcriptKeys.glossary,
    queryFn: async () => (await client.request(GlossaryQuery)).glossary,
  });
}

export function useUpsertGlossaryTerm() {
  const client = useLikho();
  const queries = useQueryClient();
  return useMutation({
    mutationFn: (input: GlossaryTermInput) => client.request(UpsertGlossaryTermMutation, { input }),
    onSuccess: () => queries.invalidateQueries({ queryKey: transcriptKeys.glossary }),
  });
}

export function useDeleteGlossaryTerm() {
  const client = useLikho();
  const queries = useQueryClient();
  return useMutation({
    mutationFn: (input: { id: string }) => client.request(DeleteGlossaryTermMutation, input),
    onSuccess: () => queries.invalidateQueries({ queryKey: transcriptKeys.glossary }),
  });
}

export function useSpellings() {
  const client = useLikho();
  return useQuery({
    queryKey: transcriptKeys.spellings,
    queryFn: async () => (await client.request(SpellingsQuery)).spellings,
  });
}

export function useUpsertSpelling() {
  const client = useLikho();
  const queries = useQueryClient();
  return useMutation({
    mutationFn: (input: SpellingInput) => client.request(UpsertSpellingMutation, { input }),
    onSuccess: () => queries.invalidateQueries({ queryKey: transcriptKeys.spellings }),
  });
}

export function useDeleteSpelling() {
  const client = useLikho();
  const queries = useQueryClient();
  return useMutation({
    mutationFn: (input: { id: string }) => client.request(DeleteSpellingMutation, input),
    onSuccess: () => queries.invalidateQueries({ queryKey: transcriptKeys.spellings }),
  });
}
