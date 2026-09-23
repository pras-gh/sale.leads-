import { Button } from "./button";
import { BracketTag, Section } from "./primitives";

/** Holding page for routes the nav links to before their real content exists. */
export function PageStub({ tag, title }: { tag: string; title: string }) {
  return (
    <Section innerClassName="flex min-h-[60vh] flex-col items-start justify-center py-24">
      <BracketTag>{tag}</BracketTag>
      <h1 className="mt-8 text-d1">{title}</h1>
      <p className="mt-6 max-w-md text-lead text-muted">This page is on its way.</p>
      <Button href="/" variant="ghost" className="mt-10">
        Back home
      </Button>
    </Section>
  );
}
