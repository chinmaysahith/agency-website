"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const brands = [
  "Framer",
  "Linear",
  "Vercel",
  "Supabase",
  "Adobe",
  "Facebook",
  "Stripe",
];

export default function BrandStrip() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const width = track.scrollWidth / 3;

    gsap.fromTo(
      track,
      { x: 0 },
      {
        x: -width,
        duration: 30,
        ease: "none",
        repeat: -1,
      }
    );
  }, []);

  return (
    <section className="relative py-28 bg-[#fafafa] overflow-hidden">

      {/* BIG BACKGROUND APSLOCK TEXT */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        style={{
          fontSize: "clamp(7rem,16vw,16rem)",
          fontWeight: 900,
          letterSpacing: "-0.05em",
          background:
            "linear-gradient(to bottom, rgba(90,110,160,0.18), rgba(90,110,160,0.08), rgba(90,110,160,0.03), transparent)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          whiteSpace: "nowrap",
        }}
      >
        APSLOCK
      </div>

      {/* SCROLL STRIP */}
      <div className="relative z-10 bg-[#fafafa] py-4 overflow-hidden">

        <div
          ref={trackRef}
          className="flex w-max gap-16 text-gray-400 text-base font-semibold"
          style={{ willChange: "transform" }}
        >
          {[...brands, ...brands, ...brands].map((brand, i) => (
            <span key={i}>{brand}</span>
          ))}
        </div>

      </div>

      {/* LEFT FADE EDGE */}
      <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-[#fafafa] to-transparent pointer-events-none" />

      {/* RIGHT FADE EDGE */}
      <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-[#fafafa] to-transparent pointer-events-none" />

    </section>
  );
}