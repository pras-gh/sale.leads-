import type { CSSProperties, ReactNode } from "react";
import { Search, Sparkles } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { site } from "@/content/site";
import campaigns from "@/data/campaigns.json";
import { Section } from "../primitives";

const stagger = (i: number) => ({ "--i": i }) as CSSProperties;

/** Three campaign-style cards. Each illustration plays once when its card scrolls in. CSS only. */
export function StepCards() {
  const { headline, items } = site.steps;
  const visuals = [<SearchVisual key="search" />, <ComposerVisual key="composer" />, <CampaignVisual key="campaign" />];

  return (
    <Section id="how" tone="mist" innerClassName="py-20 md:py-28">
      <Reveal as="h2" className="max-w-[16ch] text-d2">
        {headline}
      </Reveal>

      <ol className="mt-12 grid gap-6 md:mt-16 lg:grid-cols-3">
        {items.map((item, i) => (
          <Reveal as="li" key={item.title} delay={i * 120} className="step-card flex min-w-0 flex-col border border-rule bg-paper">
            <div aria-hidden="true" className="h-[288px] overflow-hidden border-b border-rule bg-[linear-gradient(180deg,#fafafa,#f2f2f2)] p-5">
              {visuals[i]}
            </div>
            <div className="flex flex-1 flex-col p-6 md:p-7">
              <span className="label text-xs text-brand-strong">Step {String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 text-[1.625rem] leading-tight md:text-[1.75rem]">{item.title}</h3>
              <p className="mt-3 text-muted-foreground">{item.body}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`border border-rule bg-paper shadow-[0_1px_2px_rgb(0_0_0/0.04)] ${className}`}>{children}</div>;
}

function Initials({ name }: { name: string }) {
  const letters = name
    .split(" ")
    .map((part) => part[0])
    .join("");
  return (
    <span className="grid size-7 shrink-0 place-items-center bg-fog font-mono text-[0.625rem] font-medium text-ink">
      {letters}
    </span>
  );
}

function SearchVisual() {
  const { query, filters, results } = site.steps.demo;
  return (
    <div aria-hidden="true" className="flex h-full flex-col gap-3">
      <Panel className="flex min-w-0 items-center gap-2.5 overflow-hidden px-3 py-2.5">
        <Search className="size-4 shrink-0 text-muted-foreground" />
        <span className="typewriter font-mono text-[0.6875rem] text-ink min-[400px]:text-[0.8125rem]" style={{ "--chars": query.length } as CSSProperties}>
          {query}
        </span>
      </Panel>
      <div className="flex flex-wrap gap-1.5">
        {filters.map((f, i) => (
          <span key={f} className="pop chip label bg-brand/15 px-2 py-1 text-[0.625rem] text-brand-deep" style={stagger(i)}>
            {f}
          </span>
        ))}
      </div>
      <Panel className="divide-y divide-rule">
        {results.map((r, i) => (
          <div key={r.name} className="pop flex items-center gap-3 px-3 py-2" style={stagger(i + filters.length)}>
            <Initials name={r.name} />
            <div className="min-w-0 flex-1 leading-tight">
              <p className="truncate text-[0.8125rem] font-medium text-ink">{r.name}</p>
              <p className="truncate text-[0.6875rem] text-muted-foreground">
                {r.title} · {r.company}
              </p>
            </div>
            <span className="label text-[0.625rem] text-brand-strong">{r.fit} fit</span>
          </div>
        ))}
      </Panel>
    </div>
  );
}

function ComposerVisual() {
  const { to, subject, opening } = site.steps.demo.message;
  const lines = [100, 92, 97, 64];
  return (
    <Panel className="flex h-full flex-col">
      <div aria-hidden="true" className="flex items-center justify-between border-b border-rule px-3">
        <div className="flex">
          <span className="label border-b-2 border-ink px-2 py-2.5 text-[0.625rem] text-ink">Email</span>
          <span className="label px-2 py-2.5 text-[0.625rem] text-muted-foreground">LinkedIn</span>
        </div>
        <span className="pop label flex items-center gap-1.5 bg-ink px-2 py-1 text-[0.5625rem] text-white" style={stagger(3)}>
          <Sparkles className="size-3 text-brand" />
          AI draft
        </span>
      </div>
      <div aria-hidden="true" className="space-y-1 border-b border-rule px-3 py-2.5 text-[0.75rem]">
        <p>
          <span className="text-muted-foreground">To </span>
          <span className="text-ink">{to}</span>
        </p>
        <p>
          <span className="text-muted-foreground">Subject </span>
          <span className="text-ink">{subject}</span>
        </p>
      </div>
      <div aria-hidden="true" className="flex-1 space-y-2.5 px-3 py-3">
        <p className="text-[0.8125rem] text-ink">{opening}</p>
        {lines.map((w, i) => (
          <div key={i} className="h-2 bg-fog" style={{ width: `${w}%` }}>
            <div className="write-line h-full bg-[#d4d4d4]" style={stagger(i)} />
          </div>
        ))}
      </div>
    </Panel>
  );
}

function CampaignVisual() {
  const campaign = campaigns.find((c) => c.id === site.steps.demo.campaignId) ?? campaigns[0];
  const rows = [
    { label: "Sent", value: campaign.sent },
    { label: "Opened", value: campaign.opened },
    { label: "Replied", value: campaign.replied },
    { label: "Meetings", value: campaign.meetingsBooked },
  ];
  return (
    <Panel className="flex h-full flex-col">
      <div aria-hidden="true" className="flex items-start justify-between gap-3 border-b border-rule px-3 py-3">
        <div className="min-w-0">
          <p className="truncate text-[0.8125rem] font-medium text-ink">{campaign.name}</p>
          <p className="label mt-1 text-[0.5625rem] text-muted-foreground">
            {campaign.channel} · {campaign.audience} leads
          </p>
        </div>
        <span className="label flex items-center gap-1.5 bg-[#e8f5ee] px-2 py-1 text-[0.5625rem] text-[#1f7a4a]">
          <span className="live-dot size-1.5 rounded-full bg-current" />
          {campaign.status}
        </span>
      </div>
      <div aria-hidden="true" className="flex-1 space-y-3 px-3 py-3.5">
        {rows.map((row, i) => (
          <div key={row.label}>
            <div className="flex items-baseline justify-between text-[0.75rem]">
              <span className="text-muted-foreground">{row.label}</span>
              <span className="font-mono text-ink">{row.value}</span>
            </div>
            <div className="mt-1.5 h-1.5 bg-fog">
              <div
                className={`bar-fill h-full ${i === rows.length - 1 ? "bg-brand" : "bg-ink"}`}
                style={{ "--v": row.value / campaign.sent, ...stagger(i) } as CSSProperties}
              />
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}
