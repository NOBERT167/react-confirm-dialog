import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { ArrowLeft, Package, Github, ExternalLink } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const GITHUB_URL = "https://github.com/NOBERT167/react-confirm-dialog";

function Sidebar() {
  const sections = [
    { id: "installation", label: "Installation" },
    { id: "quick-start", label: "Quick Start" },
    { id: "useconfirm", label: "useConfirm" },
    { id: "confirm-options", label: "ConfirmOptions" },
    { id: "provider-props", label: "Provider Props" },
    { id: "classnames", label: "Custom ClassNames" },
    { id: "styles", label: "Custom Styles" },
    { id: "custom-dialog", label: "Custom Dialog" },
    { id: "variants", label: "Variants" },
    { id: "typescript", label: "TypeScript" },
  ];

  return (
    <aside className="hidden lg:block w-56 shrink-0">
      <div className="sticky top-20 space-y-1">
        <p className="text-sm font-semibold mb-3">On this page</p>
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
          >
            {s.label}
          </a>
        ))}
      </div>
    </aside>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20 mb-16">
      <h2 className="text-2xl font-bold tracking-tight mb-4 border-b pb-2">
        {title}
      </h2>
      {children}
    </section>
  );
}

function PropRow({
  name,
  type,
  def,
  description,
}: {
  name: string;
  type: string;
  def?: string;
  description: string;
}) {
  return (
    <tr className="border-b">
      <td className="py-3 pr-4 font-mono text-sm text-foreground">{name}</td>
      <td className="py-3 pr-4">
        <code className="text-xs bg-muted rounded px-1.5 py-0.5">{type}</code>
      </td>
      <td className="py-3 pr-4 text-sm text-muted-foreground">{def ?? "—"}</td>
      <td className="py-3 text-sm text-muted-foreground">{description}</td>
    </tr>
  );
}

