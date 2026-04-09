"use client";

const brands = [
  "Framer", "Linear", "Vercel", "Supabase", "Adobe", "Stripe", "Figma", "Notion",
];

export default function BrandStrip() {
  return (
    <section className="relative bg-white overflow-hidden border-y border-gray-100 py-10">

      {/* APSLOCK watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        style={{
          fontSize: "clamp(5rem, 14vw, 13rem)",
          fontWeight: 900,
          letterSpacing: "-0.04em",
          whiteSpace: "nowrap",
          background: "linear-gradient(to bottom, rgba(148,163,184,0.22) 0%, rgba(148,163,184,0.08) 60%, transparent 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        APSLOCK
      </div>

      {/* Infinite marquee */}
      <div className="relative overflow-hidden z-10">
        <div className="marquee-track flex w-max items-center">
          {[...brands, ...brands].map((brand, i) => (
            <span
              key={i}
              className="flex items-center text-[13px] font-semibold text-gray-400 tracking-wide px-8 select-none whitespace-nowrap"
            >
              {brand}
              <span className="ml-8 w-1 h-1 rounded-full bg-gray-300 inline-block" />
            </span>
          ))}
        </div>

        {/* Fade edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
      </div>

      <style jsx>{`
        .marquee-track {
          animation: marquee 20s linear infinite;
        }
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

    </section>
  );
}
