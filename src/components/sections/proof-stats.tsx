import { CountUp } from "@/components/animations/count-up";
import { Reveal } from "@/components/animations/reveal";
import { site } from "@/content/site";
import { Section } from "../primitives";

/** Label in the first grid column, one stat per remaining column, each sitting on a grid rule. */
export function ProofStats() {
  const { lead, stats } = site.proof;
  return (
    <Section innerClassName="border-t border-rule">
      <div className="grid grid-cols-2 md:grid-cols-5">
        <Reveal as="p" className="col-span-2 py-8 pr-8 text-lead text-muted-foreground md:col-span-1 md:py-12">
          {lead}
        </Reveal>
        {stats.map((stat, i) => (
          <Reveal
            key={stat.label}
            delay={i * 90}
            className="border-t border-rule py-8 pr-4 max-md:[&:nth-child(odd)]:pl-4 md:border-t-0 md:py-12 md:pl-6"
          >
            <CountUp value={stat.value} suffix={stat.suffix} className="font-display text-d3" />
            <p className="label mt-3 text-xs text-muted-foreground">{stat.label}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
