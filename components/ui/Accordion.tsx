"use client";

import { useState, useId } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionEntry {
  id: string;
  title: React.ReactNode;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionEntry[];
  defaultOpenId?: string;
  onToggle?: (id: string, isOpen: boolean) => void;
  className?: string;
}

export function Accordion({ items, defaultOpenId, onToggle, className }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId ?? null);
  const baseId = useId();

  function handleToggle(id: string) {
    const next = openId === id ? null : id;
    setOpenId(next);
    onToggle?.(id, next === id);
  }

  return (
    <div className={cn("divide-y divide-brand-gray-200 rounded-2xl border border-brand-gray-200 bg-white", className)}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        const buttonId = `${baseId}-${item.id}-button`;
        const panelId = `${baseId}-${item.id}-panel`;

        return (
          <div key={item.id}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => handleToggle(item.id)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold text-brand-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-red-500 sm:px-6 sm:py-5"
              >
                <span>{item.title}</span>
                <ChevronDown
                  aria-hidden="true"
                  className={cn(
                    "h-5 w-5 shrink-0 text-brand-red-600 transition-transform duration-200",
                    isOpen && "rotate-180"
                  )}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cn(
                "grid transition-[grid-template-rows] duration-300 ease-in-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              )}
            >
              <div className="overflow-hidden">
                <div className="px-5 pb-5 text-sm leading-relaxed text-brand-gray-600 sm:px-6 sm:text-base">
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
