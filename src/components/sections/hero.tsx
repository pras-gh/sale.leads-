import { site } from "@/content/site";
import { Button } from "../button";
import { BracketTag, Section } from "../primitives";
import { Reveal } from "@/components/animations/reveal";

export function Hero() {
  const { tag, headline, body, primary, secondary } = site.hero;
  return (
    <Section innerClassName="pb-20 pt-8 md:pb-28 md:pt-5">
      <Reveal>
        <BracketTag>{tag}</BracketTag>
      </Reveal>
      <Reveal as="h1" delay={150} className="mt-8 max-w-[13ch] text-d1 md:mt-10">
        {headline}
      </Reveal>
      <Reveal as="p" delay={300} className="mt-8 max-w-[36rem] text-lead">
        {body}
      </Reveal>
      <Reveal delay={450} className="mt-10 flex flex-wrap gap-4">
        <Button href={primary.href}>{primary.label}</Button>
        <Button href={secondary.href} variant="ghost">
          {secondary.label}
        </Button>
      </Reveal>
    </Section>
  );
}
