import { site } from "@/content/site";
import { Button } from "../button";
import { Section } from "../primitives";
import { Reveal } from "../reveal";

export function Faq() {
  const { headline, items, contact } = site.faq;
  return (
    <Section id="faq" innerClassName="grid gap-12 py-20 md:grid-cols-5 md:py-28">
      <Reveal as="h2" className="max-w-[11ch] text-d2 md:col-span-2">
        {headline}
      </Reveal>

      <div className="md:col-span-3">
        {items.map((item, i) => (
          <Reveal key={item.q} delay={i * 60}>
            <details className="faq-item border-b border-rule" open={i === 0}>
              <summary className="flex items-center justify-between gap-8 py-6">
                <span className="text-xl font-bold leading-snug md:text-[1.3125rem]">{item.q}</span>
                <span className="faq-icon" aria-hidden="true" />
              </summary>
              <p className="max-w-2xl pb-7 text-lead">{item.a}</p>
            </details>
          </Reveal>
        ))}

        <Reveal className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
          <p className="text-lead">{contact.prompt}</p>
          <Button href={contact.href} variant="ghost" size="sm">
            {contact.label}
          </Button>
        </Reveal>
      </div>
    </Section>
  );
}
