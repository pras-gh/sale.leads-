"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties, type Ref } from "react";
import { site } from "@/content/site";
import { Button } from "./button";
import { ArrowRight } from "./icons";

const stagger = (i: number) => ({ "--i": i }) as CSSProperties;
const DESKTOP = "(min-width: 1024px)";

export function MobileMenuButton({
  open,
  onToggle,
  ref,
}: {
  open: boolean;
  onToggle: () => void;
  ref?: Ref<HTMLButtonElement>;
}) {
  return (
    <button
      ref={ref}
      type="button"
      className="burger lg:hidden"
      aria-expanded={open}
      aria-controls="mobile-menu"
      onClick={onToggle}
    >
      <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
      <span className="burger-bar" />
      <span className="burger-bar" />
      <span className="burger-bar" />
    </button>
  );
}

/**
 * Full-height sheet under the header. While open: page scroll is locked, the page
 * behind is inert, Escape closes, and crossing into desktop width closes it.
 */
export function MobileMenuPanel({ open, onClose }: { open: boolean; onClose: (returnFocus: boolean) => void }) {
  const { features, links, login, cta } = site.nav;
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Every open starts from the collapsed state.
  const [wasOpen, setWasOpen] = useState(open);
  if (open !== wasOpen) {
    setWasOpen(open);
    if (!open) setFeaturesOpen(false);
  }

  useEffect(() => {
    if (!open) return;

    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    const behind = document.querySelectorAll<HTMLElement>("main, footer");
    behind.forEach((el) => (el.inert = true));

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose(true);
    };
    const desktop = matchMedia(DESKTOP);
    const onBreakpoint = () => desktop.matches && onClose(false);

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onBreakpoint);
    const focusTimer = setTimeout(
      () => panelRef.current?.querySelector<HTMLElement>("a, button")?.focus({ preventScroll: true }),
      200,
    );

    return () => {
      root.style.overflow = previousOverflow;
      behind.forEach((el) => (el.inert = false));
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onBreakpoint);
      clearTimeout(focusTimer);
    };
  }, [open, onClose]);

  const close = () => onClose(false);
  const rowClass =
    "flex w-full items-center justify-between gap-4 border-b border-rule py-5 text-left font-display text-[1.75rem] leading-tight sm:text-[2rem]";

  return (
    <div
      id="mobile-menu"
      ref={panelRef}
      className="mobile-panel tone-paper grid-lines lg:hidden"
      data-open={open || undefined}
      inert={!open}
    >
      <div className="container-x flex min-h-full flex-col pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-2">
        <nav aria-label="Mobile">
          <ul>
            <li className="m-item" style={stagger(0)}>
              <button
                type="button"
                className={rowClass}
                aria-expanded={featuresOpen}
                aria-controls="mobile-features"
                onClick={() => setFeaturesOpen((v) => !v)}
              >
                {features.label}
                <span className="m-plus" aria-hidden="true" />
              </button>
              <div id="mobile-features" className="m-collapse" data-open={featuresOpen || undefined}>
                <div inert={!featuresOpen}>
                  <ul className="grid grid-cols-2 gap-px border-b border-rule bg-rule sm:grid-cols-3">
                    {site.pipeline.items.map((item, i) => (
                      <li key={item.id} className="bg-paper">
                        <Link
                          href={`/#${item.id}`}
                          onClick={close}
                          className="flex h-full flex-col gap-1.5 px-3 py-4 transition-colors active:bg-mist"
                        >
                          <span className="label text-xs text-accent-strong">{String(i + 1).padStart(2, "0")}</span>
                          <span className="text-lg leading-snug">{item.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={features.link.href}
                    onClick={close}
                    className="arrow-link label flex items-center gap-3 py-5 text-sm"
                  >
                    {features.link.label}
                    <ArrowRight className="arrow" />
                  </Link>
                </div>
              </div>
            </li>

            {[...links, login].map((item, i) => (
              <li key={item.href} className="m-item" style={stagger(i + 1)}>
                <Link href={item.href} onClick={close} className={`${rowClass} arrow-link`}>
                  {item.label}
                  <ArrowRight className="arrow text-muted" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="m-item mt-auto pt-10" style={stagger(links.length + 2)}>
          <Button href={cta.href} className="w-full">
            {cta.label}
          </Button>
          <p className="label mt-5 text-center text-xs text-muted">{site.name}</p>
        </div>
      </div>
    </div>
  );
}
