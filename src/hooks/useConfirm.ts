import { createContext, useContext } from "react";
import type { ConfirmDialogContextValue, ConfirmOptions } from "../types";

export const ConfirmDialogContext =
  createContext<ConfirmDialogContextValue | null>(null);

/**
 * useConfirm — drop-in async replacement for window.confirm()
 *
 * @example
 * const confirm = useConfirm();
 * const ok = await confirm("Are you sure?");
 * const ok = await confirm({ title: "Delete?", variant: "danger" });
 */
export function useConfirm(): (
  options?: ConfirmOptions | string,
) => Promise<boolean> {
  const ctx = useContext(ConfirmDialogContext);
  if (!ctx) {
    throw new Error(
      "[@nobertdev/react-confirm-dialog] useConfirm() must be used inside <ConfirmDialogProvider>.",
    );
  }
  return ctx.confirm;
}
