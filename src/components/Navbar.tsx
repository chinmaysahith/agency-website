"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center">
      
      <div className="w-[1200px] flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-blue-600">
          APSLOCK
        </Link>

        {/* Center Floating Menu */}
        <nav className="hidden md:flex items-center gap-8 bg-white border border-gray-200 rounded-full px-8 py-3 shadow-md">

          <Link
            href="/#services"
            className="text-sm font-medium hover:text-gray-500"
          >
            Services
          </Link>

          <Link
            href="/#work"
            className="text-sm font-medium hover:text-gray-500"
          >
            Our Work
          </Link>

          <Link
            href="/#achievements"
            className="text-sm font-medium hover:text-gray-500"
          >
            Achievements
          </Link>

          <Link
            href="/#faq"
            className="text-sm font-medium hover:text-gray-500"
          >
            FAQs
          </Link>

          <Link
            href="/contact"
            className="text-sm font-medium hover:text-gray-500"
          >
            Contact
          </Link>

        </nav>

        {/* CTA Button */}
        <Link href="/contact">
          <button className="bg-black text-white px-6 py-3 rounded-full text-sm shadow-lg hover:scale-105 transition">
            Book a Call →
          </button>
        </Link>

      </div>

    </div>
  );
}