"use client";
import React from "react";

import { motion } from "framer-motion";

type Testimonial = {
  text: string;
  name: string;
  role: string;
  initials: string;
};

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[...new Array(2).fill(0).map((_, index) => (
          <React.Fragment key={index}>
            {props.testimonials.map(({ text, name, role, initials }, i) => (
              <div
                key={i}
                className="p-8 rounded-3xl max-w-xs w-full flex flex-col justify-between"
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #E2E8F0",
                  boxShadow: "0 4px 24px rgba(37,99,235,0.08)",
                }}
              >
                {/* Quote */}
                <p
                  className="text-sm leading-relaxed mb-6"
                  style={{ color: "#475569" }}
                >
                  "{text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  {/* Avatar with initials */}
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                    style={{
                      background: "#EFF6FF",
                      color: "#2563EB",
                    }}
                  >
                    {initials}
                  </div>
                  <div className="flex flex-col">
                    <span
                      className="font-semibold text-sm leading-5"
                      style={{ color: "#0F172A" }}
                    >
                      {name}
                    </span>
                    <span
                      className="text-xs leading-5"
                      style={{ color: "#94A3B8" }}
                    >
                      {role}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))]}
      </motion.div>
    </div>
  );
};