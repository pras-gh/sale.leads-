import { site } from "@/content/site";
import { Chip, Section } from "../primitives";
import { Reveal } from "../reveal";

/** Dark three-up columns, each sitting on a grid rule. */
export function CardGrid() {
  const { headline, items } = site.steps;
  return (
    <Section id="how" tone="ink" innerClassName="py-20 md:py-28">
      <Reveal as="h2" className="text-d2">
        {headline}
      </Reveal>
      <div className="mt-12 grid gap-12 md:mt-16 md:grid-cols-10 md:gap-6">
        {items.map((item, i) => (
          <Reveal key={item.title} delay={i * 120} className="md:col-span-3">
            <Chip variant="dark" className="text-xs md:text-sm">
              {item.tag}
            </Chip>
            <h3 className="mt-6 text-[1.75rem] leading-tight md:text-[2rem]">{item.title}</h3>
            <p className="mt-5 text-white/80">{item.body}</p>
            <p className="label mt-6 text-xs text-dim">Step {String(i + 1).padStart(2, "0")}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
