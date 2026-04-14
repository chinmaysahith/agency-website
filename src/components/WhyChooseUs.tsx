"use client";
import React, { useState, useEffect, useRef } from "react";

const SharedFilters = () => (
  <svg width="0" height="0" style={{ position: "absolute" }}>
    <defs>
      <linearGradient id="gelGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
        <stop offset="40%" stopColor="#f8f9fb" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#e8eaef" stopOpacity="0.9" />
      </linearGradient>
      <linearGradient id="darkGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#2d3a4f" />
        <stop offset="100%" stopColor="#0f172a" />
      </linearGradient>
      <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#2563eb" />
      </linearGradient>
      <linearGradient id="midGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#5a6b82" />
        <stop offset="100%" stopColor="#334155" />
      </linearGradient>
      <linearGradient id="glossReflect" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="white" stopOpacity="0.7" />
        <stop offset="50%" stopColor="white" stopOpacity="0.1" />
        <stop offset="100%" stopColor="white" stopOpacity="0" />
      </linearGradient>
      <filter id="heavyShadow"><feDropShadow dx="3" dy="6" stdDeviation="10" floodOpacity="0.12" floodColor="#000" /></filter>
      <filter id="candyShadow">
        <feDropShadow dx="2" dy="4" stdDeviation="5" floodOpacity="0.15" floodColor="#000" />
        <feDropShadow dx="-1" dy="-1" stdDeviation="2" floodColor="white" floodOpacity="0.5" />
      </filter>
    </defs>
  </svg>
);

function TargetIllustration({ isHovered }: { isHovered?: boolean }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return <div style={cs.illusWrap} />;
  
  const bars = [
    { h: 35, delay: 0 },
    { h: 55, delay: 0.1 },
    { h: 75, delay: 0.2 },
    { h: 105, delay: 0.3 },
    { h: 140, delay: 0.4 },
  ];

  return (
    <div style={cs.illusWrap}>
      <svg viewBox="0 0 220 190" width="100%" height="100%" key={isHovered ? 'h' : 'n'}>
        {bars.map((bar, i) => {
          const isLast = i === bars.length - 1;
          const x = 30 + i * 35;
          return (
            <rect 
              key={i} x={x} y={160 - bar.h} width="22" height={bar.h} rx="8"
              fill={isLast ? "url(#blueGrad)" : "url(#gelGrad)"}
              stroke={isLast ? "none" : "#e2e8f0"} strokeWidth="1.5"
              filter={isLast ? "url(#candyShadow)" : "url(#heavyShadow)"}
              style={{
                transformOrigin: `0px 160px`,
                animation: `growBarAnim 0.8s cubic-bezier(0.34,1.56,0.64,1) ${bar.delay}s backwards`
              }}
            />
          );
        })}
        <rect x={171} y={160 - 139 + 2} width="20" height="30" rx="7" fill="url(#glossReflect)" 
              style={{
                transformOrigin: `0px 160px`,
                animation: `growBarAnim 0.8s cubic-bezier(0.34,1.56,0.64,1) 0.4s backwards`
              }} 
        />
      </svg>
    </div>
  );
}

