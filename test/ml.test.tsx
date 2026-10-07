import { QueryClient } from '@tanstack/react-query';
import { act, renderHook, waitFor } from '@testing-library/react';
import type { ReactNode } from 'react';
import { describe, expect, it } from 'vitest';
import { LikhoClient } from '../src/client.js';
import {
  useAddToGoldSet,
  useEvaluation,
  useSetDefaultSpeechModel,
  useSpeechModels,
  useStartEvaluation,
} from '../src/hooks/ml.js';
import { LikhoProvider } from '../src/provider.js';

type Answer = (variables: Record<string, unknown>) => unknown;

/** A fake API: answers each operation by name, and counts the calls. */
function fakeApi(answers: Record<string, Answer>) {
  const calls: Record<string, number> = {};
  const impl = (async (_url: string, init: RequestInit) => {
    const { query, variables } = JSON.parse(init.body as string) as {
      query: string;
      variables: Record<string, unknown>;
    };
    const name = /(?:query|mutation) (\w+)/.exec(query)![1]!;
    calls[name] = (calls[name] ?? 0) + 1;
    const answer = answers[name];
    if (!answer) return new Response(JSON.stringify({ errors: [{ message: `no answer for ${name}` }] }));
    return new Response(JSON.stringify({ data: answer(variables) }));
  }) as unknown as typeof fetch;
  return { client: new LikhoClient({ baseUrl: 'http://x', fetch: impl }), calls };
}

const wrapperFor = (client: LikhoClient) => {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return ({ children }: { children: ReactNode }) => (
    <LikhoProvider client={client} queryClient={queryClient}>
      {children}
    </LikhoProvider>
  );
};

const rates = { werScript: 0.2, cerScript: 0.1, werRoman: 0.25, cerRoman: 0.12 };
const model = (id: string, isDefault: boolean) => ({
  id,
  registryId: `faster-whisper/${id}`,
  engine: 'faster-whisper',
  name: id,
  description: '',
  languages: [],
  artifactUri: '',
  baseModelId: '',
  status: 'available',
  isDefault,
  latestEvaluationId: null,
  latestScores: null,
  createdAt: null,
});
const evaluation = (status: string) => ({
  id: 'evl_1',
  modelId: 'large',
  registryId: 'faster-whisper/large',
  status,
  scores: rates,
  itemsTotal: 2,
  itemsDone: status === 'completed' ? 2 : 0,
  audioSeconds: 120,
  realtimeFactor: 2,
  error: '',
  startedBy: 'usr_1',
  createdAt: null,
  finishedAt: null,
  items: [],
});

describe('speech models', () => {
  it('lists the models and choosing a default refetches them', async () => {
    let chosen = 'turbo';
    const { client, calls } = fakeApi({
      SpeechModels: () => ({
        speechModels: [model('turbo', chosen === 'turbo'), model('large', chosen === 'large')],
      }),
      SetDefaultSpeechModel: ({ id }) => (
        (chosen = id as string),
        { setDefaultSpeechModel: model(chosen, true) }
      ),
    });
    const wrapper = wrapperFor(client);
    const { result } = renderHook(() => ({ models: useSpeechModels(), choose: useSetDefaultSpeechModel() }), {
      wrapper,
    });
    await waitFor(() => expect(result.current.models.data?.[0]?.isDefault).toBe(true));
    await act(() => result.current.choose.mutateAsync('large'));
    await waitFor(() => expect(result.current.models.data?.find((m) => m.isDefault)?.id).toBe('large'));
    expect(calls.SpeechModels).toBe(2);
  });

  it('a started evaluation is followed while it runs, and no longer once it is done', async () => {
    let status = 'queued';
    const { client, calls } = fakeApi({
      StartEvaluation: () => ({ startEvaluation: evaluation('queued') }),
      Evaluation: () => ({ evaluation: evaluation(status) }),
      AddToGoldSet: ({ recordingId }) => ({
        addToGoldSet: { recordingId, transcriptId: 'trn_1', transcriptVersion: 2 },
      }),
    });
    const wrapper = wrapperFor(client);
    const { result } = renderHook(
      () => ({ start: useStartEvaluation(), gold: useAddToGoldSet(), evaluation: useEvaluation('evl_1') }),
      { wrapper },
    );
    expect((await act(() => result.current.gold.mutateAsync('rec_1'))).transcriptVersion).toBe(2);
    expect((await act(() => result.current.start.mutateAsync('large'))).status).toBe('queued');
    await waitFor(() => expect(result.current.evaluation.data?.status).toBe('queued'));
    status = 'completed';
    await waitFor(() => expect(result.current.evaluation.data?.status).toBe('completed'), { timeout: 8_000 });
    expect(result.current.evaluation.data?.scores.werRoman).toBe(0.25);
    const asked = calls.Evaluation!;
    await new Promise((resolve) => setTimeout(resolve, 3_500));
    expect(calls.Evaluation).toBe(asked);
  }, 15_000);
});
