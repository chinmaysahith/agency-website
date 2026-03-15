"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Zap, Shield, Users, Lightbulb, TrendingUp, Headphones } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Lightbulb,
    title: "Impact-Driven Solutions",
    description: "Every product we build is custom-crafted to create real business impact. We don't ship templates — we ship results.",
  },
  {
    icon: Zap,
    title: "Fast & Reliable Delivery",
    description: "High-quality results in days or weeks, not months. Speed without compromising quality.",
  },
  {
    icon: Shield,
    title: "Transparent Pricing",
    description: "Honest, customized pricing with no hidden fees or surprises. You always know what you're paying for.",
  },
  {
    icon: TrendingUp,
    title: "Expert Problem Solvers",
    description: "We tackle technical and creative challenges with innovative solutions that move your business forward.",
  },
  {
    icon: Users,
    title: "Seamless Collaboration",
    description: "Clear communication and feedback at every stage of the project. You're never left in the dark.",
  },
  {
    icon: Headphones,
    title: "Direct Access to Talent",
    description: "Work directly with senior experts — no middlemen, no long-term hiring needed. Just results.",
  },
];

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cursorRef  = useRef<HTMLDivElement>(null);
  const cardRefs   = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const cursor  = cursorRef.current;
    if (!section || !cursor) return;

    // ── Cursor glow follow ──
    const onMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      gsap.to(cursor, {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        duration: 0.5,
        ease: "power3.out",
      });
    };
    const onEnter = () => gsap.to(cursor, { opacity: 1, scale: 1, duration: 0.3 });
    const onLeave = () => gsap.to(cursor, { opacity: 0, scale: 0.5, duration: 0.3 });

    section.addEventListener("mousemove", onMouseMove);
    section.addEventListener("mouseenter", onEnter);
    section.addEventListener("mouseleave", onLeave);

    // ── Card 3D tilt ──
    cardRefs.current.forEach((card) => {
      if (!card) return;
      card.addEventListener("mousemove", (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const cx   = e.clientX - rect.left - rect.width  / 2;
        const cy   = e.clientY - rect.top  - rect.height / 2;
        gsap.to(card, {
          rotateX: (-cy / rect.height) * 10,
          rotateY: ( cx / rect.width)  * 10,
          scale:   1.03,
          duration: 0.3,
          ease:    "power2.out",
          transformPerspective: 800,
        });
      });
      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          rotateX: 0, rotateY: 0, scale: 1,
          duration: 0.5, ease: "power3.out",
        });
      });
    });

    // ── Scroll entrance ──
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 1, ease: "power4.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
        }
      );
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(card,
          { opacity: 0, y: 50 },
          {
            opacity: 1, y: 0, duration: 0.8, delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 90%" },
          }
        );
      });
    }, sectionRef);

    return () => {
      section.removeEventListener("mousemove", onMouseMove);
      section.removeEventListener("mouseenter", onEnter);
      section.removeEventListener("mouseleave", onLeave);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-6 dashed-grid overflow-hidden"
    >
      {/* Cursor glow orb — blurs the GRID behind it, not the cards */}
      <div
        ref={cursorRef}
        className="pointer-events-none absolute"
        style={{
          width:        "600px",
          height:       "600px",
          borderRadius: "50%",
          background:   "radial-gradient(circle, rgba(37,99,235,0.1) 0%, transparent 70%)",
          transform:    "translate(-50%, -50%)",
          opacity:      0,
          zIndex:       0,
          willChange:   "transform",
          
        }}
      />

      <div className="relative max-w-6xl mx-auto" style={{ zIndex: 1 }}>

        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16 opacity-0">
          <div
            className="inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
            style={{
              background: "rgba(37,99,235,0.08)",
              color:      "#2563EB",
              border:     "1px solid rgba(37,99,235,0.15)",
            }}
          >
            Why APSLOCK
          </div>
          <h2 className="text-4xl font-bold mb-4" style={{ color: "#0F172A" }}>
            Why Choose Our Agency?
          </h2>
          <p className="max-w-2xl mx-auto" style={{ color: "#64748B" }}>
            Discover the advantages of partnering with a tech team
            built for results and client success.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                ref={(el) => { cardRefs.current[index] = el; }}
                className="relative rounded-3xl p-8 flex flex-col gap-5 opacity-0"
                style={{
                  // ── Clear white card — no backdrop-filter ──
                  background:  "rgba(255,255,255,0.82)",
                  border:      "1px solid rgba(255,255,255,0.9)",
                  boxShadow:   "0 4px 24px rgba(37,99,235,0.07), inset 0 1px 0 rgba(255,255,255,1)",
                  willChange:  "transform",
                  cursor:      "default",
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Top shine */}
                <div
                  className="absolute inset-0 rounded-3xl pointer-events-none"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.6) 0%, transparent 50%)",
                  }}
                />

                {/* Watermark */}
                <span
                  className="absolute right-5 bottom-4 font-black leading-none select-none pointer-events-none"
                  style={{ fontSize: "5rem", color: "rgba(37,99,235,0.05)" }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{
                    background: "rgba(37,99,235,0.08)",
                    border:     "1px solid rgba(37,99,235,0.12)",
                  }}
                >
                  <Icon size={22} color="#2563EB" />
                </div>

                {/* Text — fully sharp */}
                <div className="flex flex-col gap-2">
                  <h3
                    className="text-lg font-bold leading-snug"
                    style={{ color: "#0F172A" }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "#64748B" }}
                  >
                    {feature.description}
                  </p>
                </div>

                {/* Bottom accent */}
                <div
                  className="h-px w-full rounded-full"
                  style={{
                    background: "linear-gradient(to right, rgba(37,99,235,0.25), transparent)",
                  }}
                />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}