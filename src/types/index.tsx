export interface ConfirmOptions {
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "danger" | "warning" | "success";
  icon?: React.ReactNode;
  description?: string;
}

export interface ConfirmDialogState extends ConfirmOptions {
  isOpen: boolean;
  resolve: ((value: boolean) => void) | null;
}

export interface ConfirmDialogContextValue {
  confirm: (options?: ConfirmOptions | string) => Promise<boolean>;
}

export interface ConfirmDialogProviderProps {
  children: React.ReactNode;
  defaultOptions?: ConfirmOptions;
  classNames?: {
    overlay?: string;
    dialog?: string;
    title?: string;
    message?: string;
    actions?: string;
    confirmButton?: string;
    cancelButton?: string;
  };
  styles?: {
    overlay?: React.CSSProperties;
    dialog?: React.CSSProperties;
    title?: React.CSSProperties;
    message?: React.CSSProperties;
    actions?: React.CSSProperties;
    confirmButton?: React.CSSProperties;
    cancelButton?: React.CSSProperties;
  };
  renderDialog?: (props: RenderDialogProps) => React.ReactNode;
}

export interface RenderDialogProps {
  isOpen: boolean;
  options: ConfirmOptions;
  onConfirm: () => void;
  onCancel: () => void;
}
