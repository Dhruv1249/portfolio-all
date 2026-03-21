"use client";

import { motion } from "framer-motion";
import AnimateOnScroll from "../components/AnimateOnScroll";
import { usePortfolioData } from "../contexts/PortfolioDataContext";
import { Briefcase, Calendar, MapPin } from "lucide-react";

export default function ExperienceSection() {
  const { data } = usePortfolioData();
  const { experience } = data;

  return (
    <section id="experience" className="section-padding max-w-7xl mx-auto">
      <AnimateOnScroll>
        <p className="text-3xl md:text-5xl font-bold tracking-tight mb-3" style={{ color: "var(--accent)" }}>
          Experience
        </p>
        <h2 className="text-lg md:text-xl font-medium tracking-normal mb-12">
          <span className="gradient-text">Professional</span>
        </h2>
      </AnimateOnScroll>

      <AnimateOnScroll delay={0.1}>
        <motion.div
          className="glass-card glass-card-accent p-8 md:p-10 cursor-default"
          whileHover={{ x: 4, scale: 1.01 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <div className="flex items-start gap-5">
            <div className="p-3 rounded-xl shrink-0" style={{ background: "var(--accent-dim)", color: "var(--accent)" }}>
              <Briefcase size={22} />
            </div>
            <div className="flex-1">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                <div>
                  <h3 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
                    {experience.role}
                  </h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="flex items-center gap-1 text-xs" style={{ color: "var(--text-muted)" }}>
                      <MapPin size={12} /> {experience.company}
                    </span>
                  </div>
                </div>
                <span className="flex items-center gap-1.5 text-[0.75rem] font-mono shrink-0" style={{ color: "var(--accent)" }}>
                  <Calendar size={12} /> {experience.period}
                </span>
              </div>

              {/* Bullet points */}
              <ul className="space-y-2.5 mb-6">
                {experience.bullets.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "var(--accent)" }} />
                    {bullet}
                  </li>
                ))}
              </ul>

              {/* Tech pills */}
              <div className="flex flex-wrap gap-2">
                {experience.tech.map((t) => (
                  <span key={t} className="tech-pill">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimateOnScroll>
    </section>
  );
}
