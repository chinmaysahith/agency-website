"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface Capability {
  icon: string;
  title: string;
  desc: string;
}

interface ProcessStep {
  title: string;
  desc: string;
}

interface ServicePageProps {
  badge: string;
  headline: string;
  headlineBreak: string;
  subtitle: string;
  accent: string;       // hex e.g. "#f97316"
  accentRgb: string;    // e.g. "249,115,22"
  capLabel: string;
  capHeading: string;
  capSub: string;
  capabilities: Capability[];
  processLabel: string;
  processHeading: string;
  process: ProcessStep[];
  ctaHeading: string;
  ctaSub: string;
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.25, 1, 0.5, 1] as const },
  }),
};

export default function PremiumServicePage({
  badge, headline, headlineBreak, subtitle, accent, accentRgb,
  capLabel, capHeading, capSub, capabilities,
  processLabel, processHeading, process: steps,
  ctaHeading, ctaSub,
}: ServicePageProps) {
  return (
    <>
      <main className="sp">
        {/* ──────────────── HERO ──────────────── */}
        <section className="sp-hero">
          {/* Ambient glow orbs */}
          <div className="sp-orb sp-orb-1" />
          <div className="sp-orb sp-orb-2" />
          <div className="sp-orb sp-orb-3" />
          {/* Noise grain overlay */}
          <div className="sp-noise" />
          {/* Grid */}
          <div className="sp-grid" />

          <motion.div
            className="sp-hero-content"
            initial="hidden" animate="show"
          >
            <motion.div custom={0} variants={fadeUp}>
              <Link href="/#services" className="sp-back">← Back to Services</Link>
            </motion.div>

            <motion.div custom={1} variants={fadeUp} className="sp-badge">{badge}</motion.div>

            <motion.h1 custom={2} variants={fadeUp} className="sp-h1">
              {headline}<br />{headlineBreak}
            </motion.h1>

            <motion.p custom={3} variants={fadeUp} className="sp-sub">{subtitle}</motion.p>

            <motion.div custom={4} variants={fadeUp}>
              <Link href="/contact" className="sp-cta-hero">
                Start Your Project
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* ──────────────── CAPABILITIES ──────────────── */}
        <section className="sp-caps">
          <div className="sp-caps-header">
            <span className="sp-label">{capLabel}</span>
            <h2 className="sp-caps-h2">{capHeading}</h2>
            <p className="sp-caps-sub">{capSub}</p>
          </div>
          <div className="sp-caps-grid">
            {capabilities.map((cap, i) => (
              <motion.div
                key={i}
                className="sp-card"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.15, duration: 0.6, ease: [0.25, 1, 0.5, 1] as const }}
              >
                <div className="sp-card-glow" />
                <div className="sp-card-inner">
                  <div className="sp-card-icon">{cap.icon}</div>
                  <h3 className="sp-card-title">{cap.title}</h3>
                  <p className="sp-card-desc">{cap.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ──────────────── PROCESS ──────────────── */}
        <section className="sp-process">
          <div className="sp-process-header">
            <span className="sp-label">{processLabel}</span>
            <h2 className="sp-process-h2">{processHeading}</h2>
          </div>
          <div className="sp-timeline">
            <div className="sp-timeline-line" />
            {steps.map((step, i) => (
              <motion.div
                key={i}
                className="sp-step"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: i * 0.15, duration: 0.5, ease: [0.25, 1, 0.5, 1] as const }}
              >
                <div className="sp-step-dot">
                  <div className="sp-step-dot-inner" />
                  <div className="sp-step-dot-ring" />
                </div>
                <div className="sp-step-content">
                  <h3 className="sp-step-title">{step.title}</h3>
                  <p className="sp-step-desc">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ──────────────── CTA ──────────────── */}
        <section className="sp-cta">
          <div className="sp-cta-glow" />
          <div className="sp-cta-inner">
            <h2 className="sp-cta-h2">{ctaHeading}</h2>
            <p className="sp-cta-sub">{ctaSub}</p>
            <Link href="/contact" className="sp-cta-btn">
              Book a Call
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </section>
      </main>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Clash+Display:wght@400;500;600;700;800&family=Sora:wght@300;400;500;600;700&display=swap');

        .sp {
          font-family: 'Sora', sans-serif;
          background: #050a18; color: #e2e8f0;
          margin-top: -5rem;
        }
        @media (min-width: 640px) {
          .sp { margin-top: -6rem; }
        }

        /* ══════════════ HERO ══════════════ */
        .sp-hero {
          position: relative; min-height: 88vh;
          display: flex; align-items: center; justify-content: center;
          background: radial-gradient(ellipse 80% 60% at 50% 20%, rgba(${accentRgb},0.08) 0%, transparent 60%),
                      linear-gradient(180deg, #060c1f 0%, #0a1128 40%, #050a18 100%);
          overflow: hidden; padding: 140px 40px 100px;
        }

        /* Ambient orbs */
        .sp-orb {
          position: absolute; border-radius: 50%;
          filter: blur(80px); pointer-events: none;
        }
        .sp-orb-1 {
          width: 500px; height: 500px;
          top: -10%; right: -5%;
          background: radial-gradient(circle, rgba(${accentRgb},0.12), transparent 70%);
        }
        .sp-orb-2 {
          width: 400px; height: 400px;
          bottom: 5%; left: -8%;
          background: radial-gradient(circle, rgba(${accentRgb},0.06), transparent 70%);
        }
        .sp-orb-3 {
          width: 300px; height: 300px;
          top: 50%; left: 50%; transform: translate(-50%, -50%);
          background: radial-gradient(circle, rgba(${accentRgb},0.04), transparent 70%);
        }

        /* Noise grain */
        .sp-noise {
          position: absolute; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
          opacity: 0.5; pointer-events: none; z-index: 1;
        }

        /* Grid */
        .sp-grid {
          position: absolute; inset: 0; opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg stroke='%23fff' stroke-width='0.5' fill='none'%3E%3Cpath d='M60 0H0V60'/%3E%3C/g%3E%3C/svg%3E");
          background-size: 60px 60px; z-index: 0;
        }

        .sp-hero-content {
          position: relative; z-index: 2; max-width: 740px; text-align: center;
        }
        .sp-back {
          display: inline-block; font-size: 12px; color: rgba(255,255,255,0.3);
          text-decoration: none; margin-bottom: 36px; font-weight: 400;
          transition: color 0.3s; letter-spacing: 0.3px;
        }
        .sp-back:hover { color: rgba(255,255,255,0.7); }

        .sp-badge {
          display: inline-block; font-size: 10px; font-weight: 600;
          letter-spacing: 3.5px; text-transform: uppercase;
          color: ${accent}; margin-bottom: 24px;
          padding: 6px 18px; border-radius: 999px;
          border: 1px solid rgba(${accentRgb},0.2);
          background: rgba(${accentRgb},0.06);
        }

        .sp-h1 {
          font-family: 'Clash Display', sans-serif;
          font-size: clamp(38px, 6.5vw, 62px); font-weight: 800;
          color: #ffffff; letter-spacing: -2.5px; line-height: 1.0;
          margin: 0 0 28px;
          background: linear-gradient(180deg, #ffffff 30%, rgba(255,255,255,0.6) 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .sp-sub {
          font-size: 15px; color: rgba(255,255,255,0.4);
          line-height: 1.9; font-weight: 300; max-width: 520px;
          margin: 0 auto 44px; letter-spacing: 0.2px;
        }

        .sp-cta-hero {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 15px 34px; border-radius: 14px; font-size: 13px;
          font-weight: 600; color: #fff; text-decoration: none;
          background: linear-gradient(135deg, ${accent}, rgba(${accentRgb},0.8));
          border: 1px solid rgba(${accentRgb},0.3);
          box-shadow: 0 8px 32px rgba(${accentRgb},0.25), 0 0 0 1px rgba(${accentRgb},0.1);
          transition: all 0.4s cubic-bezier(0.25,1,0.5,1);
          font-family: 'Sora', sans-serif;
        }
        .sp-cta-hero:hover {
          box-shadow: 0 12px 48px rgba(${accentRgb},0.35), 0 0 0 1px rgba(${accentRgb},0.2);
          transform: translateY(-3px);
        }

        /* ══════════════ CAPABILITIES ══════════════ */
        .sp-caps {
          padding: 120px 40px; max-width: 1100px; margin: 0 auto;
        }
        .sp-caps-header { text-align: center; margin-bottom: 64px; }
        .sp-label {
          display: inline-block; font-size: 10px; font-weight: 600;
          letter-spacing: 3.5px; text-transform: uppercase;
          color: ${accent}; margin-bottom: 14px;
        }
        .sp-caps-h2 {
          font-family: 'Clash Display', sans-serif;
          font-size: clamp(28px, 4.5vw, 40px); font-weight: 700;
          color: #f1f5f9; letter-spacing: -2px; margin: 0 0 14px;
        }
        .sp-caps-sub {
          font-size: 14px; color: rgba(148,163,184,0.7); font-weight: 300; margin: 0;
        }

        .sp-caps-grid {
          display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;
        }

        /* Glass card */
        .sp-card {
          position: relative; border-radius: 20px; overflow: hidden;
          transition: transform 0.4s cubic-bezier(0.25,1,0.5,1), box-shadow 0.4s ease;
        }
        .sp-card:hover {
          transform: translateY(-6px) scale(1.01);
          box-shadow: 0 20px 60px -12px rgba(${accentRgb},0.12);
        }

        .sp-card-glow {
          position: absolute; inset: 0; border-radius: 20px;
          background: linear-gradient(135deg, rgba(${accentRgb},0.0), rgba(${accentRgb},0.04));
          opacity: 0; transition: opacity 0.4s; pointer-events: none;
        }
        .sp-card:hover .sp-card-glow { opacity: 1; }

        .sp-card-inner {
          position: relative;
          padding: 40px 34px; border-radius: 20px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          transition: border-color 0.4s ease;
        }
        .sp-card:hover .sp-card-inner {
          border-color: rgba(${accentRgb},0.2);
        }

        .sp-card-icon {
          font-size: 30px; margin-bottom: 20px;
          filter: grayscale(0.3);
          transition: filter 0.3s;
        }
        .sp-card:hover .sp-card-icon { filter: grayscale(0); }

        .sp-card-title {
          font-family: 'Clash Display', sans-serif;
          font-size: 19px; font-weight: 700; color: #f1f5f9;
          margin: 0 0 10px; letter-spacing: -0.5px;
        }
        .sp-card-desc {
          font-size: 13px; color: rgba(148,163,184,0.7);
          line-height: 1.8; font-weight: 300; margin: 0;
        }

        /* ══════════════ PROCESS ══════════════ */
        .sp-process {
          padding: 80px 40px 120px; max-width: 700px; margin: 0 auto;
        }
        .sp-process-header { text-align: center; margin-bottom: 56px; }
        .sp-process-h2 {
          font-family: 'Clash Display', sans-serif;
          font-size: clamp(26px, 4vw, 36px); font-weight: 700;
          color: #f1f5f9; letter-spacing: -1.5px; margin: 0;
        }

        .sp-timeline { position: relative; padding-left: 40px; }
        .sp-timeline-line {
          position: absolute; left: 11px; top: 8px; bottom: 8px;
          width: 1px;
          background: linear-gradient(180deg,
            rgba(${accentRgb},0.4) 0%,
            rgba(${accentRgb},0.15) 50%,
            rgba(${accentRgb},0.05) 100%);
        }

        .sp-step {
          position: relative; padding: 0 0 40px; display: flex; gap: 28px;
        }
        .sp-step:last-child { padding-bottom: 0; }

        .sp-step-dot {
          position: absolute; left: -40px; top: 4px;
          width: 22px; height: 22px;
          display: flex; align-items: center; justify-content: center;
        }
        .sp-step-dot-inner {
          width: 8px; height: 8px; border-radius: 50%;
          background: ${accent};
          box-shadow: 0 0 12px rgba(${accentRgb},0.4);
          z-index: 1;
        }
        .sp-step-dot-ring {
          position: absolute;
          width: 22px; height: 22px; border-radius: 50%;
          border: 1px solid rgba(${accentRgb},0.2);
          background: rgba(${accentRgb},0.04);
        }

        .sp-step-title {
          font-family: 'Clash Display', sans-serif;
          font-size: 18px; font-weight: 700; color: #f1f5f9;
          margin: 0 0 8px; letter-spacing: -0.5px;
        }
        .sp-step-desc {
          font-size: 13px; color: rgba(148,163,184,0.65);
          line-height: 1.8; font-weight: 300; margin: 0;
        }

        /* ══════════════ CTA ══════════════ */
        .sp-cta {
          position: relative; padding: 100px 40px;
          text-align: center; overflow: hidden;
          background: linear-gradient(180deg, #050a18 0%, #0d1530 50%, #050a18 100%);
        }
        .sp-cta-glow {
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 600px; height: 300px; border-radius: 50%;
          background: radial-gradient(ellipse, rgba(${accentRgb},0.1), transparent 70%);
          filter: blur(60px); pointer-events: none;
        }
        .sp-cta-inner { position: relative; z-index: 1; }
        .sp-cta-h2 {
          font-family: 'Clash Display', sans-serif;
          font-size: clamp(26px, 4.5vw, 38px); font-weight: 700;
          color: #f1f5f9; letter-spacing: -2px; margin: 0 0 14px;
        }
        .sp-cta-sub {
          font-size: 14px; color: rgba(148,163,184,0.6);
          margin: 0 0 36px; font-weight: 300;
        }
        .sp-cta-btn {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 15px 34px; border-radius: 14px; font-size: 13px;
          font-weight: 600; color: #fff; text-decoration: none;
          background: rgba(${accentRgb},0.15);
          border: 1px solid rgba(${accentRgb},0.3);
          backdrop-filter: blur(12px);
          box-shadow: 0 4px 24px rgba(${accentRgb},0.15);
          transition: all 0.4s cubic-bezier(0.25,1,0.5,1);
          font-family: 'Sora', sans-serif;
        }
        .sp-cta-btn:hover {
          background: rgba(${accentRgb},0.25);
          box-shadow: 0 8px 40px rgba(${accentRgb},0.3);
          transform: translateY(-3px);
        }

        /* ══════════════ MOBILE ══════════════ */
        @media (max-width: 767px) {
          .sp-hero { padding: 120px 24px 70px; min-height: auto; }
          .sp-h1 { font-size: 34px; letter-spacing: -1.5px; }
          .sp-caps { padding: 80px 20px; }
          .sp-caps-grid { grid-template-columns: 1fr; }
          .sp-process { padding: 60px 20px 80px; }
          .sp-cta { padding: 70px 20px; }
        }
      `}</style>
    </>
  );
}
