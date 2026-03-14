import { useState } from "react";
import { cn } from "@/lib/utils";

interface TabsProps {
  tabs: { label: string; value: string; content: React.ReactNode }[];
  defaultValue?: string;
  className?: string;
}

export function Tabs({ tabs, defaultValue, className }: TabsProps) {
  const [active, setActive] = useState(defaultValue ?? tabs[0]?.value);

  return (
    <div className={className}>
      <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground mb-4">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActive(tab.value)}
              className={cn(
                "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none cursor-pointer",
                active === tab.value && "bg-background text-foreground shadow",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div>{tabs.find((t) => t.value === active)?.content}</div>
    </div>
  );
}
