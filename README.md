# @nobertdev/react-confirm-dialog

A lightweight, fully customizable confirmation dialog hook — `useConfirm()` — that replaces `window.confirm()` with beautiful async modals.

**Zero runtime dependencies. ~2KB gzipped. Full TypeScript support. Auto dark mode.**

📺 **[Live Demo](https://react-confirm-dialog.vercel.app/)** · 📖 **[Documentation](https://react-confirm-dialog.vercel.app/docs)** · 💻 **[GitHub](https://github.com/NOBERT167/react-confirm-dialog)**

---

## Features

- ✅ Drop-in async replacement for `window.confirm()`
- 🎨 Four built-in variants: `default`, `danger`, `warning`, `success`
- 🌗 Auto dark mode — adapts to `prefers-color-scheme` automatically
- 🧩 Fully customizable via props, classNames, styles, or `renderDialog`
- ⌨️ Keyboard accessible (Escape to cancel, auto-focus confirm)
- 🖱️ Click outside to dismiss
- 💨 Smooth enter/exit animations
- 🔒 Zero runtime dependencies
- 📦 ~2KB gzipped
- 🏗️ Tree-shakeable ESM + CJS builds
- 🔷 Full TypeScript types

---

## Installation

```bash
npm install @nobertdev/react-confirm-dialog
# or
yarn add @nobertdev/react-confirm-dialog
# or
pnpm add @nobertdev/react-confirm-dialog
```

---

## Quick Start

**1. Wrap your app with the provider:**

```tsx
// main.tsx / _app.tsx
import { ConfirmDialogProvider } from "@nobertdev/react-confirm-dialog";

function App() {
  return (
    <ConfirmDialogProvider>
      <YourApp />
    </ConfirmDialogProvider>
  );
}
```

**2. Use `useConfirm()` anywhere in your tree:**

```tsx
import { useConfirm } from "@nobertdev/react-confirm-dialog";

function DeleteButton() {
  const confirm = useConfirm();

  const handleDelete = async () => {
    const ok = await confirm({
      title: "Delete this item?",
      message: "This action cannot be undone.",
      variant: "danger",
      confirmText: "Delete",
    });

    if (ok) {
      // user clicked Confirm
      await deleteItem();
    }
  };

  return <button onClick={handleDelete}>Delete</button>;
}
```

---

## API

### `<ConfirmDialogProvider>`

| Prop             | Type                                      | Description                             |
| ---------------- | ----------------------------------------- | --------------------------------------- |
| `defaultOptions` | `ConfirmOptions`                          | Default options merged into every call  |
| `classNames`     | `object`                                  | Custom CSS class names for each element |
| `styles`         | `object`                                  | Inline style overrides for each element |
| `renderDialog`   | `(props: RenderDialogProps) => ReactNode` | Fully replace the built-in dialog       |

### `useConfirm()`

Returns a `confirm` function:

```ts
const confirm = useConfirm();

// Simple string message
const ok = await confirm("Are you sure?");

// Full options object
const ok = await confirm({
  title: "Permanently delete?",
  message: "This cannot be undone.",
  confirmText: "Yes, delete it",
  cancelText: "Never mind",
  variant: "danger",            // "default" | "danger" | "warning" | "success"
  icon: <MyIcon />,             // custom React node
});
```

Returns `Promise<boolean>` — `true` if confirmed, `false` if cancelled.

### `ConfirmOptions`

| Prop          | Type                                              | Default           | Description          |
| ------------- | ------------------------------------------------- | ----------------- | -------------------- |
| `title`       | `string`                                          | `"Are you sure?"` | Dialog heading       |
| `message`     | `string`                                          | —                 | Body text            |
| `confirmText` | `string`                                          | `"Confirm"`       | Confirm button label |
| `cancelText`  | `string`                                          | `"Cancel"`        | Cancel button label  |
| `variant`     | `"default" \| "danger" \| "warning" \| "success"` | `"default"`       | Visual variant       |
| `icon`        | `ReactNode`                                       | built-in SVG      | Custom icon          |

---

## Variants

```tsx
// Default (dark)
await confirm({ title: "Proceed?" });

// Danger (red) — for destructive actions
await confirm({ title: "Delete account?", variant: "danger" });

// Warning (amber) — for cautionary actions
await confirm({ title: "Archive project?", variant: "warning" });

// Success (green) — for confirmatory actions
await confirm({ title: "Publish post?", variant: "success" });
```

---

## Styling

### Via `classNames`

```tsx
<ConfirmDialogProvider
  classNames={{
    overlay: "my-overlay",
    dialog: "my-dialog",
    title: "my-title",
    confirmButton: "my-confirm-btn",
    cancelButton: "my-cancel-btn",
  }}
>
```

### Via `styles`

```tsx
<ConfirmDialogProvider
  styles={{
    dialog: { borderRadius: "4px", fontFamily: "monospace" },
    confirmButton: { background: "hotpink", borderRadius: "2px" },
  }}
>
```

### Via `renderDialog` (fully custom)

```tsx
<ConfirmDialogProvider
  renderDialog={({ isOpen, options, onConfirm, onCancel }) => (
    <MyCustomModal
      open={isOpen}
      title={options.title}
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  )}
>
```

---

## Global Defaults

```tsx
<ConfirmDialogProvider
  defaultOptions={{
    confirmText: "Yes",
    cancelText: "No",
    variant: "danger",
  }}
>
```

---

## Dark Mode

The built-in dialog **automatically adapts** to the user's system color scheme via `prefers-color-scheme: dark`. No configuration needed — it just works.

- Light mode: White dialog, light icon backgrounds, subtle shadows
- Dark mode: Dark gray dialog, muted icon backgrounds, deeper shadows

If you use `renderDialog` or custom `styles`, you have full control over theming.

---

## SSR / Next.js

Works with SSR out of the box. The portal is only created on the client.

---

## TypeScript

All types are exported:

```ts
import type {
  ConfirmOptions,
  ConfirmDialogProviderProps,
  RenderDialogProps,
} from "@nobertdev/react-confirm-dialog";
```

---

## License

MIT
