"use client";
import { motion } from "framer-motion";
import { TestimonialsColumn } from "@/components/ui/TestimonialsColumn";

const testimonials = [
  {
    text: "The team delivered an incredible website for our startup. Fast, modern, and exactly what we needed.",
    name: "Sarah Johnson",
    role: "Startup Founder",
    initials: "SJ",
  },
  {
    text: "Their AI solution helped automate our workflow and saved us hundreds of hours.",
    name: "David Chen",
    role: "Product Manager",
    initials: "DC",
  },
  {
    text: "Professional design, great communication, and amazing results.",
    name: "Maria Rodriguez",
    role: "Marketing Director",
    initials: "MR",
  },
  {
    text: "From concept to launch in record time. The attention to detail was outstanding.",
    name: "James Parker",
    role: "CEO",
    initials: "JP",
  },
  {
    text: "They understood our vision immediately and built exactly what we imagined.",
    name: "Priya Nair",
    role: "Product Designer",
    initials: "PN",
  },
  {
    text: "The best development team we have worked with. Highly recommend.",
    name: "Liam Foster",
    role: "CTO",
    initials: "LF",
  },
  {
    text: "Our conversion rate doubled after the redesign. Incredible work.",
    name: "Emma Walsh",
    role: "Growth Lead",
    initials: "EW",
  },
  {
    text: "Super responsive, clean code, and delivered ahead of schedule.",
    name: "Noah Kim",
    role: "Engineering Lead",
    initials: "NK",
  },
  {
    text: "They transformed our outdated platform into a modern, scalable product.",
    name: "Aisha Patel",
    role: "Operations Manager",
    initials: "AP",
  },
];

const firstColumn  = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn  = testimonials.slice(6, 9);

export default function Testimonials() {
  return (
    <section
    id="achievements"
    className="pt-0 pb-24 px-6 dashed-grid overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          
          <h2
            className="text-4xl font-bold mb-4"
            style={{ color: "#0F172A" }}
          >
            What Our Clients Say
          </h2>
          <p style={{ color: "#64748B" }}>
            Trusted by startups and businesses to build powerful digital products.
          </p>
        </motion.div>

        {/* Scrolling Columns */}
        <div
          className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)] max-h-[740px] overflow-hidden"
        >
          <TestimonialsColumn
            testimonials={firstColumn}
            duration={18}
          />
          <TestimonialsColumn
            testimonials={secondColumn}
            duration={22}
            className="hidden md:block"
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            duration={16}
            className="hidden lg:block"
          />
        </div>

      </div>
    </section>
  );
}