function ClockIllustration({ isHovered }: { isHovered?: boolean }) {
  const [mounted, setMounted] = useState(false);
  const [angle, setAngle] = useState(-40);
  const dir = useRef(1);
  useEffect(() => { setMounted(true); const id = setInterval(() => { setAngle(p => { if (p >= 40) dir.current = -1; if (p <= -40) dir.current = 1; return p + dir.current * 0.7; }); }, 28); return () => clearInterval(id); }, []);
  if (!mounted) return <div style={cs.illusWrap} />;
  const nx = 110 + Math.sin(angle * Math.PI / 180) * 50, ny = 90 - Math.cos(angle * Math.PI / 180) * 50;
  const snx = 110 + Math.sin(angle * 3 * Math.PI / 180) * 10, sny = 122 - Math.cos(angle * 3 * Math.PI / 180) * 10;
  return (
    <div style={cs.illusWrap}>
      <svg viewBox="0 0 220 190" width="100%" height="100%">
        <circle cx="110" cy="90" r="78" fill="#e0e3e9" filter="url(#heavyShadow)" />
        <circle cx="110" cy="90" r="76" fill="url(#gelGrad)" stroke="#ffffff" strokeWidth="1" />
        <clipPath id="cClip"><circle cx="110" cy="90" r="74" /></clipPath>
        <ellipse cx="110" cy="62" rx="62" ry="38" fill="url(#glossReflect)" clipPath="url(#cClip)" />
        <circle cx="110" cy="90" r="72" fill="none" stroke="white" strokeWidth="2.5" opacity="0.45" />
        <circle cx="110" cy="90" r="74.5" fill="none" stroke="#cdd0d7" strokeWidth="0.8" />
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i * 30 - 90) * Math.PI / 180; const m = i % 3 === 0; return (
            <line key={i} x1={110 + Math.cos(a) * (m ? 56 : 60)} y1={90 + Math.sin(a) * (m ? 56 : 60)} x2={110 + Math.cos(a) * 67} y2={90 + Math.sin(a) * 67} stroke={m ? "#4b5563" : "#9ca3af"} strokeWidth={m ? "2.8" : "1.3"} strokeLinecap="round" />
          );
        })}
        <text x="110" y="37" textAnchor="middle" fontSize="10" fill="#9ca3af" fontWeight="600">12</text>
        <text x="170" y="93" textAnchor="middle" fontSize="10" fill="#9ca3af" fontWeight="600">3</text>
        <text x="110" y="151" textAnchor="middle" fontSize="10" fill="#9ca3af" fontWeight="600">6</text>
        <text x="50" y="93" textAnchor="middle" fontSize="10" fill="#9ca3af" fontWeight="600">9</text>
        <line x1="112" y1="92" x2={nx + 2} y2={ny + 2} stroke="rgba(0,0,0,0.12)" strokeWidth="4" strokeLinecap="round" />
        <line x1="110" y1="90" x2={nx} y2={ny} stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
        <circle cx="110" cy="90" r="9" fill="url(#blueGrad)" filter="url(#candyShadow)" />
        <circle cx="110" cy="90" r="6" fill="#1d4ed8" />
        <ellipse cx="108" cy="87" rx="3.5" ry="2" fill="white" opacity="0.3" />
        <circle cx="110" cy="122" r="15" fill="rgba(241,245,249,0.6)" stroke="#cbd5e1" strokeWidth="1.2" />
        <line x1="110" y1="122" x2={snx} y2={sny} stroke="#4b5563" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="110" cy="122" r="3" fill="#94a3b8" />
      </svg>
    </div>
  );
}

function PricingIllustration({ isHovered }: { isHovered?: boolean }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return <div style={cs.illusWrap} />;

  return (
    <div style={cs.illusWrap}>
      <svg viewBox="0 0 220 190" width="100%" height="100%">
        <defs>
          <clipPath id="panelClip"><rect x="40" y="30" width="140" height="130" rx="16" /></clipPath>
          <linearGradient id="scanGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0)" />
            <stop offset="50%" stopColor="rgba(59, 130, 246, 0.25)" />
            <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
          </linearGradient>
        </defs>

        <rect x="40" y="30" width="140" height="130" rx="16" fill="url(#gelGrad)" stroke="#e2e8f0" strokeWidth="1.5" filter="url(#heavyShadow)" />
        <rect x="41" y="31" width="138" height="35" rx="15" fill="url(#glossReflect)" />
        
        <g strokeLinecap="round">
          <line x1="60" y1="55" x2="120" y2="55" stroke="#94a3b8" strokeWidth="6" opacity="0.8" />
          <line x1="60" y1="75" x2="145" y2="75" stroke="#cbd5e1" strokeWidth="6" opacity="0.6" />
          <line x1="60" y1="95" x2="135" y2="95" stroke="#cbd5e1" strokeWidth="6" opacity="0.6" />
          <line x1="60" y1="115" x2="100" y2="115" stroke="#cbd5e1" strokeWidth="6" opacity="0.6" />
          <line x1="60" y1="135" x2="150" y2="135" stroke="#cbd5e1" strokeWidth="6" opacity="0.6" />
        </g>

        <circle cx="155" cy="55" r="8" fill="url(#blueGrad)" opacity="0.85" filter="url(#candyShadow)" />
        <circle cx="138" cy="55" r="8" fill="#e2e8f0" opacity="0.8" />

        <g style={{ animation: `scanAnimGrp ${isHovered ? '1.2s' : '3.5s'} ease-in-out infinite alternate` }} clipPath="url(#panelClip)">
          <rect x="-40" y="30" width="80" height="130" fill="url(#scanGrad)" />
          <line x1="0" y1="30" x2="0" y2="160" stroke="#3b82f6" strokeWidth="1.5" opacity="0.8" filter="url(#candyShadow)" />
        </g>
      </svg>
    </div>
  );
}

