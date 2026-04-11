"use client";

export default function LoadingSpinner({ message = "Processing...", size = "default" }) {
  const dotSize = size === "small" ? "w-2 h-2" : "w-3 h-3";

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-8 animate-fade-in">
      {/* Animated dots */}
      <div className="flex items-center gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`${dotSize} rounded-full`}
            style={{
              background: "var(--gradient-primary)",
              animation: `bounce-gentle 1.4s ease-in-out ${i * 0.16}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Message */}
      <p
        className="text-sm font-medium animate-pulse-soft"
        style={{ color: "var(--muted)" }}
      >
        {message}
      </p>
    </div>
  );
}
