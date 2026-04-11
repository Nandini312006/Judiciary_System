"use client";

import { useState } from "react";
import AppShell from "@/components/AppShell";
import ResultCard from "@/components/ResultCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import { explainText } from "@/lib/api";

export default function ExplainPage() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleExplain = async () => {
    if (!text.trim()) return;
    setError("");
    setResult(null);
    setIsLoading(true);

    try {
      const data = await explainText(text);
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Page Intro */}
        <div className="animate-fade-in-up">
          <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--foreground)" }}>
            Legal Language <span className="gradient-text">Explainer</span>
          </h1>
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            Paste complex legal text and get a plain English explanation that anyone can understand.
          </p>
        </div>

        {/* Input Section */}
        <div className="glass-card p-5 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <label className="block text-sm font-semibold mb-3" style={{ color: "var(--foreground)" }}>
            Paste Legal Text
          </label>
          <textarea
            id="legal-text-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your legal clause, section, agreement, or any legal text here..."
            rows={8}
            className="input-base resize-none"
          />
          <div className="flex items-center justify-between mt-3">
            <span className="text-xs" style={{ color: "var(--muted)" }}>
              {text.length} characters
            </span>
            <button
              id="explain-btn"
              onClick={handleExplain}
              disabled={isLoading || text.trim().length < 20}
              className="btn-primary"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Explaining...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                  </svg>
                  Explain in Simple English
                </>
              )}
            </button>
          </div>
        </div>

        {/* Loading */}
        {isLoading && <LoadingSpinner message="Simplifying the legal text..." />}

        {/* Error */}
        {error && (
          <div
            className="glass-card p-4 animate-fade-in"
            style={{ borderLeft: "3px solid var(--color-error)" }}
          >
            <p className="text-sm font-medium" style={{ color: "var(--color-error)" }}>
              {error}
            </p>
          </div>
        )}

        {/* Results */}
        {result && !isLoading && (
          <div className="space-y-4 stagger-children">
            <ResultCard
              title="Simplified Explanation"
              variant="primary"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                </svg>
              }
            >
              <p className="leading-relaxed whitespace-pre-wrap" style={{ color: "var(--foreground)" }}>
                {result.simplified}
              </p>
            </ResultCard>

            {result.keyTerms && Array.isArray(result.keyTerms) && result.keyTerms.length > 0 && (
              <ResultCard
                title="Key Legal Terms"
                variant="success"
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                  </svg>
                }
              >
                <div className="space-y-3">
                  {result.keyTerms.map((term, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span
                        className="px-2 py-0.5 rounded-md text-xs font-bold flex-shrink-0"
                        style={{ background: "rgba(99, 102, 241, 0.1)", color: "var(--color-primary)" }}
                      >
                        {term.term}
                      </span>
                      <span style={{ color: "var(--foreground)" }}>{term.meaning}</span>
                    </div>
                  ))}
                </div>
              </ResultCard>
            )}

            {result.analogy && (
              <ResultCard
                title="Real-Life Analogy"
                variant="warning"
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                  </svg>
                }
              >
                <p className="italic" style={{ color: "var(--foreground)" }}>
                  {result.analogy}
                </p>
              </ResultCard>
            )}
          </div>
        )}
      </div>
    </AppShell>
  );
}
