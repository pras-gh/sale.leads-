import type { CSSProperties } from "react";
import { Check } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { site } from "@/content/site";
import { Button } from "../button";
import { BracketTag, Section } from "../primitives";

export function Hero() {
  const { tag, headline, body, primary, secondary, points } = site.hero;
  return (
    <Section innerClassName="pb-16 pt-8 md:pb-24 md:pt-5">
      <Reveal>
        <BracketTag>{tag}</BracketTag>
      </Reveal>

      {/* Each sentence rises out of its own mask; the h1 itself doesn't move. */}
      <Reveal as="h1" className="mt-8 text-d1 md:mt-10" style={{ "--reveal-distance": "0px" } as CSSProperties}>
        {headline.map((line, i) => (
          <span key={line} className="line-mask">
            <span className="line-inner" style={{ "--i": i } as CSSProperties}>
              {line}
            </span>{" "}
          </span>
        ))}
      </Reveal>

      <Reveal as="p" delay={450} className="mt-8 max-w-[40rem] text-lead">
        {body}
      </Reveal>

      <Reveal delay={600} className="mt-10 flex flex-wrap gap-4">
        <Button href={primary.href}>{primary.label}</Button>
        <Button href={secondary.href} variant="ghost">
          {secondary.label}
        </Button>
      </Reveal>

      <Reveal as="ul" delay={750} className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
        {points.map((point) => (
          <li key={point} className="label flex items-center gap-2.5 text-xs text-muted-foreground md:text-sm">
            <Check className="size-4 text-brand-strong" strokeWidth={2} aria-hidden="true" />
            {point}
          </li>
        ))}
      </Reveal>
    </Section>
  );
}
