import { buildRAGContext } from "./buildRAGContext";
import { generateAdmissionsAnswer } from "./generateAdmissionsAnswer";
import { retrieveRelevantContext } from "./retrieveRelevantContext";
import type { AdmissionsRAGContext } from "./types";

export interface AdmissionsAssistantResponse {
  question: string;
  answer: string;
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
  const answer = generateAdmissionsAnswer(trimmedQuestion, filteredContext);

  return {
    question: trimmedQuestion,
    answer,
    context: filteredContext,
  };
}
