import { useState, useCallback, useRef, useMemo } from "react";
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
