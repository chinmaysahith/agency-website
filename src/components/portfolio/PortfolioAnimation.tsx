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

  /* ── Vortex canvas renderer ── */
  useEffect(() => {
    if (isMobile) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let dpr = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const RINGS = 28;          // number of concentric ellipses
    const SPOKES = 48;         // radial lines per ring
    const MAX_RX = 680;        // outer ellipse X radius
    const MAX_RY = 220;        // outer ellipse Y radius (perspective squish)
    const MIN_R = 4;           // innermost radius
    const DEPTH_CURVE = 2.2;   // how aggressively rings compress toward center

    const draw = () => {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);

      const progress = progressRef.current; // 0 → 1
      const cx = W / 2;
      const cy = H * 0.55; // slightly below center

      // How many rings to reveal based on scroll progress
      const revealedRings = Math.floor(progress * RINGS * 1.5);

      for (let r = 0; r < RINGS; r++) {
        if (r > revealedRings) break;

        // Non-linear spacing: rings bunch up toward center
        const t = r / (RINGS - 1);      // 0 (outer) → 1 (inner)
        const curve = Math.pow(t, DEPTH_CURVE);
        const rx = MAX_RX * (1 - curve) + MIN_R * curve;
        const ry = MAX_RY * (1 - curve) + MIN_R * curve;

        // Fade: outer rings are lighter, inner rings are darker
        const ringAlpha = 0.06 + 0.18 * t;
        const lineWidth = 0.5 + 0.5 * t;

        // Ring opacity based on reveal progress (fade in)
        const ringRevealT = Math.min(1, (revealedRings - r) / 3);
        const alpha = ringAlpha * ringRevealT;
        if (alpha <= 0) continue;

        ctx.strokeStyle = `rgba(0,0,0,${alpha})`;
        ctx.lineWidth = lineWidth;

        // Draw the ellipse ring
        ctx.beginPath();
        ctx.ellipse(cx, cy, Math.max(1, rx), Math.max(1, ry), 0, 0, Math.PI * 2);
        ctx.stroke();

        // Draw spoke lines connecting this ring to the next inner ring
        if (r < RINGS - 1 && r + 1 <= revealedRings) {
          const t2 = (r + 1) / (RINGS - 1);
          const curve2 = Math.pow(t2, DEPTH_CURVE);
          const rx2 = MAX_RX * (1 - curve2) + MIN_R * curve2;
          const ry2 = MAX_RY * (1 - curve2) + MIN_R * curve2;

          const spokeAlpha = (0.03 + 0.1 * t) * ringRevealT;
          ctx.strokeStyle = `rgba(0,0,0,${spokeAlpha})`;
          ctx.lineWidth = 0.4 + 0.3 * t;

          for (let s = 0; s < SPOKES; s++) {
            const angle = (s / SPOKES) * Math.PI * 2;
            const x1 = cx + rx * Math.cos(angle);
            const y1 = cy + ry * Math.sin(angle);
            const x2 = cx + rx2 * Math.cos(angle);
            const y2 = cy + ry2 * Math.sin(angle);

            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
          }
        }
      }

      // Dark center point
      if (progress > 0.3) {
        const dotAlpha = Math.min(0.4, (progress - 0.3) * 0.6);
        ctx.beginPath();
        ctx.arc(cx, cy, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,0,0,${dotAlpha})`;
        ctx.fill();
      }

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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div ref={wrapperRef} className="relative" style={sectionStyle}>
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">

        {/* Wireframe vortex canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 0 }}
        />

        {/* Heading */}
        {title && (
          <div className="absolute top-16 w-full text-center z-10">
            <h2 className="text-3xl font-bold mb-3">{title}</h2>
            {subtitle && <p className="text-gray-500 text-sm">{subtitle}</p>}
          </div>
        )}

        {/* Cards */}
        <div className="relative w-full max-w-6xl h-[380px]" style={{ zIndex: 5 }}>
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