export default function DocsPage() {
  return (
    <div className="min-h-screen">
      {/* Top bar */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-6xl mx-auto flex h-14 items-center px-4">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <Package className="h-5 w-5" />
            @nobertdev/react-confirm-dialog
          </Link>
          <nav className="ml-auto flex items-center gap-4 text-sm">
            <Link
              to="/"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Home
            </Link>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm">
                <Github className="h-4 w-4" />
                GitHub
              </Button>
            </a>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-10 flex gap-10">
        <Sidebar />

        <main className="min-w-0 flex-1 max-w-3xl">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link
              to="/"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to home
            </Link>
            <h1 className="text-3xl font-bold tracking-tight mt-4 mb-2">
              Documentation
            </h1>
            <p className="text-muted-foreground">
              Everything you need to integrate @nobertdev/react-confirm-dialog
              into your project.
            </p>
          </div>

          {/* Installation */}
          <Section id="installation" title="Installation">
            <p className="text-muted-foreground mb-4">
              Install via your preferred package manager:
            </p>
            <CodeBlock
              code="npm install @nobertdev/react-confirm-dialog"
              language="bash"
              className="mb-3"
            />
            <CodeBlock
              code="yarn add @nobertdev/react-confirm-dialog"
              language="bash"
              className="mb-3"
            />
            <CodeBlock
              code="pnpm add @nobertdev/react-confirm-dialog"
              language="bash"
            />
            <div className="mt-4 p-4 bg-muted rounded-lg text-sm">
              <strong>Peer dependencies:</strong> React ≥ 17.0.0 and ReactDOM ≥
              17.0.0
            </div>
          </Section>

          {/* Quick Start */}
          <Section id="quick-start" title="Quick Start">
            <p className="text-muted-foreground mb-4">
              Wrap your app with the provider and use the hook anywhere in your
              component tree.
            </p>
            <p className="text-sm font-medium mb-2">1. Add the provider</p>
            <CodeBlock
              code={`import { ConfirmDialogProvider } from "@nobertdev/react-confirm-dialog";

function App() {
  return (
    <ConfirmDialogProvider>
      <YourApp />
    </ConfirmDialogProvider>
  );
}`}
              className="mb-6"
            />
            <p className="text-sm font-medium mb-2">2. Use the hook</p>
            <CodeBlock
              code={`import { useConfirm } from "@nobertdev/react-confirm-dialog";

function MyComponent() {
  const confirm = useConfirm();

  const handleClick = async () => {
    const ok = await confirm("Are you sure?");
    if (ok) {
      // user confirmed
    }
  };

  return <button onClick={handleClick}>Do something</button>;
}`}
            />
          </Section>

          {/* useConfirm */}
          <Section id="useconfirm" title="useConfirm">
            <p className="text-muted-foreground mb-4">
              The{" "}
              <code className="bg-muted px-1 py-0.5 rounded text-sm">
                useConfirm
              </code>{" "}
              hook returns a function that shows a confirmation dialog and
              returns a Promise that resolves to{" "}
              <code className="bg-muted px-1 py-0.5 rounded text-sm">true</code>{" "}
              (confirmed) or{" "}
              <code className="bg-muted px-1 py-0.5 rounded text-sm">
                false
              </code>{" "}
              (cancelled).
            </p>
            <CodeBlock
              code={`const confirm = useConfirm();

// String shorthand
const ok = await confirm("Are you sure?");

// Full options object
const ok = await confirm({
  title: "Delete item?",
  message: "This action cannot be undone.",
  confirmText: "Delete",
  cancelText: "Cancel",
  variant: "danger",
});`}
              className="mb-4"
            />
            <div className="p-4 border-l-4 border-amber-400 bg-amber-50 rounded-r-lg text-sm text-gray-600">
              <strong className="text-black">Note:</strong>{" "}
              <code className="bg-amber-100 px-1 py-0.5 rounded text-gray-700">
                useConfirm()
              </code>{" "}
              must be called inside a component wrapped by{" "}
              <code className="bg-amber-100 px-1 py-0.5 rounded text-gray-700">
                {"<ConfirmDialogProvider>"}
              </code>
              .
            </div>
          </Section>

          {/* ConfirmOptions */}
          <Section id="confirm-options" title="ConfirmOptions">
            <p className="text-muted-foreground mb-4">
              Options you can pass to the confirm function:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 pr-4 text-sm font-semibold">Prop</th>
                    <th className="py-2 pr-4 text-sm font-semibold">Type</th>
                    <th className="py-2 pr-4 text-sm font-semibold">Default</th>
                    <th className="py-2 text-sm font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <PropRow
                    name="title"
                    type="string"
                    def='"Are you sure?"'
                    description="Dialog heading text"
                  />
                  <PropRow
                    name="message"
                    type="string"
                    description="Body text below the title"
                  />
                  <PropRow
                    name="confirmText"
                    type="string"
                    def='"Confirm"'
                    description="Confirm button label"
                  />
                  <PropRow
                    name="cancelText"
                    type="string"
                    def='"Cancel"'
                    description="Cancel button label"
                  />
                  <PropRow
                    name="variant"
                    type='"default" | "danger" | "warning" | "success"'
                    def='"default"'
                    description="Visual variant with matching colors and icon"
                  />
                  <PropRow
                    name="icon"
                    type="ReactNode"
                    description="Custom icon to override the default variant icon"
                  />
                  <PropRow
                    name="description"
                    type="string"
                    description="Additional description text"
                  />
                </tbody>
              </table>
            </div>
          </Section>

          {/* Provider Props */}
          <Section id="provider-props" title="Provider Props">
            <p className="text-muted-foreground mb-4">
              Props for{" "}
              <code className="bg-muted px-1 py-0.5 rounded text-sm">
                {"<ConfirmDialogProvider>"}
              </code>
              :
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 pr-4 text-sm font-semibold">Prop</th>
                    <th className="py-2 pr-4 text-sm font-semibold">Type</th>
                    <th className="py-2 text-sm font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 pr-4 font-mono text-sm">children</td>
                    <td className="py-3 pr-4">
                      <code className="text-xs bg-muted rounded px-1.5 py-0.5">
                        ReactNode
                      </code>
                    </td>
                    <td className="py-3 text-sm text-muted-foreground">
                      Your app tree
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 pr-4 font-mono text-sm">
                      defaultOptions
                    </td>
                    <td className="py-3 pr-4">
                      <code className="text-xs bg-muted rounded px-1.5 py-0.5">
                        ConfirmOptions
                      </code>
                    </td>
                    <td className="py-3 text-sm text-muted-foreground">
                      Default options merged with every confirm call
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 pr-4 font-mono text-sm">classNames</td>
                    <td className="py-3 pr-4">
                      <code className="text-xs bg-muted rounded px-1.5 py-0.5">
                        object
                      </code>
                    </td>
                    <td className="py-3 text-sm text-muted-foreground">
                      Custom CSS class names for each dialog part
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 pr-4 font-mono text-sm">styles</td>
                    <td className="py-3 pr-4">
                      <code className="text-xs bg-muted rounded px-1.5 py-0.5">
                        object
                      </code>
                    </td>
                    <td className="py-3 text-sm text-muted-foreground">
                      Custom inline styles for each dialog part
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 pr-4 font-mono text-sm">
                      renderDialog
                    </td>
                    <td className="py-3 pr-4">
                      <code className="text-xs bg-muted rounded px-1.5 py-0.5">
                        (props: RenderDialogProps) =&gt; ReactNode
                      </code>
                    </td>
                    <td className="py-3 text-sm text-muted-foreground">
                      Completely replace the built-in dialog UI
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Section>

          {/* Custom ClassNames */}
          <Section id="classnames" title="Custom ClassNames">
            <p className="text-muted-foreground mb-4">
              Override the built-in styles using class names — great for
              Tailwind CSS:
            </p>
            <CodeBlock
              code={`<ConfirmDialogProvider
  classNames={{
    overlay: "fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50",
    dialog: "bg-white rounded-2xl p-6 max-w-md w-full shadow-xl",
    title: "text-lg font-bold text-gray-900",
    message: "text-gray-600 mt-2",
    actions: "flex gap-3 mt-6 justify-end",
    confirmButton: "px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700",
    cancelButton: "px-4 py-2 border rounded-lg hover:bg-gray-50",
  }}
>
  <App />
</ConfirmDialogProvider>`}
            />
            <p className="text-sm text-muted-foreground mt-4">
              Available keys:{" "}
              <code className="bg-muted px-1 py-0.5 rounded">overlay</code>,{" "}
              <code className="bg-muted px-1 py-0.5 rounded">dialog</code>,{" "}
              <code className="bg-muted px-1 py-0.5 rounded">title</code>,{" "}
              <code className="bg-muted px-1 py-0.5 rounded">message</code>,{" "}
              <code className="bg-muted px-1 py-0.5 rounded">actions</code>,{" "}
              <code className="bg-muted px-1 py-0.5 rounded">
                confirmButton
              </code>
              ,{" "}
              <code className="bg-muted px-1 py-0.5 rounded">cancelButton</code>
            </p>
          </Section>

          {/* Custom Styles */}
          <Section id="styles" title="Custom Styles">
            <p className="text-muted-foreground mb-4">
              For inline style overrides:
            </p>
            <CodeBlock
              code={`<ConfirmDialogProvider
  styles={{
    dialog: { borderRadius: "24px", padding: "32px" },
    confirmButton: { background: "#6366f1" },
    overlay: { background: "rgba(0,0,0,0.6)" },
  }}
>
  <App />
</ConfirmDialogProvider>`}
            />
          </Section>

          {/* Custom Dialog */}
          <Section id="custom-dialog" title="Custom Dialog (renderDialog)">
            <p className="text-muted-foreground mb-4">
              For full control, provide your own dialog component via{" "}
              <code className="bg-muted px-1 py-0.5 rounded text-sm">
                renderDialog
              </code>
              . You receive everything you need as props:
            </p>
            <CodeBlock
              code={`import { ConfirmDialogProvider } from "@nobertdev/react-confirm-dialog";
import type { RenderDialogProps } from "@nobertdev/react-confirm-dialog";

function MyDialog({ isOpen, options, onConfirm, onCancel }: RenderDialogProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-sm mx-4">
        <h2 className="text-xl font-bold">{options.title ?? "Confirm"}</h2>
        {options.message && <p className="mt-2">{options.message}</p>}
        <div className="flex gap-2 mt-4">
          <button onClick={onCancel}>
            {options.cancelText ?? "Cancel"}
          </button>
          <button onClick={onConfirm}>
            {options.confirmText ?? "OK"}
          </button>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <ConfirmDialogProvider renderDialog={(props) => <MyDialog {...props} />}>
      <YourApp />
    </ConfirmDialogProvider>
  );
}`}
              className="mb-4"
            />
            <h3 className="font-semibold mb-2 mt-6">RenderDialogProps</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 pr-4 text-sm font-semibold">Prop</th>
                    <th className="py-2 pr-4 text-sm font-semibold">Type</th>
                    <th className="py-2 text-sm font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 pr-4 font-mono text-sm">isOpen</td>
                    <td className="py-3 pr-4">
                      <code className="text-xs bg-muted rounded px-1.5 py-0.5">
                        boolean
                      </code>
                    </td>
                    <td className="py-3 text-sm text-muted-foreground">
                      Whether dialog should be visible
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 pr-4 font-mono text-sm">options</td>
                    <td className="py-3 pr-4">
                      <code className="text-xs bg-muted rounded px-1.5 py-0.5">
                        ConfirmOptions
                      </code>
                    </td>
                    <td className="py-3 text-sm text-muted-foreground">
                      Merged options for this dialog instance
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 pr-4 font-mono text-sm">onConfirm</td>
                    <td className="py-3 pr-4">
                      <code className="text-xs bg-muted rounded px-1.5 py-0.5">
                        () =&gt; void
                      </code>
                    </td>
                    <td className="py-3 text-sm text-muted-foreground">
                      Call to resolve the promise with true
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 pr-4 font-mono text-sm">onCancel</td>
                    <td className="py-3 pr-4">
                      <code className="text-xs bg-muted rounded px-1.5 py-0.5">
                        () =&gt; void
                      </code>
                    </td>
                    <td className="py-3 text-sm text-muted-foreground">
                      Call to resolve the promise with false
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Section>

          {/* Variants */}
          <Section id="variants" title="Variants">
            <p className="text-muted-foreground mb-4">
              The built-in dialog supports four visual variants, each with
              matching colors and icons:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {(
                [
                  { name: "default", color: "bg-zinc-900", text: "text-white" },
                  { name: "danger", color: "bg-red-600", text: "text-white" },
                  {
                    name: "warning",
                    color: "bg-amber-600",
                    text: "text-white",
                  },
                  {
                    name: "success",
                    color: "bg-green-600",
                    text: "text-white",
                  },
                ] as const
              ).map((v) => (
                <div
                  key={v.name}
                  className={`${v.color} ${v.text} rounded-lg p-4 text-center text-sm font-medium`}
                >
                  {v.name}
                </div>
              ))}
            </div>
            <CodeBlock
              code={`// Default
await confirm({ variant: "default" });

// Danger — for destructive actions
await confirm({ variant: "danger", title: "Delete?", confirmText: "Delete" });

// Warning — for potentially risky actions
await confirm({ variant: "warning", title: "Discard changes?" });

// Success — for positive confirmations
await confirm({ variant: "success", title: "Publish article?" });`}
            />
          </Section>

          {/* TypeScript */}
          <Section id="typescript" title="TypeScript">
            <p className="text-muted-foreground mb-4">
              All types are exported for your convenience:
            </p>
            <CodeBlock
              code={`import type {
  ConfirmOptions,
  ConfirmDialogProviderProps,
  RenderDialogProps,
} from "@nobertdev/react-confirm-dialog";`}
              className="mb-4"
            />
            <CodeBlock
              code={`interface ConfirmOptions {
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "danger" | "warning" | "success";
  icon?: ReactNode;
  description?: string;
}

interface RenderDialogProps {
  isOpen: boolean;
  options: ConfirmOptions;
  onConfirm: () => void;
  onCancel: () => void;
}

interface ConfirmDialogProviderProps {
  children: ReactNode;
  defaultOptions?: ConfirmOptions;
  classNames?: { overlay, dialog, title, message, actions, confirmButton, cancelButton };
  styles?: { overlay, dialog, title, message, actions, confirmButton, cancelButton };
  renderDialog?: (props: RenderDialogProps) => ReactNode;
}`}
            />
          </Section>

          {/* CTA */}
          <div className="border-t pt-8 mt-8 flex flex-col sm:flex-row gap-4 items-start">
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
              <Button variant="outline">
                <Github className="h-4 w-4" />
                View on GitHub
                <ExternalLink className="h-3 w-3" />
              </Button>
            </a>
            <a
              href="https://www.npmjs.com/package/@nobertdev/react-confirm-dialog"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline">
                <Package className="h-4 w-4" />
                View on npm
                <ExternalLink className="h-3 w-3" />
              </Button>
            </a>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t py-6 mt-10">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            @nobertdev/react-confirm-dialog · MIT
          </div>
          <Link to="/" className="hover:text-foreground transition-colors">
            ← Back to home
          </Link>
        </div>
      </footer>
    </div>
  );
}
