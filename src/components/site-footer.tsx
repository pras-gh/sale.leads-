import Link from "next/link";
import { site } from "@/content/site";
import { Logo } from "./logo";

export function SiteFooter() {
  return (
    <footer className="tone-fog grid-lines">
      <div className="container-x grid gap-12 py-16 md:grid-cols-5 md:py-20">
        <div className="md:col-span-2">
          <Logo />
          <p className="label mt-6 max-w-xs text-xs text-muted">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
        </div>
        {site.footer.columns.map((col) => (
          <div key={col.title}>
            <h2 className="label font-mono text-sm text-muted">{col.title}</h2>
            <ul className="mt-5 space-y-3">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="label text-sm transition-colors hover:text-accent-deep">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}
