"use client";

import { useState, useRef } from "react";

export default function FileUpload({ onFileSelect, isLoading = false }) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
      onFileSelect(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      onFileSelect(file);
    }
  };

  const clearFile = (e) => {
    e.stopPropagation();
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div
      id="file-upload-zone"
      className={`glass-card p-8 text-center cursor-pointer transition-all duration-300 ${
        isDragOver ? "scale-[1.01]" : ""
      }`}
      style={{
        borderStyle: "dashed",
        borderWidth: "2px",
        borderColor: isDragOver
          ? "var(--color-primary)"
          : selectedFile
          ? "var(--color-success)"
          : "var(--border-color)",
        background: isDragOver
          ? "rgba(99, 102, 241, 0.05)"
          : "var(--glass-bg)",
      }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        className="hidden"
        id="pdf-file-input"
      />

      {selectedFile ? (
        <div className="animate-fade-in">
          <div
            className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center"
            style={{ background: "rgba(16, 185, 129, 0.1)", color: "var(--color-success)" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.125 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
            </svg>
          </div>
          <p className="text-sm font-semibold mb-1" style={{ color: "var(--foreground)" }}>
            {selectedFile.name}
          </p>
          <p className="text-xs mb-3" style={{ color: "var(--muted)" }}>
            {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
          </p>
          <button
            onClick={clearFile}
            className="text-xs font-medium px-3 py-1 rounded-lg transition-colors cursor-pointer"
            style={{
              color: "var(--color-error)",
              background: "rgba(239, 68, 68, 0.1)",
            }}
          >
            Remove
          </button>
        </div>
      ) : (
        <div>
          <div
            className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center"
            style={{
              background: "var(--gradient-surface)",
              color: "var(--color-primary)",
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
            </svg>
          </div>
          <p className="text-sm font-semibold mb-1" style={{ color: "var(--foreground)" }}>
            Drop your PDF here or click to browse
          </p>
          <p className="text-xs" style={{ color: "var(--muted)" }}>
            Supports PDF files up to 10MB
          </p>
        </div>
      )}
    </div>
  );
}
