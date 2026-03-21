"use client";

import { motion } from "framer-motion";
import AnimateOnScroll from "../components/AnimateOnScroll";
import { usePortfolioData } from "../contexts/PortfolioDataContext";
import { Award, ExternalLink } from "lucide-react";
import Image from "next/image";

export default function CertificatesSection() {
  const { data } = usePortfolioData();
  const { certifications } = data;

  return (
    <section id="certificates" className="section-padding max-w-7xl mx-auto">
      <AnimateOnScroll>
        <p className="text-3xl md:text-5xl font-bold tracking-tight mb-3" style={{ color: "var(--accent)" }}>
          Continuous Learning
        </p>
        <h2 className="text-lg md:text-xl font-medium tracking-normal mb-12">
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
              className="glass-card p-0 gradient-border-animated h-full flex flex-col cursor-pointer overflow-hidden block"
              style={{ textDecoration: "none" }}
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <div className="relative w-full h-48 sm:h-56 md:h-64 border-b border-[var(--border-subtle)]">
                {cert.image ? (
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-[var(--background-secondary)]">
                    <Award size={48} style={{ color: "var(--accent-dim)" }} />
                  </div>
                )}
              </div>
              
              <div className="p-7 flex flex-col flex-grow">
                <div className="flex items-start gap-4">
                  <div
                    className="p-3 rounded-xl shrink-0 pulse-glow"
                    style={{ background: "var(--accent-dim)", color: "var(--accent)" }}
                  >
                    <Award size={22} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start gap-2 mb-1">
                      <p className="text-sm font-bold" style={{ color: "var(--accent)" }}>
                        {cert.issuer}
                      </p>
                      {cert.period && (
                        <span className="flex items-center gap-1.5 text-[0.75rem] font-mono shrink-0" style={{ color: "var(--accent)" }}>
                          {cert.period}
                        </span>
                      )}
                    </div>
                    <h4 className="text-lg font-bold mb-2" style={{ color: "var(--text-primary)" }}>
                      {cert.title}
                    </h4>
                    <div className="flex items-center gap-1.5 text-xs mt-3" style={{ color: "var(--text-muted)" }}>
                      <span>View Certificate</span>
                      <ExternalLink size={12} />
                    </div>
                  </div>
                </div>
              </div>
            </motion.a>
          </AnimateOnScroll>
        ))}
      </div>
    </section>
  );
}
