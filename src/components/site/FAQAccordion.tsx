"use client";

import { Minus, Plus } from "lucide-react";
import { useId, useState } from "react";

import { cn } from "@/lib/utils";

type FAQItem = {
  question: string;
  answer: string;
};

type FAQAccordionProps = {
  items: readonly FAQItem[];
};

export function FAQAccordion({ items }: FAQAccordionProps) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="border-b border-line">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const buttonId = `${baseId}-q-${index}`;
        const panelId = `${baseId}-a-${index}`;

        return (
          <div key={item.question} className="border-t border-line">
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-start justify-between gap-6 py-6 text-left transition-colors duration-200 hover:text-accent md:py-7"
              >
                <span className="max-w-[46ch] text-[1.0625rem] font-medium leading-relaxed text-ink md:text-[1.1875rem]">
                  {item.question}
                </span>
                <span
                  aria-hidden="true"
                  className="mt-1 flex size-6 shrink-0 items-center justify-center text-muted"
                >
                  {isOpen ? (
                    <Minus className="size-4" strokeWidth={1.5} />
                  ) : (
                    <Plus className="size-4" strokeWidth={1.5} />
                  )}
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className="grid transition-[grid-template-rows] duration-300 ease-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              {/* `visibility` keeps collapsed answers out of the accessibility
                  tree while still allowing the height to animate. */}
              <div
                className={cn(
                  "overflow-hidden transition-[visibility] duration-300",
                  !isOpen && "invisible",
                )}
              >
                <p className="max-w-[68ch] pb-8 pr-8 text-body text-muted">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
