/**
 * People, invitations, passwords and the audit log. The admin hooks need an admin; the
 * invitation and reset hooks work without a sign-in (they are how a person gets one).
 */
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { AuditFilterInput, InviteUserInput, Role } from '../gen/graphql.js';
import {
  AcceptInvitationMutation,
  AuditLogQuery,
  ChangePasswordMutation,
  DisableUserMutation,
  EnableUserMutation,
  InvitationQuery,
  InvitationsQuery,
  InviteUserMutation,
  RequestPasswordResetMutation,
  ResetPasswordMutation,
  RevokeInvitationMutation,
  SetUserRoleMutation,
  UsersQuery,
} from '../operations/users.js';
import { useLikho } from '../provider.js';
import { accountKeys } from './account.js';

export const userKeys = {
  users: ['users'] as const,
  invitations: ['invitations'] as const,
  invitation: (token: string) => ['invitation', token] as const,
  audit: (filter: AuditFilterInput | undefined, first: number) => ['auditLog', filter ?? {}, first] as const,
  auditAll: ['auditLog'] as const,
};

/** The people of the workspace, newest first (admins). */
export function useUsers() {
  const client = useLikho();
  return useQuery({
    queryKey: userKeys.users,
    queryFn: async () => (await client.request(UsersQuery)).users,
  });
}

/** Invitations sent, newest first, accepted and revoked ones too (admins). */
export function useInvitations() {
  const client = useLikho();
  return useQuery({
    queryKey: userKeys.invitations,
    queryFn: async () => (await client.request(InvitationsQuery)).invitations,
  });
}

/** Invites a person by email. The answer carries the link, to pass on when mail is not set up. */
export function useInviteUser() {
  const client = useLikho();
  const queries = useQueryClient();
  return useMutation({
    mutationFn: async (input: InviteUserInput) =>
      (await client.request(InviteUserMutation, { input })).inviteUser,
    onSuccess: () => {
      void queries.invalidateQueries({ queryKey: userKeys.invitations });
      void queries.invalidateQueries({ queryKey: userKeys.auditAll });
    },
  });
}

export function useRevokeInvitation() {
  const client = useLikho();
  const queries = useQueryClient();
  return useMutation({
    mutationFn: (input: { id: string }) => client.request(RevokeInvitationMutation, input),
    onSuccess: () => {
      void queries.invalidateQueries({ queryKey: userKeys.invitations });
      void queries.invalidateQueries({ queryKey: userKeys.auditAll });
    },
  });
}

function usePersonChange<V extends { userId: string }>(
  mutate: (variables: V) => Promise<{ id: string; email: string; name: string; role: Role }>,
) {
  const queries = useQueryClient();
  return useMutation({
    mutationFn: mutate,
    onSuccess: () => {
      void queries.invalidateQueries({ queryKey: userKeys.users });
      void queries.invalidateQueries({ queryKey: userKeys.auditAll });
    },
  });
}

/** Changes what a person may do (admins). */
export function useSetUserRole() {
  const client = useLikho();
  return usePersonChange(
    async (input: { userId: string; role: Role }) =>
      (await client.request(SetUserRoleMutation, input)).setUserRole,
  );
}

/** The person cannot sign in any more; their sessions end now (admins). */
export function useDisableUser() {
  const client = useLikho();
  return usePersonChange(
    async (input: { userId: string }) => (await client.request(DisableUserMutation, input)).disableUser,
  );
}

export function useEnableUser() {
  const client = useLikho();
  return usePersonChange(
    async (input: { userId: string }) => (await client.request(EnableUserMutation, input)).enableUser,
  );
}

/** What an invitation link is for; `not_found` when it is used up, revoked or past its seven days. */
export function useInvitation(token: string | undefined) {
  const client = useLikho();
  return useQuery({
    queryKey: userKeys.invitation(token ?? ''),
    queryFn: async () => (await client.request(InvitationQuery, { token: token! })).invitation,
    enabled: Boolean(token),
    retry: false,
  });
}

/** Takes up an invitation: the person chooses a name and a password and is signed in. */
export function useAcceptInvitation() {
  const client = useLikho();
  const queries = useQueryClient();
  return useMutation({
    mutationFn: async (input: { token: string; name: string; password: string }) =>
      (await client.request(AcceptInvitationMutation, input)).acceptInvitation,
    onSuccess: (me) => queries.setQueryData(accountKeys.me, me),
  });
}

/** Asks for a reset link by mail. Always succeeds, so an address cannot be probed. */
export function useRequestPasswordReset() {
  const client = useLikho();
  return useMutation({
    mutationFn: (input: { email: string }) => client.request(RequestPasswordResetMutation, input),
  });
}

/** Chooses a new password through a reset link, and signs in. */
export function useResetPassword() {
  const client = useLikho();
  const queries = useQueryClient();
  return useMutation({
    mutationFn: async (input: { token: string; password: string }) =>
      (await client.request(ResetPasswordMutation, input)).resetPassword,
    onSuccess: (me) => queries.setQueryData(accountKeys.me, me),
  });
}

/** Changes your own password; the current one is needed. */
export function useChangePassword() {
  const client = useLikho();
  return useMutation({
    mutationFn: (input: { currentPassword: string; newPassword: string }) =>
      client.request(ChangePasswordMutation, input),
  });
}

/** Who changed what, newest first, page by page (admins). */
export function useAuditLog(filter?: AuditFilterInput, first = 50) {
  const client = useLikho();
  return useInfiniteQuery({
    queryKey: userKeys.audit(filter, first),
    queryFn: async ({ pageParam }) =>
      (await client.request(AuditLogQuery, { filter: filter ?? null, first, after: pageParam })).auditLog,
    initialPageParam: null as string | null,
    getNextPageParam: (page) => (page.hasMore ? page.endCursor : null),
  });
}
