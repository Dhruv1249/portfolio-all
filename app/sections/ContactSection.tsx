"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import AnimateOnScroll from "../components/AnimateOnScroll";
import { usePortfolioData } from "../contexts/PortfolioDataContext";
import { Mail, Github, Linkedin, Send, ArrowUpRight, CheckCircle, AlertCircle } from "lucide-react";

export default function ContactSection() {
  const { data } = usePortfolioData();
  const { personalInfo } = data;

  const socialLinks = [
    { icon: <Mail size={20} />, label: "Email", href: `mailto:${personalInfo.email}`, display: personalInfo.email },
    { icon: <Github size={20} />, label: "GitHub", href: personalInfo.github, display: "Dhruv1249" },
    { icon: <Linkedin size={20} />, label: "LinkedIn", href: personalInfo.linkedin, display: "dhruv-ds" },
  ];

  const [formData, setFormData] = useState({ from_name: "", from_email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setStatus("idle");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error();
      setStatus("success");
      setFormData({ from_name: "", from_email: "", message: "" });
    } catch {
      setStatus("error");
    } finally {
      setSending(false);
      setTimeout(() => setStatus("idle"), 5000);
    }
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
          <p className="text-3xl md:text-5xl font-bold tracking-tight mb-3" style={{ color: "var(--accent)" }}>
           Let's Connect 
          </p>
          <h2 className="text-lg md:text-xl font-medium tracking-normal mb-4">
            <span className="gradient-text">Let&apos;s build the future</span>
            <span style={{ color: "var(--accent)" }}>.</span>
          </h2>
          <p className="text-sm md:text-base max-w-lg mb-16" style={{ color: "var(--text-muted)" }}>
            Interested in collaborating, discussing technology, or building impactful systems? Reach out through any of these channels.
          </p>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Social Links */}
          <AnimateOnScroll delay={0.1}>
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
                      <p className="text-[0.75rem] font-mono tracking-wide mb-0.5" style={{ color: "var(--text-muted)" }}>
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

          {/* Contact Form */}
          <AnimateOnScroll delay={0.2}>
            <form
              className="glass-card-static p-8 md:p-10 space-y-5"
              onSubmit={handleSubmit}
            >
              <div>
                <label className="block text-[0.75rem] font-mono tracking-wide mb-2" style={{ color: "var(--text-muted)" }}>
                  Name
                </label>
                <input
                  type="text"
                  name="from_name"
                  value={formData.from_name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="form-input"
                  required
                />
              </div>
              <div>
                <label className="block text-[0.75rem] font-mono tracking-wide mb-2" style={{ color: "var(--text-muted)" }}>
                  Email
                </label>
                <input
                  type="email"
                  name="from_email"
                  value={formData.from_email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="form-input"
                  required
                />
              </div>
              <div>
                <label className="block text-[0.75rem] font-mono tracking-wide mb-2" style={{ color: "var(--text-muted)" }}>
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
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
                disabled={sending}
                style={{ opacity: sending ? 0.7 : 1 }}
              >
                {sending ? (
                  <>Sending...</>
                ) : (
                  <><Send size={16} /> Send Message</>
                )}
              </motion.button>

              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-sm font-medium p-3 rounded-xl"
                  style={{ background: "var(--accent-dim)", color: "var(--accent)" }}
                >
                  <CheckCircle size={16} /> Message sent successfully! I&apos;ll get back to you soon.
                </motion.div>
              )}
              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-sm font-medium p-3 rounded-xl"
                  style={{ background: "rgba(239, 68, 68, 0.1)", color: "#ef4444" }}
                >
                  <AlertCircle size={16} /> Failed to send. Please try emailing directly.
                </motion.div>
              )}
            </form>
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
