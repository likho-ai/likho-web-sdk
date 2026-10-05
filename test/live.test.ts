import { parseLiveEvent, subscribeLive } from '../src/live.js';

describe('live events', () => {
  it('parses the five kinds and ignores the rest', () => {
    const segment = {
      jobId: 'job_1',
      recordingId: 'rec_1',
      index: 2,
      startSeconds: 1.5,
      endSeconds: 3,
      textScript: 'नमस्ते',
      textRoman: 'namaste',
      totalSeconds: 60,
    };
    expect(parseLiveEvent('segment', JSON.stringify(segment))).toEqual({ type: 'segment', ...segment });
    expect(
      parseLiveEvent(
        'job',
        JSON.stringify({ jobId: 'job_1', recordingId: 'rec_1', status: 'done', transcriptId: 'trn_1' }),
      ),
    ).toMatchObject({ type: 'job', status: 'done', transcriptId: 'trn_1' });
    expect(parseLiveEvent('recording', JSON.stringify({ recordingId: 'rec_1', status: 'ready' }))).toEqual({
      type: 'recording',
      recordingId: 'rec_1',
      status: 'ready',
    });
    expect(
      parseLiveEvent(
        'import',
        JSON.stringify({
          id: 'imp_1',
          externalId: 'd000-1',
          source: 'ameyo',
          status: 'failed',
          code: 'no_recording',
        }),
      ),
    ).toEqual({
      type: 'import',
      id: 'imp_1',
      recordingId: '',
      source: 'ameyo',
      externalId: 'd000-1',
      status: 'failed',
      reason: '',
      code: 'no_recording',
    });
    expect(parseLiveEvent('import', JSON.stringify({ id: 'imp_2', status: 'odd' }))).toMatchObject({
      status: 'requested',
    });
    expect(
      parseLiveEvent(
        'insights',
        JSON.stringify({
          recordingId: 'rec_1',
          transcriptId: 'trn_1',
          status: 'done',
          insightsId: 'ins_1',
          sentiment: 'positive',
          scoreTotal: 16,
          scoreMax: 20,
          model: 'fake/one',
        }),
      ),
    ).toEqual({
      type: 'insights',
      recordingId: 'rec_1',
      transcriptId: 'trn_1',
      status: 'done',
      insightsId: 'ins_1',
      sentiment: 'positive',
      scoreTotal: 16,
      scoreMax: 20,
      model: 'fake/one',
      code: '',
      message: '',
    });
    expect(
      parseLiveEvent(
        'insights',
        JSON.stringify({
          recordingId: 'rec_1',
          status: 'failed',
          code: 'model_error',
          message: 'rate limited',
        }),
      ),
    ).toMatchObject({ type: 'insights', status: 'failed', code: 'model_error', message: 'rate limited' });
    expect(parseLiveEvent('other', '{}')).toBeNull();
    expect(parseLiveEvent('segment', 'not json')).toBeNull();
  });

  it('listens to a stream and hands over each event', () => {
    const listeners: Record<string, (e: Event) => void> = {};
    let closed = false;
    class FakeSource {
      onopen: null | (() => void) = null;
      onerror: null | (() => void) = null;
      constructor(
        readonly url: string,
        readonly init: EventSourceInit,
      ) {}
      addEventListener(type: string, listener: (e: Event) => void) {
        listeners[type] = listener;
      }
      close() {
        closed = true;
      }
    }
    const seen: unknown[] = [];
    const states: string[] = [];
    const subscription = subscribeLive(
      'http://x/events/jobs/job_1',
      (e) => seen.push(e),
      (s) => states.push(s),
      FakeSource as unknown as typeof EventSource,
    );
    listeners.segment!(
      new MessageEvent('segment', {
        data: JSON.stringify({ jobId: 'job_1', recordingId: 'rec_1', index: 0 }),
      }),
    );
    listeners.job!(
      new MessageEvent('job', {
        data: JSON.stringify({ jobId: 'job_1', recordingId: 'rec_1', status: 'done' }),
      }),
    );
    expect(seen).toHaveLength(2);
    expect((seen[1] as { status: string }).status).toBe('done');
    subscription.close();
    expect(closed).toBe(true);
  });
});
