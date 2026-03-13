import React, { useEffect, useRef, useState } from "react";
import type { ConfirmDialogState, ConfirmDialogProviderProps } from "../types";

function usePrefersDark(): boolean {
  const [dark, setDark] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
      : false,
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => setDark(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return dark;
}

const VARIANT_STYLES = {
  default: {
    confirmBg: "#111",
    confirmColor: "#fff",
    confirmHover: "#333",
    accentColor: "#111",
    accentColorDark: "#e5e5e5",
    iconBg: "#f4f4f4",
    iconBgDark: "#2c2c2e",
  },
  danger: {
    confirmBg: "#dc2626",
    confirmColor: "#fff",
    confirmHover: "#b91c1c",
    accentColor: "#dc2626",
    accentColorDark: "#f87171",
    iconBg: "#fef2f2",
    iconBgDark: "#3b1114",
  },
  warning: {
    confirmBg: "#d97706",
    confirmColor: "#fff",
    confirmHover: "#b45309",
    accentColor: "#d97706",
    accentColorDark: "#fbbf24",
    iconBg: "#fffbeb",
    iconBgDark: "#3b2a0a",
  },
  success: {
    confirmBg: "#16a34a",
    confirmColor: "#fff",
    confirmHover: "#15803d",
    accentColor: "#16a34a",
    accentColorDark: "#4ade80",
    iconBg: "#f0fdf4",
    iconBgDark: "#0a2e1a",
  },
};

const DEFAULT_ICONS: Record<string, React.ReactNode> = {
  default: (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
  danger: (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
  warning: (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  success: (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
};

const KEYFRAMES = `
@keyframes rcd-overlay-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes rcd-dialog-in {
  from { opacity: 0; transform: scale(0.94) translateY(8px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}
@keyframes rcd-overlay-out {
  from { opacity: 1; }
  to   { opacity: 0; }
}
@keyframes rcd-dialog-out {
  from { opacity: 1; transform: scale(1) translateY(0); }
  to   { opacity: 0; transform: scale(0.94) translateY(8px); }
}
`;

interface BuiltInDialogProps {
  state: ConfirmDialogState;
  providerProps: Pick<
    ConfirmDialogProviderProps,
    "classNames" | "styles" | "defaultOptions"
  >;
  onConfirm: () => void;
  onCancel: () => void;
  isClosing: boolean;
}

export function BuiltInDialog({
  state,
  providerProps,
  onConfirm,
  onCancel,
  isClosing,
}: BuiltInDialogProps) {
  const confirmRef = useRef<HTMLButtonElement>(null);
  const isDark = usePrefersDark();
  const variant = state.variant ?? "default";
  const v = VARIANT_STYLES[variant];

  // Auto-focus confirm button
  useEffect(() => {
    if (state.isOpen) {
      setTimeout(() => confirmRef.current?.focus(), 50);
    }
  }, [state.isOpen]);

  // Keyboard handling
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!state.isOpen) return;
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [state.isOpen, onCancel]);

  if (!state.isOpen && !isClosing) return null;

  const animationState = isClosing ? "out" : "in";

  const overlayStyle: React.CSSProperties = {
    position: "fixed",
    inset: 0,
    background: isDark ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0.45)",
    backdropFilter: "blur(4px)",
    WebkitBackdropFilter: "blur(4px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
    padding: "16px",
    animation: `rcd-overlay-${animationState} 200ms ease forwards`,
    ...providerProps.styles?.overlay,
  };

  const dialogStyle: React.CSSProperties = {
    background: isDark ? "#1c1c1e" : "#fff",
    borderRadius: "16px",
    padding: "28px",
    maxWidth: "420px",
    width: "100%",
    boxShadow: isDark
      ? "0 24px 64px rgba(0,0,0,0.4), 0 4px 12px rgba(0,0,0,0.3)"
      : "0 24px 64px rgba(0,0,0,0.18), 0 4px 12px rgba(0,0,0,0.08)",
    border: isDark ? "1px solid rgba(255,255,255,0.08)" : "none",
    position: "relative",
    animation: `rcd-dialog-${animationState} 220ms cubic-bezier(0.34,1.56,0.64,1) forwards`,
    ...providerProps.styles?.dialog,
  };

  const iconContainerStyle: React.CSSProperties = {
    width: 48,
    height: 48,
    borderRadius: "12px",
    background: isDark ? v.iconBgDark : v.iconBg,
    color: isDark ? v.accentColorDark : v.accentColor,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "16px",
    flexShrink: 0,
  };

  const titleStyle: React.CSSProperties = {
    margin: "0 0 6px 0",
    fontSize: "17px",
    fontWeight: 700,
    color: isDark ? "#f5f5f5" : "#0f0f0f",
    lineHeight: 1.3,
    letterSpacing: "-0.02em",
    fontFamily: "inherit",
    ...providerProps.styles?.title,
  };

  const messageStyle: React.CSSProperties = {
    margin: "0 0 24px 0",
    fontSize: "14px",
    color: isDark ? "#a1a1aa" : "#6b7280",
    lineHeight: 1.6,
    fontFamily: "inherit",
    ...providerProps.styles?.message,
  };

  const actionsStyle: React.CSSProperties = {
    display: "flex",
    gap: "10px",
    justifyContent: "flex-end",
    ...providerProps.styles?.actions,
  };

  const cancelBg = isDark ? "#2c2c2e" : "#fff";
  const cancelStyle: React.CSSProperties = {
    padding: "9px 18px",
    borderRadius: "9px",
    border: isDark ? "1.5px solid #3a3a3c" : "1.5px solid #e5e7eb",
    background: cancelBg,
    color: isDark ? "#e5e5e5" : "#374151",
    fontSize: "14px",
    fontWeight: 500,
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "all 120ms ease",
    ...providerProps.styles?.cancelButton,
  };

  const confirmStyle: React.CSSProperties = {
    padding: "9px 18px",
    borderRadius: "9px",
    border: "none",
    background: v.confirmBg,
    color: v.confirmColor,
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "all 120ms ease",
    ...providerProps.styles?.confirmButton,
  };

  const icon = state.icon ?? DEFAULT_ICONS[variant];

  return (
    <>
      <style>{KEYFRAMES}</style>
      <div
        style={overlayStyle}
        className={providerProps.classNames?.overlay}
        role="dialog"
        aria-modal="true"
        aria-labelledby="rcd-title"
        aria-describedby={state.message ? "rcd-message" : undefined}
        onClick={(e) => e.target === e.currentTarget && onCancel()}
      >
        <div style={dialogStyle} className={providerProps.classNames?.dialog}>
          {icon && <div style={iconContainerStyle}>{icon}</div>}

          <h2
            id="rcd-title"
            style={titleStyle}
            className={providerProps.classNames?.title}
          >
            {state.title ?? "Are you sure?"}
          </h2>

          {state.message && (
            <p
              id="rcd-message"
              style={messageStyle}
              className={providerProps.classNames?.message}
            >
              {state.message}
            </p>
          )}

          <div
            style={actionsStyle}
            className={providerProps.classNames?.actions}
          >
            <button
              style={cancelStyle}
              className={providerProps.classNames?.cancelButton}
              onClick={onCancel}
              onMouseEnter={(e) => {
                (e.target as HTMLButtonElement).style.background = isDark
                  ? "#3a3a3c"
                  : "#f9fafb";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLButtonElement).style.background =
                  providerProps.styles?.cancelButton?.background?.toString() ??
                  cancelBg;
              }}
            >
              {state.cancelText ?? "Cancel"}
            </button>
            <button
              ref={confirmRef}
              style={confirmStyle}
              className={providerProps.classNames?.confirmButton}
              onClick={onConfirm}
              onMouseEnter={(e) => {
                (e.target as HTMLButtonElement).style.background =
                  v.confirmHover;
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLButtonElement).style.background =
                  providerProps.styles?.confirmButton?.background?.toString() ??
                  v.confirmBg;
              }}
            >
              {state.confirmText ?? "Confirm"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
