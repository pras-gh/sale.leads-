import Link from "next/link";
import { site } from "@/content/site";

/** Placeholder wordmark: the name in the display face, finished with a brand-color dot. */
export function Logo({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <Link href="/" className={className} onClick={onClick} aria-label={`${site.name} home`}>
      <span className="font-display text-2xl tracking-tight lg:text-[1.75rem]">
        {site.name}
        <span className="logo-dot text-brand-strong">.</span>
      </span>
    </Link>
  );
}
