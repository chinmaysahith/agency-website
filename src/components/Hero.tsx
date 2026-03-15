"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-24 text-center overflow-hidden">

      {/* Gradient Glow Background */}
      <div className="absolute inset-0 flex justify-center -z-10">
        <div className="w-[700px] h-[700px] bg-gradient-to-r from-purple-300 via-blue-300 to-pink-300 opacity-30 blur-3xl rounded-full"></div>
      </div>

      <div className="max-w-[1200px] mx-auto relative">

        {/* Left Floating Testimonial */}
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="hidden md:block absolute left-[-60px] top-24 rotate-[-8deg] bg-white border border-gray-200 shadow-xl rounded-xl p-5 max-w-[260px]"
        >
          <p className="text-sm text-gray-700 mb-3">
            “We were close to giving up. CodeDale rebuilt our confidence and delivered
            our fintech mobile app end-to-end.”
          </p>

          <p className="text-xs font-semibold text-gray-500">
            — PAL REDDY, CEO, TFS
          </p>
        </motion.div>


        {/* Right Floating Testimonial */}
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="hidden md:block absolute right-[-60px] top-28 rotate-[8deg] bg-white border border-gray-200 shadow-xl rounded-xl p-5 max-w-[260px]"
        >
          <p className="text-sm text-gray-700 mb-3">
            “APSLOCK brought Fluent Pro to life — an AI-powered English learning
            platform with personalized feedback.”
          </p>

          <p className="text-xs font-semibold text-gray-500">
            — KARMARAO, CEO, Fluent
          </p>
        </motion.div>


        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
        >
          We Build Digital Products
          <br />
          That Drive Real Growth
        </motion.h1>
        


        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-lg text-gray-600 max-w-2xl mx-auto mb-10"
        >
          We help startups and businesses design, build and scale modern
          digital products using cutting-edge technologies.
        </motion.p>
        


        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex justify-center gap-4"
        >
          <button className="bg-black text-white px-8 py-4 rounded-full font-medium hover:scale-105 transition">
            Book a Call
          </button>

          <button className="border border-gray-300 px-8 py-4 rounded-full font-medium hover:bg-gray-100 transition">
            View Our Work
          </button>
        </motion.div>

      </div>
    </section>
  );
}