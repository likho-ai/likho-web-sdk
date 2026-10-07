import { graphql } from '../gen/index.js';

export const ErrorRatesFields = graphql(`
  fragment ErrorRatesFields on ErrorRates {
    werScript
    cerScript
    werRoman
    cerRoman
  }
`);

export const SpeechModelFields = graphql(`
  fragment SpeechModelFields on SpeechModel {
    id
    registryId
    engine
    name
    description
    languages
    artifactUri
    baseModelId
    status
    isDefault
    latestEvaluationId
    latestScores {
      ...ErrorRatesFields
    }
    createdAt
  }
`);

export const EvaluationFields = graphql(`
  fragment EvaluationFields on Evaluation {
    id
    modelId
    registryId
    status
    scores {
      ...ErrorRatesFields
    }
    itemsTotal
    itemsDone
    audioSeconds
    realtimeFactor
    error
    startedBy
    createdAt
    finishedAt
  }
`);

export const SpeechModelsQuery = graphql(`
  query SpeechModels($includeRetired: Boolean) {
    speechModels(includeRetired: $includeRetired) {
      ...SpeechModelFields
    }
  }
`);

export const GoldSetQuery = graphql(`
  query GoldSet {
    goldSet {
      items {
        recordingId
        transcriptId
        transcriptVersion
        language
        audioSeconds
        lines
        addedBy
        addedAt
      }
      audioSeconds
    }
  }
`);

export const EvaluationsQuery = graphql(`
  query Evaluations($modelId: String, $first: Int) {
    evaluations(modelId: $modelId, first: $first) {
      ...EvaluationFields
    }
  }
`);

export const EvaluationQuery = graphql(`
  query Evaluation($id: String!) {
    evaluation(id: $id) {
      ...EvaluationFields
      items {
        recordingId
        words
        audioSeconds
        error
        scores {
          ...ErrorRatesFields
        }
      }
    }
  }
`);

export const TrainingStatsQuery = graphql(`
  query TrainingStats {
    trainingStats {
      examples
      scriptExamples
      romanExamples
      recordings
      audioSeconds
      lastExampleAt
    }
  }
`);

export const SetDefaultSpeechModelMutation = graphql(`
  mutation SetDefaultSpeechModel($id: String!) {
    setDefaultSpeechModel(id: $id) {
      ...SpeechModelFields
    }
  }
`);

export const RegisterSpeechModelMutation = graphql(`
  mutation RegisterSpeechModel($input: RegisterSpeechModelInput!) {
    registerSpeechModel(input: $input) {
      ...SpeechModelFields
    }
  }
`);

export const RetireSpeechModelMutation = graphql(`
  mutation RetireSpeechModel($id: String!) {
    retireSpeechModel(id: $id) {
      ...SpeechModelFields
    }
  }
`);

export const AddToGoldSetMutation = graphql(`
  mutation AddToGoldSet($recordingId: String!) {
    addToGoldSet(recordingId: $recordingId) {
      recordingId
      transcriptId
      transcriptVersion
    }
  }
`);

export const RemoveFromGoldSetMutation = graphql(`
  mutation RemoveFromGoldSet($recordingId: String!) {
    removeFromGoldSet(recordingId: $recordingId)
  }
`);

export const StartEvaluationMutation = graphql(`
  mutation StartEvaluation($modelId: String!) {
    startEvaluation(modelId: $modelId) {
      ...EvaluationFields
    }
  }
`);
