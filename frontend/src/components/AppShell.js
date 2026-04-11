"use client";

import Header from "@/components/Header";

export default function AppShell({ children }) {
  return (
    <div className="flex min-h-screen" style={{ background: "var(--background)" }}>
      {/* Background gradient blobs */}
      <div className="gradient-blob gradient-blob-1" />
      <div className="gradient-blob gradient-blob-2" />
      <div className="gradient-blob gradient-blob-3" />

      {/* Main content */}
      <div className="flex-1 min-h-screen flex flex-col relative z-10">
        <Header />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
