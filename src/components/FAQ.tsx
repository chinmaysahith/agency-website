"use client";
import { useState } from "react";

const faqs = [
  { n: "01", q: "How long does a project take?",         a: "Most projects ship in 1–4 weeks. Focused sprints — real progress every day, not months of silence followed by a big reveal.",              tag: "1–4 weeks typical"    },
  { n: "02", q: "Do you work with startups?",            a: "Startups are our specialty. Tight budgets, fast timelines — we've helped early teams ship faster than they thought possible.",              tag: "Startup-ready"        },
  { n: "03", q: "What technologies do you use?",         a: "React, Next.js, Node.js, React Native, Flutter. Every decision is intentional — right stack for your goals, not what's trending.",         tag: "Modern stack"         },
  { n: "04", q: "Can you redesign an existing product?", a: "Yes. We audit, identify every friction point, then rebuild with sharper UX and performance that makes visitors stop mid-scroll.",          tag: "Full redesign"        },
  { n: "05", q: "How does pricing work?",                a: "Fixed quotes and monthly retainers. No hidden fees, no surprises. The number you agree to is the number you pay.",                         tag: "No hidden fees"       },
  { n: "06", q: "What does working together look like?", a: "Dedicated contact, daily updates, live project board. We treat your deadline like our reputation depends on it — because it does.",       tag: "Direct collaboration" },
];

const tickerWords = ["Fast Delivery","No Hidden Fees","Senior Team","Real Results","Startup-Ready","Modern Stack","Direct Access","Transparent","Top Talent","Full Redesign"];

const cardStyles = [
  { bg: "#0f172a", numColor: "rgba(255,255,255,0.06)", qColor: "#ffffff", hintColor: "#fff", glowColor: "rgba(255,255,255,0.08)" },
  { bg: "#eff6ff", numColor: "rgba(59,130,246,0.12)", qColor: "#1e3a5f", hintColor: "#1e3a5f", glowColor: "rgba(59,130,246,0.15)" },
  { bg: "#f0fdf4", numColor: "rgba(34,197,94,0.12)", qColor: "#14532d", hintColor: "#14532d", glowColor: "rgba(34,197,94,0.15)" },
  { bg: "#fdf4ff", numColor: "rgba(168,85,247,0.12)", qColor: "#581c87", hintColor: "#581c87", glowColor: "rgba(168,85,247,0.15)" },
  { bg: "#fff7ed", numColor: "rgba(249,115,22,0.12)", qColor: "#7c2d12", hintColor: "#7c2d12", glowColor: "rgba(249,115,22,0.15)" },
  { bg: "#fef2f2", numColor: "rgba(239,68,68,0.12)", qColor: "#7f1d1d", hintColor: "#7f1d1d", glowColor: "rgba(239,68,68,0.15)" },
];

const backColors = [
  "#1e293b",
  "#3b82f6",
  "#16a34a",
  "#9333ea",
  "#ea580c",
  "#ef4444",
];

