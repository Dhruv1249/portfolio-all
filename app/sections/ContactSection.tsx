"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import AnimateOnScroll from "../components/AnimateOnScroll";
import { personalInfo } from "../data/portfolio-data";
import { Mail, Github, Linkedin, Send, ArrowUpRight } from "lucide-react";

const socialLinks = [
  { icon: <Mail size={20} />, label: "Email", href: `mailto:${personalInfo.email}`, display: personalInfo.email },
  { icon: <Github size={20} />, label: "GitHub", href: personalInfo.github, display: "Dhruv1249" },
  { icon: <Linkedin size={20} />, label: "LinkedIn", href: personalInfo.linkedin, display: "dhruv124" },
];

export default function ContactSection() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-[160px] opacity-[0.06]"
          style={{ background: "var(--accent)" }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <AnimateOnScroll>
          <p className="text-xs font-mono tracking-[0.3em] uppercase mb-3" style={{ color: "var(--accent)" }}>
            Contact
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-4">
            <span className="gradient-text">Let&apos;s build the</span>
            <br />
            <span className="gradient-text">future</span>
            <span style={{ color: "var(--accent)" }}>.</span>
          </h2>
          <p className="text-sm md:text-base max-w-lg mb-16" style={{ color: "var(--text-muted)" }}>
            Interested in collaborating, discussing technology, or building impactful systems? Reach out through any of these channels.
          </p>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Form */}
          <AnimateOnScroll delay={0.1}>
            <form
              className="glass-card-static p-8 md:p-10 space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                window.location.href = `mailto:${personalInfo.email}?subject=Portfolio Contact from ${formState.name}&body=${formState.message}%0A%0AFrom: ${formState.email}`;
              }}
            >
              <div>
                <label className="block text-xs font-mono tracking-wider uppercase mb-2" style={{ color: "var(--text-muted)" }}>
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="form-input"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-mono tracking-wider uppercase mb-2" style={{ color: "var(--text-muted)" }}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="form-input"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-mono tracking-wider uppercase mb-2" style={{ color: "var(--text-muted)" }}>
                  Message
                </label>
                <textarea
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  rows={5}
                  className="form-input resize-none"
                  required
                />
              </div>
              <motion.button
                type="submit"
                className="form-button w-full flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Send size={16} />
                Send Message
              </motion.button>
            </form>
          </AnimateOnScroll>

          {/* Social Links */}
          <AnimateOnScroll delay={0.2}>
            <div className="space-y-5">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.label !== "Email" ? "_blank" : undefined}
                  rel={link.label !== "Email" ? "noopener noreferrer" : undefined}
                  className="glass-card glass-card-accent p-6 flex items-center justify-between group cursor-pointer block"
                  whileHover={{ x: 6, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="p-3 rounded-xl"
                      style={{ background: "var(--accent-dim)", color: "var(--accent)" }}
                    >
                      {link.icon}
                    </div>
                    <div>
                      <p className="text-xs font-mono tracking-wider uppercase mb-0.5" style={{ color: "var(--text-muted)" }}>
                        {link.label}
                      </p>
                      <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                        {link.display}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight
                    size={18}
                    className="opacity-0 group-hover:opacity-100 transition-all duration-300"
                    style={{ color: "var(--accent)" }}
                  />
                </motion.a>
              ))}

              {/* Quick CTA */}
              <div className="mt-8 pt-8" style={{ borderTop: "1px solid var(--border-subtle)" }}>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="form-button inline-flex items-center gap-2"
                >
                  <Mail size={16} />
                  {personalInfo.email}
                </a>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>

      {/* Footer */}
      <div className="section-divider mt-24 mb-0" />
      <div className="py-8 text-center">
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          © 2026 Dhruv. Crafted with Next.js & Tailwind CSS.
        </p>
      </div>
    </section>
  );
}
