import type { Metadata } from "next";
import { PageStub } from "@/components/page-stub";

export const metadata: Metadata = { title: "Leads" };

export default function LeadsPage() {
  return <PageStub tag="App" title="Leads." />;
}
