import { CtaBand } from "@/components/sections/cta-band";
import { Faq } from "@/components/sections/faq";
import { FeatureList } from "@/components/sections/feature-list";
import { Hero } from "@/components/sections/hero";
import { Problem } from "@/components/sections/problem";
import { ProductRows } from "@/components/sections/product-rows";
import { ProofStats } from "@/components/sections/proof-stats";
import { StepCards } from "@/components/sections/step-cards";
import { TaggedList } from "@/components/sections/tagged-list";

export default function Home() {
  return (
    <>
      <Hero />
      <ProofStats />
      <Problem />
      <StepCards />
      <ProductRows />
      <FeatureList />
      <Faq />
      <TaggedList />
      <CtaBand />
    </>
  );
}
