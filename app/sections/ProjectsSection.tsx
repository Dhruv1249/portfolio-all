"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import AnimateOnScroll from "../components/AnimateOnScroll";
import { usePortfolioData } from "../contexts/PortfolioDataContext";
import { ArrowUpRight, Github, ExternalLink, Calendar } from "lucide-react";
import TiltedCard from "../components/ui/TiltedCard";

export default function ProjectsSection() {
  const { data } = usePortfolioData();
  const { featuredProjects, additionalProjects } = data;

  return (
    <section id="projects" className="section-padding max-w-7xl mx-auto">
      <AnimateOnScroll>
        <p className="text-3xl md:text-5xl font-bold tracking-tight mb-3" style={{ color: "var(--accent)" }}>
          Projects
        </p>
        <h2 className="text-lg md:text-xl font-medium tracking-normal mb-4">
          <span className="gradient-text">Featured Engineering Work</span>
        </h2>
        <p className="text-sm md:text-base max-w-xl mb-16" style={{ color: "var(--text-muted)" }}>
          A selection of projects I&apos;ve built — from climate forecasting to AI-powered marketplaces.
        </p>
      </AnimateOnScroll>

      {/* Featured Projects — Alternating layout */}
      <div className="flex flex-col gap-24">
        {featuredProjects.map((project, i) => {
          const isEven = i % 2 === 0;
          return (
            <AnimateOnScroll key={project.title} delay={0.1}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div
                  className={`relative ${isEven ? "lg:order-1" : "lg:order-2"} w-full aspect-[16/10]`}
                >
                  {project.image ? (
                    <TiltedCard
                      imageSrc={project.image}
                      altText={`${project.title} screenshot`}
                      containerHeight="100%"
                      containerWidth="100%"
                      imageHeight="100%"
                      imageWidth="100%"
                      rotateAmplitude={12}
                      scaleOnHover={1.05}
                      showMobileWarning={false}
                      showTooltip={false}
                    />
                  ) : (
                    <div className="project-placeholder aspect-[16/10] rounded-2xl border" style={{ borderColor: "var(--border-glass)" }}>
                      <p className="text-4xl font-bold" style={{ color: "var(--accent)", opacity: 0.4 }}>
                        {project.title}
                      </p>
                    </div>
                  )}
                </div>

                {/* Text content */}
                <div className={`${isEven ? "lg:order-2" : "lg:order-1"}`}>
                  {project.badge && (
                    <span className="badge-glow inline-block mb-4">{project.badge}</span>
                  )}
                  <h3 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>
                    {project.title} — {project.subtitle}
                  </h3>
                  {project.period && (
                    <div className="flex items-center gap-1.5 text-xs font-mono mb-4" style={{ color: "var(--accent)" }}>
                      <Calendar size={14} /> {project.period}
                    </div>
                  )}
                  <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-secondary)" }}>
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((t) => (
                      <span key={t} className="tech-pill">{t}</span>
                    ))}
                  </div>
                  {/* Links */}
                  <div className="flex items-center gap-4">
                    {project.live && (
                      <motion.a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300"
                        style={{
                          background: "var(--accent)",
                          color: "var(--bg-primary)",
                        }}
                        whileHover={{ scale: 1.05, boxShadow: "0 4px 20px var(--accent-glow)" }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <ExternalLink size={15} /> Live Demo
                      </motion.a>
                    )}
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300"
                      style={{
                        border: "1px solid var(--border-subtle)",
                        color: "var(--text-secondary)",
                        background: "rgba(255,255,255,0.03)",
                      }}
                      whileHover={{ scale: 1.05, borderColor: "var(--accent)", color: "var(--accent)" }}
                    >
                      <Github size={15} /> Source Code
                    </motion.a>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          );
        })}
      </div>

      {/* Additional Projects */}
      <div className="mt-24">
        <AnimateOnScroll>
          <p className="text-3xl md:text-5xl font-bold tracking-tight mb-3" style={{ color: "var(--text-muted)" }}>
            Also Built
          </p>
          <h3 className="text-lg md:text-xl font-medium tracking-normal mb-10">
            <span className="gradient-text">Other Engineering Experiments</span>
          </h3>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {additionalProjects.map((proj, i) => (
            <AnimateOnScroll key={proj.title} delay={i * 0.1}>
              <motion.div
                className="glass-card glass-card-accent p-7 cursor-default h-full flex flex-col justify-between"
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <div>
                  <h4 className="text-lg font-bold mb-2" style={{ color: "var(--text-primary)" }}>
                    {proj.title}
                  </h4>
                  {proj.period && (
                    <div className="flex items-center gap-1.5 text-xs font-mono mb-3" style={{ color: "var(--accent)" }}>
                      <Calendar size={12} /> {proj.period}
                    </div>
                  )}
                  <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
                    {proj.short}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {proj.tech.map((t) => (
                      <span key={t} className="tech-pill">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {proj.live && (
                    <a
                      href={proj.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium transition-colors duration-300 hover:text-[var(--accent)]"
                      style={{ color: "var(--text-muted)" }}
                    >
                      <ExternalLink size={13} /> Live
                    </a>
                  )}
                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium transition-colors duration-300 hover:text-[var(--accent)]"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <Github size={13} /> GitHub
                  </a>
                </div>
              </motion.div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
