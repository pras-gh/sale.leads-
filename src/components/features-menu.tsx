"use client";

import Link from "next/link";
import { useEffect, useRef, type CSSProperties, type FocusEvent, type KeyboardEvent, type PointerEvent } from "react";
import { site } from "@/content/site";
import { ArrowRight, ChevronDown } from "./icons";

const HOVER_OPEN_DELAY = 90;
const HOVER_CLOSE_DELAY = 220;
/** A click this soon after hover opened the panel is the same intent, not a request to close it. */
const HOVER_CLICK_GRACE = 500;

const stagger = (i: number) => ({ "--i": i }) as CSSProperties;

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

/**
 * Desktop "Features" trigger + mega panel. Opens on hover (with intent delays),
 * click, or ArrowDown; arrow keys move between cards; Escape returns focus to the trigger.
 * The panel is absolutely positioned against the fixed header, so it spans full width.
 */
export function FeaturesMenu({ open, onOpenChange }: Props) {
  const { label, title, body, link } = site.nav.features;
  const items = site.pipeline.items;

  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const hoverOpenedAt = useRef(0);

  useEffect(() => () => clearTimeout(timer.current), []);

  const schedule = (next: boolean, delay: number) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      if (next) hoverOpenedAt.current = performance.now();
      onOpenChange(next);
    }, delay);
  };

  const cards = () => Array.from(panelRef.current?.querySelectorAll<HTMLElement>("[data-menu-item]") ?? []);
  const focusCard = (index: number) => {
    const list = cards();
    list[(index + list.length) % list.length]?.focus();
  };

  const close = (returnFocus = false) => {
    clearTimeout(timer.current);
    onOpenChange(false);
    if (returnFocus) triggerRef.current?.focus();
  };

  const onPointerEnter = (e: PointerEvent) => {
    if (e.pointerType === "mouse") schedule(true, open ? 0 : HOVER_OPEN_DELAY);
  };
  const onPointerLeave = (e: PointerEvent) => {
    if (e.pointerType === "mouse") schedule(false, HOVER_CLOSE_DELAY);
  };

  const onTriggerClick = () => {
    clearTimeout(timer.current);
    if (open && performance.now() - hoverOpenedAt.current < HOVER_CLICK_GRACE) return;
    onOpenChange(!open);
  };

  const onTriggerKeyDown = (e: KeyboardEvent) => {
    if (e.key !== "ArrowDown") return;
    e.preventDefault();
    onOpenChange(true);
    requestAnimationFrame(() => focusCard(0));
  };

  const onRootKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape" && open) {
      e.stopPropagation();
      close(true);
    }
  };

  const onPanelKeyDown = (e: KeyboardEvent) => {
    const list = cards();
    const current = list.indexOf(document.activeElement as HTMLElement);
    if (current === -1) return;
    const moves: Record<string, number> = {
      ArrowRight: current + 1,
      ArrowDown: current + 3,
      ArrowLeft: current - 1,
      ArrowUp: current - 3,
      Home: 0,
      End: list.length - 1,
    };
    if (!(e.key in moves)) return;
    e.preventDefault();
    focusCard(moves[e.key]);
  };

  // Close when focus moves elsewhere on the page, but not when the whole window loses focus.
  const onBlur = (e: FocusEvent<HTMLLIElement>) => {
    if (!open) return;
    const root = e.currentTarget;
    setTimeout(() => {
      if (document.hasFocus() && !root.contains(document.activeElement)) close();
    }, 0);
  };

  return (
    <li onPointerEnter={onPointerEnter} onPointerLeave={onPointerLeave} onKeyDown={onRootKeyDown} onBlur={onBlur}>
      <button
        ref={triggerRef}
        type="button"
        className="nav-link"
        aria-expanded={open}
        aria-controls="features-panel"
        onClick={onTriggerClick}
        onKeyDown={onTriggerKeyDown}
      >
        {label}
        <ChevronDown className="nav-chevron mt-0.5" />
      </button>

      <div
        id="features-panel"
        ref={panelRef}
        className="features-panel tone-paper grid-lines"
        data-open={open || undefined}
        inert={!open}
        onKeyDown={onPanelKeyDown}
      >
        <div className="container-x grid grid-cols-5">
          <div className="panel-item col-span-2 flex flex-col py-10 pr-12" style={stagger(0)}>
            <p className="label text-sm text-muted">{label}</p>
            <p className="mt-5 max-w-[13ch] font-display text-[2.25rem] leading-[1.15]">{title}</p>
            <p className="mt-4 max-w-sm text-muted">{body}</p>
            <Link
              href={link.href}
              onClick={() => close()}
              data-menu-item=""
              className="arrow-link label mt-auto inline-flex items-center gap-3 self-start pt-8 text-sm hover:text-accent-deep"
            >
              {link.label}
              <ArrowRight className="arrow" />
            </Link>
          </div>

          <ul className="col-span-3 grid grid-cols-3 border-l border-[var(--line)] [&>li:nth-child(n+4)]:border-t [&>li:nth-child(n+4)]:border-rule">
            {items.map((item, i) => (
              <li key={item.id} className="panel-item" style={stagger(i + 1)}>
                <Link href={`/#${item.id}`} onClick={() => close()} data-menu-item="" className="feature-card">
                  <span className="label text-xs text-accent-strong">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-display text-[1.375rem] leading-tight">{item.title}</span>
                  <span className="text-[0.9375rem] leading-relaxed text-muted">{item.body}</span>
                  <ArrowRight className="card-arrow" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </li>
  );
}
