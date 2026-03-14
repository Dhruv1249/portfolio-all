"use client";

import { motion } from "framer-motion";
import AnimateOnScroll from "../components/AnimateOnScroll";
import { experience } from "../data/portfolio-data";
import { Briefcase } from "lucide-react";

export default function ExperienceSection() {
  return (
    <section id="experience" className="section-padding max-w-7xl mx-auto">
      <AnimateOnScroll>
        <p className="text-xs font-mono tracking-[0.3em] uppercase mb-3" style={{ color: "var(--accent)" }}>
          Experience
        </p>
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-12">
          <span className="gradient-text">Professional</span>
        </h2>
      </AnimateOnScroll>

      <AnimateOnScroll delay={0.1}>
        <motion.div
          className="glass-card glass-card-accent p-8 md:p-10 cursor-default flex items-start gap-5"
          whileHover={{ x: 4, scale: 1.01 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <div className="p-3 rounded-xl shrink-0" style={{ background: "var(--accent-dim)", color: "var(--accent)" }}>
            <Briefcase size={22} />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>
              {experience.role}
            </h3>
            <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--text-muted)" }}>
              {experience.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {experience.tech.map((t) => (
                <span key={t} className="tech-pill">{t}</span>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimateOnScroll>
    </section>
  );
}
