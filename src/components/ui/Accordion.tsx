"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionItemProps {
  id: string;
  title: string;
  content: React.ReactNode;
  defaultOpen?: boolean;
}

export function Accordion({
  items,
  className,
}: {
  items: AccordionItemProps[];
  className?: string;
}) {
  const [openIds, setOpenIds] = useState<string[]>(
    items.filter((item) => item.defaultOpen).map((item) => item.id)
  );

  const toggle = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className={cn("divide-y divide-slate-200 dark:divide-slate-800", className)}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        return (
          <div key={item.id} className="py-4">
            <button
              type="button"
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${item.id}`}
              className="flex w-full items-center justify-between text-left text-base sm:text-lg font-medium text-slate-900 dark:text-slate-100 hover:text-purple-600 dark:hover:text-purple-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded py-1 transition-colors"
            >
              <span>{item.title}</span>
              <ChevronDown
                className={cn(
                  "h-5 w-5 shrink-0 text-slate-500 transition-transform duration-200 ml-4",
                  isOpen && "rotate-180 text-purple-600 dark:text-purple-400"
                )}
              />
            </button>
            {isOpen && (
              <div
                id={`accordion-content-${item.id}`}
                className="pt-3 pb-1 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed animate-in fade-in-50 duration-150"
              >
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
