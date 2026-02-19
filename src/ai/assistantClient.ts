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

/**
 * Client contract for admissions assistant responses.
 *
 * `metadata` is always present for successful responses from both:
 * - `/api/ai-advisor` when the response payload matches this contract, and
 * - the local deterministic fallback path in this client.
 */
export interface AdmissionsAssistantResponse {
  question: string;
  answer: string;
  metadata: AdmissionsAssistantMetadata;
  context: AdmissionsRAGContext;
}

function isAdmissionsAssistantMetadata(value: unknown): value is AdmissionsAssistantMetadata {
  if (!value || typeof value !== "object") {
    return false;
  }

  const metadata = value as Partial<AdmissionsAssistantMetadata>;
  return (
    typeof metadata.confidence === "number" &&
    Array.isArray(metadata.intents) &&
    Array.isArray(metadata.matchedFaculties) &&
    typeof metadata.needsClarification === "boolean" &&
    (metadata.clarificationQuestion === undefined ||
      typeof metadata.clarificationQuestion === "string")
  );
}

function isAdmissionsAssistantResponse(value: unknown): value is AdmissionsAssistantResponse {
  if (!value || typeof value !== "object") {
    return false;
  }

  const response = value as Partial<AdmissionsAssistantResponse>;
  return (
    typeof response.question === "string" &&
    typeof response.answer === "string" &&
    isAdmissionsAssistantMetadata(response.metadata) &&
    !!response.context &&
    typeof response.context === "object"
  );
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
      const payload: unknown = await response.json();
      if (isAdmissionsAssistantResponse(payload)) {
        return payload;
      }
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
