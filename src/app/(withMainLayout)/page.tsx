import { BannerSection } from "@/components/HomePage/Banner/Banner";
import CategoriesSection from "@/components/HomePage/CategoriesSection/Categories";
import FlashSale from "@/components/HomePage/FlashSale/FlashSale";

import TopRatedProducts from "@/components/HomePage/TopRatedSection/TopRatedProducts";
import Container from "@/components/Shared/Container/Container";

export default function Home() {
  return (
    <Container>
      <BannerSection />
      <FlashSale />
      <CategoriesSection />
      <TopRatedProducts />
    </Container>
  );
}
