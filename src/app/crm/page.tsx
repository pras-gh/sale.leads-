import type { Metadata } from "next";
import { PageStub } from "@/components/page-stub";

export const metadata: Metadata = { title: "CRM" };

export default function CrmPage() {
  return <PageStub tag="App" title="CRM." />;
}