export default function FAQ() {
  const [flipped, setFlipped] = useState<number | null>(null);
  const toggle = (i: number) => setFlipped(flipped === i ? null : i);

  return (
    <section className="faq-section" id="faq">
      <div className="faq-head">
        <div className="faq-tag">FAQ</div>
        <h2>Flip the <span className="out">card.</span><br />Get the answer.</h2>
        <p>Click any card to reveal the answer on the other side.</p>
      </div>

      <div className="ticker">
        <div className="ticker-inner">
          {[...tickerWords, ...tickerWords].map((w, i) => (
            <span key={i} className="tk-item"><span className="tk-dot" />{w}</span>
          ))}
        </div>
      </div>

      <div className="cards-track">
        <div className="cards-grid">
          {faqs.map((f, i) => {
            const cs = cardStyles[i];
            const bc = backColors[i];
            return (
              <div
                key={i}
                className={`card-wrap ${flipped === i ? "flipped" : ""}`}
                onClick={() => toggle(i)}
              >
                <div className="card-inner">
                  <div className="card-front" style={{ background: cs.bg }}>
                    <div className="card-glow" style={{ background: cs.glowColor }} />
                    <div className="cf-num" style={{ color: cs.numColor }}>{f.n}</div>
                    <div className="cf-q" style={{ color: cs.qColor }}>{f.q}</div>
                    <div className="cf-hint" style={{ color: cs.hintColor }}>
                      Flip for answer <span className="hint-arrow">→</span>
                    </div>
                  </div>
                  <div className="card-back" style={{ background: bc }}>
                    <div className="cb-label">Answer</div>
                    <div className="cb-ans">{f.a}</div>
                    <div className="cb-tag">{f.tag}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@200;300;400;500;600;700;800;900&display=swap');

        * { font-family: 'Sora', sans-serif; box-sizing: border-box; }

        .faq-section {
          background: #ffffff;
          background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg stroke='%23e5e7eb' stroke-width='1' stroke-dasharray='4 4' fill='none'%3E%3Cpath d='M40 0H0V40'/%3E%3C/g%3E%3C/svg%3E");
          background-size: 40px 40px;
        }

        .faq-head { padding: clamp(60px,10vw,100px) clamp(20px,6vw,60px) 40px; text-align: center; position: relative; z-index: 1; }
        .faq-tag { display: inline-flex; align-items: center; gap: 8px; font-size: 9px; font-weight: 800; letter-spacing: 4px; text-transform: uppercase; color: #3b82f6; margin-bottom: 16px; }
        .faq-tag::before, .faq-tag::after { content: ''; width: 40px; height: 1px; background: rgba(59,130,246,0.3); display: inline-block; }
        .faq-head h2 { font-size: clamp(30px,6vw,48px); font-weight: 900; color: #0f172a; letter-spacing: -2px; line-height: 1; margin-bottom: 12px; }
        .out { -webkit-text-stroke: 1.5px #0f172a; color: transparent; }
        .faq-head p { font-size: 13px; color: #94a3b8; }

        .ticker { overflow: hidden; padding: 0 0 36px; position: relative; z-index: 1; mask-image: linear-gradient(90deg, transparent, black 5%, black 95%, transparent); -webkit-mask-image: linear-gradient(90deg, transparent, black 5%, black 95%, transparent); }
        .ticker-inner { display: flex; white-space: nowrap; animation: tickermove 20s linear infinite; }
        .tk-item { display: inline-flex; align-items: center; gap: 10px; padding: 0 18px; font-size: 10px; font-weight: 700; color: #cbd5e1; text-transform: uppercase; letter-spacing: 2px; }
        .tk-dot { width: 3px; height: 3px; background: #3b82f6; border-radius: 50%; display: inline-block; flex-shrink: 0; }
        @keyframes tickermove { 0% { transform: translateX(0) } 100% { transform: translateX(-50%) } }

        .cards-track { padding: 0 clamp(16px,5vw,60px) clamp(60px,10vw,100px); perspective: 1200px; position: relative; z-index: 1; }
        .cards-grid { display: grid; grid-template-columns: repeat(1, 1fr); gap: 14px; max-width: 1100px; margin: 0 auto; }
        @media (min-width: 580px) { .cards-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 960px) { .cards-grid { grid-template-columns: repeat(3, 1fr); } }

        .card-wrap { height: 220px; perspective: 800px; cursor: pointer; }
        .card-inner { display: block; width: 100%; height: 100%; position: relative; transform-style: preserve-3d; transition: transform 0.75s cubic-bezier(0.4,0,0.2,1); }
        .card-wrap:hover:not(.flipped) .card-inner { transform: rotateY(15deg) translateY(-8px); }
        .card-wrap.flipped .card-inner { transform: rotateY(180deg); }
        .card-wrap.flipped:hover .card-inner { transform: rotateY(180deg) translateY(-4px); }

        .card-front, .card-back { position: absolute; inset: 0; border-radius: 20px; backface-visibility: hidden; -webkit-backface-visibility: hidden; padding: 24px; display: flex; flex-direction: column; justify-content: space-between; overflow: hidden; }
        .card-front { border: 1px solid rgba(0,0,0,0.08); transition: box-shadow 0.3s; }
        .card-wrap:hover .card-front { box-shadow: 0 24px 60px rgba(0,0,0,0.12); }

        .cf-num { font-size: 60px; font-weight: 900; line-height: 1; letter-spacing: -3px; margin-bottom: auto; }
        .cf-q { font-size: 13px; font-weight: 700; line-height: 1.35; }
        .cf-hint { font-size: 9px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; margin-top: 14px; display: flex; align-items: center; gap: 6px; opacity: 0.35; transition: opacity 0.3s; }
        .card-wrap:hover .cf-hint { opacity: 1; }
        .hint-arrow { display: inline-block; transition: transform 0.3s; }
        .card-wrap:hover .hint-arrow { transform: translateX(4px); }

        .card-glow { position: absolute; top: -40px; right: -40px; width: 120px; height: 120px; border-radius: 50%; pointer-events: none; opacity: 0; transition: opacity 0.3s; }
        .card-wrap:hover .card-glow { opacity: 1; }

        .card-back { transform: rotateY(180deg); box-shadow: 0 24px 60px rgba(0,0,0,0.25); }
        .cb-label { font-size: 9px; font-weight: 800; letter-spacing: 3px; text-transform: uppercase; color: rgba(255,255,255,0.5); }
        .cb-ans { font-size: 12px; color: #fff; line-height: 1.8; flex: 1; padding: 10px 0; }
        .cb-tag { font-size: 9px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; color: rgba(255,255,255,0.6); display: flex; align-items: center; gap: 6px; }
        .cb-tag::before { content: ''; width: 12px; height: 1px; background: rgba(255,255,255,0.5); display: inline-block; }
      `}</style>
    </section>
  );
}