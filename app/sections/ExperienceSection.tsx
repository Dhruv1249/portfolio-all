"use client";

import { motion } from "framer-motion";
import AnimateOnScroll from "../components/AnimateOnScroll";
import { experience, achievements } from "../data/portfolio-data";
import { Trophy, Award, Briefcase, GraduationCap } from "lucide-react";

export default function ExperienceSection() {
  return (
    <section id="experience" className="section-padding max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-stretch">
        {/* Experience Column */}
        <div className="flex flex-col">
          <AnimateOnScroll>
            <p className="text-xs font-mono tracking-[0.3em] uppercase mb-3" style={{ color: "var(--accent)" }}>
              Experience
            </p>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-12">
              <span className="gradient-text">Professional</span>
            </h2>
          </AnimateOnScroll>

          <div className="flex flex-col gap-6 flex-1">
            <AnimateOnScroll delay={0.1} className="flex-1">
              <motion.div
                className="glass-card glass-card-accent p-7 cursor-default h-full flex items-start gap-4"
                whileHover={{ x: 4, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <div className="p-3 rounded-xl shrink-0" style={{ background: "var(--accent-dim)", color: "var(--accent)" }}>
                  <Briefcase size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1.5" style={{ color: "var(--text-primary)" }}>
                    {experience.role}
                  </h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
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

            <AnimateOnScroll delay={0.2} className="flex-1">
              <motion.div
                className="glass-card glass-card-accent p-7 cursor-default h-full flex items-start gap-4"
                whileHover={{ x: 4, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <div className="p-3 rounded-xl shrink-0" style={{ background: "var(--accent-dim)", color: "var(--accent)" }}>
                  <GraduationCap size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1.5" style={{ color: "var(--text-primary)" }}>
                    CS Undergraduate
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    Pursuing B.Tech in Computer Science at Lovely Professional University. Focused on full-stack development, cloud engineering, and machine learning systems.
                  </p>
                </div>
              </motion.div>
            </AnimateOnScroll>
          </div>
        </div>

        {/* Achievements Column */}
        <div className="flex flex-col">
          <AnimateOnScroll>
            <p className="text-xs font-mono tracking-[0.3em] uppercase mb-3" style={{ color: "var(--accent)" }}>
              Recognition
            </p>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-12">
              <span className="gradient-text">Achievements</span>
            </h2>
          </AnimateOnScroll>

          <div className="flex flex-col gap-6 flex-1">
            {achievements.map((ach, i) => (
              <AnimateOnScroll key={ach.title} delay={0.1 + i * 0.1} className="flex-1">
                <motion.div
                  className="glass-card p-7 cursor-default gradient-border-animated h-full flex items-start gap-4"
                  whileHover={{ scale: 1.02, y: -4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <div
                    className="p-3 rounded-xl shrink-0 pulse-glow"
                    style={{ background: "var(--accent-dim)", color: "var(--accent)" }}
                  >
                    {i === 0 ? <Trophy size={22} /> : <Award size={22} />}
                  </div>
                  <div>
                    <p className="text-sm font-bold mb-1" style={{ color: "var(--accent)" }}>
                      {ach.award}
                    </p>
                    <h4 className="text-lg font-bold mb-2" style={{ color: "var(--text-primary)" }}>
                      {ach.title}
                    </h4>
                    <p className="text-sm" style={{ color: "var(--text-muted)" }}>{ach.detail}</p>
                  </div>
                </motion.div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
