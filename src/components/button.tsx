"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+=<>/";
const DURATION = 420;
const FRAME = 40;

/** Letters shuffle and settle left-to-right on hover. Runs only on hover, ~10 frames. */
function useScramble(text: string) {
  const [out, setOut] = useState(text);
  const raf = useRef(0);

  const run = useCallback(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    cancelAnimationFrame(raf.current);
    const start = performance.now();
    let lastFrame = -1;
    const tick = (now: number) => {
      const elapsed = now - start;
      const frame = Math.floor(elapsed / FRAME);
      if (frame !== lastFrame) {
        lastFrame = frame;
        const settled = Math.floor((elapsed / DURATION) * text.length);
        setOut(
          Array.from(text, (c, i) =>
            i < settled || c === " " ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
          ).join(""),
        );
      }
      if (elapsed < DURATION) raf.current = requestAnimationFrame(tick);
      else setOut(text);
    };
    raf.current = requestAnimationFrame(tick);
  }, [text]);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);
  return [out, run] as const;
}

type ButtonProps = {
  href: string;
  children: string;
  variant?: "primary" | "ghost";
  size?: "md" | "sm";
  className?: string;
};

export function Button({ href, children, variant = "primary", size = "md", className }: ButtonProps) {
  const label = children.toUpperCase();
  const [out, scramble] = useScramble(label);

  return (
    <Link
      href={href}
      onMouseEnter={scramble}
      onFocus={scramble}
      className={cn("btn", variant === "ghost" && "btn-ghost", size === "sm" && "btn-sm", className)}
    >
      <span className="sr-only">{children}</span>
      <span aria-hidden="true">{out}</span>
    </Link>
  );
}
