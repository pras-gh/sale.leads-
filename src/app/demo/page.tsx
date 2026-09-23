import type { Metadata } from "next";
import { PageStub } from "@/components/page-stub";

export const metadata: Metadata = { title: "Demo" };

export default function DemoPage() {
  return <PageStub tag="Demo" title="Demo." />;
}
