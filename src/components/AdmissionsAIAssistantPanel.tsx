import { useMemo, useState } from "react";
import { Bot, Send, User } from "lucide-react";
import { askAdmissionsAssistant } from "@/ai/assistantClient";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";

interface AdmissionsAIAssistantPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface ChatMessage {
  role: "assistant" | "user";
  content: string;
}

const initialAssistantMessage =
  "Welcome to the Admissions Advisor AI. I answer only from official admissions data. Please ask about fees, scholarships, requirements, eligibility, or contacts.";

export const AdmissionsAIAssistantPanel = ({
  open,
  onOpenChange,
}: AdmissionsAIAssistantPanelProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: initialAssistantMessage },
  ]);
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const canSend = useMemo(() => question.trim().length > 0 && !isLoading, [question, isLoading]);

  const sendQuestion = async () => {
    const trimmedQuestion = question.trim();
    if (!trimmedQuestion || isLoading) return;

    setMessages((prev) => [...prev, { role: "user", content: trimmedQuestion }]);
    setQuestion("");
    setIsLoading(true);

    try {
      const result = await askAdmissionsAssistant(trimmedQuestion);
      setMessages((prev) => [...prev, { role: "assistant", content: result.answer }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "This information is not available in the official admissions data.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>Admissions Advisor AI</SheetTitle>
          <SheetDescription>
            Answers are grounded only in official internal admissions data.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-4 flex h-[calc(100%-5rem)] flex-col">
          <ScrollArea className="flex-1 rounded-md border p-3">
            <div className="space-y-3">
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`rounded-lg p-3 text-sm ${
                    message.role === "user"
                      ? "ml-6 bg-primary/10 text-foreground"
                      : "mr-6 bg-muted text-foreground"
                  }`}
                >
                  <div className="mb-1 flex items-center gap-2 text-xs text-muted-foreground">
                    {message.role === "user" ? (
                      <>
                        <User className="h-3.5 w-3.5" />
                        <span>You</span>
                      </>
                    ) : (
                      <>
                        <Bot className="h-3.5 w-3.5" />
                        <span>Admissions Advisor AI</span>
                      </>
                    )}
                  </div>
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="mt-3 space-y-2">
            <Textarea
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="Ask about eligibility, fees, scholarships, requirements, or contacts..."
              className="min-h-[88px]"
              disabled={isLoading}
            />
            <div className="flex justify-end">
              <Button onClick={sendQuestion} disabled={!canSend}>
                <Send className="h-4 w-4" />
                {isLoading ? "Checking official data..." : "Send"}
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
