import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/TestimonialsCarousel";
import CTA from "@/components/CTA";
import HowItWorks from "@/components/HowItWorks"
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