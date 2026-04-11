"use client";

import Link from "next/link";
import AppShell from "@/components/AppShell";

const features = [
  {
    title: "Document Summarizer",
    description: "Upload legal PDFs and get instant AI-powered summaries with key points and judgments.",
    href: "/summarize",
    gradient: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    ),
  },
  {
    title: "Legal Explainer",
    description: "Paste complex legal jargon and get plain English explanations anyone can understand.",
    href: "/explain",
    gradient: "linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    ),
  },
  {
    title: "Legal Chat Assistant",
    description: "Ask legal questions and get AI-powered answers with relevant laws, sections, and examples.",
    href: "/chat",
    gradient: "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
  },
];

const stats = [
  { label: "AI Tools", value: "3", sublabel: "Summarizer, Explainer, Law Fetcher" },
  { label: "Agentic AI", value: "✦", sublabel: "Multi-step reasoning engine" },
  { label: "Languages", value: "Simple", sublabel: "Plain English outputs" },
];

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Hero Section */}
        <div className="text-center py-8 animate-fade-in-up">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-4"
            style={{
              background: "rgba(99, 102, 241, 0.1)",
              color: "var(--color-primary)",
              border: "1px solid rgba(99, 102, 241, 0.2)",
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
            </svg>
            Powered by Agentic AI
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3 tracking-tight">
            <span className="gradient-text">LexiWizard</span>
          </h1>
          <p className="text-base max-w-xl mx-auto" style={{ color: "var(--muted)" }}>
            Your legal assistant for documents, explanations, and quick legal research.
            Find answers, summaries, and guidance in clear language.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 stagger-children">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="glass-card p-4 text-center"
            >
              <div className="text-2xl font-bold gradient-text mb-1">{stat.value}</div>
              <div className="text-xs font-semibold mb-0.5" style={{ color: "var(--foreground)" }}>
                {stat.label}
              </div>
              <div className="text-[10px]" style={{ color: "var(--muted)" }}>
                {stat.sublabel}
              </div>
            </div>
          ))}
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-5 stagger-children">
          {features.map((feature) => (
            <Link key={feature.href} href={feature.href}>
              <div className="glass-card group p-6 h-full cursor-pointer hover:scale-[1.02] transition-transform duration-300">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300"
                  style={{ background: feature.gradient }}
                >
                  {feature.icon}
                </div>
                <h3
                  className="text-base font-bold mb-2"
                  style={{ color: "var(--foreground)" }}
                >
                  {feature.title}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
                  {feature.description}
                </p>
                <div className="flex items-center gap-1 mt-4 text-xs font-semibold" style={{ color: "var(--color-primary)" }}>
                  <span>Get started</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>


      </div>
    </AppShell>
  );
}
