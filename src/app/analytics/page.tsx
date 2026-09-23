import type { Metadata } from "next";
import { PageStub } from "@/components/page-stub";

export const metadata: Metadata = { title: "Analytics" };

export default function AnalyticsPage() {
  return <PageStub tag="App" title="Analytics." />;
}
