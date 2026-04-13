"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

const LaserFlow = dynamic(() => import("@/components/ui/LaserFlow"), { ssr: false });

export default function Footer() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const ist = now.toLocaleTimeString("en-GB", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setTime(ist);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <footer className="aps-footer">
        {/* ── Top: Navigation columns ── */}
        <div className="aps-footer-top">
          <div className="aps-footer-col">
            <span className="aps-footer-label">Navigation</span>
            <Link href="/#services" className="aps-footer-link">Services</Link>
            <Link href="/#work" className="aps-footer-link">Our Work</Link>
            <Link href="/#faq" className="aps-footer-link">FAQs</Link>
            <Link href="/contact" className="aps-footer-link">Contact</Link>
          </div>

          <div className="aps-footer-col">
            <span className="aps-footer-label">Social</span>
            <Link href="#" className="aps-footer-link">Instagram ↗</Link>
            <Link href="#" className="aps-footer-link">LinkedIn ↗</Link>
            <Link href="#" className="aps-footer-link">Email ↗</Link>
          </div>

          <div className="aps-footer-col">
            <span className="aps-footer-label">Legals</span>
            <Link href="#" className="aps-footer-link">Privacy Policy</Link>
            <Link href="#" className="aps-footer-link">Terms of Service</Link>
          </div>
        </div>

        {/* ── Middle: Copyright / Time / Back to top ── */}
        <div className="aps-footer-mid">
          <span className="aps-footer-copy">
            © {new Date().getFullYear()} APSLOCK. All rights reserved.
          </span>
          <span className="aps-footer-time">
            India → {time}
          </span>
          <button onClick={scrollToTop} className="aps-footer-btt">
            Back to top
          </button>
        </div>

        {/* ── Bottom: Large APSLOCK text with LaserFlow ── */}
        <div className="aps-footer-brand-section">
          <div className="aps-footer-laser">
            <LaserFlow
              color="#38BDF8"
              verticalSizing={1.5}
              horizontalSizing={0.6}
              fogIntensity={0.35}
              fogScale={0.25}
              wispDensity={0.8}
              wispSpeed={12}
              wispIntensity={4}
              flowSpeed={0.3}
              flowStrength={0.2}
              decay={1.0}
              falloffStart={1.1}
              fogFallSpeed={0.5}
              horizontalBeamOffset={0}
              verticalBeamOffset={0.35}
            />
          </div>
          <div className="aps-footer-brand-wrap">
            <div className="aps-footer-brand" aria-hidden="true">APSLOCK</div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Clash+Display:wght@400;500;600;700;800&display=swap');

        .aps-footer {
          position: relative;
          background: #ffffff;
          overflow: hidden;
          border-top: 1px solid rgba(0,0,0,0.06);
          font-family: 'Sora', sans-serif;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        /* ── Top columns ── */
        .aps-footer-top {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
          max-width: 1100px;
          margin: 0 auto;
          padding: 64px 40px 48px;
          width: 100%;
        }

        .aps-footer-col {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .aps-footer-label {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #94a3b8;
          margin-bottom: 8px;
        }

        .aps-footer-link {
          font-size: 17px;
          font-weight: 500;
          color: #0f172a;
          text-decoration: none;
          transition: color 0.25s ease;
          line-height: 1.6;
          font-family: 'Clash Display', sans-serif;
          letter-spacing: -0.3px;
        }
        .aps-footer-link:hover {
          color: #3b82f6;
        }

        /* ── Middle row ── */
        .aps-footer-mid {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1100px;
          margin: 0 auto;
          padding: 24px 40px 0;
          border-top: 1px solid rgba(0,0,0,0.06);
          width: 100%;
        }

        .aps-footer-copy,
        .aps-footer-time {
          font-size: 12px;
          color: #94a3b8;
          font-weight: 400;
        }

        .aps-footer-btt {
          font-size: 12px;
          color: #3b82f6;
          background: none;
          border: none;
          cursor: pointer;
          font-family: 'Sora', sans-serif;
          font-weight: 500;
          transition: opacity 0.25s ease;
        }
        .aps-footer-btt:hover {
          opacity: 0.7;
        }

        /* ── Brand section ── */
        .aps-footer-brand-section {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          position: relative;
          background: #0b1120;
          border-radius: 28px 28px 0 0;
          margin-top: 40px;
          overflow: hidden;
        }

        /* LaserFlow container */
        .aps-footer-laser {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: auto;
        }

        .aps-footer-brand-wrap {
          position: relative;
          z-index: 2;
          width: 100%;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          flex: 1;
          min-height: 280px;
        }

        .aps-footer-brand {
          font-family: 'Clash Display', sans-serif;
          font-size: 15vw;
          font-weight: 800;
          letter-spacing: 0.06em;
          line-height: 1;
          white-space: nowrap;
          pointer-events: none;
          user-select: none;
          width: 100%;
          text-align: center;
          color: transparent;
          background: linear-gradient(
            180deg,
            rgba(56, 189, 248, 0.4) 0%,
            rgba(56, 189, 248, 0.18) 50%,
            rgba(56, 189, 248, 0.04) 100%
          );
          -webkit-background-clip: text;
          background-clip: text;
          padding-bottom: 24px;
        }

        /* ── Mobile ── */
        @media (max-width: 767px) {
          .aps-footer {
            min-height: auto;
          }

          .aps-footer-top {
            grid-template-columns: 1fr;
            gap: 32px;
            padding: 48px 24px 36px;
          }

          .aps-footer-mid {
            flex-direction: column;
            gap: 12px;
            text-align: center;
            padding: 20px 24px 0;
          }

          .aps-footer-brand-section {
            border-radius: 20px 20px 0 0;
            margin-top: 24px;
          }

          .aps-footer-brand-wrap {
            min-height: 160px;
          }

          .aps-footer-brand {
            font-size: 15vw;
            padding-bottom: 16px;
          }
        }
      `}</style>
    </>
  );
}