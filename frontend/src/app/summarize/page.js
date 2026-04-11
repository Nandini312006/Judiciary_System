"use client";

import { useState } from "react";
import AppShell from "@/components/AppShell";
import FileUpload from "@/components/FileUpload";
import ResultCard from "@/components/ResultCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import { uploadPDF, summarizeText } from "@/lib/api";

export default function SummarizePage() {
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [result, setResult] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [error, setError] = useState("");
  const [pdfInfo, setPdfInfo] = useState(null);

  const handleFileSelect = async (selectedFile) => {
    setFile(selectedFile);
    setError("");
    setResult(null);
    setIsUploading(true);

    try {
      const data = await uploadPDF(selectedFile);
      setExtractedText(data.text);
      setPdfInfo({ pages: data.pages, ...data.info });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSummarize = async () => {
    if (!extractedText) return;
    setError("");
    setIsSummarizing(true);

    try {
      const data = await summarizeText(extractedText);
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSummarizing(false);
    }
  };

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Page Intro */}
        <div className="animate-fade-in-up">
          <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--foreground)" }}>
            Legal Document <span className="gradient-text">Summarizer</span>
          </h1>
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            Upload a legal PDF document and get an AI-generated summary with key points and judgment.
          </p>
        </div>

        {/* Upload Section */}
        <div className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <FileUpload onFileSelect={handleFileSelect} isLoading={isUploading} />
        </div>

        {/* Loading: Upload */}
        {isUploading && <LoadingSpinner message="Extracting text from PDF..." />}

        {/* PDF Info */}
        {pdfInfo && !isUploading && (
          <div className="glass-card p-4 animate-fade-in-up">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-xs px-3 py-1 rounded-full font-medium" style={{ background: "rgba(16, 185, 129, 0.1)", color: "var(--color-success)" }}>
                ✓ Text extracted
              </span>
              <span className="text-xs" style={{ color: "var(--muted)" }}>
                {pdfInfo.pages} page{pdfInfo.pages !== 1 ? "s" : ""} • {extractedText.length.toLocaleString()} characters
              </span>
            </div>
          </div>
        )}

        {/* Extracted text preview + Summarize button */}
        {extractedText && !isUploading && (
          <div className="space-y-4 animate-fade-in-up">
            <div className="glass-card p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
                  Extracted Text Preview
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: "var(--surface-hover)", color: "var(--muted)" }}>
                  Showing first 500 chars
                </span>
              </div>
              <p className="text-xs leading-relaxed whitespace-pre-wrap" style={{ color: "var(--muted)" }}>
                {extractedText.substring(0, 500)}
                {extractedText.length > 500 ? "..." : ""}
              </p>
            </div>

            <button
              id="summarize-btn"
              onClick={handleSummarize}
              disabled={isSummarizing}
              className="btn-primary w-full py-3"
            >
              {isSummarizing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Summarizing...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
                  </svg>
                  Summarize Document
                </>
              )}
            </button>
          </div>
        )}

        {/* Loading: Summarize */}
        {isSummarizing && <LoadingSpinner message="Summarizing your document..." />}

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
        {result && !isSummarizing && (
          <div className="space-y-4 stagger-children">
            <ResultCard
              title="Summary"
              variant="primary"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                </svg>
              }
            >
              <p style={{ color: "var(--foreground)" }}>{result.summary}</p>
            </ResultCard>

            <ResultCard
              title="Key Points"
              variant="success"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
              }
            >
              {result.keyPoints && Array.isArray(result.keyPoints) ? (
                <ul className="space-y-2">
                  {result.keyPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span
                        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] font-bold text-white"
                        style={{ background: "var(--gradient-primary)" }}
                      >
                        {i + 1}
                      </span>
                      <span style={{ color: "var(--foreground)" }}>{point}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p style={{ color: "var(--foreground)" }}>{JSON.stringify(result.keyPoints)}</p>
              )}
            </ResultCard>

            <ResultCard
              title="Judgment / Decision"
              variant="warning"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971Zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 0 1-2.031.352 5.989 5.989 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971Z" />
                </svg>
              }
            >
              <p style={{ color: "var(--foreground)" }}>{result.judgment}</p>
            </ResultCard>
          </div>
        )}
      </div>
    </AppShell>
  );
}
