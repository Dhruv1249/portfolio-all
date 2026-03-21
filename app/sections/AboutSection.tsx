"use client";

import { motion } from "framer-motion";
import AnimateOnScroll from "../components/AnimateOnScroll";
import { usePortfolioData } from "../contexts/PortfolioDataContext";
import { Code2, Cloud, Brain, Terminal, ArrowUpRight } from "lucide-react";

const focusIcons = [<Code2 key="code" size={22} />, <Cloud key="cloud" size={22} />, <Brain key="brain" size={22} />];


export default function AboutSection() {
  const { data } = usePortfolioData();
  const { aboutText, engineeringFocus } = data;

  return (
    <section id="about" className="section-padding max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left — Heading + Text */}
        <div>
          <AnimateOnScroll>
            <p
              className="text-3xl md:text-5xl font-bold tracking-tight mb-4"
              style={{ color: "var(--accent)" }}
            >
              About Me
            </p>
          </AnimateOnScroll>
          <AnimateOnScroll delay={0.1}>
            <h2 className="text-lg md:text-xl font-medium leading-relaxed tracking-normal mb-8">
              <span className="gradient-text text-secondary">Engineering end-to-end intelligent software systems</span>
              <span style={{ color: "var(--accent)" }}>.</span>
            </h2>
          </AnimateOnScroll>
          <AnimateOnScroll delay={0.2}>
            <p className="text-base leading-relaxed whitespace-pre-line" style={{ color: "var(--text-secondary)" }}>
              {aboutText}
            </p>
          </AnimateOnScroll>
        </div>

        {/* Right — Focus Area Cards */}
        <div className="flex flex-col gap-4">
          {engineeringFocus.map((focus, i) => (
            <AnimateOnScroll key={focus.title} delay={0.15 + i * 0.1} direction="right">
              <motion.div
                className="glass-card glass-card-accent p-6 flex items-start gap-5 cursor-default"
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <div
                  className="p-3 rounded-xl shrink-0"
                  style={{ background: "var(--accent-dim)", color: "var(--accent)" }}
                >
                  {focusIcons[i]}
                </div>
                <div>
                  <h3 className="text-base font-bold mb-1.5" style={{ color: "var(--text-primary)" }}>
                    {focus.title}
                  </h3>
                  <p className="text-xs font-mono leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    {focus.short}
                  </p>
                </div>
              </motion.div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

