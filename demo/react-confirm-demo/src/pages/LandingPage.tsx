import { Link } from "react-router-dom";
import { useConfirm } from "@nobertdev/react-confirm-dialog";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/Card";
import { Tabs } from "@/components/ui/Tabs";
import { CodeBlock } from "@/components/ui/CodeBlock";
import {
  ArrowRight,
  Github,
  Package,
  Zap,
  Paintbrush,
  Shield,
  Layers,
  Keyboard,
  BookOpen,
  Trash2,
  LogOut,
  Send,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useState } from "react";

const GITHUB_URL = "https://github.com/NOBERT167/react-confirm-dialog";

function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-6xl mx-auto flex h-14 items-center px-4">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <Package className="h-5 w-5" />
          @nobertdev/react-confirm-dialog
        </Link>
        <nav className="ml-auto flex items-center gap-4 text-sm">
          <a
            href="#demo"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Demo
          </a>
          <a
            href="#features"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Features
          </a>
          <a
            href="#examples"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Examples
          </a>
          <Link
            to="/docs"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Docs
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
  );
}

function HeroSection() {
  return (
    <section className="py-20 md:py-32">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <Badge variant="secondary" className="mb-4">
          v1.0 — Zero Dependencies
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          Beautiful Confirm Dialogs
          <br />
          <span className="text-muted-foreground">for React</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          A lightweight, fully customizable confirmation dialog hook that
          replaces{" "}
          <code className="bg-muted px-1.5 py-0.5 rounded text-sm">
            window.confirm()
          </code>{" "}
          with beautiful async modals. Promise-based API, keyboard accessible,
          zero dependencies.
        </p>
        <div className="flex items-center justify-center gap-4">
          <a href="#demo">
            <Button size="lg">
              Try Live Demo
              <ArrowRight className="h-4 w-4" />
            </Button>
          </a>
          <Link to="/docs">
            <Button variant="outline" size="lg">
              <BookOpen className="h-4 w-4" />
              Read Docs
            </Button>
          </Link>
        </div>
        <div className="mt-12 max-w-lg mx-auto">
          <CodeBlock
            code={`npm install @nobertdev/react-confirm-dialog`}
            language="bash"
          />
        </div>
      </div>
    </section>
  );
}

