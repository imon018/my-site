import Hero from "../components/Hero";
import FeaturedProducts from "../components/FeaturedProducts";
import WhyChooseUs from "../components/WhyChooseUs";
import StatsSection from "../components/StatsSection";
import TrustBanner from "../components/TrustBanner";
import AnimatedWrapper from "../components/ui/AnimatedWrapper";
import PremiumHighlights from "../components/PremiumHighlights";
import Newsletter from "../components/Newsletter";

export default function Home() {
  return (
    <AnimatedWrapper>

      <Hero />

      <PremiumHighlights />

      <FeaturedProducts />

      <WhyChooseUs />

      <StatsSection />

      <TrustBanner />

      <Newsletter />

    </AnimatedWrapper>
  );
}
