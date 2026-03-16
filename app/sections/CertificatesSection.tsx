"use client";

import { motion } from "framer-motion";
import AnimateOnScroll from "../components/AnimateOnScroll";
import { certifications } from "../data/portfolio-data";
import { Award, ExternalLink } from "lucide-react";

export default function CertificatesSection() {
  return (
    <section id="certificates" className="section-padding max-w-7xl mx-auto">
      <AnimateOnScroll>
        <p className="text-xs font-mono tracking-[0.3em] uppercase mb-3" style={{ color: "var(--accent)" }}>
          Continuous Learning
        </p>
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-12">
          <span className="gradient-text">Certifications</span>
        </h2>
      </AnimateOnScroll>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certifications.map((cert, i) => (
          <AnimateOnScroll key={cert.title} delay={0.1 + i * 0.1}>
            <motion.a
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card p-7 gradient-border-animated h-full flex items-start gap-4"
              style={{ display: "flex", textDecoration: "none" }}
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <div
                className="p-3 rounded-xl shrink-0 pulse-glow"
                style={{ background: "var(--accent-dim)", color: "var(--accent)" }}
              >
                <Award size={22} />
              </div>
              <div>
                <p className="text-sm font-bold mb-1" style={{ color: "var(--accent)" }}>
                  {cert.issuer}
                </p>
                <h4 className="text-lg font-bold mb-2" style={{ color: "var(--text-primary)" }}>
                  {cert.title}
                </h4>
                <div className="flex items-center gap-1.5 text-xs mt-3" style={{ color: "var(--text-muted)" }}>
                  <span>View Certificate</span>
                  <ExternalLink size={12} />
                </div>
              </div>
            </motion.a>
          </AnimateOnScroll>
        ))}
      </div>
    </section>
  );
}
