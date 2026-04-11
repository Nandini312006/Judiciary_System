"use client";

export default function ResultCard({ title, icon, children, variant = "default", className = "" }) {
  const variantStyles = {
    default: {},
    success: { borderLeft: "3px solid var(--color-success)" },
    warning: { borderLeft: "3px solid var(--color-warning)" },
    primary: { borderLeft: "3px solid var(--color-primary)" },
  };

  return (
    <div
      className={`glass-card p-5 animate-fade-in-up ${className}`}
      style={variantStyles[variant]}
    >
      {/* Header */}
      {title && (
        <div className="flex items-center gap-2.5 mb-4">
          {icon && (
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{
                background: "var(--gradient-surface)",
                color: "var(--color-primary)",
              }}
            >
              {icon}
            </div>
          )}
          <h3 className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
            {title}
          </h3>
        </div>
      )}

      {/* Content */}
      <div className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
        {children}
      </div>
    </div>
  );
}
