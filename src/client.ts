/**
 * The connection to likho-api: GraphQL over fetch with the session cookie, file uploads to the
 * links likho-media hands out, and server-sent events.
 */
import type { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { print } from 'graphql';

export type ErrorCode =
  | 'unauthenticated'
  | 'forbidden'
  | 'not_found'
  | 'invalid'
  | 'conflict'
  | 'service_unavailable'
  | 'network'
  | 'error';

/** An error from the API, with the code the API uses, and a message meant for people. */
export class LikhoError extends Error {
  constructor(
    readonly code: ErrorCode,
    message: string,
  ) {
    super(message);
    this.name = 'LikhoError';
  }
}

export interface ClientOptions {
  /** Where likho-api is reached: the gateway. Default: the page's own origin. */
  baseUrl?: string;
  /** Replaces fetch (tests). */
  fetch?: typeof fetch;
  /** Called when a request is refused for lack of a session (the app shows the sign-in page). */
  onUnauthenticated?: () => void;
}

interface GraphQLResponse<T> {
  data?: T;
  errors?: { message: string; extensions?: { code?: string } }[];
}

const KNOWN: ErrorCode[] = [
  'unauthenticated',
  'forbidden',
  'not_found',
  'invalid',
  'conflict',
  'service_unavailable',
];

export class LikhoClient {
  readonly baseUrl: string;
  private readonly fetchImpl: typeof fetch;
  private readonly onUnauthenticated?: () => void;

  constructor(options: ClientOptions = {}) {
    this.baseUrl = (options.baseUrl ?? (typeof location !== 'undefined' ? location.origin : '')).replace(
      /\/$/,
      '',
    );
    this.fetchImpl = options.fetch ?? fetch.bind(globalThis);
    this.onUnauthenticated = options.onUnauthenticated;
  }

  /** Runs one typed operation. Throws LikhoError with the API's code. */
  async request<TResult, TVariables>(
    document: TypedDocumentNode<TResult, TVariables>,
    ...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
  ): Promise<TResult> {
    let response: Response;
    try {
      response = await this.fetchImpl(`${this.baseUrl}/graphql`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'content-type': 'application/json', accept: 'application/json' },
        body: JSON.stringify({ query: print(document), variables: variables ?? {} }),
      });
    } catch {
      throw new LikhoError('network', 'The server could not be reached. Check the connection and try again.');
    }
    let body: GraphQLResponse<TResult>;
    try {
      body = (await response.json()) as GraphQLResponse<TResult>;
    } catch {
      throw new LikhoError('error', `The server answered ${response.status} without a result.`);
    }
    const first = body.errors?.[0];
    if (first) {
      const code = first.extensions?.code;
      const known = KNOWN.includes(code as ErrorCode) ? (code as ErrorCode) : 'error';
      if (known === 'unauthenticated') this.onUnauthenticated?.();
      throw new LikhoError(known, first.message);
    }
    if (!body.data) throw new LikhoError('error', 'The server answered without data.');
    return body.data;
  }

  /** The address of a server-sent events stream of this API. */
  eventsUrl(path: string): string {
    return `${this.baseUrl}${path}`;
  }
}

/**
 * Sends a file to the upload link from `requestUpload`, reporting progress from 0 to 1.
 * Resolves with likho-media's answer. XMLHttpRequest is used because fetch reports no upload progress.
 */
export function uploadFile(
  uploadUrl: string,
  file: Blob,
  options: { onProgress?: (fraction: number) => void; signal?: AbortSignal } = {},
): Promise<{ mediaId: string; sha256: string; sizeBytes: number; duplicateOf?: string }> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', uploadUrl);
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable && options.onProgress) options.onProgress(event.loaded / event.total);
    };
    xhr.onerror = () =>
      reject(new LikhoError('network', 'The upload failed. Check the connection and try again.'));
    xhr.onabort = () => reject(new LikhoError('error', 'The upload was cancelled.'));
    xhr.onload = () => {
      let body: Record<string, unknown> = {};
      try {
        body = JSON.parse(xhr.responseText) as Record<string, unknown>;
      } catch {
        /* no JSON body */
      }
      if (xhr.status === 200 || xhr.status === 201) {
        resolve({
          mediaId: String(body.media_id ?? ''),
          sha256: String(body.sha256 ?? ''),
          sizeBytes: Number(body.size_bytes ?? 0),
          duplicateOf: body.duplicate_of ? String(body.duplicate_of) : undefined,
        });
        return;
      }
      const error = (body.error ?? {}) as { code?: string; message?: string };
      const code: ErrorCode = xhr.status === 413 ? 'invalid' : xhr.status === 403 ? 'forbidden' : 'error';
      reject(new LikhoError(code, error.message ?? `The upload was refused (${xhr.status}).`));
    };
    options.signal?.addEventListener('abort', () => xhr.abort());
    if (file.type) xhr.setRequestHeader('content-type', file.type);
    xhr.send(file);
  });
}
