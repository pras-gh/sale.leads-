import { site } from "@/content/site";
import { Button } from "../button";
import { Section, type Tone } from "../primitives";
import { Reveal } from "../reveal";

/** Stacked rows that step down in tone: white, mist, fog. */
const TONES: Tone[] = ["paper", "mist", "fog"];

export function ProductRows() {
  return (
    <div id="product" className="scroll-mt-24">
      {site.products.map((item, i) => (
        <Section key={item.title} tone={TONES[i % TONES.length]}>
          <Reveal className="grid items-center gap-5 py-12 md:grid-cols-10 md:gap-6 md:py-16">
            <h2 className="text-d3 md:col-span-5">{item.title}</h2>
            <p className="max-w-sm md:col-span-3">{item.body}</p>
            <div className="md:col-span-2 md:justify-self-end">
              <Button href={item.href} size="sm">
                Learn more
              </Button>
            </div>
          </Reveal>
        </Section>
      ))}
    </div>
  );
}
