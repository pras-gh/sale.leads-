import Link from "next/link";
import { site } from "@/content/site";
import { Button } from "./button";
import { Logo } from "./logo";

export function SiteHeader() {
  return (
    <header className="tone-paper grid-lines fade-top relative z-20">
      <div className="container-x flex h-20 items-center justify-between gap-6 md:h-[108px]">
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[1.1875rem] leading-snug transition-colors hover:text-accent-deep"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button href={site.cta.href}>{site.cta.label}</Button>
        </div>

        <details className="group lg:hidden">
          <summary className="label flex cursor-pointer list-none items-center gap-2 [&::-webkit-details-marker]:hidden">
            <span className="group-open:hidden">Menu</span>
            <span className="hidden group-open:inline">Close</span>
          </summary>
          <div className="tone-paper absolute inset-x-0 top-full border-y border-rule px-[var(--gutter)] pb-8 pt-4">
            <nav aria-label="Mobile" className="flex flex-col">
              {site.nav.map((item) => (
                <Link key={item.href} href={item.href} className="border-b border-rule py-4 text-xl">
                  {item.label}
                </Link>
              ))}
            </nav>
            <Button href={site.cta.href} className="mt-6 w-full">
              {site.cta.label}
            </Button>
          </div>
        </details>
      </div>
    </header>
  );
}
