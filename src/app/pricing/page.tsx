import type { Metadata } from "next";
import { PageStub } from "@/components/page-stub";

export const metadata: Metadata = { title: "Pricing" };

export default function PricingPage() {
  return <PageStub tag="Pricing" title="Pricing." />;
}
