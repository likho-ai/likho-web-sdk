import { graphql } from '../gen/index.js';

export const MeQuery = graphql(`
  query Me {
    me {
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

export const LoginMutation = graphql(`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
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

export const LogoutMutation = graphql(`
  mutation Logout {
    logout
  }
`);

export const SettingsQuery = graphql(`
  query Settings {
    settings {
      autoTranscribe
    }
  }
`);

export const UpdateSettingsMutation = graphql(`
  mutation UpdateSettings($autoTranscribe: Boolean!) {
    updateSettings(autoTranscribe: $autoTranscribe) {
      autoTranscribe
    }
  }
`);

export const ApiKeysQuery = graphql(`
  query ApiKeys {
    apiKeys {
      id
      name
      createdAt
      lastUsedAt
      revokedAt
    }
  }
`);

export const CreateApiKeyMutation = graphql(`
  mutation CreateApiKey($name: String!) {
    createApiKey(name: $name) {
      id
      key
    }
  }
`);

export const RevokeApiKeyMutation = graphql(`
  mutation RevokeApiKey($id: String!) {
    revokeApiKey(id: $id)
  }
`);
