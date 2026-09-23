import type { CSSProperties } from "react";
import { ArrowRight, Check, X } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { site } from "@/content/site";
import { Chip, Section } from "../primitives";

const stagger = (i: number) => ({ "--i": i }) as CSSProperties;

export function Problem() {
  const { headline, body, resolution, tools, comparison } = site.problem;
  return (
    <Section id="why" tone="ink" innerClassName="py-20 md:py-28">
      <div className="grid gap-10 md:grid-cols-5">
        <Reveal as="h2" className="text-d2 md:col-span-3 md:pr-10">
          {headline}
        </Reveal>
        <Reveal delay={150} className="space-y-5 text-lead md:col-span-2 md:pt-3">
          <p className="text-dim">{body}</p>
          <p className="text-white">{resolution}</p>
        </Reveal>
      </div>

      {/* Five tools struck through, then replaced by one workspace. */}
      <Reveal className="mt-14 flex flex-wrap items-center gap-3 md:mt-20">
        {tools.map((tool, i) => (
          <Chip key={tool} variant="dark" className="tool-chip text-xs md:text-sm" style={stagger(i)}>
            {tool}
          </Chip>
        ))}
        <span className="tool-merge flex items-center gap-3">
          <ArrowRight className="size-5 text-dim" aria-hidden="true" />
          <Chip className="label bg-brand text-xs text-ink md:text-sm">{site.name}</Chip>
        </span>
      </Reveal>

      <Reveal className="mt-12 md:mt-16">
        <table className="compare">
          <caption className="sr-only">
            Working without {site.name} compared with working with it
          </caption>
          <thead>
            <tr>
              <th scope="col" className="label w-1/2 pb-4 pr-4 pt-4 text-xs font-medium text-dim md:w-3/5 md:text-sm">
                Without {site.name}
              </th>
              <th scope="col" className="col-with label border-t-2 border-brand px-4 pb-4 pt-4 text-xs font-medium text-brand md:px-6 md:text-sm">
                With {site.name}
              </th>
            </tr>
          </thead>
          <tbody>
            {comparison.map((row, i) => (
              <tr key={row.with} style={stagger(i)}>
                <td className="border-t border-[#323232] py-5 pr-4 md:py-6">
                  <span className="flex items-start gap-3 text-dim md:text-lg">
                    <X className="mt-1 size-4 shrink-0 text-[#626262]" aria-hidden="true" />
                    {row.without}
                  </span>
                </td>
                <td className="col-with border-t border-[#323232] px-4 py-5 md:px-6 md:py-6">
                  <span className="flex items-start gap-3 text-white md:text-lg">
                    <Check className="mt-1 size-4 shrink-0 text-brand" strokeWidth={2.25} aria-hidden="true" />
                    {row.with}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Reveal>
    </Section>
  );
}
