"use client";

import PremiumServicePage from "@/components/PremiumServicePage";

const capabilities = [
  {
    icon: "🎨",
    title: "Brand Identity",
    desc: "Logos, color systems, typography, and brand guidelines that establish a distinct, memorable presence.",
  },
  {
    icon: "✨",
    title: "UX & UI Design",
    desc: "Research-driven interfaces that balance beauty and usability — every tap, scroll, and click feels right.",
  },
  {
    icon: "📐",
    title: "Design Systems",
    desc: "Scalable component libraries and design tokens that keep every screen consistent as your product grows.",
  },
  {
    icon: "👁️",
    title: "Visual Language",
    desc: "Illustration, iconography, motion, and photography direction that give your brand a signature look.",
  },
];

const process = [
  { title: "Discovery & Research", desc: "Deep-dive into your brand DNA, audience psychology, and competitive landscape." },
  { title: "Concept & Direction", desc: "Multiple creative directions explored, refined, and pressure-tested before commitment." },
  { title: "Design & Prototype", desc: "High-fidelity designs and interactive prototypes you can feel, not just see." },
  { title: "Deliver & Systematize", desc: "Production-ready assets, design systems, and guidelines for long-term consistency." },
];

export default function PerceptionInteractionPage() {
  return (
    <PremiumServicePage
      badge="02 — Perception & Interaction"
      headline="We Design How You're Seen"
      headlineBreak="— and How You're Used"
      subtitle="From first impression to daily interaction, we craft cohesive experiences that align identity, interface, and emotion into a single, recognizable presence."
      accent="#a78bfa"
      accentRgb="167,139,250"
      capLabel="What We Craft"
      capHeading="Design That Means Something"
      capSub="Every pixel carries intent. Every interaction builds trust."
      capabilities={capabilities}
      processLabel="Our Process"
      processHeading="From Insight to Identity"
      process={process}
      ctaHeading="Ready to Redefine How You're Perceived?"
      ctaSub="Let's craft an experience that's unmistakably yours."
    />
  );
}
