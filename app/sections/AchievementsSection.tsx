"use client";

import { motion } from "framer-motion";
import AnimateOnScroll from "../components/AnimateOnScroll";
import { usePortfolioData } from "../contexts/PortfolioDataContext";
import { Trophy, Award, Calendar } from "lucide-react";

export default function AchievementsSection() {
  const { data } = usePortfolioData();
  const { achievements } = data;

  return (
    <section id="achievements" className="section-padding max-w-7xl mx-auto">
      <AnimateOnScroll>
        <p className="text-3xl md:text-5xl font-bold tracking-tight mb-3" style={{ color: "var(--accent)" }}>
          Recognition
        </p>
        <h2 className="text-lg md:text-xl font-medium tracking-normal mb-12">
          <span className="gradient-text">Achievements</span>
        </h2>
      </AnimateOnScroll>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {achievements.map((ach, i) => (
          <AnimateOnScroll key={ach.title} delay={0.1 + i * 0.1}>
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
              <div className="flex-1">
                <div className="flex justify-between items-start gap-2 mb-1">
                  <p className="text-sm font-bold" style={{ color: "var(--accent)" }}>
                    {ach.award}
                  </p>
                  {ach.period && (
                    <span className="flex items-center gap-1.5 text-[0.75rem] font-mono shrink-0" style={{ color: "var(--accent)" }}>
                      {ach.period}
                    </span>
                  )}
                </div>
                <h4 className="text-lg font-bold mb-2" style={{ color: "var(--text-primary)" }}>
                  {ach.title}
                </h4>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>{ach.detail}</p>
              </div>
            </motion.div>
          </AnimateOnScroll>
        ))}
      </div>
    </section>
  );
}
