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
      dialer {
        scheduleEnabled
        campaigns
        minTalkSeconds
        dailyLimit
        batchLimit
        pollIntervalSeconds
        phoneDigits
        writebackEnabled
      }
    }
  }
`);

export const UpdateSettingsMutation = graphql(`
  mutation UpdateSettings($input: SettingsInput!) {
    updateSettings(input: $input) {
      autoTranscribe
      dialer {
        scheduleEnabled
        campaigns
        minTalkSeconds
        dailyLimit
        batchLimit
        pollIntervalSeconds
        phoneDigits
        writebackEnabled
      }
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

export const SystemStatusQuery = graphql(`
  query SystemStatus {
    systemStatus {
      version
      checkedAt
      services {
        name
        address
        ok
        detail
        latencyMs
      }
    }
  }
`);
