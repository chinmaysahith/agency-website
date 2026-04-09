"use client";
import { useEffect, useRef, useState } from "react";

const steps = [
  {
    title: "Share Your Vision",
    desc: "Tell us everything — your idea, goals, audience and the core problem. We study every detail before touching a single tool.",
    bullets: ["Discovery call to understand your goals", "Define your audience and core problem", "Map out constraints and opportunities"],
  },
  {
    title: "Plan & Strategy",
    desc: "We take every part of your project and snap it into place — scope, features, tech stack and timelines. Every component clicks into its exact position.",
    bullets: ["Full scope, features and architecture plan", "Tech stack selection and design direction", "Sprint timeline and milestone roadmap"],
  },
  {
    title: "Build, Launch & Grow",
    desc: "Full power engaged. We launch fast, scale smart and stay locked in as your product grows. This is APSLOCK — secured and operational.",
    bullets: ["Daily updates and live project board", "Rigorous QA and performance testing", "Launch, scale and post-delivery support"],
  },
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const T = useRef(0);
  const lastT = useRef(0);
  const stepN = useRef(0);
  const asmProgress = useRef(0);
  const asmStart = useRef<number | null>(null);
  const lockStart = useRef<number | null>(null);

  /* ── scroll detection ── */
  useEffect(() => {
    const onScroll = () => {
      const container = sectionRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrolled = -rect.top;
      const totalScroll = rect.height - vh;
      const progress = Math.max(0, Math.min(1, scrolled / totalScroll));
      const best = progress < 0.33 ? 0 : progress < 0.66 ? 1 : 2;
      if (best !== stepN.current) {
        stepN.current = best;
        setActiveStep(best);
        if (best === 2) { asmProgress.current = 0; asmStart.current = null; }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── canvas animation ── */
  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d")!;
    const W = 220, H = 300;
    const CX = 110;

    /* ── shared logo lock geometry ── */
    const LX = 38, RX = 182;              // outer left/right — width = 144
    const LTOP = 30, LBOT = 230;          // outer top/bottom — height = 200
    const LW2 = RX - LX;                  // 144
    const OAR = LW2 / 2;                  // outer arch radius = 72
    const ACY = LTOP + OAR;               // arch center Y = 102
    const WALL = 24;                       // wall thickness
    const IAR = OAR - WALL;              // inner arch radius = 48
    const BCR2 = 20;                       // bottom corner radius
    const ILX = LX + WALL;              // inner left = 62
    const IRX2 = RX - WALL;              // inner right = 158

    /* helpers */
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
    const easeOut3 = (t: number) => 1 - Math.pow(1 - t, 3);
    const easeOutBack = (t: number) => {
      const c = 2.5;
      return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2);
    };
    const easeOutBounce = (t: number) => {
      const n = 7.5625, d = 2.75;
      if (t < 1 / d) return n * t * t;
      if (t < 2 / d) { t -= 1.5 / d; return n * t * t + 0.75; }
      if (t < 2.5 / d) { t -= 2.25 / d; return n * t * t + 0.9375; }
      t -= 2.625 / d; return n * t * t + 0.984375;
    };
    const easeInOut = (t: number) =>
      t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

    /* Helper: draw the full lock outline path (used by all stages) */
    function traceLockOuter() {
      ctx.moveTo(LX, LBOT - BCR2);
      ctx.lineTo(LX, ACY);
      ctx.arc(CX, ACY, OAR, Math.PI, 0, false);
      ctx.lineTo(RX, LBOT - BCR2);
      ctx.arcTo(RX, LBOT, RX - BCR2, LBOT, BCR2);
      ctx.lineTo(LX + BCR2, LBOT);
      ctx.arcTo(LX, LBOT, LX, LBOT - BCR2, BCR2);
      ctx.closePath();
    }
    function traceInnerArch() {
      ctx.arc(CX, ACY, IAR, Math.PI, 0, false);
    }

    /* ─────────────────────────────────────────────────
       STAGE 1 — Static Blueprint: fully drawn lock
    ───────────────────────────────────────────────── */
    function drawStaticBlueprint() {
      ctx.clearRect(0, 0, W, H);

      /* faint blueprint grid */
      ctx.strokeStyle = `rgba(59,130,246,0.045)`;
      ctx.lineWidth = 0.5;
      for (let gx = 0; gx < W; gx += 20) {
        ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, H); ctx.stroke();
      }
      for (let gy = 0; gy < H; gy += 20) {
        ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(W, gy); ctx.stroke();
      }

      /* full outer outline */
      ctx.save();
      ctx.strokeStyle = `rgba(59,130,246,0.88)`;
      ctx.lineWidth = 2.5;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath(); traceLockOuter(); ctx.stroke();
      ctx.restore();

      /* inner arch */
      ctx.save();
      ctx.strokeStyle = `rgba(59,130,246,0.88)`;
      ctx.lineWidth = 2.5;
      ctx.lineCap = "round";
      ctx.beginPath(); traceInnerArch(); ctx.stroke();
      ctx.restore();

      /* dome inside arch opening */
      const domeR = (IRX2 - ILX) / 2;
      ctx.fillStyle = `rgba(59,130,246,0.12)`;
      ctx.beginPath();
      ctx.arc(CX, ACY, domeR, Math.PI, 0, false);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = `rgba(59,130,246,0.3)`;
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 4]);
      ctx.beginPath();
      ctx.arc(CX, ACY, domeR, Math.PI, 0, false);
      ctx.stroke();
      ctx.setLineDash([]);

      /* dimension lines */
      ctx.strokeStyle = `rgba(59,130,246,0.3)`;
      ctx.lineWidth = 0.6;
      ctx.setLineDash([2, 3]);
      ctx.beginPath();
      ctx.moveTo(LX, LBOT + 14); ctx.lineTo(RX, LBOT + 14); ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(LX, LBOT + 10); ctx.lineTo(LX, LBOT + 18);
      ctx.moveTo(RX, LBOT + 10); ctx.lineTo(RX, LBOT + 18); ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(LX - 14, LTOP); ctx.lineTo(LX - 14, LBOT); ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(LX - 18, LTOP); ctx.lineTo(LX - 10, LTOP);
      ctx.moveTo(LX - 18, LBOT); ctx.lineTo(LX - 10, LBOT); ctx.stroke();
      ctx.setLineDash([]);
    }

    /* ─────────────────────────────────────────────────
       STAGE 2 — Blueprint Animation: sketch-draw the lock
    ───────────────────────────────────────────────── */
    function drawSketch(t: number) {
      ctx.clearRect(0, 0, W, H);

      const cycle = 5;
      const ct = t % cycle;
      const drawDur = 2.8, holdDur = 0.8, fadeDur = 1.4;

      let prog = 0, alpha = 1;
      if (ct < drawDur) {
        prog = easeInOut(ct / drawDur);
      } else if (ct < drawDur + holdDur) {
        prog = 1;
      } else {
        prog = 1;
        alpha = 1 - (ct - drawDur - holdDur) / fadeDur;
      }
      alpha = clamp(alpha, 0, 1);

      /* faint blueprint grid */
      ctx.strokeStyle = `rgba(59,130,246,${0.045 * alpha})`;
      ctx.lineWidth = 0.5;
      for (let gx = 0; gx < W; gx += 20) {
        ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, H); ctx.stroke();
      }
      for (let gy = 0; gy < H; gy += 20) {
        ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(W, gy); ctx.stroke();
      }

      /* ghost guide — full dashed outline */
      ctx.strokeStyle = `rgba(59,130,246,${0.09 * alpha})`;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([3, 5]);
      ctx.beginPath(); traceLockOuter(); ctx.stroke();
      ctx.beginPath(); traceInnerArch(); ctx.stroke();
      ctx.setLineDash([]);

      /* ── animated stroke — outer path (prog 0 → 0.65) ── */
      const outerLen = 650;
      const op = clamp(prog / 0.65, 0, 1);
      if (op > 0) {
        ctx.save();
        ctx.strokeStyle = `rgba(59,130,246,${0.88 * alpha})`;
        ctx.lineWidth = 2.5;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.setLineDash([outerLen, outerLen]);
        ctx.lineDashOffset = outerLen * (1 - op);
        ctx.beginPath(); traceLockOuter(); ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();
      }

      /* ── animated stroke — inner arch (prog 0.5 → 0.9) ── */
      const innerLen = 155;
      const ip = clamp((prog - 0.5) / 0.4, 0, 1);
      if (ip > 0) {
        ctx.save();
        ctx.strokeStyle = `rgba(59,130,246,${0.88 * alpha})`;
        ctx.lineWidth = 2.5;
        ctx.lineCap = "round";
        ctx.setLineDash([innerLen, innerLen]);
        ctx.lineDashOffset = innerLen * (1 - ip);
        ctx.beginPath(); traceInnerArch(); ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();
      }

      /* ── dome below inner arch — fades in at end ── */
      if (prog > 0.82) {
        const da = clamp((prog - 0.82) / 0.18, 0, 1) * alpha;
        const domeR = (IRX2 - ILX) / 2;
        const domeCY = ACY;

        /* dome fill — fills inside the inner arch opening */
        ctx.fillStyle = `rgba(59,130,246,${0.12 * da})`;
        ctx.beginPath();
        ctx.arc(CX, domeCY, domeR, Math.PI, 0, false);
        ctx.closePath();
        ctx.fill();

        /* dome outline */
        ctx.strokeStyle = `rgba(59,130,246,${0.3 * da})`;
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 4]);
        ctx.beginPath();
        ctx.arc(CX, domeCY, domeR, Math.PI, 0, false);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      /* ── dimension lines — blueprint feel ── */
      if (prog > 0.9) {
        const da = clamp((prog - 0.9) / 0.1, 0, 1) * alpha;
        ctx.strokeStyle = `rgba(59,130,246,${0.3 * da})`;
        ctx.lineWidth = 0.6;
        ctx.setLineDash([2, 3]);
        /* width */
        ctx.beginPath();
        ctx.moveTo(LX, LBOT + 14); ctx.lineTo(RX, LBOT + 14); ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(LX, LBOT + 10); ctx.lineTo(LX, LBOT + 18);
        ctx.moveTo(RX, LBOT + 10); ctx.lineTo(RX, LBOT + 18); ctx.stroke();
        /* height */
        ctx.beginPath();
        ctx.moveTo(LX - 14, LTOP); ctx.lineTo(LX - 14, LBOT); ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(LX - 18, LTOP); ctx.lineTo(LX - 10, LTOP);
        ctx.moveTo(LX - 18, LBOT); ctx.lineTo(LX - 10, LBOT); ctx.stroke();
        ctx.setLineDash([]);
      }
    }

    /* ─────────────────────────────────────────────────
       STAGE 2 — Colored lock (same shape, solid fill)
    ───────────────────────────────────────────────── */

    function drawSnapAssembly(prog: number) {
      ctx.clearRect(0, 0, W, H);

      const domeR = (IRX2 - ILX) / 2;
      const outerLen = 650;
      const innerLen = 155;

      /* ── Phase 1: outline draws in (0 → 0.35) ── */
      const outlineProg = clamp(prog / 0.35, 0, 1);
      if (outlineProg > 0) {
        const op = easeOut3(outlineProg);

        /* outer outline — progressive stroke */
        ctx.save();
        ctx.strokeStyle = "#3b82f6";
        ctx.lineWidth = 2.5;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.setLineDash([outerLen, outerLen]);
        ctx.lineDashOffset = outerLen * (1 - op);
        ctx.beginPath(); traceLockOuter(); ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();

        /* inner arch — progressive stroke */
        const ip = clamp((outlineProg - 0.4) / 0.6, 0, 1);
        if (ip > 0) {
          ctx.save();
          ctx.strokeStyle = "#3b82f6";
          ctx.lineWidth = 2.5;
          ctx.lineCap = "round";
          ctx.setLineDash([innerLen, innerLen]);
          ctx.lineDashOffset = innerLen * (1 - easeOut3(ip));
          ctx.beginPath(); traceInnerArch(); ctx.stroke();
          ctx.setLineDash([]);
          ctx.restore();
        }
      }

      /* ── Phase 2: fill fades in (0.30 → 0.65) ── */
      const fillProg = clamp((prog - 0.30) / 0.35, 0, 1);
      if (fillProg > 0) {
        const fa = easeOut3(fillProg);

        /* solid blue lock body */
        ctx.save();
        ctx.globalAlpha = fa;
        ctx.fillStyle = "#3b82f6";
        ctx.beginPath(); traceLockOuter(); ctx.fill();
        ctx.restore();

        /* arch thick ring */
        ctx.save();
        ctx.globalAlpha = fa;
        ctx.fillStyle = "#3b82f6";
        ctx.beginPath();
        ctx.arc(CX, ACY, OAR, Math.PI, 0, false);
        ctx.arc(CX, ACY, IAR, 0, Math.PI, true);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      /* ── Phase 3: dome inside arch opening (0.55 → 0.80) ── */
      const domeProg = clamp((prog - 0.55) / 0.25, 0, 1);
      if (domeProg > 0) {
        const dp = easeOutBack(domeProg);
        ctx.save();
        ctx.globalAlpha = Math.min(domeProg * 3, 1);
        ctx.fillStyle = "rgba(147,181,247,0.5)";
        ctx.beginPath();
        ctx.arc(CX, ACY, domeR * dp, Math.PI, 0, false);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      /* ── Phase 4: border + glow (0.75 → 1.0) ── */
      const glowProg = clamp((prog - 0.75) / 0.25, 0, 1);
      if (glowProg > 0) {
        const gp = easeOut3(glowProg);

        /* border for definition */
        ctx.save();
        ctx.globalAlpha = gp;
        ctx.strokeStyle = `rgba(59,130,246,0.7)`;
        ctx.lineWidth = 1.5;
        ctx.beginPath(); traceLockOuter(); ctx.stroke();
        ctx.restore();

        /* outer glow */
        ctx.save();
        ctx.globalAlpha = gp * 0.6;
        ctx.strokeStyle = "#3b82f6";
        ctx.lineWidth = 1.5;
        ctx.shadowColor = "#3b82f6";
        ctx.shadowBlur = gp * 20;
        ctx.beginPath(); traceLockOuter(); ctx.stroke();
        ctx.shadowBlur = 0;
        ctx.restore();
      }
    }



    /* main loop */
    function loop(ts: number) {
      const dt = (ts - lastT.current) * 0.001;
      lastT.current = ts;
      T.current = ts * 0.001;
      void dt;

      const s = stepN.current;
      if (s === 0) {
        drawStaticBlueprint();
      } else if (s === 1) {
        drawSketch(T.current);
      } else {
        if (asmStart.current === null) asmStart.current = T.current;
        asmProgress.current = Math.min(1, (T.current - asmStart.current) / 2.6);
        drawSnapAssembly(asmProgress.current);
      }
      rafRef.current = requestAnimationFrame(loop);
    }
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <section style={{
      background: "#ffffff",
      backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg stroke='%23e5e7eb' stroke-width='1' stroke-dasharray='4 4' fill='none'%3E%3Cpath d='M40 0H0V40'/%3E%3C/g%3E%3C/svg%3E\")",
      backgroundSize: "40px 40px",
    }}>

      {/* Section heading — no badge */}
      <div style={{ textAlign: "center", padding: "clamp(40px,8vw,72px) 20px 44px", fontFamily: "'Sora',sans-serif" }}>
        <h2 style={{
          fontFamily: "'Clash Display',sans-serif",
          fontSize: "clamp(28px,5vw,40px)",
          fontWeight: 700, color: "#0f172a",
          letterSpacing: -2, lineHeight: 1, margin: 0,
        }}>How It Works</h2>
      </div>

      {/* Desktop: scrollytelling — both sides sticky, scroll drives transitions */}
      <div ref={sectionRef} className="hiw-desktop" style={{
        position: "relative", height: "300vh",
        maxWidth: 1100, margin: "0 auto", padding: "0 40px",
      }}>
        <div style={{
          position: "sticky", top: 0, height: "100vh",
          display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "center",
        }}>
          {/* Left: animation canvas */}
          <div style={{
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
          }}>
            <canvas ref={canvasRef} width={220} height={300}
              style={{ width: 200, height: 260, display: "block" }} />
            <div style={{ display: "flex", justifyContent: "center", gap: 7, marginTop: 12 }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{
                  height: 4, borderRadius: 999,
                  width: activeStep === i ? 26 : 7,
                  background: activeStep === i ? "#3b82f6" : "rgba(59,130,246,0.2)",
                  transition: "all 0.5s cubic-bezier(0.34,1.4,0.64,1)",
                }} />
              ))}
            </div>
          </div>

          {/* Right: all 3 steps — active one highlighted */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 8 }}>
            {steps.map((step, i) => {
              const isActive = activeStep === i;
              return (
                <div
                  key={i}
                  style={{
                    padding: "14px 20px",
                    borderRadius: 12,
                    borderLeft: isActive ? "3px solid #3b82f6" : "3px solid transparent",
                    background: isActive ? "rgba(59,130,246,0.04)" : "transparent",
                    boxShadow: isActive ? "0 4px 24px rgba(59,130,246,0.08)" : "none",
                    opacity: isActive ? 1 : 0.35,
                    transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  <h3 style={{
                    fontFamily: "'Clash Display',sans-serif", fontSize: 20, fontWeight: 700,
                    color: "#0f172a", letterSpacing: -1, lineHeight: 1.1, marginBottom: 6,
                  }}>{step.title}</h3>

                  <p style={{
                    fontSize: 12, color: "#64748b", lineHeight: 1.7, fontWeight: 300,
                    fontFamily: "'Sora',sans-serif", maxWidth: 420, marginBottom: 8,
                  }}>{step.desc}</p>

                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    {step.bullets.map((b, j) => (
                      <div key={j} style={{
                        display: "flex", alignItems: "center", gap: 8,
                        fontSize: 11, color: "#475569", fontFamily: "'Sora',sans-serif",
                      }}>
                        <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#3b82f6", flexShrink: 0 }} />
                        {b}
                      </div>
                    ))}
                  </div>

                  <div style={{
                    height: 2, borderRadius: 999, marginTop: 10,
                    width: isActive ? "100%" : 0,
                    background: "linear-gradient(90deg,#3b82f6,#06b6d4)",
                    transition: "width 0.7s cubic-bezier(0.34,1.2,0.64,1)",
                  }} />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile: stacked cards */}
      <div className="hiw-mobile" style={{ padding: "0 20px 60px", maxWidth: 560, margin: "0 auto" }}>
        {steps.map((step, i) => (
          <div key={i} style={{
            padding: "28px 24px", marginBottom: 12, borderRadius: 16,
            background: "rgba(255,255,255,0.9)",
            border: "1px solid rgba(59,130,246,0.1)",
            boxShadow: "0 2px 12px rgba(59,130,246,0.06)",
          }}>
            <h3 style={{
              fontFamily: "'Clash Display',sans-serif", fontSize: 22, fontWeight: 700,
              color: "#0f172a", letterSpacing: -1, lineHeight: 1.1, marginBottom: 10,
            }}>{step.title}</h3>
            <p style={{
              fontSize: 13, color: "#64748b", lineHeight: 1.8, fontWeight: 300,
              fontFamily: "'Sora',sans-serif", marginBottom: 14,
            }}>{step.desc}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              {step.bullets.map((b, j) => (
                <div key={j} style={{
                  display: "flex", alignItems: "center", gap: 9,
                  fontSize: 12, color: "#475569", fontFamily: "'Sora',sans-serif",
                }}>
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#3b82f6", flexShrink: 0 }} />
                  {b}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .hiw-mobile { display: none; }
        @media (max-width: 767px) {
          .hiw-desktop { display: none !important; }
          .hiw-mobile  { display: block; }
        }
      `}</style>
    </section>
  );
}
