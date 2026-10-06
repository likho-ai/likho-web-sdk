import { graphql } from '../gen/index.js';

export const DialerCampaignsQuery = graphql(`
  query DialerCampaigns($since: DateTime!, $until: DateTime!) {
    dialerCampaigns(since: $since, until: $until) {
      name
      calls
      connected
      interactions
      talkSeconds
    }
  }
`);

export const DialerAgentsQuery = graphql(`
  query DialerAgents($since: DateTime!, $until: DateTime!, $campaign: String) {
    dialerAgents(since: $since, until: $until, campaign: $campaign) {
      id
      name
      calls
      connected
      talkSeconds
    }
  }
`);

export const DialerCallsQuery = graphql(`
  query DialerCalls($filter: DialerCallsFilter!, $first: Int, $after: String) {
    dialerCalls(filter: $filter, first: $first, after: $after) {
      items {
        crtObjectId
        callId
        callTime
        campaign
        transferredCampaign
        agent
        agentId
        disposition
        callType
        connected
        talkSeconds
        phone
        hangupBy
        queue
        recordingId
        recordingStatus
      }
      nextCursor
    }
  }
`);

export const DialerStatusQuery = graphql(`
  query DialerStatus {
    dialerStatus {
      databaseConfigured
      scheduleEnabled
      cursor
      importedToday
      dailyLimit
      campaigns
      minTalkSeconds
      writebackEnabled
      archiveEnabled
      version
      lastRunAt
      lastRunSummary
    }
  }
`);

export const RequestImportsMutation = graphql(`
  mutation RequestImports($externalIds: [String!]!) {
    requestImports(externalIds: $externalIds) {
      id
      externalId
      status
    }
  }
`);
