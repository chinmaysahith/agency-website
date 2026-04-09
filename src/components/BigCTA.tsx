"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  "Web Development",
  "App Development",
  "UI/UX Design",
  "AI Applications",
  "Digital Marketing & SEO",
  "Brand Strategy",
  "Cloud & DevOps",
  "Logo Designing",
  "Prototyping & MVPs",
  "API Integrations",
];

const items = [...skills, ...skills, ...skills];

export default function CTA() {
  const marqueeARef = useRef<HTMLDivElement>(null);
  const marqueeBRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    [marqueeARef.current, marqueeBRef.current].forEach((el) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { xPercent: -66.666 },
        {
          xPercent: -33.333,
          duration: 40,
          ease: "none",
          repeat: -1,
        }
      );
    });

    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 85%",
        },
      }
    );

    gsap.fromTo(
      btnRef.current,
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        delay: 0.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: btnRef.current,
          start: "top 90%",
        },
      }
    );
  }, []);

  // Tunnel dimensions
  const W = 280;   // total width
  const H = 80;    // total height
  const bow = 22;  // how much sides bow outward

  return (
    <section className="py-10 sm:py-16 px-4 sm:px-6">
      <div
        className="max-w-7xl mx-auto rounded-2xl sm:rounded-3xl overflow-hidden"
        style={{ background: "#080808" }}
      >

        {/* Top CTA */}
        <div className="flex flex-col items-center justify-center py-16 sm:py-24 px-5 sm:px-8 text-center">
          <h2
            ref={headingRef}
            className="text-3xl md:text-5xl font-bold max-w-3xl leading-tight mb-12 opacity-0"
            style={{ color: "#F1F5F9" }}
          >
            You've reached the end —{" "}
            <span style={{ color: "#94A3B8" }}>
              now let's start something new!
            </span>
          </h2>

          <Link href="/contact">
        <button
            ref={btnRef}
            className="heartbeat opacity-0 flex items-center gap-2 px-10 py-4 rounded-full font-semibold text-sm cursor-pointer"
            style={{ background: "#FFFFFF", color: "#080808" }}
            onMouseEnter={(e) =>
            gsap.to(e.currentTarget, { scale: 1.06, duration: 0.3, ease: "power2.out" })
            }
            onMouseLeave={(e) =>
            gsap.to(e.currentTarget, { scale: 1, duration: 0.3, ease: "power2.out" })
            }
        >
            <Sparkles size={15} />
            Let's Connect
        </button>
        </Link>
        </div>

        {/* MARQUEE STRIP */}
        <div
          style={{
            background: "#0D0D0D",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <p
            className="text-center text-sm pt-8 pb-6 font-medium"
            style={{ color: "#475569" }}
          >
            Trust us, we are good at this :)
          </p>

          {/* Track */}
          <div
            className="relative overflow-hidden pb-10"
            style={{ height: `${H + 10}px` }}
          >

            {/* LEFT HALF — hollow */}
            <div
              className="absolute inset-0"
              style={{ clipPath: "inset(0 50% 0 0)", zIndex: 1 }}
            >
              <div
                ref={marqueeARef}
                className="flex gap-4 w-max absolute top-0 left-0 items-center h-full"
              >
                {items.map((skill, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full flex-shrink-0 text-sm font-medium"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "#64748B",
                    }}
                  >
                    <div
                      className="w-3 h-3 rounded-full border flex-shrink-0"
                      style={{ borderColor: "#334155" }}
                    />
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT HALF — checked */}
            <div
              className="absolute inset-0"
              style={{ clipPath: "inset(0 0 0 50%)", zIndex: 1 }}
            >
              <div
                ref={marqueeBRef}
                className="flex gap-4 w-max absolute top-0 left-0 items-center h-full"
              >
                {items.map((skill, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full flex-shrink-0 text-sm font-medium"
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      color: "#ffffff",
                    }}
                  >
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      className="flex-shrink-0"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            {/* ── BARREL TUNNEL — single SVG path ── */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ zIndex: 20 }}
            >
              <svg
                width={W + bow * 2}
                height={H}
                viewBox={`0 0 ${W + bow * 2} ${H}`}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Background fill — matches strip so tags hide behind it */}
                <path
                  d={`
                    M ${bow} 0
                    L ${W + bow} 0
                    Q ${W + bow * 2} ${H / 2} ${W + bow} ${H}
                    L ${bow} ${H}
                    Q 0 ${H / 2} ${bow} 0
                    Z
                  `}
                  fill="#0D0D0D"
                />

                {/* Barrel outline stroke — the actual visible shape */}
                <path
                  d={`
                    M ${bow} 2
                    L ${W + bow} 2
                    Q ${W + bow * 2 - 2} ${H / 2} ${W + bow} ${H - 2}
                    L ${bow} ${H - 2}
                    Q 2 ${H / 2} ${bow} 2
                    Z
                  `}
                  stroke="rgba(255, 255, 255, 0.3)"
                  strokeWidth="1"
                  fill="none"
                />

                {/* APSLOCK text centered */}
                <text
                  x="50%"
                  y="42%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#F8FAFC"
                  fontSize="13"
                  fontWeight="700"
                  letterSpacing="4"
                  fontFamily="inherit"
                >
                  APSLOCK
                </text>

                {/* Subtitle */}
                <text
                  x="50%"
                  y="70%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="rgba(255,255,255,0.25)"
                  fontSize="7"
                  fontWeight="500"
                  letterSpacing="3"
                  fontFamily="inherit"
                >
                  DIGITAL AGENCY
                </text>
              </svg>
            </div>

            {/* Edge fades */}
            <div
              className="absolute inset-y-0 left-0 w-40 pointer-events-none"
              style={{
                background: "linear-gradient(to right, #0D0D0D, transparent)",
                zIndex: 5,
              }}
            />
            <div
              className="absolute inset-y-0 right-0 w-40 pointer-events-none"
              style={{
                background: "linear-gradient(to left, #0D0D0D, transparent)",
                zIndex: 5,
              }}
            />

          </div>
        </div>

      </div>
    </section>
  );
}
