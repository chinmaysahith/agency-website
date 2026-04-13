"use client";

import PortfolioAnimation from "./PortfolioAnimation";
import PortfolioCard from "./PortfolioCard";

const projects = [
  {
    title: "Startup Website",
    description: "Modern marketing website built with Next.js.",
    tech: ["Next.js", "Tailwind", "Vercel"],
  },
  {
    title: "AI SaaS Platform",
    description: "AI powered SaaS dashboard and application.",
    tech: ["Next.js", "AI", "Stripe"],
  },
  {
    title: "E-commerce Store",
    description: "High conversion online store with optimized checkout.",
    tech: ["Shopify", "React", "Node"],
  },
  {
    title: "Brand Identity",
    description: "Complete branding system and visual identity.",
    tech: ["Branding", "Design", "Strategy"],
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
          />
        ))}
      </PortfolioAnimation>
    </section>
  );
}
