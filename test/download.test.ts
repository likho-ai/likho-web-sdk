import { clock, toSrt, toTxt } from '../src/download.js';

const lines = [
  { index: 0, startSeconds: 0.4, endSeconds: 3.1, textScript: 'नमस्ते', textRoman: 'namaste' },
  { index: 1, startSeconds: 3725, endSeconds: 3727.5, textScript: 'धन्यवाद', textRoman: 'dhanyavaad' },
];

describe('downloads', () => {
  it('formats clocks', () => {
    expect(clock(12.9)).toBe('00:12');
    expect(clock(3725)).toBe('1:02:05');
  });

  it('writes txt with the chosen layer', () => {
    expect(toTxt(lines)).toBe('[00:00 -> 00:03] namaste\n[1:02:05 -> 1:02:07] dhanyavaad\n');
    expect(toTxt(lines, 'script')).toContain('नमस्ते');
    expect(toTxt(lines, 'both')).toContain('नमस्ते\nnamaste');
  });

  it('writes srt', () => {
    expect(toSrt(lines)).toBe(
      '1\n00:00:00,400 --> 00:00:03,100\nnamaste\n\n2\n01:02:05,000 --> 01:02:07,500\ndhanyavaad\n',
    );
  });
});
