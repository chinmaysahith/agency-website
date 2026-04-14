"use client";

import PremiumServicePage from "@/components/PremiumServicePage";

const capabilities = [
  {
    icon: "📈",
    title: "Performance Marketing",
    desc: "ROI-driven campaigns across paid search, social, and display — optimized in real time, not in hindsight.",
  },
  {
    icon: "🔍",
    title: "SEO & Content Strategy",
    desc: "Organic growth through strategic content, technical SEO, and authority building that compounds over time.",
  },
  {
    icon: "🎯",
    title: "Conversion Optimization",
    desc: "Data-backed A/B testing, funnel analysis, and UX refinements that turn more visitors into customers.",
  },
  {
    icon: "📊",
    title: "Analytics & Tracking",
    desc: "Full-stack measurement — from attribution models to custom dashboards — so every dollar is accounted for.",
  },
];

const process = [
  { title: "Audit & Baseline", desc: "We map your current funnel, measure what matters, and identify the biggest growth levers." },
  { title: "Strategy & Channels", desc: "Custom growth playbook — the right channels, the right message, the right timing." },
  { title: "Execute & Optimize", desc: "Launch, measure, iterate. Continuous optimization cycles that compound results week over week." },
  { title: "Scale & Automate", desc: "Proven playbooks scaled with automation, smart budgets, and predictive modeling." },
];

export default function GrowthMechanicsPage() {
  return (
    <PremiumServicePage
      badge="03 — Growth Mechanics"
      headline="Attention Is Engineered,"
      headlineBreak="Not Hoped For"
      subtitle="We build growth systems that connect data, creativity, and distribution — turning visibility into predictable, measurable momentum."
      accent="#34d399"
      accentRgb="52,211,153"
      capLabel="What We Drive"
      capHeading="Growth That Compounds"
      capSub="Not just traffic — customers. Not just impressions — conversions."
      capabilities={capabilities}
      processLabel="Our Process"
      processHeading="From Data to Dominance"
      process={process}
      ctaHeading="Ready to Engineer Your Growth?"
      ctaSub="Let's build a system that delivers results on repeat."
    />
  );
}
