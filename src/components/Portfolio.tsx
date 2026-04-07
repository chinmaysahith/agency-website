"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Startup Website",
    description: "Modern marketing website built with Next.js.",
    tech: ["Next.js", "Tailwind", "Vercel"],
  },
  {
    title: "AI SaaS Platform",
    description: "AI powered SaaS dashboard and application.",
    tech: ["Next.js", "AI", "Stripe"],
  },
  {
    title: "E-commerce Store",
    description: "High conversion online store with optimized checkout.",
    tech: ["Shopify", "React", "Node"],
  },
  {
    title: "Brand Identity",
    description: "Complete branding system and visual identity.",
    tech: ["Branding", "Design", "Strategy"],
  },
];

export default function Portfolio() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".project-card");

      const gap = 300;

      // Initial positions
      cards.forEach((card, i) => {
        gsap.set(card, {
          x: window.innerWidth + i * gap,
          opacity: 0,
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: () => `+=${window.innerHeight * cards.length}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      cards.forEach((card, i) => {
        tl.to(
          card,
          {
            x: i * gap,
            opacity: 1,
            ease: "power2.out",
            duration: 1,
          },
          i
        );
      });
    }, wrapper);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={wrapperRef}
      className="relative"
      style={{
        background: "#fafafa",
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg stroke='%23e5e7eb' stroke-width='1' stroke-dasharray='4 4' fill='none'%3E%3Cpath d='M40 0H0V40'/%3E%3C/g%3E%3C/svg%3E\")",
        backgroundSize: "40px 40px",
      }}
    >

      {/* Heading */}
      <div className="absolute top-16 w-full text-center z-10">
        <h2 className="text-3xl font-bold mb-3">Our Work</h2>
        <p className="text-gray-500 text-sm">
          A selection of projects we've built.
        </p>
      </div>

      {/* Sticky Area */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">

        <div className="relative w-full max-w-6xl h-[300px]">

          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card absolute top-0 w-[260px] md:w-[280px] bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden"
            >
              <div className="h-40 bg-gray-200" />

              <div className="p-5">
                <h3 className="text-lg font-semibold mb-2 text-gray-900">
                  {project.title}
                </h3>

                <p className="text-gray-600 mb-3 text-sm">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="text-[11px] px-2 py-1 rounded-full bg-gray-100 text-gray-600"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <Link href="#" className="text-xs font-medium text-black">
                  View Case Study →
                </Link>
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}