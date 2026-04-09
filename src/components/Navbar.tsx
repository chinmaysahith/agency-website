"use client";

import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Services", href: "/#services" },
  { label: "Our Work", href: "/#work"     },
  { label: "FAQs",     href: "/#faq"      },
  { label: "Contact",  href: "/contact"   },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 sm:px-6">

      <div className="w-full max-w-[1200px] flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="text-base font-bold tracking-tight text-blue-600 select-none"
        >
          APSLOCK
        </Link>

        {/* Center Floating Menu — desktop only */}
        <nav className="hidden md:flex items-center gap-7 rounded-full px-8 py-3 border border-gray-200/60 bg-white/60 backdrop-blur-xl shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
          {navLinks.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors duration-200"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Book a Call — hidden on very small screens */}
          <Link href="/contact" className="hidden sm:block">
            <button className="shimmer-btn">
              Book a Call
              <span className="shimmer-sweep" />
            </button>
          </Link>

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden flex flex-col justify-center items-center gap-[5px] w-10 h-10 rounded-xl border border-gray-200/60 bg-white/60 backdrop-blur-xl"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span
              className="block w-5 h-[2px] bg-slate-700 rounded-full transition-all duration-300 origin-center"
              style={{ transform: menuOpen ? "rotate(45deg) translateY(7px)" : "none" }}
            />
            <span
              className="block w-5 h-[2px] bg-slate-700 rounded-full transition-all duration-300"
              style={{ opacity: menuOpen ? 0 : 1 }}
            />
            <span
              className="block w-5 h-[2px] bg-slate-700 rounded-full transition-all duration-300 origin-center"
              style={{ transform: menuOpen ? "rotate(-45deg) translateY(-7px)" : "none" }}
            />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="absolute top-full left-4 right-4 mt-3 md:hidden">
          <nav className="flex flex-col rounded-2xl border border-gray-200/70 bg-white/95 backdrop-blur-xl shadow-xl overflow-hidden">
            {navLinks.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-gray-50 px-5 py-4 transition-colors duration-200 border-b border-gray-100 last:border-b-0"
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
            <div className="p-4">
              <Link href="/contact" onClick={() => setMenuOpen(false)}>
                <button className="shimmer-btn w-full justify-center">
                  Book a Call
                  <span className="shimmer-sweep" />
                </button>
              </Link>
            </div>
          </nav>
        </div>
      )}

      <style jsx>{`
        .shimmer-btn {
          position: relative;
          overflow: hidden;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 22px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 500;
          font-family: inherit;
          letter-spacing: 0.02em;
          color: #fff;
          background: linear-gradient(135deg, #3278c2 0%, #4f94f5 50%, #3282d7 100%);
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(58, 79, 212, 0.5), 0 1px 3px rgba(0,0,0,0.1);
          transition: box-shadow 0.4s ease, transform 0.3s ease;
        }

        .shimmer-btn:hover {
          box-shadow: 0 8px 32px rgba(29, 121, 196, 0.92), 0 2px 8px rgba(0,0,0,0.12);
          transform: translateY(-1px);
        }

        .shimmer-btn:hover .shimmer-sweep {
          animation: shimmer-slide 1.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .shimmer-sweep {
          position: absolute;
          top: 0;
          left: 0;
          width: 55%;
          height: 100%;
          background: linear-gradient(
            105deg,
            transparent 20%,
            rgba(255, 255, 255, 0.15) 40%,
            rgba(255, 255, 255, 0.45) 50%,
            rgba(255, 255, 255, 0.15) 60%,
            transparent 80%
          );
          transform: translateX(-120%) skewX(-15deg);
          pointer-events: none;
        }

        @keyframes shimmer-slide {
          0%   { transform: translateX(-120%) skewX(-15deg); }
          100% { transform: translateX(280%)  skewX(-15deg); }
        }
      `}</style>

    </div>
  );
}