function DemoSection() {
  const confirm = useConfirm();
  const [result, setResult] = useState<string | null>(null);

  const showResult = (label: string, value: boolean) => {
    setResult(`${label}: ${value ? "Confirmed ✓" : "Cancelled ✗"}`);
    setTimeout(() => setResult(null), 3000);
  };

  const handleBasic = async () => {
    const ok = await confirm("Are you sure you want to proceed?");
    showResult("Basic", ok);
  };

  const handleDelete = async () => {
    const ok = await confirm({
      title: "Delete Item",
      message:
        "This action cannot be undone. This will permanently delete this item from our servers.",
      confirmText: "Delete",
      cancelText: "Keep it",
      variant: "danger",
    });
    showResult("Delete", ok);
  };

  const handleWarning = async () => {
    const ok = await confirm({
      title: "Unsaved Changes",
      message:
        "You have unsaved changes. Are you sure you want to leave this page?",
      confirmText: "Leave",
      cancelText: "Stay",
      variant: "warning",
    });
    showResult("Warning", ok);
  };

  const handleSuccess = async () => {
    const ok = await confirm({
      title: "Publish Article",
      message: "Your article will be visible to all users. Ready to publish?",
      confirmText: "Publish",
      cancelText: "Not yet",
      variant: "success",
    });
    showResult("Success", ok);
  };

  return (
    <section id="demo" className="py-20 bg-muted/50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            Interactive Demo
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Try It Yourself
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Click any button below to see the confirm dialog in action. Each
            variant has a different style.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-base">Basic</CardTitle>
              <CardDescription>Simple confirmation</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={handleBasic} className="w-full">
                <Send className="h-4 w-4" />
                Confirm
              </Button>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-base text-red-600">Danger</CardTitle>
              <CardDescription>Destructive action</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="destructive"
                onClick={handleDelete}
                className="w-full"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-base text-amber-600">
                Warning
              </CardTitle>
              <CardDescription>Unsaved changes</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                onClick={handleWarning}
                className="w-full border-amber-300 text-amber-700 hover:bg-amber-50"
              >
                <AlertTriangle className="h-4 w-4" />
                Leave Page
              </Button>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-base text-green-600">
                Success
              </CardTitle>
              <CardDescription>Positive action</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                onClick={handleSuccess}
                className="w-full border-green-300 text-green-700 hover:bg-green-50"
              >
                <CheckCircle className="h-4 w-4" />
                Publish
              </Button>
            </CardContent>
          </Card>
        </div>
        {result && (
          <div className="mt-6 text-center">
            <Badge variant="secondary" className="text-sm px-4 py-1.5">
              {result}
            </Badge>
          </div>
        )}
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      icon: Zap,
      title: "Promise-Based API",
      description:
        "Use async/await for clean, readable confirmation flows. No callback hell.",
    },
    {
      icon: Paintbrush,
      title: "Fully Customizable",
      description:
        "Custom classNames, styles, or bring your own dialog component with renderDialog.",
    },
    {
      icon: Shield,
      title: "Zero Dependencies",
      description:
        "Only React as a peer dependency. Tiny bundle size with no bloat.",
    },
    {
      icon: Layers,
      title: "4 Built-in Variants",
      description:
        "Default, danger, warning, and success variants with matching icons and colors.",
    },
    {
      icon: Keyboard,
      title: "Keyboard Accessible",
      description:
        "Full keyboard support with Escape to cancel and auto-focus on confirm.",
    },
    {
      icon: Package,
      title: "TypeScript First",
      description:
        "Written in TypeScript with full type definitions. Excellent DX out of the box.",
    },
  ];

  return (
    <section id="features" className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            Features
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Everything You Need
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            A drop-in replacement for window.confirm() with a modern, accessible
            UI.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center mb-2">
                  <feature.icon className="h-5 w-5" />
                </div>
                <CardTitle className="text-base">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExamplesSection() {
  return (
    <section id="examples" className="py-20 bg-muted/50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            Code Examples
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Quick Start
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Get up and running in under a minute. Here's how simple it is.
          </p>
        </div>

        <Tabs
          defaultValue="setup"
          tabs={[
            {
              label: "Setup",
              value: "setup",
              content: (
                <CodeBlock
                  code={`import { ConfirmDialogProvider } from "@nobertdev/react-confirm-dialog";

function App() {
  return (
    <ConfirmDialogProvider>
      <YourApp />
    </ConfirmDialogProvider>
  );
}`}
                />
              ),
            },
            {
              label: "Basic Usage",
              value: "basic",
              content: (
                <CodeBlock
                  code={`import { useConfirm } from "@nobertdev/react-confirm-dialog";

function DeleteButton() {
  const confirm = useConfirm();

  const handleDelete = async () => {
    const ok = await confirm("Are you sure?");
    if (ok) {
      // proceed with delete
    }
  };

  return <button onClick={handleDelete}>Delete</button>;
}`}
                />
              ),
            },
            {
              label: "With Options",
              value: "options",
              content: (
                <CodeBlock
                  code={`const ok = await confirm({
  title: "Delete Account",
  message: "This will permanently delete your account and all data.",
  confirmText: "Yes, delete everything",
  cancelText: "Cancel",
  variant: "danger",
});`}
                />
              ),
            },
            {
              label: "Custom Dialog",
              value: "custom",
              content: (
                <CodeBlock
                  code={`<ConfirmDialogProvider
  renderDialog={({ isOpen, options, onConfirm, onCancel }) => (
    <MyCustomModal open={isOpen} onClose={onCancel}>
      <h2>{options.title}</h2>
      <p>{options.message}</p>
      <button onClick={onCancel}>Cancel</button>
      <button onClick={onConfirm}>Confirm</button>
    </MyCustomModal>
  )}
>
  <App />
</ConfirmDialogProvider>`}
                />
              ),
            },
          ]}
          className="max-w-3xl mx-auto"
        />
      </div>
    </section>
  );
}

function RealWorldSection() {
  const confirm = useConfirm();
  const [log, setLog] = useState<string[]>([]);

  const addLog = (msg: string) => setLog((prev) => [...prev.slice(-4), msg]);

  const handleLogout = async () => {
    const ok = await confirm({
      title: "Sign Out",
      message: "Are you sure you want to sign out of your account?",
      confirmText: "Sign Out",
      variant: "default",
    });
    addLog(ok ? "User signed out" : "Sign out cancelled");
  };

  const handleDeleteAccount = async () => {
    const ok = await confirm({
      title: "Delete Account",
      message:
        "This will permanently delete your account and all associated data. This cannot be undone.",
      confirmText: "Delete My Account",
      cancelText: "Keep Account",
      variant: "danger",
    });
    addLog(ok ? "Account deletion initiated" : "Account deletion cancelled");
  };

  const handlePublish = async () => {
    const ok = await confirm({
      title: "Publish Changes",
      message:
        "Your changes will go live immediately. All users will see the updated content.",
      confirmText: "Publish Now",
      variant: "success",
    });
    addLog(ok ? "Changes published" : "Publishing cancelled");
  };

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            Real-World Scenarios
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Common Use Cases
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            See how @nobertdev/react-confirm-dialog fits into real application
            flows.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
          <Button variant="destructive" onClick={handleDeleteAccount}>
            <Trash2 className="h-4 w-4" />
            Delete Account
          </Button>
          <Button
            variant="outline"
            onClick={handlePublish}
            className="border-green-300 text-green-700 hover:bg-green-50"
          >
            <CheckCircle className="h-4 w-4" />
            Publish Changes
          </Button>
        </div>
        {log.length > 0 && (
          <div className="mt-6 max-w-md mx-auto">
            <div className="rounded-lg border bg-zinc-950 text-zinc-200 p-4 text-sm font-mono space-y-1">
              {log.map((entry, i) => (
                <div key={i} className="text-zinc-400">
                  <span className="text-zinc-500">→</span> {entry}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t py-8">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Package className="h-4 w-4" />
          @nobertdev/react-confirm-dialog
          <span>·</span>
          <span>MIT License</span>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <Link
            to="/docs"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Documentation
          </Link>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.npmjs.com/package/@nobertdev/react-confirm-dialog"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            npm
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <DemoSection />
      <FeaturesSection />
      <ExamplesSection />
      <RealWorldSection />
      <Footer />
    </div>
  );
}
