"use client";
import { useState } from "react";
import Link from "next/link";

const services = [
  { num: "01", tag: "Digital Foundations", title: "Built to Evolve,\nNot Just Launch", desc: "We design and engineer digital platforms that grow with your business — resilient architectures, seamless interfaces, and performance that holds under pressure.", img: "/web.png", color: "#ea580c", strip: "Foundations", href: "/services/digital-foundations", tags: ["Web platforms", "Mobile applications", "API integrations", "Scalable infrastructure"] },
  { num: "02", tag: "Perception & Interaction", title: "Designed to Be\nSeen & Used", desc: "From first impression to daily interaction, we craft cohesive experiences that align identity, interface, and emotion into a single, recognizable presence.", img: "/uiux.png", color: "#7c3aed", strip: "Perception", href: "/services/perception-interaction", tags: ["Brand identity", "UX & UI design", "Design systems", "Visual language"] },
  { num: "03", tag: "Growth Mechanics", title: "Attention Is\nEngineered", desc: "We build growth systems that connect data, creativity, and distribution — turning visibility into predictable, measurable momentum.", img: "/app.png", color: "#059669", strip: "Growth", href: "/services/growth-mechanics", tags: ["Performance marketing", "SEO & content strategy", "Conversion optimization", "Analytics & tracking"] },
];

