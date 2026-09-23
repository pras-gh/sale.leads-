"use client";

import { useEffect, useRef, useState } from "react";

const DURATION = 1400;
const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

/**
 * Counts from 0 to `value` once, the first time it scrolls into view. The final
 * value is always rendered invisibly underneath to hold the width, and is what
 * screen readers get. Small values (under 10) just appear.
 */
export function CountUp({ value, suffix = "", className }: { value: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || value < 10 || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / DURATION);
          setShown(Math.round(easeOutExpo(t) * value));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        setShown(0);
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span ref={ref} className={`stat-value ${className ?? ""}`}>
      <span className="invisible">
        {value}
        {suffix}
      </span>
      <span className="stat-live" aria-hidden="true">
        {shown}
        {suffix}
      </span>
    </span>
  );
}
