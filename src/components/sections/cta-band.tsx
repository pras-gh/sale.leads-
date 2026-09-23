import { site } from "@/content/site";
import { Button } from "../button";
import { Section } from "../primitives";
import { Reveal } from "@/components/animations/reveal";

export function CtaBand() {
  const { headline, body, cta } = site.closing;
  return (
    <Section
      id="start"
      className="bg-linear-to-b from-paper to-fog"
      innerClassName="grid gap-8 py-20 md:grid-cols-5 md:items-start md:py-24"
    >
      <Reveal className="md:col-span-3">
        <h2 className="text-d2">{headline}</h2>
        <p className="mt-6 max-w-[34rem] text-lead">{body}</p>
      </Reveal>
      <Reveal delay={150} className="md:col-span-2 md:pl-6 md:pt-4">
        <Button href={cta.href}>{cta.label}</Button>
      </Reveal>
    </Section>
  );
}
