import Hero from "@/components/Hero";
import Services from "@/components/services/Services";
import Portfolio from "@/components/portfolio/PortfolioSection";
import Testimonials from "@/components/testimonials/TestimonialsCarousel";
import HowItWorks from "@/components/how-it-works/HowItWorksSection"
import BigCTA from "@/components/BigCTA"
import WhyChooseUs from "@/components/WhyChooseUs";
import FAQ from "@/components/FAQ";
import BrandStrip from "@/components/BrandStrip";


export default function Home() {
  return (
    <main>

      <Hero />

      <BrandStrip />

      <Services />

      <WhyChooseUs />

      <Portfolio />

      <HowItWorks />

      <Testimonials />

      <FAQ />

      <BigCTA />

    </main>
  )
}