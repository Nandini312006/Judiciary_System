"use client";

import { useState } from "react";

export default function AgentSteps({ steps = [] }) {
  const [isExpanded, setIsExpanded] = useState(true);

  if (steps.length === 0) return null;

  const statusIcon = (status) => {
    switch (status) {
      case "completed":
        return (
          <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "rgba(16, 185, 129, 0.15)", color: "var(--color-success)" }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          </div>
        );
      case "running":
        return (
          <div className="w-6 h-6 rounded-full flex items-center justify-center animate-pulse-soft" style={{ background: "rgba(99, 102, 241, 0.15)", color: "var(--color-primary)" }}>
            <div className="w-2 h-2 rounded-full" style={{ background: "var(--color-primary)" }} />
          </div>
        );
      case "failed":
        return (
          <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "rgba(239, 68, 68, 0.15)", color: "var(--color-error)" }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "var(--surface-hover)", color: "var(--muted)" }}>
            <div className="w-2 h-2 rounded-full" style={{ background: "var(--muted)" }} />
          </div>
        );
    }
  };

  return (
    <div className="glass-card overflow-hidden animate-fade-in-up">
      {/* Header */}
      <button
        id="agent-steps-toggle"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-5 py-3 cursor-pointer transition-colors"
        style={{ borderBottom: isExpanded ? "1px solid var(--border-color)" : "none" }}
        onMouseEnter={(e) => { e.currentTarget.style.background = "var(--surface-hover)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
      >
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4" style={{ color: "var(--color-primary)" }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
          </svg>
          <span className="text-xs font-semibold" style={{ color: "var(--foreground)" }}>
            Agent Reasoning Steps
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ background: "rgba(99, 102, 241, 0.1)", color: "var(--color-primary)" }}>
            {steps.length} steps
          </span>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
          style={{ color: "var(--muted)" }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {/* Steps */}
      {isExpanded && (
        <div className="p-4 space-y-3">
          {steps.map((step, i) => (
            <div
              key={i}
              className="flex items-start gap-3 animate-step-reveal"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {statusIcon(step.status)}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium" style={{ color: "var(--foreground)" }}>
                  Step {step.step}
                </p>
                <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
                  {step.action}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
