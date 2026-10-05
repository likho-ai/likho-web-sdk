import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { LikhoClient, type ClientOptions } from './client.js';

const ClientContext = createContext<LikhoClient | null>(null);

export interface LikhoProviderProps extends ClientOptions {
  /** A client to use instead of making one (tests). */
  client?: LikhoClient;
  /** A query client to use instead of making one. */
  queryClient?: QueryClient;
  children: ReactNode;
}

/** Puts the API client and the query cache at the top of the app. */
export function LikhoProvider({ client, queryClient, children, ...options }: LikhoProviderProps) {
  const likho = useMemo(
    () => client ?? new LikhoClient(options),
    [client, options.baseUrl, options.fetch, options.onUnauthenticated, options.token],
  );
  const queries = useMemo(
    () =>
      queryClient ??
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: (count, error) => count < 2 && (error as { code?: string }).code !== 'unauthenticated',
            staleTime: 5_000,
            refetchOnWindowFocus: false,
          },
        },
      }),
    [queryClient],
  );
  return (
    <ClientContext.Provider value={likho}>
      <QueryClientProvider client={queries}>{children}</QueryClientProvider>
    </ClientContext.Provider>
  );
}

/** The API client of the nearest LikhoProvider. */
export function useLikho(): LikhoClient {
  const client = useContext(ClientContext);
  if (!client) throw new Error('useLikho needs a <LikhoProvider> above it');
  return client;
}
