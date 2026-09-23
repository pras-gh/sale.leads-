import { CardGrid } from "@/components/sections/card-grid";
import { CtaBand } from "@/components/sections/cta-band";
import { Faq } from "@/components/sections/faq";
import { FeatureList } from "@/components/sections/feature-list";
import { Hero } from "@/components/sections/hero";
import { ProductRows } from "@/components/sections/product-rows";
import { TaggedList } from "@/components/sections/tagged-list";

export default function Home() {
  return (
    <>
      <Hero />
      <ProductRows />
      <FeatureList />
      <Faq />
      <TaggedList />
      <CardGrid />
      <CtaBand />
    </>
  );
}
