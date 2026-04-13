"use client";

import Link from "next/link";

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
  { num: "01", title: "Audit & Architecture", desc: "We map your current tech, identify bottlenecks, and design the ideal architecture." },
  { num: "02", title: "Build & Iterate", desc: "Rapid sprints with constant feedback loops — you see progress weekly, not monthly." },
  { num: "03", title: "Launch & Harden", desc: "Rigorous QA, performance testing, and a smooth deployment pipeline." },
  { num: "04", title: "Scale & Support", desc: "Post-launch optimization, monitoring, and long-term technical partnership." },
];

export default function DigitalFoundationsPage() {
  return (
    <>
      <main className="df-page">
        {/* ── Hero ── */}
        <section className="df-hero">
          <div className="df-hero-grid" />
          <div className="df-hero-content">
            <Link href="/#services" className="df-back">← Back to Services</Link>
            <div className="df-hero-badge">01 — Digital Foundations</div>
            <h1 className="df-hero-h1">Built to Evolve,<br />Not Just Launch</h1>
            <p className="df-hero-sub">
              We design and engineer digital platforms that grow with your business —
              resilient architectures, seamless interfaces, and performance that holds under pressure.
            </p>
            <Link href="/contact" className="df-hero-cta">Start Your Project →</Link>
          </div>
        </section>

        {/* ── Capabilities ── */}
        <section className="df-caps">
          <div className="df-caps-header">
            <span className="df-label">What We Build</span>
            <h2 className="df-caps-h2">End-to-End Digital Engineering</h2>
            <p className="df-caps-sub">From frontend polish to backend power — every layer is built with intent.</p>
          </div>
          <div className="df-caps-grid">
            {capabilities.map((cap, i) => (
              <div key={i} className="df-cap-card">
                <div className="df-cap-icon">{cap.icon}</div>
                <h3 className="df-cap-title">{cap.title}</h3>
                <p className="df-cap-desc">{cap.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Process ── */}
        <section className="df-process">
          <div className="df-process-header">
            <span className="df-label">Our Process</span>
            <h2 className="df-process-h2">From Concept to Production</h2>
          </div>
          <div className="df-process-steps">
            {process.map((step, i) => (
              <div key={i} className="df-step">
                <div className="df-step-num">{step.num}</div>
                <div className="df-step-content">
                  <h3 className="df-step-title">{step.title}</h3>
                  <p className="df-step-desc">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="df-cta-section">
          <h2 className="df-cta-h2">Ready to Build Something That Lasts?</h2>
          <p className="df-cta-sub">Let&apos;s talk about your next digital platform.</p>
          <Link href="/contact" className="df-cta-btn">Book a Call →</Link>
        </section>
      </main>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Clash+Display:wght@400;500;600;700;800&family=Sora:wght@300;400;500;600;700&display=swap');

        .df-page { font-family: 'Sora', sans-serif; background: #ffffff; }

        /* ── Hero ── */
        .df-hero {
          position: relative; min-height: 70vh;
          display: flex; align-items: center; justify-content: center;
          background: linear-gradient(165deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
          overflow: hidden; padding: 120px 40px 80px;
        }
        .df-hero-grid {
          position: absolute; inset: 0; opacity: 0.04;
          background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg stroke='%23fff' stroke-width='1' stroke-dasharray='4 4' fill='none'%3E%3Cpath d='M40 0H0V40'/%3E%3C/g%3E%3C/svg%3E");
          background-size: 40px 40px;
        }
        .df-hero-content {
          position: relative; z-index: 1; max-width: 700px; text-align: center;
        }
        .df-back {
          display: inline-block; font-size: 12px; color: rgba(255,255,255,0.45);
          text-decoration: none; margin-bottom: 32px; transition: color 0.3s;
          font-weight: 500;
        }
        .df-back:hover { color: rgba(255,255,255,0.8); }
        .df-hero-badge {
          display: inline-block; font-size: 10px; font-weight: 700;
          letter-spacing: 3px; text-transform: uppercase; color: #f97316;
          margin-bottom: 20px;
        }
        .df-hero-h1 {
          font-family: 'Clash Display', sans-serif;
          font-size: clamp(36px, 6vw, 56px); font-weight: 800;
          color: #ffffff; letter-spacing: -2px; line-height: 1.05;
          margin: 0 0 20px;
        }
        .df-hero-sub {
          font-size: 15px; color: rgba(255,255,255,0.5);
          line-height: 1.8; font-weight: 300; max-width: 520px;
          margin: 0 auto 36px;
        }
        .df-hero-cta {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 32px; border-radius: 999px; font-size: 13px;
          font-weight: 600; color: #fff; text-decoration: none;
          background: linear-gradient(135deg, #ea580c, #f97316);
          box-shadow: 0 4px 24px rgba(234, 88, 12, 0.4);
          transition: all 0.3s;
        }
        .df-hero-cta:hover {
          box-shadow: 0 8px 36px rgba(234, 88, 12, 0.5);
          transform: translateY(-2px);
        }

        /* ── Capabilities ── */
        .df-caps {
          padding: 100px 40px; max-width: 1100px; margin: 0 auto;
        }
        .df-caps-header { text-align: center; margin-bottom: 56px; }
        .df-label {
          display: inline-block; font-size: 10px; font-weight: 700;
          letter-spacing: 3px; text-transform: uppercase; color: #ea580c;
          margin-bottom: 12px;
        }
        .df-caps-h2 {
          font-family: 'Clash Display', sans-serif;
          font-size: clamp(26px, 4vw, 36px); font-weight: 700;
          color: #0f172a; letter-spacing: -1.5px; margin: 0 0 12px;
        }
        .df-caps-sub {
          font-size: 14px; color: #64748b; font-weight: 400; margin: 0;
        }
        .df-caps-grid {
          display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;
        }
        .df-cap-card {
          padding: 36px 32px; border-radius: 20px;
          background: rgba(248,250,252,0.7);
          border: 1px solid rgba(0,0,0,0.05);
          transition: all 0.4s ease;
        }
        .df-cap-card:hover {
          background: #ffffff;
          border-color: rgba(234, 88, 12, 0.12);
          box-shadow: 0 12px 40px -12px rgba(234, 88, 12, 0.08);
          transform: translateY(-4px);
        }
        .df-cap-icon { font-size: 28px; margin-bottom: 16px; }
        .df-cap-title {
          font-family: 'Clash Display', sans-serif;
          font-size: 18px; font-weight: 700; color: #0f172a;
          margin: 0 0 8px; letter-spacing: -0.5px;
        }
        .df-cap-desc {
          font-size: 13px; color: #64748b; line-height: 1.7; font-weight: 300; margin: 0;
        }

        /* ── Process ── */
        .df-process {
          padding: 80px 40px 100px; max-width: 800px; margin: 0 auto;
        }
        .df-process-header { text-align: center; margin-bottom: 48px; }
        .df-process-h2 {
          font-family: 'Clash Display', sans-serif;
          font-size: clamp(24px, 4vw, 32px); font-weight: 700;
          color: #0f172a; letter-spacing: -1.5px; margin: 0;
        }
        .df-process-steps { display: flex; flex-direction: column; gap: 0; }
        .df-step {
          display: flex; gap: 24px; padding: 28px 0;
          border-bottom: 1px solid rgba(0,0,0,0.06);
        }
        .df-step:last-child { border-bottom: none; }
        .df-step-num {
          font-family: 'Clash Display', sans-serif;
          font-size: 12px; font-weight: 700; color: #ea580c;
          min-width: 32px; padding-top: 3px;
        }
        .df-step-title {
          font-family: 'Clash Display', sans-serif;
          font-size: 17px; font-weight: 700; color: #0f172a;
          margin: 0 0 6px; letter-spacing: -0.5px;
        }
        .df-step-desc {
          font-size: 13px; color: #64748b; line-height: 1.7;
          font-weight: 300; margin: 0;
        }

        /* ── CTA ── */
        .df-cta-section {
          padding: 80px 40px; text-align: center;
          background: linear-gradient(165deg, #fff7ed, #ffffff);
          border-top: 1px solid rgba(234, 88, 12, 0.06);
        }
        .df-cta-h2 {
          font-family: 'Clash Display', sans-serif;
          font-size: clamp(24px, 4vw, 34px); font-weight: 700;
          color: #0f172a; letter-spacing: -1.5px; margin: 0 0 12px;
        }
        .df-cta-sub {
          font-size: 14px; color: #64748b; margin: 0 0 28px;
        }
        .df-cta-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 32px; border-radius: 999px; font-size: 13px;
          font-weight: 600; color: #fff; text-decoration: none;
          background: linear-gradient(135deg, #ea580c, #f97316);
          box-shadow: 0 4px 24px rgba(234, 88, 12, 0.3);
          transition: all 0.3s;
        }
        .df-cta-btn:hover {
          box-shadow: 0 8px 36px rgba(234, 88, 12, 0.45);
          transform: translateY(-2px);
        }

        /* ── Mobile ── */
        @media (max-width: 767px) {
          .df-hero { padding: 100px 24px 60px; min-height: auto; }
          .df-hero-h1 { font-size: 32px; letter-spacing: -1px; }
          .df-caps { padding: 60px 20px; }
          .df-caps-grid { grid-template-columns: 1fr; }
          .df-process { padding: 60px 20px; }
          .df-step { flex-direction: column; gap: 8px; }
          .df-cta-section { padding: 60px 20px; }
        }
      `}</style>
    </>
  );
}
