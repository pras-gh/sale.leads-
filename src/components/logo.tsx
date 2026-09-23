import Link from "next/link";
import { site } from "@/content/site";

/** Placeholder wordmark: the name in the display face, with the dot in accent. */
export function Logo({ className }: { className?: string }) {
  const [first, second] = site.name.split(".");
  return (
    <Link href="/" className={className} aria-label={`${site.name} home`}>
      <span className="font-display text-2xl tracking-tight md:text-[1.75rem]">
        {first}
        <span className="text-accent-strong">.</span>
        {second}
      </span>
    </Link>
  );
}
