"use client";
import { useState, useRef, useEffect } from "react";
import HowItWorksAnimation from "./HowItWorksAnimation";

const steps = [
  {
    num: "01",
    title: "Share Your Vision",
    tag: "Discovery",
    desc: "Tell us everything — your idea, goals, audience and the core problem. We study every detail before touching a single tool.",
    bullets: ["Discovery call to understand your goals", "Define your audience and core problem", "Map out constraints and opportunities"],
  },
  {
    num: "02",
    title: "Plan & Strategy",
    tag: "Blueprint",
    desc: "We take every part of your project and snap it into place — scope, features, tech stack and timelines. Every component clicks into its exact position.",
    bullets: ["Full scope, features and architecture plan", "Tech stack selection and design direction", "Sprint timeline and milestone roadmap"],
  },
  {
    num: "03",
    title: "Build, Launch & Grow",
    tag: "Execution",
    desc: "Full power engaged. We launch fast, scale smart and stay locked in as your product grows. This is APSLOCK — secured and operational.",
    bullets: ["Daily updates and live project board", "Rigorous QA and performance testing", "Launch, scale and post-delivery support"],
  },
];

export default function HowItWorksSection() {
  /* Start with step 0 highlighted by default */
  const [activeStep, setActiveStep] = useState<number>(0);
  const [reachedStep, setReachedStep] = useState<number>(0);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  /* Cumulative hover — only goes forward, never resets on leave */
  const handleEnter = (i: number) => {
    if (leaveTimer.current) { clearTimeout(leaveTimer.current); leaveTimer.current = null; }
    setActiveStep(i);
    setReachedStep(prev => Math.max(prev, i));
  };
  const handleLeave = () => {
    /* Do nothing on leave — keep current active step */
  };

  /* Reset when section scrolls out of view */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setActiveStep(0);
          setReachedStep(0);
        }
      },
      { threshold: 0 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const isDormant = false; /* never dormant — always has an active step */

  return (
    <section ref={sectionRef} className="hiw-section">
      <div className="hiw-grid-bg" />

      {/* Heading */}
      <div className="hiw-heading">
        <h2 className="hiw-h2">How It Works</h2>
      </div>

      {/* ── Card wrapper ── */}
      <div className="hiw-card">

      {/* ── Desktop ── */}
      <div className="hiw-desktop">
        <div className="hiw-layout">
          {/* Left — animation */}
          <div className="hiw-anim-col">
            <HowItWorksAnimation activeStep={activeStep} />
            <div className="hiw-dots">
              {[0, 1, 2].map(i => (
                <div key={i} className={`hiw-dot${activeStep === i ? " hiw-dot-on" : ""}`} />
              ))}
            </div>
          </div>

          {/* Right — step cards */}
          <div className="hiw-steps" onMouseLeave={handleLeave}>
            {steps.map((step, i) => {
              const isActive = activeStep === i;
              const isReached = i <= reachedStep;
              const isInactive = !isActive && !isReached;
              return (
                <div
                  key={i}
                  className={[
                    "hc",
                    isActive ? "hc-on" : "",
                    isReached && !isActive ? "hc-reached" : "",
                    isInactive ? "hc-dim" : "",
                  ].join(" ")}
                  onMouseEnter={() => handleEnter(i)}
                >
                  {/* Energy bar */}
                  <div className={`hc-bar${isActive ? " hc-bar-on" : ""}`} />

                  {/* Glow orb */}
                  <div className={`hc-glow${isActive ? " hc-glow-on" : ""}`} />



                  {/* Header */}
                  <div className="hc-header">
                    <div className="hc-header-text">
                      <span className={`hc-tag${isActive || isReached ? " hc-tag-vis" : ""}`}>{step.tag}</span>
                      <h3 className={`hc-title${isActive ? " hc-title-on" : ""} ${isReached && !isActive ? "hc-title-reached" : ""}`}>{step.title}</h3>
                    </div>

                    {/* Arrow hint for unreached steps */}
                    {!isReached && !isActive && (
                      <svg className="hc-chevron" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>

                  {/* Expandable body */}
                  <div className={`hc-body${isActive ? " hc-body-on" : ""}`}>
                    <div className="hc-body-inner">
                      <p className={`hc-desc${isActive ? " hc-desc-on" : ""}`}>{step.desc}</p>
                      <div className="hc-bullets">
                        {step.bullets.map((b, j) => (
                          <div
                            key={j}
                            className={`hc-bullet${isActive ? " hc-bullet-on" : ""}`}
                            style={{ transitionDelay: isActive ? `${0.18 + j * 0.07}s` : "0s" }}
                          >
                            <span className="hc-arrow">
                              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                                <path d="M3 7h8M8 3.5L11.5 7 8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </span>
                            <span>{b}</span>
                          </div>
                        ))}
                      </div>
                      <div className={`hc-accent${isActive || isReached ? " hc-accent-on" : ""}`} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      </div>{/* end hiw-card */}

      {/* ── Mobile ── */}
      <div className="hiw-mobile">
        {steps.map((step, i) => {
          const isActive = activeStep === i;
          return (
            <div key={i} className={`hm${isActive ? " hm-on" : ""}`} onClick={() => setActiveStep(prev => prev === i ? 0 : i)}>
              <div className={`hc-bar${isActive ? " hc-bar-on" : ""}`} />
              <div className="hm-top">
                <div style={{ flex: 1 }}>
                  <span className="hm-tag">{step.tag}</span>
                  <h3 className={`hm-title${isActive ? " hm-title-on" : ""}`}>{step.title}</h3>
                </div>
              </div>
              <div className={`hc-body${isActive ? " hc-body-on" : ""}`}>
                <div className="hc-body-inner">
                  <p className="hm-desc">{step.desc}</p>
                  <div className="hm-bullets">
                    {step.bullets.map((b, j) => (
                      <div key={j} className={`hm-bullet${isActive ? " hm-bullet-on" : ""}`}
                        style={{ transitionDelay: isActive ? `${0.12 + j * 0.06}s` : "0s" }}>
                        <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                          <path d="M3 7h8M8 3.5L11.5 7 8 10.5" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div className="hm-anim">
          <HowItWorksAnimation activeStep={activeStep} />
        </div>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Clash+Display:wght@400;500;600;700;800&family=Sora:wght@300;400;500;600;700&display=swap');

        /* ── Section ── */
        .hiw-section {
          position: relative; background: #f8faf8;
          font-family: 'Sora', sans-serif; overflow: hidden;
          padding-bottom: 20px;
        }
        .hiw-grid-bg {
          position: absolute; inset: 0; pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg stroke='%23e5e7eb' stroke-width='1' stroke-dasharray='4 4' fill='none'%3E%3Cpath d='M40 0H0V40'/%3E%3C/g%3E%3C/svg%3E");
          background-size: 40px 40px;
        }

        /* ── Card wrapper ── */
        .hiw-card {
          position: relative;
          z-index: 1;
          max-width: 1200px;
          margin: 0 auto;
          background: linear-gradient(165deg, #ffffff 0%, #f6faf6 35%, #f0f7f0 60%, #f8fbf8 100%);
          border-radius: 28px;
          border: 1px solid rgba(34, 197, 94, 0.08);
          box-shadow:
            0 4px 32px -8px rgba(34, 197, 94, 0.06),
            0 1px 4px rgba(0, 0, 0, 0.03),
            inset 0 1px 0 rgba(255, 255, 255, 0.9);
          padding: 10px 0 20px;
          overflow: hidden;
        }
        .hiw-heading {
          text-align: center;
          padding: clamp(40px,8vw,72px) 20px 44px;
          position: relative; z-index: 1;
        }
        .hiw-h2 {
          font-family: 'Clash Display', sans-serif;
          font-size: clamp(28px,5vw,40px);
          font-weight: 700; color: #0f172a;
          letter-spacing: -2px; line-height: 1; margin: 0;
        }

        /* ── Desktop ── */
        .hiw-desktop {
          max-width: 1100px; margin: 0 auto;
          padding: 0 40px 50px;
          position: relative; z-index: 1;
        }
        .hiw-layout {
          display: grid; grid-template-columns: 1fr 1fr;
          align-items: center; min-height: 440px;
        }
        .hiw-anim-col {
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
        }
        .hiw-dots {
          display: flex; justify-content: center;
          gap: 7px; margin-top: 14px;
        }
        .hiw-dot {
          height: 4px; border-radius: 999px;
          width: 7px; background: rgba(59,130,246,0.18);
          transition: all 0.5s cubic-bezier(0.34,1.4,0.64,1);
        }
        .hiw-dot-on { width: 26px; background: #3b82f6; }

        /* ── Step cards container ── */
        .hiw-steps {
          display: flex; flex-direction: column;
          gap: 8px; justify-content: center;
        }

        /* ────────────────────────────────────────
           Card base
        ──────────────────────────────────────── */
        .hc {
          position: relative;
          padding: 14px 24px 14px 28px;
          border-radius: 16px;
          cursor: pointer;
          border: 1px solid transparent;
          background: transparent;
          overflow: hidden;
          transition: all 0.55s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* ── DORMANT — nothing hovered, cards look inviting ── */
        /* ── REACHED — previously visited steps stay visible ── */
        .hc-reached {
          padding: 22px 28px 22px 28px;
          background: rgba(240,249,240,0.5);
          border-color: rgba(34,197,94,0.1);
        }
        .hc-reached:hover {
          background: rgba(230,245,230,0.7);
          border-color: rgba(34,197,94,0.2);
          box-shadow: 0 4px 20px rgba(34,197,94,0.06);
        }

        /* ── ACTIVE — fully expanded ── */
        .hc-on {
          padding: 22px 28px 14px 28px;
          background: linear-gradient(
            145deg,
            rgba(59,130,246,0.035),
            rgba(147,197,253,0.015),
            rgba(255,255,255,0.6)
          );
          border-color: rgba(59,130,246,0.12);
          box-shadow:
            0 16px 48px -12px rgba(59,130,246,0.1),
            0 0 0 1px rgba(59,130,246,0.04),
            inset 0 1px 0 rgba(255,255,255,0.7);
        }

        /* ── DIMMED — unreached steps are subdued ── */
        .hc-dim {
          opacity: 0.45;
          padding: 22px 28px 22px 28px;
          background: rgba(248,250,252,0.4);
          border-color: rgba(0,0,0,0.04);
        }
        .hc-dim:hover {
          opacity: 0.7;
          background: rgba(238,242,250,0.6);
          border-color: rgba(59,130,246,0.12);
          box-shadow: 0 4px 16px rgba(59,130,246,0.05);
          transform: translateX(3px);
        }

        /* Energy bar */
        .hc-bar {
          position: absolute; left: 0; top: 50%;
          width: 3px; height: 0;
          border-radius: 0 999px 999px 0;
          background: linear-gradient(to bottom, #3b82f6, #6366f1);
          transform: translateY(-50%);
          transition: height 0.5s cubic-bezier(0.34,1.56,0.64,1);
        }
        .hc-bar-on { height: calc(100% - 20px); }

        /* Glow orb */
        .hc-glow {
          position: absolute; top: -40px; right: -40px;
          width: 180px; height: 180px; border-radius: 50%;
          background: radial-gradient(circle, rgba(59,130,246,0.06), transparent 70%);
          opacity: 0; transition: opacity 0.6s ease;
          pointer-events: none;
        }
        .hc-glow-on { opacity: 1; }

        /* Watermark number */
        .hc-watermark {
          position: absolute; top: -6px; right: 14px;
          font-family: 'Clash Display', sans-serif;
          font-size: 100px; font-weight: 800; line-height: 1;
          color: transparent;
          background: linear-gradient(135deg, rgba(59,130,246,0.04), rgba(99,102,241,0.02));
          -webkit-background-clip: text; background-clip: text;
          pointer-events: none;
          opacity: 0; transform: translateY(10px);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .hc-wm-on { opacity: 1; transform: translateY(0); }

        /* Header */
        .hc-header {
          display: flex; align-items: center; gap: 14px;
          position: relative; z-index: 1;
        }
        .hc-header-text { display: flex; flex-direction: column; gap: 0; flex: 1; }

        /* Number badge */
        .hc-num {
          display: flex; align-items: center; justify-content: center;
          min-width: 36px; height: 36px; border-radius: 10px;
          font-family: 'Clash Display', sans-serif;
          font-size: 13px; font-weight: 700;
          color: #94a3b8;
          background: rgba(241,245,249,0.8);
          border: 1px solid rgba(0,0,0,0.04);
          flex-shrink: 0;
          transition: all 0.45s cubic-bezier(0.34,1.4,0.64,1);
        }
        .hc-num-on {
          background: linear-gradient(135deg, #3b82f6, #6366f1);
          border-color: transparent; color: #fff;
          box-shadow: 0 4px 16px rgba(59,130,246,0.3);
          transform: scale(1.05);
        }

        /* Tag */
        .hc-tag {
          display: inline-block;
          font-size: 9px; font-weight: 600;
          letter-spacing: 2px; text-transform: uppercase;
          color: #3b82f6;
          opacity: 0; max-height: 0;
          transform: translateY(4px);
          transition: all 0.35s ease;
          margin-bottom: 0; overflow: hidden;
        }
        .hc-tag-vis {
          opacity: 0.5; max-height: 20px;
          transform: translateY(0); margin-bottom: 2px;
        }

        /* Chevron */
        .hc-chevron {
          color: #94a3b8; flex-shrink: 0;
          transition: transform 0.3s ease, color 0.3s ease;
        }
        .hc-dim:hover .hc-chevron {
          color: #3b82f6; transform: translateX(3px);
        }
        /* Checkmark for reached */
        .hc-check {
          flex-shrink: 0;
          opacity: 0.7;
          transition: opacity 0.3s ease;
        }
        .hc-reached:hover .hc-check {
          opacity: 1;
        }

        /* Title */
        .hc-title {
          font-family: 'Clash Display', sans-serif;
          font-size: 15px; font-weight: 600;
          color: #94a3b8; letter-spacing: -0.5px;
          line-height: 1.2; margin: 0;
          transition: all 0.4s ease;
        }
        .hc-title-reached {
          font-size: 16px; font-weight: 600;
          color: #334155;
        }
        .hc-title-on {
          font-size: 18px; font-weight: 700;
          color: #0f172a; letter-spacing: -0.8px;
        }

        /* ── Expandable body ── */
        .hc-body {
          display: grid; grid-template-rows: 0fr;
          transition: grid-template-rows 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .hc-body-on { grid-template-rows: 1fr; }
        .hc-body-inner { overflow: hidden; }

        .hc-desc {
          font-size: 12.5px; color: #64748b;
          line-height: 1.75; font-weight: 300;
          max-width: 380px; margin: 10px 0 14px 50px;
          opacity: 0; transform: translateY(6px);
          transition: opacity 0.4s 0.12s ease, transform 0.4s 0.12s ease;
        }
        .hc-desc-on { opacity: 1; transform: translateY(0); }

        .hc-bullets {
          display: flex; flex-direction: column;
          gap: 7px; margin: 0 0 6px 50px;
        }
        .hc-bullet {
          display: flex; align-items: center; gap: 10px;
          font-size: 11.5px; color: #475569;
          font-family: 'Sora', sans-serif;
          opacity: 0; transform: translateX(-10px);
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .hc-bullet-on { opacity: 1; transform: translateX(0); }
        .hc-arrow {
          display: flex; align-items: center; justify-content: center;
          width: 22px; height: 22px; border-radius: 6px;
          background: rgba(59,130,246,0.06); color: #3b82f6;
          flex-shrink: 0; transition: background 0.3s ease;
        }
        .hc-on .hc-arrow { background: rgba(59,130,246,0.1); }

        .hc-accent {
          height: 2px; border-radius: 999px;
          margin: 10px 0 4px 50px; width: 0;
          background: linear-gradient(90deg, #3b82f6, #818cf8, #06b6d4);
          transition: width 0.7s 0.28s cubic-bezier(0.34,1.2,0.64,1);
        }
        .hc-accent-on { width: 55%; }

        /* ── Mobile ── */
        .hiw-mobile { display: none; }

        .hm {
          position: relative;
          padding: 20px 22px 20px 26px;
          margin-bottom: 8px; border-radius: 14px;
          background: rgba(248,250,252,0.7);
          border: 1px solid rgba(0,0,0,0.05);
          cursor: pointer; overflow: hidden;
          transition: all 0.4s ease;
        }
        .hm-on {
          background: linear-gradient(145deg, rgba(59,130,246,0.04), rgba(255,255,255,0.8));
          border-color: rgba(59,130,246,0.12);
          box-shadow: 0 8px 28px -8px rgba(59,130,246,0.1);
        }
        .hm-top { display: flex; align-items: center; gap: 12px; }
        .hm-tag {
          font-size: 9px; font-weight: 600; letter-spacing: 1.5px;
          text-transform: uppercase; color: rgba(59,130,246,0.5);
          display: block; margin-bottom: 2px;
        }
        .hm-title {
          font-family: 'Clash Display', sans-serif;
          font-size: 17px; font-weight: 600; color: #334155;
          margin: 0; transition: color 0.3s;
        }
        .hm-title-on { color: #0f172a; font-weight: 700; }
        .hm-desc {
          font-size: 13px; color: #64748b; line-height: 1.8;
          font-weight: 300; margin: 10px 0 12px 48px;
        }
        .hm-bullets {
          display: flex; flex-direction: column;
          gap: 8px; margin-left: 48px;
        }
        .hm-bullet {
          display: flex; align-items: center; gap: 8px;
          font-size: 12px; color: #475569;
          opacity: 0; transform: translateX(-6px);
          transition: all 0.3s ease;
        }
        .hm-bullet-on { opacity: 1; transform: translateX(0); }
        .hm-anim {
          display: flex; justify-content: center;
          margin-top: 24px;
        }

        @media (max-width: 767px) {
          .hiw-desktop { display: none !important; }
          .hiw-mobile  { display: block; padding: 0 20px 60px; max-width: 560; margin: 0 auto; }
          .hiw-card {
            border-radius: 20px;
            margin: 0 12px;
            padding: 8px 0 16px;
          }
        }
      `}</style>
    </section>
  );
}
