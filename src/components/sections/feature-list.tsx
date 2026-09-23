import { site } from "@/content/site";
import { Section } from "../primitives";
import { Reveal } from "@/components/animations/reveal";

/** Dark numbered list: brand numerals, uppercase display titles, a rule that draws in under each row. */
export function FeatureList() {
  const { headline, items } = site.pipeline;
  return (
    <Section id="pipeline" tone="ink" lines={false} innerClassName="py-20 md:py-28">
      <Reveal as="h2" className="max-w-[12ch] text-d2 md:mb-6">
        {headline}
      </Reveal>
      <ol>
        {items.map((item, i) => (
          <Reveal
            as="li"
            key={item.id}
            id={item.id}
            delay={60}
            className="draw-rule grid gap-4 py-9 last:after:hidden md:grid-cols-5 md:items-center md:py-[2.625rem]"
          >
            <div className="flex items-baseline gap-5 md:col-span-3 md:gap-0">
              <span className="label w-16 shrink-0 text-sm text-brand-strong">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-d4 uppercase">{item.title}</h3>
            </div>
            <p className="pl-[calc(4rem+1.25rem)] text-white/85 md:col-span-2 md:pl-0">{item.body}</p>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