function PuzzleIllustration({ isHovered }: { isHovered?: boolean }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return <div style={cs.illusWrap} />;

  const nodes = [
    { x: 50, y: 45, r: 8 },
    { x: 170, y: 40, r: 6 },
    { x: 175, y: 145, r: 9 },
    { x: 45, y: 140, r: 7 },
    { x: 110, y: 30, r: 5 }
  ];
  const cx = 110, cy = 95;

  return (
    <div style={cs.illusWrap}>
      <svg viewBox="0 0 220 190" width="100%" height="100%">
        <circle cx={cx} cy={cy} r="35" fill="url(#blueGrad)" opacity="0.1" 
          style={{ transformOrigin: `${cx}px ${cy}px`, animation: `pulseGlow ${isHovered ? '0.8s' : '2s'} ease-in-out infinite alternate` }} />
        
        {nodes.map((n, i) => (
          <line key={'l'+i} x1={n.x} y1={n.y} x2={cx} y2={cy} stroke="#cbd5e1" strokeWidth="1.5" opacity="0.4" />
        ))}

        {nodes.map((n, i) => (
          <line key={'al'+i} x1={n.x} y1={n.y} x2={cx} y2={cy} stroke="#3b82f6" strokeWidth="2" strokeDasharray="6 8" 
            style={{ animation: `flowLines ${isHovered ? '0.5s' : '1.5s'} linear infinite` }} />
        ))}

        {nodes.map((n, i) => (
          <g key={'n'+i}>
            <circle cx={n.x} cy={n.y} r={n.r} fill="url(#gelGrad)" stroke="#94a3b8" strokeWidth="1.5" filter="url(#candyShadow)" />
            <circle cx={n.x} cy={n.y} r={n.r * 0.4} fill="#cbd5e1" />
          </g>
        ))}

        <circle cx={cx} cy={cy} r="18" fill="url(#gelGrad)" stroke="#cbd5e1" strokeWidth="2" filter="url(#heavyShadow)" />
        <circle cx={cx} cy={cy} r="10" fill="url(#blueGrad)" filter="url(#candyShadow)" 
          style={{ transformOrigin: `${cx}px ${cy}px`, animation: `pulseCore ${isHovered ? '0.8s' : '2s'} ease-in-out infinite alternate` }} />
        <ellipse cx={cx - 2} cy={cy - 3} rx="4" ry="2" fill="white" opacity="0.4" />
      </svg>
    </div>
  );
}

