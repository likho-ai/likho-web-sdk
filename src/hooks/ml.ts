import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { RegisterSpeechModelInput } from '../gen/graphql.js';
import {
  AddToGoldSetMutation,
  EvaluationQuery,
  EvaluationsQuery,
  GoldSetQuery,
  RegisterSpeechModelMutation,
  RemoveFromGoldSetMutation,
  RetireSpeechModelMutation,
  SetDefaultSpeechModelMutation,
  SpeechModelsQuery,
  StartEvaluationMutation,
  TrainingStatsQuery,
} from '../operations/ml.js';
import { useLikho } from '../provider.js';

export const mlKeys = {
  all: ['ml'] as const,
  models: (includeRetired: boolean) => ['ml', 'models', includeRetired] as const,
  gold: ['ml', 'gold'] as const,
  evaluations: (modelId: string) => ['ml', 'evaluations', modelId] as const,
  evaluation: (id: string) => ['ml', 'evaluation', id] as const,
  training: ['ml', 'training'] as const,
};

/** How often a queued or running evaluation is asked about. */
const FOLLOW_MS = 3_000;

/** The speech models, the default first, each with its latest scores. */
export function useSpeechModels(includeRetired = false) {
  const client = useLikho();
  return useQuery({
    queryKey: mlKeys.models(includeRetired),
    queryFn: async () => (await client.request(SpeechModelsQuery, { includeRetired })).speechModels,
  });
}

/** The workspace's gold set: the recordings whose corrected transcript is the reference. */
export function useGoldSet() {
  const client = useLikho();
  return useQuery({
    queryKey: mlKeys.gold,
    queryFn: async () => (await client.request(GoldSetQuery)).goldSet,
  });
}

/**
 * The workspace's evaluations, newest first (of one model, or all). While one is queued or
 * running the list is asked again every few seconds, until it is done.
 */
export function useEvaluations(modelId?: string) {
  const client = useLikho();
  return useQuery({
    queryKey: mlKeys.evaluations(modelId ?? ''),
    queryFn: async () => (await client.request(EvaluationsQuery, { modelId, first: 20 })).evaluations,
    refetchInterval: (query) =>
      query.state.data?.some((e) => e.status === 'queued' || e.status === 'running') ? FOLLOW_MS : false,
  });
}

/** One evaluation with each gold recording's scores; followed while it runs. */
export function useEvaluation(id: string | undefined | null) {
  const client = useLikho();
  return useQuery({
    queryKey: mlKeys.evaluation(id ?? ''),
    queryFn: async () => (await client.request(EvaluationQuery, { id: id! })).evaluation,
    enabled: Boolean(id),
    refetchInterval: (query) =>
      query.state.data && (query.state.data.status === 'queued' || query.state.data.status === 'running')
        ? FOLLOW_MS
        : false,
  });
}

/** What people's corrections have given as training data so far. */
export function useTrainingStats() {
  const client = useLikho();
  return useQuery({
    queryKey: mlKeys.training,
    queryFn: async () => (await client.request(TrainingStatsQuery)).trainingStats,
    staleTime: 60_000,
  });
}

function useMlMutation<V, R>(run: (variables: V) => Promise<R>) {
  const queries = useQueryClient();
  return useMutation({
    mutationFn: run,
    onSuccess: () => queries.invalidateQueries({ queryKey: mlKeys.all }),
  });
}

/** Makes a model the one new transcriptions use (admins). */
export function useSetDefaultSpeechModel() {
  const client = useLikho();
  return useMlMutation(
    async (id: string) => (await client.request(SetDefaultSpeechModelMutation, { id })).setDefaultSpeechModel,
  );
}

/** Adds a model to the registry: a fine-tuned one, or another size (admins). */
export function useRegisterSpeechModel() {
  const client = useLikho();
  return useMlMutation(
    async (input: RegisterSpeechModelInput) =>
      (await client.request(RegisterSpeechModelMutation, { input })).registerSpeechModel,
  );
}

/** Retires a model: kept for history, never the default (admins). */
export function useRetireSpeechModel() {
  const client = useLikho();
  return useMlMutation(
    async (id: string) => (await client.request(RetireSpeechModelMutation, { id })).retireSpeechModel,
  );
}

/** Adds a recording whose transcript a person checked line by line to the gold set (admins). */
export function useAddToGoldSet() {
  const client = useLikho();
  return useMlMutation(
    async (recordingId: string) => (await client.request(AddToGoldSetMutation, { recordingId })).addToGoldSet,
  );
}

/** Takes a recording out of the gold set (admins). */
export function useRemoveFromGoldSet() {
  const client = useLikho();
  return useMlMutation(
    async (recordingId: string) =>
      (await client.request(RemoveFromGoldSetMutation, { recordingId })).removeFromGoldSet,
  );
}

/** Scores a model on the gold set; answers at once (queued), `useEvaluation` follows it (admins). */
export function useStartEvaluation() {
  const client = useLikho();
  return useMlMutation(
    async (modelId: string) => (await client.request(StartEvaluationMutation, { modelId })).startEvaluation,
  );
}
