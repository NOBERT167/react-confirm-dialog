import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

interface Token {
  type: string;
  value: string;
}

const TOKEN_COLORS: Record<string, string> = {
  keyword: "text-purple-400",
  string: "text-green-400",
  comment: "text-zinc-500 italic",
  function: "text-blue-400",
  component: "text-cyan-300",
  type: "text-yellow-300",
  operator: "text-pink-400",
  punctuation: "text-zinc-400",
  property: "text-sky-300",
  number: "text-orange-300",
  tag: "text-red-400",
  attr: "text-orange-300",
  plain: "text-zinc-200",
};

function tokenize(code: string, language: string): Token[] {
  if (language === "bash" || language === "sh") {
    return tokenizeBash(code);
  }
  return tokenizeTsx(code);
}

function tokenizeBash(code: string): Token[] {
  const tokens: Token[] = [];
  const regex =
    /(#[^\n]*)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|(npm|yarn|pnpm|npx|install|add|run|build)\b|(\S+)/g;
  let match;
  let lastIndex = 0;

  while ((match = regex.exec(code)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ type: "plain", value: code.slice(lastIndex, match.index) });
    }
    if (match[1]) tokens.push({ type: "comment", value: match[1] });
    else if (match[2]) tokens.push({ type: "string", value: match[2] });
    else if (match[3]) tokens.push({ type: "keyword", value: match[3] });
    else if (match[4]) tokens.push({ type: "plain", value: match[4] });
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < code.length) {
    tokens.push({ type: "plain", value: code.slice(lastIndex) });
  }
  return tokens;
}

function tokenizeTsx(code: string): Token[] {
  const tokens: Token[] = [];
  const regex =
    /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|(\b(?:import|export|from|const|let|var|function|return|if|else|async|await|new|type|interface|extends|implements|class|default|typeof|as|of|in)\b)|(\b(?:true|false|null|undefined|void)\b)|(\b\d+(?:\.\d+)?\b)|(<\/?[A-Z]\w*)|(<\/?[a-z][\w-]*)|(\b[A-Z]\w*(?=\s*[<({]))|(\b[a-z]\w*(?=\s*\())|(\b[a-z]\w*(?=\s*[=:]))|([{}()[\];,.]|=>|\.\.\.|\?\.|\?\?|&&|\|\||[!=<>]=?)|(\w+)/g;
  let match;
  let lastIndex = 0;

  while ((match = regex.exec(code)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ type: "plain", value: code.slice(lastIndex, match.index) });
    }
    if (match[1]) tokens.push({ type: "comment", value: match[1] });
    else if (match[2]) tokens.push({ type: "string", value: match[2] });
    else if (match[3]) tokens.push({ type: "keyword", value: match[3] });
    else if (match[4]) tokens.push({ type: "keyword", value: match[4] });
    else if (match[5]) tokens.push({ type: "number", value: match[5] });
    else if (match[6]) tokens.push({ type: "component", value: match[6] });
    else if (match[7]) tokens.push({ type: "tag", value: match[7] });
    else if (match[8]) tokens.push({ type: "type", value: match[8] });
    else if (match[9]) tokens.push({ type: "function", value: match[9] });
    else if (match[10]) tokens.push({ type: "property", value: match[10] });
    else if (match[11]) tokens.push({ type: "operator", value: match[11] });
    else if (match[12]) tokens.push({ type: "plain", value: match[12] });
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < code.length) {
    tokens.push({ type: "plain", value: code.slice(lastIndex) });
  }
  return tokens;
}

export function CodeBlock({
  code,
  language = "tsx",
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const tokens = useMemo(() => tokenize(code, language), [code, language]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        "relative group rounded-lg border bg-zinc-950 text-zinc-50",
        className,
      )}
    >
      <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800">
        <span className="text-xs text-zinc-400">{language}</span>
        <button
          onClick={handleCopy}
          className="text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
        >
          {copied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm leading-relaxed">
        <code>
          {tokens.map((token, i) => (
            <span
              key={i}
              className={TOKEN_COLORS[token.type] ?? TOKEN_COLORS.plain}
            >
              {token.value}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
