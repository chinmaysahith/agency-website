"use client";

import { useLayoutEffect, useEffect, useRef, useState, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface PortfolioAnimationProps {
  children: ReactNode[];
  title?: string;
  subtitle?: string;
}

export default function PortfolioAnimation({ children, title, subtitle }: PortfolioAnimationProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* ── Flowing wave lines canvas ── */
  useEffect(() => {
    if (isMobile) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // Define flowing wave curves — each is a unique organic path
    const waves = [
      // { yBase: fraction of height, amplitude, frequency, phase, color, lineWidth }
      { yBase: 0.18, amp: 60,  freq: 0.003,  phase: 0,     color: "rgba(59,130,246,0.07)", lw: 1.5 },
      { yBase: 0.25, amp: 45,  freq: 0.004,  phase: 1.2,   color: "rgba(59,130,246,0.05)", lw: 1.2 },
      { yBase: 0.35, amp: 80,  freq: 0.0025, phase: 2.5,   color: "rgba(59,130,246,0.06)", lw: 1.8 },
      { yBase: 0.72, amp: 55,  freq: 0.0035, phase: 0.8,   color: "rgba(59,130,246,0.07)", lw: 1.5 },
      { yBase: 0.80, amp: 70,  freq: 0.003,  phase: 3.7,   color: "rgba(59,130,246,0.05)", lw: 1.2 },
      { yBase: 0.88, amp: 40,  freq: 0.005,  phase: 5.0,   color: "rgba(59,130,246,0.06)", lw: 1.4 },
      // Thinner accent lines
      { yBase: 0.15, amp: 35,  freq: 0.006,  phase: 4.2,   color: "rgba(148,163,184,0.06)", lw: 0.8 },
      { yBase: 0.45, amp: 90,  freq: 0.002,  phase: 1.8,   color: "rgba(148,163,184,0.04)", lw: 0.7 },
      { yBase: 0.60, amp: 50,  freq: 0.0045, phase: 3.0,   color: "rgba(148,163,184,0.05)", lw: 0.8 },
      { yBase: 0.92, amp: 30,  freq: 0.007,  phase: 2.2,   color: "rgba(148,163,184,0.06)", lw: 0.7 },
    ];

    const draw = () => {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      ctx.clearRect(0, 0, W, H);

      const progress = progressRef.current; // 0 → 1

      waves.forEach((wave) => {
        // How much of this wave to draw (in pixels from left)
        const drawLength = progress * W * 1.3; // slightly overshoot so it fills before scroll ends
        if (drawLength <= 0) return;

        ctx.beginPath();
        ctx.strokeStyle = wave.color;
        ctx.lineWidth = wave.lw;
        ctx.lineCap = "round";

        const baseY = wave.yBase * H;
        let started = false;

        for (let x = 0; x <= Math.min(drawLength, W); x += 2) {
          // Composite sine waves for organic feel
          const y = baseY
            + Math.sin(x * wave.freq + wave.phase) * wave.amp
            + Math.sin(x * wave.freq * 2.3 + wave.phase * 0.7) * (wave.amp * 0.3)
            + Math.sin(x * wave.freq * 0.5 + wave.phase * 1.3) * (wave.amp * 0.5);

          if (!started) {
            ctx.moveTo(x, y);
            started = true;
          } else {
            ctx.lineTo(x, y);
          }
        }

        // Fade out the tail end
        ctx.stroke();
      });

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [isMobile]);

  /* ── GSAP scroll animation ── */
  useLayoutEffect(() => {
    if (isMobile) return;
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".project-card");
      const gap = 300;
      const total = cards.length;

      cards.forEach((card, i) => {
        gsap.set(card, { x: window.innerWidth + i * gap, opacity: 0 });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: () => `+=${window.innerHeight * total}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            progressRef.current = self.progress;
          },
        },
      });

      cards.forEach((card, i) => {
        tl.to(card, { x: i * gap, opacity: 1, ease: "power2.out", duration: 1 }, i);
      });

    }, wrapper);

    return () => ctx.revert();
  }, [isMobile]);

  const sectionStyle = {
    background: "#ffffff",
    backgroundImage:
      "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg stroke='%23e5e7eb' stroke-width='1' stroke-dasharray='4 4' fill='none'%3E%3Cpath d='M40 0H0V40'/%3E%3C/g%3E%3C/svg%3E\")",
    backgroundSize: "40px 40px",
  };

  if (isMobile) {
    return (
      <div style={sectionStyle} className="py-20 px-5">
        {title && (
          <div className="text-center mb-12">
            <h2
              style={{
                fontFamily: "'Clash Display', 'Sora', sans-serif",
                fontSize: "2rem",
                fontWeight: 700,
                color: "#0f172a",
                letterSpacing: "-0.5px",
                marginBottom: 8,
              }}
            >
              {title}
            </h2>
            {subtitle && (
              <p style={{ color: "#94a3b8", fontSize: "0.875rem" }}>{subtitle}</p>
            )}
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div ref={wrapperRef} className="relative" style={sectionStyle}>
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">

        {/* Flowing wave lines canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 1 }}
        />

        {/* Heading */}
        {title && (
          <div className="absolute top-16 w-full text-center z-10">
            <h2
              style={{
                fontFamily: "'Clash Display', 'Sora', sans-serif",
                fontSize: "2.25rem",
                fontWeight: 700,
                color: "#0f172a",
                letterSpacing: "-0.5px",
                marginBottom: 8,
              }}
            >
              {title}
            </h2>
            {subtitle && (
              <p style={{ color: "#94a3b8", fontSize: "0.875rem", fontFamily: "'Sora', sans-serif" }}>
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Cards */}
        <div className="relative w-full max-w-6xl h-[420px]" style={{ zIndex: 5 }}>
          {children.map((child, index) => (
            <div key={index} className="project-card absolute top-0">
              {child}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
