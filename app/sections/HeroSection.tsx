"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown, FileText } from "lucide-react";
import { personalInfo } from "../data/portfolio-data";
import Image from "next/image";

export default function HeroSection() {
  const [photoVisible, setPhotoVisible] = useState(true);

  useEffect(() => {
    fetch("/api/photo-toggle")
      .then((r) => r.json())
      .then((d) => setPhotoVisible(d.visible))
      .catch(() => {});
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6">
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[20%] left-[15%] w-[500px] h-[500px] rounded-full blur-[160px] opacity-[0.07]"
          style={{ background: "var(--accent)" }}
        />
        <div
          className="absolute bottom-[20%] right-[15%] w-[400px] h-[400px] rounded-full blur-[140px] opacity-[0.05]"
          style={{ background: "var(--accent)" }}
        />
      </div>

      {/* Floating geometric shapes */}
      <motion.div
        className="absolute right-[12%] top-[25%] w-24 h-24 md:w-40 md:h-40 border rounded-2xl opacity-[0.06]"
        style={{ borderColor: "var(--accent)" }}
        animate={{ rotate: [45, 55, 45], y: [0, -15, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-[10%] bottom-[30%] w-16 h-16 md:w-24 md:h-24 border rounded-full opacity-[0.05]"
        style={{ borderColor: "var(--accent)" }}
        animate={{ scale: [1, 1.15, 1], y: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[25%] bottom-[20%] w-12 h-12 md:w-20 md:h-20 border rounded-lg opacity-[0.04]"
        style={{ borderColor: "var(--text-muted)" }}
        animate={{ rotate: [0, -15, 0], x: [0, 10, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Hero content — text left, photo right */}
      <div className="relative z-10 max-w-6xl w-full flex flex-col-reverse md:flex-row items-center gap-12 md:gap-20">
        {/* Text Column */}
        <div className="flex-1 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <span className="badge-glow inline-block mb-8">Available for work</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9]"
          >
            <span className="gradient-text">{personalInfo.name}</span>
            <span style={{ color: "var(--accent)" }}>.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-6"
          >
            <p
              className="text-xs md:text-sm font-mono tracking-[0.2em] uppercase"
              style={{ color: "var(--text-muted)" }}
            >
              {personalInfo.roles.join(" • ")}
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-base md:text-lg max-w-xl mt-6 leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            {personalInfo.tagline}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-10 flex flex-wrap gap-4 justify-center md:justify-start"
          >
            <a href="#projects" className="form-button inline-flex items-center gap-2">
              View Projects
            </a>
            <a
              href={personalInfo.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-xl text-sm font-semibold inline-flex items-center gap-2 transition-all duration-400"
              style={{
                color: "var(--accent)",
                border: "1px solid var(--accent-glow)",
                background: "var(--accent-dim)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--accent)";
                e.currentTarget.style.color = "var(--bg-primary)";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 4px 20px var(--accent-glow)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--accent-dim)";
                e.currentTarget.style.color = "var(--accent)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <FileText size={16} /> View CV
            </a>
            <a
              href="#contact"
              className="px-8 py-3.5 rounded-xl text-sm font-semibold transition-all duration-400"
              style={{
                color: "var(--text-secondary)",
                border: "1px solid var(--border-subtle)",
                background: "rgba(255,255,255,0.03)",
                backdropFilter: "blur(10px)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--accent)";
                e.currentTarget.style.color = "var(--accent)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border-subtle)";
                e.currentTarget.style.color = "var(--text-secondary)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Get In Touch
            </a>
          </motion.div>
        </div>

        {/* Photo Column — Right Side */}
        {photoVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            className="flex-shrink-0"
          >
            <div
              className="relative w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-3xl overflow-hidden"
              style={{
                border: "3px solid var(--accent)",
                boxShadow: "0 0 60px var(--accent-glow), 0 0 120px var(--accent-dim)",
              }}
            >
              <Image
                src="/dhruv.png"
                alt="Dhruv"
                width={288}
                height={288}
                className="w-full h-full object-cover"
                priority
              />
              {/* Shine overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.05) 50%, transparent 60%)",
                }}
              />
            </div>
          </motion.div>
        )}
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={20} style={{ color: "var(--text-muted)" }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
