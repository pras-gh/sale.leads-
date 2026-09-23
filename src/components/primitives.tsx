import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type Tone = "paper" | "mist" | "fog" | "ink";

type SectionProps = {
  tone?: Tone;
  lines?: boolean;
  fadeTop?: boolean;
  id?: string;
  className?: string;
  innerClassName?: string;
  children: ReactNode;
};

/** A full-bleed band with a tone and the five background grid rules. */
export function Section({
  tone = "paper",
  lines = true,
  fadeTop,
  id,
  className,
  innerClassName,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(`tone-${tone}`, lines && "grid-lines", fadeTop && "fade-top", className)}
    >
      <div className={cn("container-x", innerClassName)}>{children}</div>
    </section>
  );
}

export function BracketTag({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("bracket-tag label text-[0.6875rem] tracking-[0.08em] sm:text-sm sm:tracking-[0.12em] md:text-base", className)}>{children}</span>;
}

export function Chip({
  children,
  variant = "default",
  className,
  style,
}: {
  children: ReactNode;
  variant?: "default" | "light" | "dark";
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span
      style={style}
      className={cn("chip label", variant === "light" && "chip-light", variant === "dark" && "chip-dark", className)}
    >
      {children}
    </span>
  );
}