function OrbitIllustration({ isHovered }: { isHovered?: boolean }) {
  const [mounted, setMounted] = useState(false);
  const [rot, setRot] = useState(0);
  useEffect(() => { setMounted(true); const id = setInterval(() => setRot(p => p + 0.6), 28); return () => clearInterval(id); }, []);
  if (!mounted) return <div style={cs.illusWrap} />;
  const avatars = [{ offset: 0, size: 36, fill: "url(#darkGrad)" }, { offset: 120, size: 31, fill: "url(#blueGrad)" }, { offset: 240, size: 26, fill: "#8393a7" }];
  return (
    <div style={cs.illusWrap}>
      <svg viewBox="0 0 220 190" width="100%" height="100%">
        <ellipse cx="110" cy="92" rx="86" ry="65" fill="none" stroke="#dfe2e8" strokeWidth="1.8" strokeDasharray="5 3" />
        <circle cx="110" cy="92" r="34" fill="#e0e3e9" filter="url(#heavyShadow)" />
        <circle cx="110" cy="92" r="32" fill="url(#gelGrad)" />
        <clipPath id="hClip"><circle cx="110" cy="92" r="30" /></clipPath>
        <ellipse cx="110" cy="78" rx="24" ry="16" fill="url(#glossReflect)" clipPath="url(#hClip)" />
        <circle cx="110" cy="92" r="29" fill="none" stroke="white" strokeWidth="1.5" opacity="0.4" />
        <path d="M102 86 L110 77 L118 86" fill="none" stroke="#1e293b" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M102 99 L110 90 L118 99" fill="none" stroke="#1e293b" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
        {avatars.map((av, i) => {
          const a = ((rot + av.offset) * Math.PI) / 180; const x = 110 + Math.cos(a) * 86; const y = 92 + Math.sin(a) * 65; const sz = av.size; const h = sz / 2; return (
            <g key={i} filter="url(#candyShadow)">
              <rect x={x - h} y={y - h} width={sz} height={sz} rx="10" fill={av.fill} />
              <rect x={x - h + 2} y={y - h + 2} width={sz - 4} height={sz * 0.35} rx="8" fill="white" opacity="0.22" />
              <circle cx={x} cy={y - sz * 0.07} r={sz * 0.18} fill="rgba(255,255,255,0.9)" />
              <ellipse cx={x} cy={y + sz * 0.22} rx={sz * 0.24} ry={sz * 0.13} fill="rgba(255,255,255,0.9)" />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function TalentIllustration({ isHovered }: { isHovered?: boolean }) {
  const [mounted, setMounted] = useState(false);
  const [t, setT] = useState(0);
  useEffect(() => { setMounted(true); const id = setInterval(() => setT(p => (p + 1) % 360), 28); return () => clearInterval(id); }, []);
  if (!mounted) return <div style={cs.illusWrap} />;
  const pulse = Math.sin(t * Math.PI / 180), dash = 200 + pulse * 40, nodeR = 10 + pulse * 3;
  return (
    <div style={cs.illusWrap}>
      <svg viewBox="0 0 220 190" width="100%" height="100%">
        <g filter="url(#heavyShadow)">
          <rect x="18" y="40" width="68" height="90" rx="18" fill="url(#gelGrad)" stroke="#e2e8f0" strokeWidth="1" />
          <rect x="19" y="41" width="66" height="28" rx="17" fill="url(#glossReflect)" />
          <circle cx="52" cy="72" r="15" fill="url(#darkGrad)" filter="url(#candyShadow)" />
          <ellipse cx="50" cy="68" rx="6" ry="4" fill="white" opacity="0.18" />
          <circle cx="52" cy="69" r="5.5" fill="rgba(255,255,255,0.85)" />
          <ellipse cx="52" cy="82" rx="7.5" ry="4.5" fill="rgba(255,255,255,0.85)" />
          <rect x="33" y="96" width="38" height="5.5" rx="2.75" fill="#e2e8f0" />
        </g>
        <g filter="url(#heavyShadow)">
          <rect x="134" y="40" width="68" height="90" rx="18" fill="url(#gelGrad)" stroke="#e2e8f0" strokeWidth="1" />
          <rect x="135" y="41" width="66" height="28" rx="17" fill="url(#glossReflect)" />
          <circle cx="168" cy="72" r="15" fill="url(#blueGrad)" filter="url(#candyShadow)" />
          <ellipse cx="166" cy="68" rx="6" ry="4" fill="white" opacity="0.18" />
          <circle cx="168" cy="69" r="5.5" fill="rgba(255,255,255,0.85)" />
          <ellipse cx="168" cy="82" rx="7.5" ry="4.5" fill="rgba(255,255,255,0.85)" />
          <rect x="149" y="96" width="38" height="5.5" rx="2.75" fill="#e2e8f0" />
        </g>
        <path d="M86 82 Q 110 52 134 82" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="5" strokeLinecap="round" />
        <path d="M86 82 Q 110 52 134 82" fill="none" stroke="#1e293b" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="6 4" strokeDashoffset={dash} />
        <circle cx="110" cy="64" r={nodeR + 6} fill="rgba(30,41,59,0.05)" />
        <circle cx="110" cy="64" r={nodeR} fill="url(#gelGrad)" stroke="#d1d5db" strokeWidth="1" filter="url(#candyShadow)" />
        <ellipse cx="108" cy="60" rx={nodeR * 0.5} ry={nodeR * 0.3} fill="white" opacity="0.25" />
        <circle cx="110" cy="64" r="5" fill="#1e293b" />
        <circle cx="110" cy="64" r={20 + pulse * 8} fill="none" stroke="#cbd5e1" strokeWidth="1.2" opacity={0.5 - pulse * 0.25} />
        <circle cx="110" cy="64" r={32 + pulse * 10} fill="none" stroke="#e2e8f0" strokeWidth="0.8" opacity={0.35 - pulse * 0.2} />
        <circle cx="110" cy="155" r="6" fill="#dcfce7" stroke="#86efac" strokeWidth="1" filter="url(#softShadow)" />
        <circle cx="110" cy="155" r="3.5" fill="#22c55e" />
        <text x="110" y="171" textAnchor="middle" fontSize="8" fill="#64748b" fontWeight="600" letterSpacing="0.5">CONNECTED</text>
      </svg>
    </div>
  );
}

const marqueeItems = [
  { e: "💡", l: "AI Insights" }, { e: "⚙️", l: "Automation" }, { e: "📊", l: "Data-Driven Decisions" }, { e: "🚀", l: "Faster Innovation" },
  { e: "🤖", l: "Virtual Assistance" }, { e: "📈", l: "Scalable Solutions" }, { e: "🎯", l: "Personalized Experiences" }, { e: "🔒", l: "Enterprise Security" },
];

function Marquee() {
  const items = [...marqueeItems, ...marqueeItems, ...marqueeItems];
  return (
    <div style={cs.mqOuter}>
      <div style={cs.fadeL} /><div style={cs.fadeR} />
      <div style={cs.mqTrack}>
        {items.map((it, i) => (
          <div key={i} style={cs.mqChip}>
            <div style={cs.mqChipShine} />
            <span style={{ fontSize: "14px", position: "relative", zIndex: 1 }}>{it.e}</span>
            <span style={cs.mqLabel}>{it.l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const features = [
  { Illus: TargetIllustration, title: "Impact-Driven Solutions", desc: "Every product we build is custom-crafted to create real business impact. We don't ship templates — we ship results." },
  { Illus: ClockIllustration, title: "Fast & Reliable Delivery", desc: "High-quality results in days or weeks, not months. Speed without compromising quality." },
  { Illus: PricingIllustration, title: "Transparent Pricing", desc: "Honest, customized pricing with no hidden fees or surprises. You always know what you're paying for." },
  { Illus: PuzzleIllustration, title: "Expert Problem Solvers", desc: "We tackle technical and creative challenges with innovative solutions that move your business forward." },
  { Illus: OrbitIllustration, title: "Seamless Collaboration", desc: "Clear communication and feedback at every stage of the project. You're never left in the dark." },
  { Illus: TalentIllustration, title: "Direct Access to Talent", desc: "Work directly with senior experts — no middlemen, no long-term hiring needed." },
];

const cardShadow = "0 8px 16px rgba(15,23,42,0.03), inset 0 1px 0 rgba(255,255,255,0.8)";
const cardHoverShadow = "0 12px 24px rgba(15,23,42,0.08), 0 24px 48px rgba(15,23,42,0.04), inset 0 1px 0 rgba(255,255,255,1)";

export default function WhyChooseUs() {
  const [hovered, setHovered] = useState(-1);
  return (
    <>
      <style>{`
        @keyframes mqSlide{0%{transform:translateX(0)}100%{transform:translateX(-33.333%)}}
        @keyframes jellyIn{
          0%{opacity:0;transform:translateY(40px) scale(0.9)}
          50%{opacity:1;transform:translateY(-2px) scale(1.02)}
          100%{transform:translateY(0) scale(1)}
        }
        @keyframes growBarAnim {
          0% { transform: scaleY(0); }
          50% { transform: scaleY(1.05); }
          100% { transform: scaleY(1); }
        }
        @keyframes scanAnimGrp {
          0% { transform: translateX(30px); }
          100% { transform: translateX(190px); }
        }
        @keyframes flowLines {
          from { stroke-dashoffset: 14; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes pulseCore {
          0% { transform: scale(0.95); opacity: 0.8; }
          100% { transform: scale(1.15); opacity: 1; }
        }
        @keyframes pulseGlow {
          0% { transform: scale(0.8); opacity: 0.1; }
          100% { transform: scale(1.3); opacity: 0.25; }
        }
      `}</style>
      <SharedFilters />
      <section style={cs.section} id="why-choose-us">
        <div style={cs.inner}>
          <div style={cs.badge}>
            <span style={{ fontSize: "11px", position: "relative", zIndex: 1 }}>⭐</span>
            <span style={cs.badgeText}>BENEFITS</span>
          </div>
          <h2 style={cs.heading}>Why Choose Us</h2>
          <p style={cs.sub}>Partner with an AI agency delivering smart solutions.</p>
          <div style={cs.grid}>
            {features.map((f, i) => {
              const Illus = f.Illus; const isHov = hovered === i;
              return (
                <div key={i} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(-1)}
                  style={{
                    ...cs.card,
                    animation: `jellyIn 0.8s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.08}s both`,
                    transform: isHov ? "translateY(-4px) scale(1.01)" : "translateY(0) scale(1)",
                    boxShadow: isHov ? cardHoverShadow : cardShadow,
                    borderColor: isHov ? "rgba(255,255,255,1)" : "rgba(241,245,249,0.8)",
                  }}>
                  <div style={cs.cardGelShine} />
                  <Illus isHovered={isHov} />
                  <h3 style={cs.cardTitle}>{f.title}</h3>
                  <p style={cs.cardDesc}>{f.desc}</p>
                </div>
              );
            })}
          </div>
          <Marquee />
        </div>
      </section>
    </>
  );
}

const cs: Record<string, React.CSSProperties> = {
  section: { position: "relative", background: "linear-gradient(180deg, #f8fafc 0%, #ffffff 50%, #f1f5f9 100%)", padding: "40px 16px 20px", display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", overflow: "hidden", fontFamily: "'DM Sans', sans-serif" },
  inner: { position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", width: "100%", maxWidth: "880px" },
  badge: { display: "inline-flex", alignItems: "center", gap: "6px", background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "999px", padding: "6px 16px", marginBottom: "16px", boxShadow: "0 2px 8px rgba(15,23,42,0.03)", position: "relative" },
  badgeText: { fontSize: "10px", fontWeight: 700, color: "#3b82f6", letterSpacing: "1px", position: "relative", zIndex: 1 },
  heading: { fontFamily: "'DM Serif Display',serif", fontSize: "clamp(28px,4vw,44px)", fontWeight: 400, color: "#0f172a", margin: "0 0 8px", textAlign: "center", lineHeight: 1.1, letterSpacing: "-0.02em" },
  sub: { fontSize: "14px", color: "#64748b", margin: "0 0 24px", textAlign: "center", fontWeight: 400 },
  grid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px", width: "100%", marginBottom: "28px" },

  card: { background: "linear-gradient(160deg, #ffffff 0%, #f8fafc 100%)", borderRadius: "20px", padding: "12px 12px 16px", border: "1px solid #f1f5f9", display: "flex", flexDirection: "column", gap: "8px", cursor: "default", position: "relative", transition: "transform 0.4s cubic-bezier(0.2,0.8,0.2,1), box-shadow 0.4s ease, border-color 0.4s ease", overflow: "hidden" },
  cardGelShine: { position: "absolute", top: 0, left: 0, right: 0, height: "45%", background: "linear-gradient(180deg, rgba(255,255,255,0.8) 0%, transparent 100%)", pointerEvents: "none", zIndex: 5 },

  illusWrap: { width: "100%", height: "135px", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", position: "relative", zIndex: 2, background: "linear-gradient(145deg, #f1f5f9, #ffffff)", boxShadow: "inset 0 2px 6px rgba(15,23,42,0.02), inset 0 0 0 1px rgba(255,255,255,0.5)" },
  cardTitle: { fontSize: "14px", fontWeight: 600, color: "#0f172a", margin: 0, lineHeight: 1.3, position: "relative", zIndex: 6 },
  cardDesc: { fontSize: "12px", color: "#64748b", margin: 0, lineHeight: 1.5, position: "relative", zIndex: 6 },

  mqOuter: { position: "relative", width: "100%", overflow: "hidden", height: "46px" },
  fadeL: { position: "absolute", left: 0, top: 0, bottom: 0, width: "60px", background: "linear-gradient(to right, #f8fafc, transparent)", zIndex: 2, pointerEvents: "none" },
  fadeR: { position: "absolute", right: 0, top: 0, bottom: 0, width: "60px", background: "linear-gradient(to left, #f8fafc, transparent)", zIndex: 2, pointerEvents: "none" },
  mqTrack: { display: "flex", gap: "10px", animation: "mqSlide 35s linear infinite", width: "fit-content" },
  mqChip: { display: "flex", alignItems: "center", gap: "6px", background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "8px 14px", whiteSpace: "nowrap", boxShadow: "0 2px 4px rgba(15,23,42,0.02)", flexShrink: 0, position: "relative", overflow: "hidden" },
  mqLabel: { fontSize: "12px", fontWeight: 500, color: "#334155", position: "relative", zIndex: 1 },
};