import { useState, useCallback, useRef, useMemo, useEffect } from "react";
import { createPortal } from "react-dom";
import { BuiltInDialog } from "../components/BuildinDialog";
import type {
  ConfirmDialogProviderProps,
  ConfirmDialogState,
  ConfirmOptions,
} from "../types";
import { ConfirmDialogContext } from "../hooks/useConfirm";

const CLOSE_ANIMATION_MS = 180;

const DEFAULT_STATE: ConfirmDialogState = {
  isOpen: false,
  resolve: null,
  title: undefined,
  message: undefined,
  confirmText: undefined,
  cancelText: undefined,
  variant: "default",
  icon: undefined,
};

function detectDarkFromDOM(): boolean | null {
  if (typeof document === "undefined") return null;
  const el = document.documentElement;
  if (el.classList.contains("dark")) return true;
  if (el.classList.contains("light")) return false;
  const dataTheme =
    el.getAttribute("data-theme") ?? el.getAttribute("data-mode");
  if (dataTheme === "dark") return true;
  if (dataTheme === "light") return false;
  return null;
}

function usePrefersDark(): boolean {
  const [dark, setDark] = useState(() => {
    if (typeof window === "undefined") return false;
    const domDark = detectDarkFromDOM();
    if (domDark !== null) return domDark;
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    // Watch for class / attribute changes on <html>
    const observer = new MutationObserver(() => {
      const domDark = detectDarkFromDOM();
      if (domDark !== null) setDark(domDark);
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme", "data-mode"],
    });

    // Fall back to OS-level media query
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const mqHandler = (e: MediaQueryListEvent) => {
      if (detectDarkFromDOM() === null) setDark(e.matches);
    };
    mq.addEventListener("change", mqHandler);

    return () => {
      observer.disconnect();
      mq.removeEventListener("change", mqHandler);
    };
  }, []);

  return dark;
}

/**
 * ConfirmDialogProvider
 *
 * Wrap your app (or a subtree) with this provider to enable useConfirm().
 *
 * @example
 * <ConfirmDialogProvider>
 *   <App />
 * </ConfirmDialogProvider>
 */
export function ConfirmDialogProvider({
  children,
  defaultOptions,
  classNames,
  styles,
  renderDialog,
}: ConfirmDialogProviderProps) {
  const [state, setState] = useState<ConfirmDialogState>(DEFAULT_STATE);
  const [isClosing, setIsClosing] = useState(false);
  const resolveRef = useRef<((value: boolean) => void) | null>(null);
  const isDark = usePrefersDark();

  const close = useCallback((result: boolean) => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      setState(DEFAULT_STATE);
      resolveRef.current?.(result);
      resolveRef.current = null;
    }, CLOSE_ANIMATION_MS);
  }, []);

  const onConfirm = useCallback(() => close(true), [close]);
  const onCancel = useCallback(() => close(false), [close]);

  const confirm = useCallback(
    (options?: ConfirmOptions | string): Promise<boolean> => {
      return new Promise<boolean>((resolve) => {
        resolveRef.current = resolve;

        const normalized: ConfirmOptions =
          typeof options === "string" ? { message: options } : (options ?? {});

        setState({
          ...DEFAULT_STATE,
          ...defaultOptions,
          ...normalized,
          isOpen: true,
          resolve,
        });
      });
    },
    [defaultOptions],
  );

  const contextValue = useMemo(() => ({ confirm }), [confirm]);

  const dialogNode = renderDialog ? (
    renderDialog({
      isOpen: state.isOpen || isClosing,
      options: state,
      onConfirm,
      onCancel,
    })
  ) : (
    <BuiltInDialog
      state={state}
      providerProps={{ classNames, styles, defaultOptions }}
      onConfirm={onConfirm}
      onCancel={onCancel}
      isClosing={isClosing}
      isDark={isDark}
    />
  );

  return (
    <ConfirmDialogContext.Provider value={contextValue}>
      {children}
      {typeof document !== "undefined"
        ? createPortal(dialogNode, document.body)
        : null}
    </ConfirmDialogContext.Provider>
  );
}