export default function Services() {
  const [active, setActive] = useState(0);

  return (
    <section className="s-section" id="services">
      <div className="s-grid" />

      <div className="s-head">
        <div>
          <h2 className="s-h2">What We Do</h2>
          <p className="s-sub">We design systems, not just screens.</p>
        </div>
      </div>

      <div className="panel">
        {services.map((svc, i) => (
          <div key={i} className={`svc${i === active ? " active" : ""}`} onMouseEnter={() => setActive(i)}>
            <div className="svc-line" />
            <div className="svc-bg" style={{ backgroundImage: `url('${svc.img}')`, backgroundColor: svc.color }} />
            <div className="svc-overlay" />
            <div className="svc-strip">
              <div className="strip-num">{svc.num}</div>
              <div className="strip-name">{svc.strip}</div>
            </div>
            <div className="svc-content">
              <div className="svc-tag">{svc.num} — {svc.tag}</div>
              <h3 className="svc-title">{svc.title.split("\n").map((line, j) => (<span key={j}>{line}{j === 0 && <br />}</span>))}</h3>
              <p className="svc-desc">{svc.desc}</p>
              <div className="svc-tags">
                {svc.tags.map((t, j) => (
                  <span key={j} className="svc-cap-tag">{t}</span>
                ))}
              </div>
              <Link href={svc.href} className="svc-btn">Explore →</Link>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Clash+Display:wght@400;500;600;700&family=Sora:wght@300;400;500;600;700&display=swap');

        .s-section {
          background:#ffffff;
          font-family: 'Sora', sans-serif;
          position: relative;
          overflow: hidden;
        }
        .s-grid {
          position: absolute; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg stroke='%23e5e7eb' stroke-width='1' stroke-dasharray='4 4' fill='none'%3E%3Cpath d='M40 0H0V40'/%3E%3C/g%3E%3C/svg%3E");
          background-size: 40px 40px;
          z-index: 0; pointer-events: none;
        }
        .s-head {
          padding: 80px 60px 24px; position: relative; z-index: 2;
          display: flex; justify-content: center;
        }
        .s-h2 { font-family: 'Clash Display', sans-serif; font-size: 44px; font-weight: 700; color: #0f172a; letter-spacing: -2px; line-height: 1; margin: 0; text-align: center; }
        .s-sub { font-size: 15px; color: #64748b; font-weight: 400; margin: 12px 0 0; text-align: center; letter-spacing: -0.2px; }

        .panel { display: flex; height: 520px; position: relative; z-index: 2; }
        .svc { position: relative; overflow: hidden; cursor: pointer; flex: 0.5; border-right: 1px solid rgba(0,0,0,0.06); transition: flex 0.65s cubic-bezier(0.4,0,0.2,1); }
        .svc:last-child { border-right: none; }
        .svc.active { flex: 4; }
        .svc-line { position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg,#3b82f6,#6366f1); transform: scaleX(0); transform-origin: left; transition: transform 0.5s 0.1s cubic-bezier(0.34,1.56,0.64,1); z-index: 4; }
        .svc.active .svc-line { transform: scaleX(1); }
        .svc-bg { position: absolute; inset: 0; background-size: cover; background-position: center; transform: scale(1.05); transition: transform 0.65s cubic-bezier(0.4,0,0.2,1), opacity 0.5s; opacity: 0.12; }
        .svc.active .svc-bg { opacity: 1; transform: scale(1); }
        .svc-overlay { position: absolute; inset: 0; background: linear-gradient(to right,rgba(8,12,20,0.78) 0%,rgba(8,12,20,0.2) 60%,transparent 100%); opacity: 0; transition: opacity 0.5s; z-index: 1; }
        .svc.active .svc-overlay { opacity: 1; }
        .svc-strip { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; opacity: 1; transition: opacity 0.3s; z-index: 2; }
        .svc.active .svc-strip { opacity: 0; pointer-events: none; }
        .strip-num { font-family: 'Clash Display', sans-serif; font-size: 11px; font-weight: 700; color: #94a3b8; letter-spacing: 2px; }
        .strip-name { font-family: 'Clash Display', sans-serif; font-size: 13px; font-weight: 700; color: #0f172a; writing-mode: vertical-rl; text-orientation: mixed; transform: rotate(180deg); letter-spacing: 1px; white-space: nowrap; }
        .svc-content { position: absolute; bottom: 0; left: 0; right: 0; padding: 40px 36px; opacity: 0; transform: translateY(20px); transition: all 0.5s 0.2s cubic-bezier(0.4,0,0.2,1); z-index: 3; }
        .svc.active .svc-content { opacity: 1; transform: translateY(0); }
        .svc-tag { font-size: 9px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: rgba(255,255,255,0.5); margin-bottom: 10px; }
        .svc-title { font-family: 'Clash Display', sans-serif; font-size: 32px; font-weight: 700; color: #fff; letter-spacing: -1px; line-height: 1.1; margin-bottom: 10px; }
        .svc-desc { font-size: 13px; color: rgba(255,255,255,0.55); line-height: 1.7; font-weight: 300; max-width: 340px; margin-bottom: 14px; }
        .svc-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 18px; }
        .svc-cap-tag { display: inline-block; padding: 4px 12px; border-radius: 999px; font-size: 10px; font-weight: 500; letter-spacing: 0.3px; color: rgba(255,255,255,0.75); background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12); font-family: 'Sora', sans-serif; }
        .svc-btn { display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: #fff; padding: 10px 20px; border-radius: 999px; font-size: 11px; font-weight: 600; cursor: pointer; transition: all 0.3s; font-family: 'Sora', sans-serif; text-decoration: none; }
        .svc-btn:hover { background: rgba(255,255,255,0.2); }

        /* ── Mobile: stacked cards ── */
        @media (max-width: 767px) {
          .s-head { padding: 60px 20px 20px; }
          .s-h2 { font-size: 32px; letter-spacing: -1px; }
          .panel {
            flex-direction: column;
            height: auto;
            padding: 0 16px 56px;
            gap: 10px;
          }
          .svc {
            flex: none !important;
            height: 200px;
            border-right: none !important;
            border-radius: 16px;
          }
          /* Force all cards into "active" visual state on mobile */
          .svc .svc-bg { opacity: 0.88 !important; transform: scale(1) !important; }
          .svc .svc-overlay { opacity: 1 !important; }
          .svc .svc-strip { opacity: 0 !important; pointer-events: none; }
          .svc .svc-line { transform: scaleX(1) !important; }
          .svc .svc-content { opacity: 1 !important; transform: translateY(0) !important; padding: 20px 22px; }
          .svc-title { font-size: 22px !important; margin-bottom: 6px; }
          .svc-desc { font-size: 12px; max-width: 100%; margin-bottom: 12px; }
        }

        /* ── Tablet: 2-column grid ── */
        @media (min-width: 640px) and (max-width: 767px) {
          .panel {
            display: grid !important;
            grid-template-columns: 1fr 1fr;
            flex-direction: unset;
          }
          .svc:last-child { height: 200px; }
        }
      `}</style>
    </section>
  );
}
