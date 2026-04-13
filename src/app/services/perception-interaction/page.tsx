"use client";

import Link from "next/link";

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
  { num: "01", title: "Discovery & Research", desc: "Deep-dive into your brand DNA, audience psychology, and competitive landscape." },
  { num: "02", title: "Concept & Direction", desc: "Multiple creative directions explored, refined, and pressure-tested before commitment." },
  { num: "03", title: "Design & Prototype", desc: "High-fidelity designs and interactive prototypes you can feel, not just see." },
  { num: "04", title: "Deliver & Systematize", desc: "Production-ready assets, design systems, and guidelines for long-term consistency." },
];

export default function PerceptionInteractionPage() {
  return (
    <>
      <main className="pi-page">
        {/* ── Hero ── */}
        <section className="pi-hero">
          <div className="pi-hero-grid" />
          <div className="pi-hero-content">
            <Link href="/#services" className="pi-back">← Back to Services</Link>
            <div className="pi-hero-badge">02 — Perception & Interaction</div>
            <h1 className="pi-hero-h1">We Design How You&apos;re Seen<br />— and How You&apos;re Used</h1>
            <p className="pi-hero-sub">
              From first impression to daily interaction, we craft cohesive experiences that align
              identity, interface, and emotion into a single, recognizable presence.
            </p>
            <Link href="/contact" className="pi-hero-cta">Start Your Project →</Link>
          </div>
        </section>

        {/* ── Capabilities ── */}
        <section className="pi-caps">
          <div className="pi-caps-header">
            <span className="pi-label">What We Craft</span>
            <h2 className="pi-caps-h2">Design That Means Something</h2>
            <p className="pi-caps-sub">Every pixel carries intent. Every interaction builds trust.</p>
          </div>
          <div className="pi-caps-grid">
            {capabilities.map((cap, i) => (
              <div key={i} className="pi-cap-card">
                <div className="pi-cap-icon">{cap.icon}</div>
                <h3 className="pi-cap-title">{cap.title}</h3>
                <p className="pi-cap-desc">{cap.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Process ── */}
        <section className="pi-process">
          <div className="pi-process-header">
            <span className="pi-label">Our Process</span>
            <h2 className="pi-process-h2">From Insight to Identity</h2>
          </div>
          <div className="pi-process-steps">
            {process.map((step, i) => (
              <div key={i} className="pi-step">
                <div className="pi-step-num">{step.num}</div>
                <div className="pi-step-content">
                  <h3 className="pi-step-title">{step.title}</h3>
                  <p className="pi-step-desc">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="pi-cta-section">
          <h2 className="pi-cta-h2">Ready to Redefine How You&apos;re Perceived?</h2>
          <p className="pi-cta-sub">Let&apos;s craft an experience that&apos;s unmistakably yours.</p>
          <Link href="/contact" className="pi-cta-btn">Book a Call →</Link>
        </section>
      </main>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Clash+Display:wght@400;500;600;700;800&family=Sora:wght@300;400;500;600;700&display=swap');

        .pi-page { font-family: 'Sora', sans-serif; background: #ffffff; }

        /* ── Hero ── */
        .pi-hero {
          position: relative; min-height: 70vh;
          display: flex; align-items: center; justify-content: center;
          background: linear-gradient(165deg, #1e1036 0%, #2d1b69 50%, #1e1036 100%);
          overflow: hidden; padding: 120px 40px 80px;
        }
        .pi-hero-grid {
          position: absolute; inset: 0; opacity: 0.04;
          background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg stroke='%23fff' stroke-width='1' stroke-dasharray='4 4' fill='none'%3E%3Cpath d='M40 0H0V40'/%3E%3C/g%3E%3C/svg%3E");
          background-size: 40px 40px;
        }
        .pi-hero-content {
          position: relative; z-index: 1; max-width: 720px; text-align: center;
        }
        .pi-back {
          display: inline-block; font-size: 12px; color: rgba(255,255,255,0.45);
          text-decoration: none; margin-bottom: 32px; transition: color 0.3s;
          font-weight: 500;
        }
        .pi-back:hover { color: rgba(255,255,255,0.8); }
        .pi-hero-badge {
          display: inline-block; font-size: 10px; font-weight: 700;
          letter-spacing: 3px; text-transform: uppercase; color: #a78bfa;
          margin-bottom: 20px;
        }
        .pi-hero-h1 {
          font-family: 'Clash Display', sans-serif;
          font-size: clamp(32px, 5.5vw, 50px); font-weight: 800;
          color: #ffffff; letter-spacing: -2px; line-height: 1.1;
          margin: 0 0 20px;
        }
        .pi-hero-sub {
          font-size: 15px; color: rgba(255,255,255,0.5);
          line-height: 1.8; font-weight: 300; max-width: 520px;
          margin: 0 auto 36px;
        }
        .pi-hero-cta {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 32px; border-radius: 999px; font-size: 13px;
          font-weight: 600; color: #fff; text-decoration: none;
          background: linear-gradient(135deg, #7c3aed, #a78bfa);
          box-shadow: 0 4px 24px rgba(124, 58, 237, 0.4);
          transition: all 0.3s;
        }
        .pi-hero-cta:hover {
          box-shadow: 0 8px 36px rgba(124, 58, 237, 0.5);
          transform: translateY(-2px);
        }

        /* ── Capabilities ── */
        .pi-caps {
          padding: 100px 40px; max-width: 1100px; margin: 0 auto;
        }
        .pi-caps-header { text-align: center; margin-bottom: 56px; }
        .pi-label {
          display: inline-block; font-size: 10px; font-weight: 700;
          letter-spacing: 3px; text-transform: uppercase; color: #7c3aed;
          margin-bottom: 12px;
        }
        .pi-caps-h2 {
          font-family: 'Clash Display', sans-serif;
          font-size: clamp(26px, 4vw, 36px); font-weight: 700;
          color: #0f172a; letter-spacing: -1.5px; margin: 0 0 12px;
        }
        .pi-caps-sub {
          font-size: 14px; color: #64748b; font-weight: 400; margin: 0;
        }
        .pi-caps-grid {
          display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;
        }
        .pi-cap-card {
          padding: 36px 32px; border-radius: 20px;
          background: rgba(248,250,252,0.7);
          border: 1px solid rgba(0,0,0,0.05);
          transition: all 0.4s ease;
        }
        .pi-cap-card:hover {
          background: #ffffff;
          border-color: rgba(124, 58, 237, 0.12);
          box-shadow: 0 12px 40px -12px rgba(124, 58, 237, 0.08);
          transform: translateY(-4px);
        }
        .pi-cap-icon { font-size: 28px; margin-bottom: 16px; }
        .pi-cap-title {
          font-family: 'Clash Display', sans-serif;
          font-size: 18px; font-weight: 700; color: #0f172a;
          margin: 0 0 8px; letter-spacing: -0.5px;
        }
        .pi-cap-desc {
          font-size: 13px; color: #64748b; line-height: 1.7; font-weight: 300; margin: 0;
        }

        /* ── Process ── */
        .pi-process {
          padding: 80px 40px 100px; max-width: 800px; margin: 0 auto;
        }
        .pi-process-header { text-align: center; margin-bottom: 48px; }
        .pi-process-h2 {
          font-family: 'Clash Display', sans-serif;
          font-size: clamp(24px, 4vw, 32px); font-weight: 700;
          color: #0f172a; letter-spacing: -1.5px; margin: 0;
        }
        .pi-process-steps { display: flex; flex-direction: column; }
        .pi-step {
          display: flex; gap: 24px; padding: 28px 0;
          border-bottom: 1px solid rgba(0,0,0,0.06);
        }
        .pi-step:last-child { border-bottom: none; }
        .pi-step-num {
          font-family: 'Clash Display', sans-serif;
          font-size: 12px; font-weight: 700; color: #7c3aed;
          min-width: 32px; padding-top: 3px;
        }
        .pi-step-title {
          font-family: 'Clash Display', sans-serif;
          font-size: 17px; font-weight: 700; color: #0f172a;
          margin: 0 0 6px; letter-spacing: -0.5px;
        }
        .pi-step-desc {
          font-size: 13px; color: #64748b; line-height: 1.7;
          font-weight: 300; margin: 0;
        }

        /* ── CTA ── */
        .pi-cta-section {
          padding: 80px 40px; text-align: center;
          background: linear-gradient(165deg, #faf5ff, #ffffff);
          border-top: 1px solid rgba(124, 58, 237, 0.06);
        }
        .pi-cta-h2 {
          font-family: 'Clash Display', sans-serif;
          font-size: clamp(24px, 4vw, 34px); font-weight: 700;
          color: #0f172a; letter-spacing: -1.5px; margin: 0 0 12px;
        }
        .pi-cta-sub {
          font-size: 14px; color: #64748b; margin: 0 0 28px;
        }
        .pi-cta-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 32px; border-radius: 999px; font-size: 13px;
          font-weight: 600; color: #fff; text-decoration: none;
          background: linear-gradient(135deg, #7c3aed, #a78bfa);
          box-shadow: 0 4px 24px rgba(124, 58, 237, 0.3);
          transition: all 0.3s;
        }
        .pi-cta-btn:hover {
          box-shadow: 0 8px 36px rgba(124, 58, 237, 0.45);
          transform: translateY(-2px);
        }

        /* ── Mobile ── */
        @media (max-width: 767px) {
          .pi-hero { padding: 100px 24px 60px; min-height: auto; }
          .pi-hero-h1 { font-size: 28px; letter-spacing: -1px; }
          .pi-caps { padding: 60px 20px; }
          .pi-caps-grid { grid-template-columns: 1fr; }
          .pi-process { padding: 60px 20px; }
          .pi-step { flex-direction: column; gap: 8px; }
          .pi-cta-section { padding: 60px 20px; }
        }
      `}</style>
    </>
  );
}
