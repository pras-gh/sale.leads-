import type { Metadata } from "next";
import { Button } from "@/components/button";
import { BracketTag, Chip, Section, type Tone } from "@/components/primitives";

export const metadata: Metadata = { title: "Design system" };

const COLORS = [
  { name: "ink", hex: "#141414" },
  { name: "text", hex: "#212121" },
  { name: "muted-foreground", hex: "#626262" },
  { name: "subtle", hex: "#757575" },
  { name: "chip", hex: "#cdcdcd" },
  { name: "rule", hex: "#e0e0e0" },
  { name: "fog", hex: "#eaeaea" },
  { name: "mist", hex: "#f5f5f5" },
  { name: "paper", hex: "#ffffff" },
  { name: "brand", hex: "#ff7756" },
  { name: "brand-strong", hex: "#fe5f38" },
  { name: "brand-deep", hex: "#e04b2e" },
];

const TYPE = [
  { token: "text-d1", spec: "Display 1 · 74px · 1.2", className: "text-d1" },
  { token: "text-d2", spec: "Display 2 · 63px · 1.3", className: "text-d2" },
  { token: "text-d3", spec: "Display 3 · 48px · 1.3", className: "text-d3" },
  { token: "text-d4", spec: "Display 4 · 44px · 1.3", className: "text-d4" },
  { token: "text-lead", spec: "Lead · IBM Plex Sans 18px · 1.6", className: "text-lead font-sans" },
  { token: "label", spec: "Label · IBM Plex Mono 500 · 16px · 0.12em", className: "label" },
];

const TONES: Tone[] = ["paper", "mist", "fog", "ink"];

function Heading({ children }: { children: string }) {
  return <h2 className="label mb-8 text-sm text-muted-foreground">{children}</h2>;
}

export default function DesignPage() {
  return (
    <>
      <Section innerClassName="pb-16 pt-6">
        <BracketTag>Design system</BracketTag>
        <h1 className="mt-8 text-d1">Tokens &amp; parts.</h1>
        <p className="mt-6 max-w-xl text-lead">
          Every visual decision on the site, in one place. Tokens live in <code className="font-mono">globals.css</code>,
          components in <code className="font-mono">src/components</code>.
        </p>
      </Section>

      <Section tone="mist" innerClassName="py-16">
        <Heading>Color</Heading>
        <div className="grid grid-cols-2 gap-px bg-rule sm:grid-cols-3 lg:grid-cols-6">
          {COLORS.map((c) => (
            <div key={c.name} className="bg-mist p-3">
              <div className="aspect-[4/3] border border-black/5" style={{ background: c.hex }} />
              <p className="label mt-3 text-xs">{c.name}</p>
              <p className="font-mono text-xs text-muted-foreground">{c.hex}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section innerClassName="py-16">
        <Heading>Type</Heading>
        <div className="divide-y divide-rule border-y border-rule">
          {TYPE.map((t) => (
            <div key={t.token} className="grid gap-3 py-6 md:grid-cols-5 md:items-baseline">
              <p className="label text-xs text-muted-foreground">{t.spec}</p>
              <p className={`md:col-span-4 ${t.className}`}>Qualified leads.</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="fog" innerClassName="py-16">
        <Heading>Components</Heading>
        <div className="flex flex-wrap items-center gap-4">
          <Button href="#">Primary</Button>
          <Button href="#" variant="ghost">
            Ghost
          </Button>
          <Button href="#" size="sm">
            Small
          </Button>
        </div>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <BracketTag>Bracket tag</BracketTag>
          <Chip>Chip</Chip>
          <Chip variant="light">Chip light</Chip>
          <Chip variant="dark">Chip dark</Chip>
        </div>
      </Section>

      <Section lines={false} innerClassName="py-16">
        <Heading>Section tones &amp; grid rules</Heading>
      </Section>
      {TONES.map((tone) => (
        <Section key={tone} tone={tone} innerClassName="flex h-40 items-end pb-6">
          <p className="label text-sm">tone-{tone}</p>
        </Section>
      ))}
    </>
  );
}
