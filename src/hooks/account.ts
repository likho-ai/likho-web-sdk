import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { LikhoError } from '../client.js';
import {
  ApiKeysQuery,
  CreateApiKeyMutation,
  LoginMutation,
  LogoutMutation,
  MeQuery,
  RevokeApiKeyMutation,
  SettingsQuery,
  UpdateSettingsMutation,
} from '../operations/account.js';
import { useLikho } from '../provider.js';

export const accountKeys = {
  me: ['me'] as const,
  settings: ['settings'] as const,
  apiKeys: ['apiKeys'] as const,
};

/** Who is signed in. `data` is null when nobody is (no error is raised for that). */
export function useMe() {
  const client = useLikho();
  return useQuery({
    queryKey: accountKeys.me,
    queryFn: async () => {
      try {
        return (await client.request(MeQuery, undefined, { probe: true })).me;
      } catch (error) {
        if (error instanceof LikhoError && error.code === 'unauthenticated') return null;
        throw error;
      }
    },
    staleTime: 60_000,
  });
}

export function useLogin() {
  const client = useLikho();
  const queries = useQueryClient();
  return useMutation({
    mutationFn: (input: { email: string; password: string }) => client.request(LoginMutation, input),
    onSuccess: (data) => {
      queries.setQueryData(accountKeys.me, data.login);
    },
  });
}

export function useLogout() {
  const client = useLikho();
  const queries = useQueryClient();
  return useMutation({
    mutationFn: () => client.request(LogoutMutation),
    onSuccess: () => {
      queries.setQueryData(accountKeys.me, null);
      queries.removeQueries({ predicate: (query) => query.queryKey[0] !== 'me' });
    },
  });
}

export function useSettings() {
  const client = useLikho();
  return useQuery({
    queryKey: accountKeys.settings,
    queryFn: async () => (await client.request(SettingsQuery)).settings,
  });
}

export function useUpdateSettings() {
  const client = useLikho();
  const queries = useQueryClient();
  return useMutation({
    mutationFn: (input: { autoTranscribe: boolean }) => client.request(UpdateSettingsMutation, input),
    onSuccess: (data) => queries.setQueryData(accountKeys.settings, data.updateSettings),
  });
}

export function useApiKeys() {
  const client = useLikho();
  return useQuery({
    queryKey: accountKeys.apiKeys,
    queryFn: async () => (await client.request(ApiKeysQuery)).apiKeys,
  });
}

export function useCreateApiKey() {
  const client = useLikho();
  const queries = useQueryClient();
  return useMutation({
    mutationFn: (input: { name: string }) => client.request(CreateApiKeyMutation, input),
    onSuccess: () => queries.invalidateQueries({ queryKey: accountKeys.apiKeys }),
  });
}

export function useRevokeApiKey() {
  const client = useLikho();
  const queries = useQueryClient();
  return useMutation({
    mutationFn: (input: { id: string }) => client.request(RevokeApiKeyMutation, input),
    onSuccess: () => queries.invalidateQueries({ queryKey: accountKeys.apiKeys }),
  });
}
