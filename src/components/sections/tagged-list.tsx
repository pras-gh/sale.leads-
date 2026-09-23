import { site } from "@/content/site";
import { Chip, Section } from "../primitives";
import { Reveal } from "../reveal";

/** Chip + display headline + mono meta, separated by rules. */
export function TaggedList() {
  const { headline, items } = site.useCases;
  return (
    <Section tone="fog" innerClassName="py-20 md:py-28">
      <Reveal as="h2" className="text-d2">
        {headline}
      </Reveal>
      <ul className="mt-10 md:mt-14">
        {items.map((item) => (
          <Reveal as="li" key={item.title} className="border-t border-[#d7d7d7] py-9 md:py-11">
            <Chip variant="light" className="text-xs md:text-sm">
              {item.tag}
            </Chip>
            <h3 className="mt-5 max-w-4xl text-d4">{item.title}</h3>
            <p className="label mt-5 text-xs text-muted md:text-sm">{item.meta}</p>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
