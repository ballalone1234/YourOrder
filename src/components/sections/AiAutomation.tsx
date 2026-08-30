import { FlowDiagram } from "@/components/site/FlowDiagram";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/SectionHeader";
import type { Dictionary } from "@/content";

export function AiAutomation({ dict }: { dict: Dictionary }) {
  const { ai } = dict;

  return (
    <section
      id="ai-automation"
      className="dark-panel bg-night py-[clamp(4.5rem,9vw,10rem)] text-white"
    >
      <Container>
        <div className="grid gap-x-10 gap-y-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow tone="invert">{ai.eyebrow}</Eyebrow>
            <Heading lines={ai.heading} tone="invert" className="mt-6" />

            <p className="mt-8 max-w-[46ch] text-body text-white/65">
              {ai.paragraph}
            </p>
            <p className="mt-5 max-w-[46ch] text-body text-white/65">
              {ai.secondary}
            </p>

            <ul className="mt-14 grid gap-x-8 gap-y-8 sm:grid-cols-3">
              {ai.principles.map((principle) => (
                <li key={principle.title} className="border-t border-night-line pt-5">
                  <p className="font-mono text-[0.8125rem] uppercase tracking-[0.14em] text-white">
                    {principle.title}
                  </p>
                  <p className="mt-2 text-[0.875rem] leading-relaxed text-white/55">
                    {principle.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <FlowDiagram title={ai.flowTitle} nodes={ai.flow} />
          </div>
        </div>
      </Container>
    </section>
  );
}
