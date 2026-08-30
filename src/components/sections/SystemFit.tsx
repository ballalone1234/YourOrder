import { Check } from "lucide-react";

import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/SectionHeader";
import { Section } from "@/components/ui/Section";
import type { Dictionary } from "@/content";

export function SystemFit({ dict }: { dict: Dictionary }) {
  const { fit } = dict;

  return (
    <Section divider>
      <div className="grid gap-x-10 gap-y-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Eyebrow>{fit.eyebrow}</Eyebrow>
            <Heading lines={fit.heading} className="mt-6" />
            <p className="mt-8 max-w-[42ch] text-body text-muted">
              {fit.paragraph}
            </p>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <ul className="border-b border-line">
            {fit.criteria.map((criterion) => (
              <li
                key={criterion.title}
                className="flex items-start gap-5 border-t border-line py-7 md:py-8"
              >
                <Check
                  aria-hidden="true"
                  className="mt-1 size-[18px] shrink-0 text-accent"
                  strokeWidth={1.75}
                />
                <div>
                  <p className="text-[1.125rem] leading-snug text-ink md:text-[1.25rem]">
                    {criterion.title}
                  </p>
                  <p className="mt-2 max-w-[40ch] text-[0.9375rem] text-muted">
                    {criterion.note}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <blockquote className="mt-12 border-l-2 border-accent pl-6 md:pl-8">
            <p className="max-w-[46ch] text-statement text-ink">
              {fit.statement.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
          </blockquote>
        </div>
      </div>
    </Section>
  );
}
