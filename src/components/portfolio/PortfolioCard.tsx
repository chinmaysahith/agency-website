"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface PortfolioCardProps {
  title: string;
  description: string;
  tech: string[];
  index: number;
  image: string;
  className?: string;
}

export default function PortfolioCard({
  title,
  description,
  tech,
  index,
  image,
  className = "",
}: PortfolioCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <div
        className={`pcard ${isHovered ? "pcard-hovered" : ""} ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Card Image */}
        <div className="pcard-img">
          <Image
            src={image}
            alt={title}
            fill
            style={{ objectFit: "cover" }}
            sizes="280px"
          />
          <div className="pcard-img-overlay" />
        </div>

        <div className="pcard-content">
          {/* Header */}
          <div className="pcard-header">
            <div className="pcard-meta">
              <div className="pcard-status-wrap">
                <span className="pcard-status-dot" />
                <span>Active</span>
              </div>
            </div>
            <h3 className="pcard-title">{title}</h3>
          </div>

          {/* Expandable description & tags */}
          <div className={`pcard-expand ${isHovered ? "pcard-expand-on" : ""}`}>
            <div className="pcard-expand-inner">
              <p className={`pcard-desc ${isHovered ? "pcard-desc-on" : ""}`}>
                {description}
              </p>
              <div className="pcard-tags">
                {tech.map((t, i) => (
                  <span
                    key={i}
                    className={`pcard-tag ${isHovered ? "pcard-tag-on" : ""}`}
                    style={{ transitionDelay: isHovered ? `${0.1 + i * 0.05}s` : "0s" }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pcard-footer">
          <Link href="#" className="pcard-link">
            View Case Study
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7h8M8 3.5L11.5 7 8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>

      <style jsx>{`
        .pcard {
          width: 280px;
          background: #ffffff;
          border: 1px solid rgba(0,0,0,0.06);
          border-radius: 18px;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.4s cubic-bezier(0.25,1,0.5,1),
                      box-shadow 0.4s ease,
                      border-color 0.4s ease;
          position: relative;
        }
        .pcard-hovered {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 25px 60px -15px rgba(59,130,246,0.18),
                      0 10px 30px -10px rgba(0,0,0,0.08),
                      0 0 0 1px rgba(59,130,246,0.1);
          border-color: rgba(59,130,246,0.15);
        }

        /* Image */
        .pcard-img {
          position: relative;
          height: 170px;
          width: 100%;
          overflow: hidden;
          background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
        }
        .pcard-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(255,255,255,0.95) 0%,
            rgba(255,255,255,0.3) 30%,
            transparent 60%
          );
          z-index: 1;
          transition: opacity 0.35s ease;
        }
        .pcard-hovered .pcard-img-overlay {
          background: linear-gradient(
            to top,
            rgba(255,255,255,0.9) 0%,
            rgba(255,255,255,0.1) 40%,
            transparent 70%
          );
        }



        /* Content */
        .pcard-content {
          padding: 14px 18px 0;
        }

        /* Header */
        .pcard-header {
          display: flex;
          flex-direction: column;
        }
        .pcard-meta {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          color: #94a3b8;
          font-family: 'Sora', sans-serif;
        }
        .pcard-status-wrap {
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .pcard-status-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 6px rgba(34,197,94,0.4);
        }
        .pcard-title {
          font-family: 'Clash Display', 'Sora', sans-serif;
          font-size: 18px;
          font-weight: 600;
          color: #0f172a;
          margin: 6px 0 0;
          letter-spacing: -0.4px;
          line-height: 1.25;
          transition: color 0.3s ease;
        }
        .pcard-hovered .pcard-title {
          color: #1e3a5f;
        }

        /* Expandable section */
        .pcard-expand {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.45s cubic-bezier(0.4,0,0.2,1),
                      margin-top 0.45s cubic-bezier(0.4,0,0.2,1);
          margin-top: 0;
        }
        .pcard-expand-on {
          grid-template-rows: 1fr;
          margin-top: 12px;
        }
        .pcard-expand-inner {
          overflow: hidden;
        }

        .pcard-desc {
          font-size: 12.5px;
          color: #64748b;
          line-height: 1.7;
          font-weight: 300;
          margin: 0 0 12px;
          font-family: 'Sora', sans-serif;
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 0.35s 0.1s ease, transform 0.35s 0.1s ease;
        }
        .pcard-desc-on {
          opacity: 1;
          transform: translateY(0);
        }

        .pcard-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 6px;
        }
        .pcard-tag {
          font-size: 10px;
          font-weight: 500;
          font-family: 'Sora', sans-serif;
          padding: 4px 12px;
          border-radius: 999px;
          background: rgba(59,130,246,0.06);
          color: #3b82f6;
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .pcard-tag-on {
          opacity: 1;
          transform: translateY(0);
        }

        /* Footer */
        .pcard-footer {
          padding: 14px 18px;
          margin-top: 8px;
          border-top: 1px solid rgba(0,0,0,0.05);
        }
        .pcard-link {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 500;
          color: #0f172a;
          text-decoration: none;
          font-family: 'Sora', sans-serif;
          transition: color 0.25s ease, gap 0.25s ease;
        }
        .pcard-link:hover {
          color: #3b82f6;
          gap: 10px;
        }
      `}</style>
    </>
  );
}
