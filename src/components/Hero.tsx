"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const RetroGrid = dynamic(() => import("@/components/ui/RetroGrid"), { ssr: false });

export default function Hero() {
  return (
    <section className="hero-section">
      {/* ── Background layers ── */}

      {/* 1. Soft radial gradient — white center fading to light blue edges */}
      <div className="hero-bg-gradient" />

      {/* 2. Retro grid — fills entire section behind content */}
      <div className="hero-grid-layer">
        <RetroGrid gridColor="#3b82f6" />
      </div>

      {/* 2b. Bottom white fade — ensures clean exit to next section */}
      <div className="hero-bottom-veil" />

      {/* 3. Top white veil so text area stays readable */}
      <div className="hero-top-veil" />

      {/* ── Content ── */}
      <div className="relative max-w-[1100px] mx-auto px-5 sm:px-6 text-center" style={{ zIndex: 10 }}>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 text-[11px] font-bold tracking-[2.5px] uppercase rounded-full border border-blue-200 bg-white/70 backdrop-blur-sm shadow-sm text-blue-600"
        >
          <span className="hero-pulse-dot" />
          Digital Product Studio
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold leading-[0.92] tracking-[-1.5px] sm:tracking-[-2px] md:tracking-[-3px] text-slate-900 mb-6"
        >
          We Engineer
          <br />
          <span className="text-blue-500">Digital</span> Presence
          <br />
          <span className="font-light text-slate-400">That Scales.</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-sm md:text-base text-slate-500 max-w-[440px] mx-auto mb-12 leading-[1.8] font-light"
        >
          From identity to campaigns, we craft digital systems that turn
          attention into sustainable growth.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-3"
        >
          <button className="hero-primary-btn">
            Book a Call
          </button>
          <button className="hero-ghost-btn">
            View Our Work
            <span className="hero-arrow">↗</span>
          </button>
        </motion.div>

      </div>

      <style jsx>{`
        .hero-section {
          position: relative;
          min-height: 100vh;
          margin-top: -5rem;
          padding-top: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: #ffffff;
        }

        /* Soft radial gradient — warm white center, blue middle, back to white at bottom */
        .hero-bg-gradient {
          position: absolute;
          inset: 0;
          z-index: 1;
          background:
            radial-gradient(ellipse 80% 50% at 50% 30%, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 70%),
            linear-gradient(180deg,
              #ffffff 0%,
              #f0f7ff 20%,
              #dbeafe 40%,
              #bfdbfe 55%,
              #dbeafe 70%,
              #f0f7ff 85%,
              #ffffff 100%
            );
        }

        /* Grid canvas — covers bottom 65% of hero */
        .hero-grid-layer {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 65%;
          z-index: 2;
          pointer-events: none;
        }

        /* White veil over top portion for text readability */
        .hero-top-veil {
          position: absolute;
          inset: 0;
          z-index: 3;
          background: linear-gradient(
            180deg,
            rgba(255,255,255,0.95) 0%,
            rgba(255,255,255,0.85) 30%,
            rgba(255,255,255,0.5) 55%,
            rgba(255,255,255,0.1) 75%,
            rgba(255,255,255,0) 100%
          );
          pointer-events: none;
        }

        .hero-bottom-veil {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 20%;
          z-index: 4;
          background: linear-gradient(
            180deg,
            rgba(255,255,255,0) 0%,
            rgba(255,255,255,0.6) 50%,
            rgba(255,255,255,1) 100%
          );
          pointer-events: none;
        }

        .hero-pulse-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #22c55e;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0.2; }
        }

        /* ── Primary solid button ── */
        .hero-primary-btn {
          display: inline-flex;
          align-items: center;
          padding: 13px 28px;
          border-radius: 999px;
          font-size: 14px;
          font-weight: 500;
          font-family: inherit;
          letter-spacing: 0.02em;
          color: #fff;
          background: #1e293b;
          border: none;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0,0,0,0.12);
          transition: background 0.3s ease, transform 0.25s ease, box-shadow 0.3s ease;
        }
        .hero-primary-btn:hover {
          background: #0f172a;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.18);
        }

        /* ── Ghost button ── */
        .hero-ghost-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 28px;
          border-radius: 999px;
          font-size: 14px;
          font-weight: 500;
          font-family: inherit;
          letter-spacing: 0.02em;
          color: #1e293b;
          background: rgba(255,255,255,0.7);
          border: 1px solid rgba(0,0,0,0.1);
          cursor: pointer;
          backdrop-filter: blur(8px);
          box-shadow: 0 1px 4px rgba(0,0,0,0.05);
          transition: all 0.3s ease;
        }
        .hero-ghost-btn:hover {
          background: #fff;
          border-color: #1e293b;
          transform: translateY(-2px);
          box-shadow: 0 4px 14px rgba(0,0,0,0.08);
        }
        .hero-arrow {
          font-size: 13px;
          transition: transform 0.3s ease;
        }
        .hero-ghost-btn:hover .hero-arrow {
          transform: translate(2px, -2px);
        }
      `}</style>
    </section>
  );
}
