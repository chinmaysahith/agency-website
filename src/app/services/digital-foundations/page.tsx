"use client";

import PremiumServicePage from "@/components/PremiumServicePage";

const capabilities = [
  {
    icon: "🌐",
    title: "Web Platforms",
    desc: "Responsive, high-performance websites and web applications built with modern frameworks that scale effortlessly.",
  },
  {
    icon: "📱",
    title: "Mobile Applications",
    desc: "Native and cross-platform apps crafted for seamless UX, built for speed, built to last.",
  },
  {
    icon: "🔗",
    title: "API Integrations",
    desc: "Clean, documented APIs that connect your platforms, automate workflows, and unlock third-party power.",
  },
  {
    icon: "⚡",
    title: "Scalable Infrastructure",
    desc: "Cloud-native architectures designed for reliability — auto-scaling, CI/CD pipelines, and zero-downtime deploys.",
  },
];

const process = [
  { title: "Audit & Architecture", desc: "We map your current tech, identify bottlenecks, and design the ideal architecture." },
  { title: "Build & Iterate", desc: "Rapid sprints with constant feedback loops — you see progress weekly, not monthly." },
  { title: "Launch & Harden", desc: "Rigorous QA, performance testing, and a smooth deployment pipeline." },
  { title: "Scale & Support", desc: "Post-launch optimization, monitoring, and long-term technical partnership." },
];

export default function DigitalFoundationsPage() {
  return (
    <PremiumServicePage
      badge="01 — Digital Foundations"
      headline="Built to Evolve,"
      headlineBreak="Not Just Launch"
      subtitle="We design and engineer digital platforms that grow with your business — resilient architectures, seamless interfaces, and performance that holds under pressure."
      accent="#f97316"
      accentRgb="249,115,22"
      capLabel="What We Build"
      capHeading="End-to-End Digital Engineering"
      capSub="From frontend polish to backend power — every layer is built with intent."
      capabilities={capabilities}
      processLabel="Our Process"
      processHeading="From Concept to Production"
      process={process}
      ctaHeading="Ready to Build Something That Lasts?"
      ctaSub="Let's talk about your next digital platform."
    />
  );
}
