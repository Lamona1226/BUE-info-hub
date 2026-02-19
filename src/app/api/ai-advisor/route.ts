import { buildRAGContext } from "@/ai/buildRAGContext";
import { generateAdmissionsAnswerResult } from "@/ai/generateAdmissionsAnswer";
import { retrieveRelevantContext } from "@/ai/retrieveRelevantContext";

interface AIAdvisorRequestBody {
  question?: unknown;
}

export async function POST(request: Request): Promise<Response> {
  let body: AIAdvisorRequestBody = {};

  try {
    body = (await request.json()) as AIAdvisorRequestBody;
  } catch {
    return new Response(
      JSON.stringify({ error: "Invalid JSON body. Expected { question }." }),
      {
        status: 400,
        headers: { "content-type": "application/json" },
      }
    );
  }

  const question = typeof body.question === "string" ? body.question.trim() : "";
  if (!question) {
    return new Response(
      JSON.stringify({ error: "Question is required and must be a non-empty string." }),
      {
        status: 400,
        headers: { "content-type": "application/json" },
      }
    );
  }

  const fullContext = await buildRAGContext();
  const filteredContext = retrieveRelevantContext(question, fullContext);
  const result = await generateAdmissionsAnswerResult(question, filteredContext);

  return new Response(
    JSON.stringify({
      question,
      answer: result.answer,
      metadata: {
        confidence: result.confidence,
        intents: result.intents,
        matchedFaculties: result.matchedFaculties,
        needsClarification: result.needsClarification,
        clarificationQuestion: result.clarificationQuestion,
      },
      context: filteredContext,
    }),
    {
      status: 200,
      headers: { "content-type": "application/json" },
    }
  );
}
