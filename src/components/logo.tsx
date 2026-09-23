import Link from "next/link";
import { site } from "@/content/site";

/** Placeholder wordmark: the name in the display face, with the dot in accent. */
export function Logo({ className, onClick }: { className?: string; onClick?: () => void }) {
  const [first, second] = site.name.split(".");
  return (
    <Link href="/" className={className} onClick={onClick} aria-label={`${site.name} home`}>
      <span className="font-display text-2xl tracking-tight lg:text-[1.75rem]">
        {first}
        <span className="logo-dot text-accent-strong">.</span>
        {second}
      </span>
    </Link>
  );
}
