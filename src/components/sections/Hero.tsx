import { HeroDiagram } from "@/components/site/HeroDiagram";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import type { Dictionary } from "@/content";

export function Hero({ dict }: { dict: Dictionary }) {
  const { hero } = dict;

  return (
    <section className="pb-[clamp(4rem,8vw,7rem)] pt-[clamp(2.5rem,5vw,5rem)]">
      <Container>
        <div className="grid gap-x-10 gap-y-16 xl:grid-cols-12">
          <div className="xl:col-span-8">
            <Eyebrow>{hero.eyebrow}</Eyebrow>

            <Heading
              as="h1"
              size="display"
              lines={hero.headline}
              className="mt-7"
            />

            <p className="mt-8 max-w-[52ch] text-lead text-muted">
              {hero.paragraph}
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Button href="#contact" arrow>
                {hero.primaryCta}
              </Button>
              <Button href="#process" variant="secondary">
                {hero.secondaryCta}
              </Button>
            </div>
          </div>

          <div className="max-w-[30rem] xl:col-span-4 xl:col-start-9 xl:max-w-none xl:pt-3">
            <Reveal delay={120}>
              <HeroDiagram
                title={hero.diagram.title}
                version={hero.diagram.version}
                nodes={hero.diagram.nodes}
                activeIndex={hero.diagram.activeIndex}
                footnote={hero.diagram.footnote}
              />
            </Reveal>
          </div>
        </div>

        <ul className="mt-[clamp(4rem,8vw,7rem)] grid grid-cols-2 gap-x-8 gap-y-7 md:grid-cols-4">
          {hero.meta.map((item) => (
            <li key={item.label} className="border-t border-line pt-5">
              <p className="font-mono text-[0.75rem] uppercase tracking-[0.14em] text-ink">
                {item.label}
              </p>
              <p className="mt-1.5 text-[0.875rem] text-muted">{item.note}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
