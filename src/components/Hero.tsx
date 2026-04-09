"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv  = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    function resize() {
      if (!cv) return;
      cv.width  = cv.offsetWidth;
      cv.height = cv.offsetHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    const wideWaves = [
      { amp: 55, freq: 0.008, speed: 0.4,  phase: 0,   alpha: 0.07, thick: 80,  hue: 220 },
      { amp: 40, freq: 0.010, speed: 0.55, phase: 1.2, alpha: 0.06, thick: 60,  hue: 230 },
      { amp: 65, freq: 0.006, speed: 0.3,  phase: 2.4, alpha: 0.05, thick: 100, hue: 210 },
      { amp: 35, freq: 0.012, speed: 0.7,  phase: 0.7, alpha: 0.07, thick: 50,  hue: 240 },
      { amp: 50, freq: 0.009, speed: 0.45, phase: 3.1, alpha: 0.06, thick: 70,  hue: 215 },
      { amp: 30, freq: 0.014, speed: 0.8,  phase: 1.8, alpha: 0.05, thick: 45,  hue: 250 },
    ];

    const thinWaves = [
      { amp: 45, freq: 0.009, speed: 0.5,  phase: 0.3, hue: 220 },
      { amp: 55, freq: 0.007, speed: 0.35, phase: 2.1, hue: 240 },
      { amp: 38, freq: 0.011, speed: 0.65, phase: 1.0, hue: 210 },
      { amp: 62, freq: 0.006, speed: 0.28, phase: 3.5, hue: 230 },
    ];

    let t   = 0;
    let raf = 0;

    function draw() {
      if (!cv || !ctx) return;
      const W = cv.width, H = cv.height;
      ctx.clearRect(0, 0, W, H);

      // thick glow waves
      wideWaves.forEach(w => {
        const baseY = H * 0.52 + w.amp * Math.sin(t * 0.3 + w.phase * 2);
        ctx.beginPath();
        for (let x = 0; x <= W; x += 3) {
          const y = baseY + w.amp * Math.sin(x * w.freq + t * w.speed + w.phase);
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        const g = ctx.createLinearGradient(0, 0, W, 0);
        g.addColorStop(0,   `hsla(${w.hue},70%,65%,0)`);
        g.addColorStop(0.2, `hsla(${w.hue},70%,65%,${w.alpha})`);
        g.addColorStop(0.5, `hsla(${w.hue},75%,60%,${w.alpha * 1.4})`);
        g.addColorStop(0.8, `hsla(${w.hue},70%,65%,${w.alpha})`);
        g.addColorStop(1,   `hsla(${w.hue},70%,65%,0)`);
        ctx.strokeStyle = g;
        ctx.lineWidth   = w.thick;
        ctx.lineCap     = "round";
        ctx.stroke();
      });

      // thin crisp lines on top
      thinWaves.forEach(w => {
        const baseY = H * 0.52 + w.amp * Math.sin(t * 0.25 + w.phase);
        ctx.beginPath();
        for (let x = 0; x <= W; x += 2) {
          const y = baseY + w.amp * Math.sin(x * w.freq + t * w.speed + w.phase);
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        const g2 = ctx.createLinearGradient(0, 0, W, 0);
        g2.addColorStop(0,   `hsla(${w.hue},80%,60%,0)`);
        g2.addColorStop(0.3, `hsla(${w.hue},80%,60%,0.18)`);
        g2.addColorStop(0.7, `hsla(${w.hue},80%,60%,0.18)`);
        g2.addColorStop(1,   `hsla(${w.hue},80%,60%,0)`);
        ctx.strokeStyle = g2;
        ctx.lineWidth   = 1.2;
        ctx.stroke();
      });

      t  += 0.016;
      raf = requestAnimationFrame(draw);
    }

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section
      className="relative pt-28 sm:pt-36 pb-20 sm:pb-28 text-center overflow-hidden"
      style={{
        backgroundColor: "#ffffff",
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg stroke='%23e5e7eb' stroke-width='1' stroke-dasharray='4 4' fill='none'%3E%3Cpath d='M40 0H0V40'/%3E%3C/g%3E%3C/svg%3E\")",
        backgroundSize: "40px 40px",
      }}
    >
      {/* Aurora canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1 }}
      />

      {/* Content */}
      <div className="relative max-w-[1100px] mx-auto px-5 sm:px-6" style={{ zIndex: 2 }}>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 text-[11px] font-bold tracking-[2.5px] uppercase rounded-full border border-blue-200 bg-white/70 backdrop-blur-sm shadow-sm text-blue-600"
        >
          <span className="w-[5px] h-[5px] rounded-full bg-green-400" style={{ animation: "pulse 2s infinite" }} />
          Digital Product Studio
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold leading-[0.92] tracking-[-1.5px] sm:tracking-[-2px] md:tracking-[-3px] text-slate-900 mb-6"
        >
          We Build
          <br />
          <span className="text-blue-500">Digital</span> Products
          <br />
          <span className="font-light text-slate-400">That Drive Growth.</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-sm md:text-base text-slate-500 max-w-[440px] mx-auto mb-12 leading-[1.8] font-light"
        >
          We help startups and businesses design, build and scale modern digital
          products using cutting-edge technologies.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-3"
        >
          {/* Primary — solid blue */}
          <button className="hero-primary-btn">
            Book a Call
          </button>

          {/* Secondary — ghost */}
          <button className="hero-ghost-btn">
            View Our Work
            <span className="hero-arrow">↗</span>
          </button>
        </motion.div>

      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.2; }
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
