"use client";

import Link from "next/link";

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
  { num: "01", title: "Audit & Baseline", desc: "We map your current funnel, measure what matters, and identify the biggest growth levers." },
  { num: "02", title: "Strategy & Channels", desc: "Custom growth playbook — the right channels, the right message, the right timing." },
  { num: "03", title: "Execute & Optimize", desc: "Launch, measure, iterate. Continuous optimization cycles that compound results week over week." },
  { num: "04", title: "Scale & Automate", desc: "Proven playbooks scaled with automation, smart budgets, and predictive modeling." },
];

export default function GrowthMechanicsPage() {
  return (
    <>
      <main className="gm-page">
        {/* ── Hero ── */}
        <section className="gm-hero">
          <div className="gm-hero-grid" />
          <div className="gm-hero-content">
            <Link href="/#services" className="gm-back">← Back to Services</Link>
            <div className="gm-hero-badge">03 — Growth Mechanics</div>
            <h1 className="gm-hero-h1">Attention Is Engineered,<br />Not Hoped For</h1>
            <p className="gm-hero-sub">
              We build growth systems that connect data, creativity, and distribution —
              turning visibility into predictable, measurable momentum.
            </p>
            <Link href="/contact" className="gm-hero-cta">Start Your Project →</Link>
          </div>
        </section>

        {/* ── Capabilities ── */}
        <section className="gm-caps">
          <div className="gm-caps-header">
            <span className="gm-label">What We Drive</span>
            <h2 className="gm-caps-h2">Growth That Compounds</h2>
            <p className="gm-caps-sub">Not just traffic — customers. Not just impressions — conversions.</p>
          </div>
          <div className="gm-caps-grid">
            {capabilities.map((cap, i) => (
              <div key={i} className="gm-cap-card">
                <div className="gm-cap-icon">{cap.icon}</div>
                <h3 className="gm-cap-title">{cap.title}</h3>
                <p className="gm-cap-desc">{cap.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Process ── */}
        <section className="gm-process">
          <div className="gm-process-header">
            <span className="gm-label">Our Process</span>
            <h2 className="gm-process-h2">From Data to Dominance</h2>
          </div>
          <div className="gm-process-steps">
            {process.map((step, i) => (
              <div key={i} className="gm-step">
                <div className="gm-step-num">{step.num}</div>
                <div className="gm-step-content">
                  <h3 className="gm-step-title">{step.title}</h3>
                  <p className="gm-step-desc">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="gm-cta-section">
          <h2 className="gm-cta-h2">Ready to Engineer Your Growth?</h2>
          <p className="gm-cta-sub">Let&apos;s build a system that delivers results on repeat.</p>
          <Link href="/contact" className="gm-cta-btn">Book a Call →</Link>
        </section>
      </main>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Clash+Display:wght@400;500;600;700;800&family=Sora:wght@300;400;500;600;700&display=swap');

        .gm-page { font-family: 'Sora', sans-serif; background: #ffffff; }

        /* ── Hero ── */
        .gm-hero {
          position: relative; min-height: 70vh;
          display: flex; align-items: center; justify-content: center;
          background: linear-gradient(165deg, #052e16 0%, #064e3b 50%, #052e16 100%);
          overflow: hidden; padding: 120px 40px 80px;
        }
        .gm-hero-grid {
          position: absolute; inset: 0; opacity: 0.04;
          background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg stroke='%23fff' stroke-width='1' stroke-dasharray='4 4' fill='none'%3E%3Cpath d='M40 0H0V40'/%3E%3C/g%3E%3C/svg%3E");
          background-size: 40px 40px;
        }
        .gm-hero-content {
          position: relative; z-index: 1; max-width: 720px; text-align: center;
        }
        .gm-back {
          display: inline-block; font-size: 12px; color: rgba(255,255,255,0.45);
          text-decoration: none; margin-bottom: 32px; transition: color 0.3s;
          font-weight: 500;
        }
        .gm-back:hover { color: rgba(255,255,255,0.8); }
        .gm-hero-badge {
          display: inline-block; font-size: 10px; font-weight: 700;
          letter-spacing: 3px; text-transform: uppercase; color: #34d399;
          margin-bottom: 20px;
        }
        .gm-hero-h1 {
          font-family: 'Clash Display', sans-serif;
          font-size: clamp(36px, 6vw, 56px); font-weight: 800;
          color: #ffffff; letter-spacing: -2px; line-height: 1.05;
          margin: 0 0 20px;
        }
        .gm-hero-sub {
          font-size: 15px; color: rgba(255,255,255,0.5);
          line-height: 1.8; font-weight: 300; max-width: 520px;
          margin: 0 auto 36px;
        }
        .gm-hero-cta {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 32px; border-radius: 999px; font-size: 13px;
          font-weight: 600; color: #fff; text-decoration: none;
          background: linear-gradient(135deg, #059669, #34d399);
          box-shadow: 0 4px 24px rgba(5, 150, 105, 0.4);
          transition: all 0.3s;
        }
        .gm-hero-cta:hover {
          box-shadow: 0 8px 36px rgba(5, 150, 105, 0.5);
          transform: translateY(-2px);
        }

        /* ── Capabilities ── */
        .gm-caps {
          padding: 100px 40px; max-width: 1100px; margin: 0 auto;
        }
        .gm-caps-header { text-align: center; margin-bottom: 56px; }
        .gm-label {
          display: inline-block; font-size: 10px; font-weight: 700;
          letter-spacing: 3px; text-transform: uppercase; color: #059669;
          margin-bottom: 12px;
        }
        .gm-caps-h2 {
          font-family: 'Clash Display', sans-serif;
          font-size: clamp(26px, 4vw, 36px); font-weight: 700;
          color: #0f172a; letter-spacing: -1.5px; margin: 0 0 12px;
        }
        .gm-caps-sub {
          font-size: 14px; color: #64748b; font-weight: 400; margin: 0;
        }
        .gm-caps-grid {
          display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;
        }
        .gm-cap-card {
          padding: 36px 32px; border-radius: 20px;
          background: rgba(248,250,252,0.7);
          border: 1px solid rgba(0,0,0,0.05);
          transition: all 0.4s ease;
        }
        .gm-cap-card:hover {
          background: #ffffff;
          border-color: rgba(5, 150, 105, 0.12);
          box-shadow: 0 12px 40px -12px rgba(5, 150, 105, 0.08);
          transform: translateY(-4px);
        }
        .gm-cap-icon { font-size: 28px; margin-bottom: 16px; }
        .gm-cap-title {
          font-family: 'Clash Display', sans-serif;
          font-size: 18px; font-weight: 700; color: #0f172a;
          margin: 0 0 8px; letter-spacing: -0.5px;
        }
        .gm-cap-desc {
          font-size: 13px; color: #64748b; line-height: 1.7; font-weight: 300; margin: 0;
        }

        /* ── Process ── */
        .gm-process {
          padding: 80px 40px 100px; max-width: 800px; margin: 0 auto;
        }
        .gm-process-header { text-align: center; margin-bottom: 48px; }
        .gm-process-h2 {
          font-family: 'Clash Display', sans-serif;
          font-size: clamp(24px, 4vw, 32px); font-weight: 700;
          color: #0f172a; letter-spacing: -1.5px; margin: 0;
        }
        .gm-process-steps { display: flex; flex-direction: column; }
        .gm-step {
          display: flex; gap: 24px; padding: 28px 0;
          border-bottom: 1px solid rgba(0,0,0,0.06);
        }
        .gm-step:last-child { border-bottom: none; }
        .gm-step-num {
          font-family: 'Clash Display', sans-serif;
          font-size: 12px; font-weight: 700; color: #059669;
          min-width: 32px; padding-top: 3px;
        }
        .gm-step-title {
          font-family: 'Clash Display', sans-serif;
          font-size: 17px; font-weight: 700; color: #0f172a;
          margin: 0 0 6px; letter-spacing: -0.5px;
        }
        .gm-step-desc {
          font-size: 13px; color: #64748b; line-height: 1.7;
          font-weight: 300; margin: 0;
        }

        /* ── CTA ── */
        .gm-cta-section {
          padding: 80px 40px; text-align: center;
          background: linear-gradient(165deg, #ecfdf5, #ffffff);
          border-top: 1px solid rgba(5, 150, 105, 0.06);
        }
        .gm-cta-h2 {
          font-family: 'Clash Display', sans-serif;
          font-size: clamp(24px, 4vw, 34px); font-weight: 700;
          color: #0f172a; letter-spacing: -1.5px; margin: 0 0 12px;
        }
        .gm-cta-sub {
          font-size: 14px; color: #64748b; margin: 0 0 28px;
        }
        .gm-cta-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 32px; border-radius: 999px; font-size: 13px;
          font-weight: 600; color: #fff; text-decoration: none;
          background: linear-gradient(135deg, #059669, #34d399);
          box-shadow: 0 4px 24px rgba(5, 150, 105, 0.3);
          transition: all 0.3s;
        }
        .gm-cta-btn:hover {
          box-shadow: 0 8px 36px rgba(5, 150, 105, 0.45);
          transform: translateY(-2px);
        }

        /* ── Mobile ── */
        @media (max-width: 767px) {
          .gm-hero { padding: 100px 24px 60px; min-height: auto; }
          .gm-hero-h1 { font-size: 32px; letter-spacing: -1px; }
          .gm-caps { padding: 60px 20px; }
          .gm-caps-grid { grid-template-columns: 1fr; }
          .gm-process { padding: 60px 20px; }
          .gm-step { flex-direction: column; gap: 8px; }
          .gm-cta-section { padding: 60px 20px; }
        }
      `}</style>
    </>
  );
}
