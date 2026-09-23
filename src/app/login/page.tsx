import type { Metadata } from "next";
import { PageStub } from "@/components/page-stub";

export const metadata: Metadata = { title: "Log in" };

export default function LoginPage() {
  return <PageStub tag="Log in" title="Log in." />;
}
