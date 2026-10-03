/** Transcripts as files: plain text with timestamps, or SRT subtitles. */

export interface Line {
  index: number;
  startSeconds: number;
  endSeconds: number;
  textScript: string;
  textRoman: string;
}

export type Layer = 'roman' | 'script' | 'both';

export function clock(seconds: number): string {
  const total = Math.floor(seconds);
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const secs = total % 60;
  const mm = String(minutes).padStart(2, '0');
  const ss = String(secs).padStart(2, '0');
  return hours ? `${hours}:${mm}:${ss}` : `${mm}:${ss}`;
}

function text(line: Line, layer: Layer): string {
  if (layer === 'roman') return line.textRoman;
  if (layer === 'script') return line.textScript;
  return `${line.textScript}\n${line.textRoman}`;
}

export function toTxt(lines: Line[], layer: Layer = 'roman'): string {
  return (
    lines
      .map((line) => `[${clock(line.startSeconds)} -> ${clock(line.endSeconds)}] ${text(line, layer)}`)
      .join('\n') + '\n'
  );
}

function srtTime(seconds: number): string {
  const totalMs = Math.round(seconds * 1000);
  const hours = Math.floor(totalMs / 3_600_000);
  const minutes = Math.floor((totalMs % 3_600_000) / 60_000);
  const secs = Math.floor((totalMs % 60_000) / 1000);
  const ms = totalMs % 1000;
  const pad = (n: number, width = 2) => String(n).padStart(width, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(secs)},${pad(ms, 3)}`;
}

export function toSrt(lines: Line[], layer: Layer = 'roman'): string {
  return lines
    .map(
      (line, i) =>
        `${i + 1}\n${srtTime(line.startSeconds)} --> ${srtTime(line.endSeconds)}\n${text(line, layer)}\n`,
    )
    .join('\n');
}

/** Offers a text file to save, from the browser. */
export function saveTextFile(name: string, content: string, mime = 'text/plain'): void {
  const url = URL.createObjectURL(new Blob([content], { type: `${mime};charset=utf-8` }));
  const link = document.createElement('a');
  link.href = url;
  link.download = name;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
