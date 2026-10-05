import { graphql } from '../gen/index.js';

export const UserFields = graphql(`
  fragment UserFields on User {
    id
    email
    name
    role
    createdAt
    disabledAt
  }
`);

export const InvitationFields = graphql(`
  fragment InvitationFields on Invitation {
    id
    email
    name
    role
    invitedBy
    createdAt
    expiresAt
    acceptedAt
    revokedAt
  }
`);

export const UsersQuery = graphql(`
  query Users {
    users {
      ...UserFields
    }
  }
`);

export const InvitationsQuery = graphql(`
  query Invitations {
    invitations {
      ...InvitationFields
    }
  }
`);

export const InviteUserMutation = graphql(`
  mutation InviteUser($input: InviteUserInput!) {
    inviteUser(input: $input) {
      invitation {
        ...InvitationFields
      }
      link
      sent
    }
  }
`);

export const RevokeInvitationMutation = graphql(`
  mutation RevokeInvitation($id: String!) {
    revokeInvitation(id: $id)
  }
`);

export const SetUserRoleMutation = graphql(`
  mutation SetUserRole($userId: String!, $role: Role!) {
    setUserRole(userId: $userId, role: $role) {
      ...UserFields
    }
  }
`);

export const DisableUserMutation = graphql(`
  mutation DisableUser($userId: String!) {
    disableUser(userId: $userId) {
      ...UserFields
    }
  }
`);

export const EnableUserMutation = graphql(`
  mutation EnableUser($userId: String!) {
    enableUser(userId: $userId) {
      ...UserFields
    }
  }
`);

/** Public: what an invitation link is for. */
export const InvitationQuery = graphql(`
  query Invitation($token: String!) {
    invitation(token: $token) {
      email
      name
      role
      workspace
    }
  }
`);

/** Public: takes up an invitation and signs in. */
export const AcceptInvitationMutation = graphql(`
  mutation AcceptInvitation($token: String!, $name: String!, $password: String!) {
    acceptInvitation(token: $token, name: $name, password: $password) {
      id
      email
      name
      role
      workspace {
        id
        name
      }
    }
  }
`);

export const RequestPasswordResetMutation = graphql(`
  mutation RequestPasswordReset($email: String!) {
    requestPasswordReset(email: $email)
  }
`);

export const ResetPasswordMutation = graphql(`
  mutation ResetPassword($token: String!, $password: String!) {
    resetPassword(token: $token, password: $password) {
      id
      email
      name
      role
      workspace {
        id
        name
      }
    }
  }
`);

export const ChangePasswordMutation = graphql(`
  mutation ChangePassword($currentPassword: String!, $newPassword: String!) {
    changePassword(currentPassword: $currentPassword, newPassword: $newPassword)
  }
`);

export const AuditLogQuery = graphql(`
  query AuditLog($filter: AuditFilterInput, $first: Int, $after: String) {
    auditLog(filter: $filter, first: $first, after: $after) {
      items {
        id
        actorKind
        actorId
        actorName
        action
        targetKind
        targetId
        details
        ip
        createdAt
      }
      hasMore
      endCursor
    }
  }
`);
