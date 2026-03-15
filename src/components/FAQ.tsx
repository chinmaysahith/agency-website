"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "How long does a project take?",
    answer: "Most projects take between 2–6 weeks depending on complexity. We keep you updated at every milestone so there are no surprises.",
  },
  {
    question: "Do you work with startups?",
    answer: "Yes. We specialize in helping startups build and launch digital products fast — from MVP to full-scale platforms.",
  },
  {
    question: "What technologies do you use?",
    answer: "We use modern stacks like Next.js, React, Node.js, and cloud services tailored to your product needs.",
  },
  {
    question: "Can you redesign an existing product?",
    answer: "Yes. We improve UX, performance, and modernize existing platforms without disrupting your current users.",
  },
  {
    question: "What is your pricing?",
    answer: "We offer transparent, customized pricing based on scope. No hidden fees — just honest quotes upfront.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-32 px-6 dashed-grid">
      <div className="max-w-3xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          
            <h2
            className="text-5xl font-bold leading-tight"
            style={{ color: "#0F172A" }}
            >
            Frequently Asked
            <br />
            <span style={{ color: "#2563EB" }}>Questions.</span>
            </h2>
          <p className="mt-4 text-base" style={{ color: "#64748B" }}>
            Curiosity leads to success. Got questions? That's a great sign.
          </p>
        </motion.div>

        {/* Chat window */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          viewport={{ once: true }}
          className="rounded-3xl p-8 flex flex-col gap-4"
          style={{
            border: "1.5px dashed #CBD5E1",
            background: "#F8FAFF",
          }}
        >
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={index} className="flex flex-col">

                {/* Question row — right aligned */}
                <div className="flex items-center gap-3 self-end max-w-[85%]">

                  {/* + button rotates 45deg → × */}
                  <motion.button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background: isOpen ? "#0F172A" : "transparent",
                      border: isOpen ? "none" : "1.5px solid #CBD5E1",
                      color: isOpen ? "#FFFFFF" : "#64748B",
                    }}
                    whileTap={{ scale: 0.94 }}
                  >
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      style={{
                        display: "inline-block",
                        fontSize: "20px",
                        fontWeight: 300,
                        lineHeight: 1,
                      }}
                    >
                      +
                    </motion.span>
                  </motion.button>

                  {/* Question pill */}
                  <motion.button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="px-6 py-3 rounded-full text-sm font-medium text-left"
                    style={{
                      background: isOpen ? "#0F172A" : "#FFFFFF",
                      color: isOpen ? "#FFFFFF" : "#374151",
                      border: isOpen ? "none" : "1px solid #E2E8F0",
                      boxShadow: isOpen
                        ? "0 8px 24px rgba(0,0,0,0.15)"
                        : "0 2px 8px rgba(0,0,0,0.06)",
                      transition: "background 0.3s, color 0.3s, box-shadow 0.3s",
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {faq.question}
                  </motion.button>
                </div>

                {/* Answer — animates height from 0 to auto */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <div className="flex items-end gap-3 self-start max-w-[80%] pt-3 pb-1">

                        {/* Avatar */}
                        <div
                          className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-bold mb-1"
                          style={{
                            background: "linear-gradient(135deg, #2563EB, #1E40AF)",
                            border: "2px solid #DBEAFE",
                          }}
                        >
                          A
                        </div>

                        {/* Answer bubble */}
                        <div
                          className="rounded-3xl rounded-bl-sm px-5 py-4 text-sm leading-relaxed"
                          style={{
                            background: "#FFFFFF",
                            color: "#374151",
                            boxShadow: "0 4px 20px rgba(37,99,235,0.08)",
                            border: "1px solid #E2E8F0",
                          }}
                        >
                          {faq.answer}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}