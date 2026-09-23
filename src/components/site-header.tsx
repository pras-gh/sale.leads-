"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { Button } from "./button";
import { FeaturesMenu } from "./features-menu";
import { Logo } from "./logo";
import { MobileMenuButton, MobileMenuPanel } from "./mobile-menu";
import { NavLink } from "./nav-link";

const SCROLLED_AT = 8;
const HIDE_AFTER = 320;
const DIRECTION_THRESHOLD = 8;

/** Compacts once the page moves; hides on scroll-down past the hero, returns on scroll-up. rAF-throttled, passive. */
function useHeaderScroll() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = Math.max(0, window.scrollY);
      setScrolled(y > SCROLLED_AT);
      if (Math.abs(y - lastY) > DIRECTION_THRESHOLD) {
        setHidden(y > lastY && y > HIDE_AFTER);
        lastY = y;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return { scrolled, hidden };
}

type OpenMenu = "features" | "mobile" | null;

export function SiteHeader() {
  const { links, login, cta } = site.nav;
  const { scrolled, hidden } = useHeaderScroll();
  const [openMenu, setOpenMenu] = useState<OpenMenu>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  // Any navigation closes whatever is open.
  const pathname = usePathname();
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpenMenu(null);
  }

  const closeAll = useCallback(() => setOpenMenu(null), []);
  const closeMobile = useCallback((returnFocus: boolean) => {
    setOpenMenu(null);
    if (returnFocus) burgerRef.current?.focus();
  }, []);
  const setFeaturesOpen = useCallback(
    (open: boolean) => setOpenMenu((current) => (open ? "features" : current === "features" ? null : current)),
    [],
  );

  // Escape anywhere closes the features panel (the panel handles it when focus is inside).
  useEffect(() => {
    if (openMenu !== "features") return;
    const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && setOpenMenu(null);
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [openMenu]);

  const menuOpen = openMenu !== null;

  return (
    <>
      <a href="#content" className="skip-link btn btn-sm">
        Skip to content
      </a>

      {/* Holds the header's space in the flow; the header itself is fixed. */}
      <div aria-hidden="true" className="h-[var(--header-full)]" />

      <header
        className="site-header grid-lines fade-top"
        data-scrolled={scrolled || undefined}
        data-hidden={(hidden && !menuOpen) || undefined}
        data-solid={menuOpen || undefined}
      >
        <div className="header-surface" aria-hidden="true" />

        <div className="container-x flex h-full items-center justify-between gap-6">
          <Logo onClick={closeAll} />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-2">
              <FeaturesMenu open={openMenu === "features"} onOpenChange={setFeaturesOpen} />
              {links.map((item) => (
                <li key={item.href}>
                  <NavLink href={item.href} onClick={closeAll}>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <NavLink href={login.href} onClick={closeAll}>
              {login.label}
            </NavLink>
            <Button href={cta.href} size="sm">
              {cta.label}
            </Button>
          </div>

          <MobileMenuButton
            ref={burgerRef}
            open={openMenu === "mobile"}
            onToggle={() => setOpenMenu((current) => (current === "mobile" ? null : "mobile"))}
          />
        </div>

        <div className="header-progress" aria-hidden="true" />
      </header>

      <MobileMenuPanel open={openMenu === "mobile"} onClose={closeMobile} />
      <div className="nav-scrim hidden lg:block" data-open={openMenu === "features" || undefined} onClick={closeAll} />
    </>
  );
}
