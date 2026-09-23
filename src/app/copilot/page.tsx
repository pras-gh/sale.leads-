import type { Metadata } from "next";
import { PageStub } from "@/components/page-stub";

export const metadata: Metadata = { title: "Copilot" };

export default function CopilotPage() {
  return <PageStub tag="App" title="Copilot." />;
}
