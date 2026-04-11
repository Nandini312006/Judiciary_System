"use client";

import { useState, useRef, useEffect } from "react";
import AppShell from "@/components/AppShell";
import ChatMessage from "@/components/ChatMessage";
import AgentSteps from "@/components/AgentSteps";
import ResultCard from "@/components/ResultCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import { askAgent } from "@/lib/api";

export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello! I'm LexiWizard, your legal assistant. I can help you with:\n\n• Summarizing legal documents\n• Explaining legal terms in simple English\n• Researching relevant laws and sections\n\nAsk me any legal question.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentSteps, setCurrentSteps] = useState([]);
  const [currentSections, setCurrentSections] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, currentSteps]);

  const handleSend = async () => {
    const query = input.trim();
    if (!query || isLoading) return;

    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: query }]);
    setInput("");
    setIsLoading(true);
    setCurrentSteps([]);
    setCurrentSections([]);

    try {
      const data = await askAgent(query);

      // Set steps for display
      setCurrentSteps(data.steps || []);
      setCurrentSections(data.sections || []);

      // Add assistant message
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.finalAnswer || "I apologize, but I couldn't generate a response. Please try again.",
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `⚠️ Error: ${err.message}`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const exampleQuestions = [
    "What is Section 420 of IPC?",
    "Explain the right to bail in India",
    "What are the tenant rights in India?",
    "Difference between civil and criminal law",
  ];

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto flex flex-col" style={{ height: "calc(100vh - 140px)" }}>
        {/* Page Intro */}
        <div className="mb-4 animate-fade-in-up flex-shrink-0">
          <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--foreground)" }}>
            Legal <span className="gradient-text">Chat Assistant</span>
          </h1>
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            Ask legal questions and get AI-powered answers with relevant laws, explanations, and examples.
          </p>
        </div>

        {/* Chat Area */}
        <div
          className="glass-card flex-1 flex flex-col overflow-hidden"
        >
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {messages.map((msg, i) => (
              <ChatMessage key={i} message={msg} />
            ))}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="chat-bubble-assistant">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          className="w-2 h-2 rounded-full"
                          style={{
                            background: "var(--color-primary)",
                            animation: `bounce-gentle 1.4s ease-in-out ${i * 0.16}s infinite`,
                          }}
                        />
                      ))}
                    </div>
                    <span className="text-xs" style={{ color: "var(--muted)" }}>
                      Working on your answer...
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Agent Steps */}
            {currentSteps.length > 0 && !isLoading && (
              <AgentSteps steps={currentSteps} />
            )}

            {/* Sections from agent */}
            {currentSections.length > 0 && !isLoading && (
              <div className="space-y-3 stagger-children">
                {currentSections.map((section, i) => (
                  <ResultCard
                    key={i}
                    title={section.title}
                    variant={i === 0 ? "primary" : i === 1 ? "success" : "warning"}
                  >
                    <p className="whitespace-pre-wrap" style={{ color: "var(--foreground)" }}>
                      {section.content}
                    </p>
                  </ResultCard>
                ))}
              </div>
            )}

            {/* Example questions (show only initially) */}
            {messages.length <= 1 && (
              <div className="mt-4">
                <p className="text-xs font-semibold mb-3" style={{ color: "var(--muted)" }}>
                  Try asking:
                </p>
                <div className="flex flex-wrap gap-2">
                  {exampleQuestions.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => setInput(q)}
                      className="text-xs px-3 py-2 rounded-xl transition-all duration-200 cursor-pointer"
                      style={{
                        background: "var(--surface)",
                        border: "1px solid var(--border-color)",
                        color: "var(--foreground)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "var(--color-primary)";
                        e.currentTarget.style.background = "rgba(99, 102, 241, 0.05)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "var(--border-color)";
                        e.currentTarget.style.background = "var(--surface)";
                      }}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div
            className="p-4 flex-shrink-0"
            style={{ borderTop: "1px solid var(--border-color)" }}
          >
            <div className="flex items-end gap-3">
              <textarea
                id="chat-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask a legal question..."
                rows={1}
                className="input-base resize-none flex-1"
                style={{ minHeight: "42px", maxHeight: "120px" }}
                onInput={(e) => {
                  e.target.style.height = "42px";
                  e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
                }}
              />
              <button
                id="chat-send-btn"
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="btn-primary px-4 py-2.5 flex-shrink-0"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                </svg>
              </button>
            </div>
            <p className="text-[10px] mt-2 text-center" style={{ color: "var(--muted)" }}>
              LexiWizard may not always be perfect. Always confirm important legal decisions with a qualified lawyer.
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
