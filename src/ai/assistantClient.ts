import { buildRAGContext } from "./buildRAGContext";
import { generateAdmissionsAnswerResult } from "./generateAdmissionsAnswer";
import { retrieveRelevantContext } from "./retrieveRelevantContext";
import type { AdmissionsIntent, AdmissionsRAGContext } from "./types";

interface AdmissionsAssistantMetadata {
  confidence: number;
  intents: AdmissionsIntent[];
  matchedFaculties: string[];
  needsClarification: boolean;
  clarificationQuestion?: string;
}

export interface AdmissionsAssistantResponse {
  question: string;
  answer: string;
  metadata?: AdmissionsAssistantMetadata;
  context: AdmissionsRAGContext;
}

export async function askAdmissionsAssistant(
  question: string
): Promise<AdmissionsAssistantResponse> {
  const trimmedQuestion = question.trim();
  try {
    const response = await fetch("/api/ai-advisor", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ question: trimmedQuestion }),
    });

    if (response.ok) {
      return (await response.json()) as AdmissionsAssistantResponse;
    }
  } catch {
    // Fallback below.
  }

  // Deterministic fallback for environments without server routing.
  const fullContext = await buildRAGContext();
  const filteredContext = retrieveRelevantContext(trimmedQuestion, fullContext);
  const result = generateAdmissionsAnswerResult(trimmedQuestion, filteredContext);

  return {
    question: trimmedQuestion,
    answer: result.answer,
    metadata: {
      confidence: result.confidence,
      intents: result.intents,
      matchedFaculties: result.matchedFaculties,
      needsClarification: result.needsClarification,
      clarificationQuestion: result.clarificationQuestion,
    },
    context: filteredContext,
  };
}
