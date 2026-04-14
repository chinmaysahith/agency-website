"use client";

import PortfolioAnimation from "./PortfolioAnimation";
import PortfolioCard from "./PortfolioCard";

const projects = [
  {
    title: "Startup Website",
    description: "Modern marketing website built with Next.js and sleek animations for a fast-growing SaaS startup.",
    tech: ["Next.js", "Tailwind", "Vercel"],
    image: "/projects/startup-website.png",
  },
  {
    title: "AI SaaS Platform",
    description: "Full-stack AI dashboard with real-time analytics, user management, and Stripe billing integration.",
    tech: ["Next.js", "AI", "Stripe"],
    image: "/projects/ai-saas-platform.png",
  },
  {
    title: "E-commerce Store",
    description: "High-conversion Shopify store with a custom theme, optimized checkout flow, and 40% uplift in sales.",
    tech: ["Shopify", "React", "Node"],
    image: "/projects/ecommerce-store.png",
  },
  {
    title: "Brand Identity",
    description: "Complete branding system including logo, typography, color palette, and brand guidelines.",
    tech: ["Branding", "Design", "Strategy"],
    image: "/projects/brand-identity.png",
  },
];

export default function PortfolioSection() {
  return (
    <section id="work">
      {/* Animated card layout — heading is passed in so it stays visible inside the pinned area */}
      <PortfolioAnimation
        title="Our Work"
        subtitle="A selection of projects we've built."
      >
        {projects.map((project, index) => (
          <PortfolioCard
            key={index}
            title={project.title}
            description={project.description}
            tech={project.tech}
            index={index}
            image={project.image}
          />
        ))}
      </PortfolioAnimation>
    </section>
  );
}
