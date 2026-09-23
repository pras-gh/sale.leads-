import type { Metadata } from "next";
import { PageStub } from "@/components/page-stub";

export const metadata: Metadata = { title: "Campaigns" };

export default function CampaignsPage() {
  return <PageStub tag="App" title="Campaigns." />;
}
