"use client";

import { motion } from "framer-motion";
import AnimateOnScroll from "../components/AnimateOnScroll";
import { usePortfolioData } from "../contexts/PortfolioDataContext";
import { GraduationCap, MapPin } from "lucide-react";

export default function EducationSection() {
  const { data } = usePortfolioData();
  const { education } = data;

  return (
    <section id="education" className="section-padding max-w-7xl mx-auto">
      <AnimateOnScroll>
        <p className="text-3xl md:text-5xl font-bold tracking-tight mb-3" style={{ color: "var(--accent)" }}>
          Education
        </p>
        <h2 className="text-lg md:text-xl font-medium tracking-normal mb-12">
          <span className="gradient-text">Background</span>
        </h2>
      </AnimateOnScroll>

      <div className="flex flex-col gap-6">
        {education.map((edu, i) => (
          <AnimateOnScroll key={edu.institution} delay={0.1 + i * 0.1}>
            <motion.div
              className="glass-card glass-card-accent p-7 cursor-default flex items-start gap-4"
              whileHover={{ x: 4, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <div className="p-3 rounded-xl shrink-0" style={{ background: "var(--accent-dim)", color: "var(--accent)" }}>
                <GraduationCap size={20} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h3 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
                    {edu.institution}
                  </h3>
                  <span className="text-[0.75rem] font-mono" style={{ color: "var(--accent)" }}>
                    {edu.period}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1 mb-1">
                  <MapPin size={12} style={{ color: "var(--text-muted)" }} />
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>{edu.location}</span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {edu.degree} · <span style={{ color: "var(--accent)" }}>{edu.score}</span>
                </p>
              </div>
            </motion.div>
          </AnimateOnScroll>
        ))}
      </div>
    </section>
  );
}
