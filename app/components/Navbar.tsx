"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, FileText, Palette, Check } from "lucide-react";
import { personalInfo } from "../data/portfolio-data";
import { useTheme, COLOR_PROFILES } from "../contexts/ThemeContext";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const themeRef = useRef<HTMLDivElement>(null);
  const { activeProfile, setProfile, animations, setAnimations } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close theme dropdown on click outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (themeRef.current && !themeRef.current.contains(e.target as Node)) {
        setThemeOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(5, 5, 5, 0.7)" : "transparent",
        backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
        borderBottom: scrolled ? "1px solid var(--border-subtle)" : "1px solid transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a href="#" className="text-xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
          DHRUV<span style={{ color: "var(--accent)" }}>.</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.08 }}
              className="text-xs font-medium uppercase tracking-[0.15em] transition-colors duration-300 hover:text-[var(--accent)]"
              style={{ color: "var(--text-muted)" }}
            >
              {link.label}
            </motion.a>
          ))}
          <motion.a
            href={personalInfo.resume}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.75 }}
            className="text-xs font-medium uppercase tracking-[0.15em] inline-flex items-center gap-1.5 transition-colors duration-300 hover:text-[var(--accent)]"
            style={{ color: "var(--text-muted)" }}
          >
            <FileText size={13} /> Resume
          </motion.a>

          {/* Theme Selector */}
          <div ref={themeRef} style={{ position: "relative" }}>
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              onClick={() => setThemeOpen(!themeOpen)}
              className="text-xs font-medium uppercase tracking-[0.15em] inline-flex items-center gap-1.5 transition-colors duration-300 hover:text-[var(--accent)]"
              style={{ color: "var(--text-muted)", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}
            >
              <Palette size={13} /> Theme
            </motion.button>

            <AnimatePresence>
              {themeOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    position: "absolute",
                    top: "calc(100% + 12px)",
                    right: 0,
                    width: "280px",
                    background: "var(--bg-secondary)",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: "16px",
                    padding: "12px",
                    boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
                    backdropFilter: "blur(20px)",
                    zIndex: 100,
                  }}
                >
                  <p style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "8px", padding: "0 4px" }}>
                    Color Profile
                  </p>
                  {COLOR_PROFILES.map((profile) => {
                    const isActive = activeProfile.id === profile.id;
                    return (
                      <div
                        key={profile.id}
                        onClick={() => {
                          setProfile(profile.id);
                          setThemeOpen(false);
                        }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "10px 12px",
                          borderRadius: "10px",
                          cursor: "pointer",
                          background: isActive ? "var(--accent-dim)" : "transparent",
                          transition: "background 0.2s",
                          marginBottom: "2px",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <div style={{ display: "flex", gap: "3px" }}>
                            {profile.preview.slice(0, 2).map((color, i) => (
                              <div key={i} style={{ width: "16px", height: "16px", borderRadius: "4px", background: color, border: "1px solid rgba(255,255,255,0.1)" }} />
                            ))}
                          </div>
                          <span style={{ fontSize: "13px", fontWeight: 500, color: isActive ? "var(--accent)" : "var(--text-secondary)" }}>
                            {profile.name}
                          </span>
                          </div>
                          {isActive && <Check size={14} style={{ color: "var(--accent)" }} />}
                        </div>
                      );
                    })}

                    <div style={{ height: "1px", background: "var(--border-subtle)", margin: "8px 0" }} />
                    
                    <div
                      onClick={() => setAnimations(!animations)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "10px 12px",
                        borderRadius: "10px",
                        cursor: "pointer",
                        background: "transparent",
                        transition: "background 0.2s",
                      }}
                    >
                      <div style={{ fontSize: "14px", color: "var(--text-primary)" }}>Animations</div>
                      <div
                        style={{
                          width: "36px",
                          height: "20px",
                          borderRadius: "10px",
                          background: animations ? "var(--accent)" : "var(--bg-card-solid)",
                          border: animations ? "none" : "1px solid var(--border-subtle)",
                          position: "relative",
                          transition: "all 0.3s ease",
                        }}
                      >
                        <div
                          style={{
                            width: "16px",
                            height: "16px",
                            borderRadius: "50%",
                            background: "#fff",
                            position: "absolute",
                            top: animations ? "2px" : "1px",
                            left: animations ? "18px" : "1px",
                            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                          }}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
            </AnimatePresence>
          </div>

          <motion.a
            href="#contact"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.85 }}
            className="text-xs font-semibold uppercase tracking-wider px-5 py-2.5 rounded-xl transition-all duration-300"
            style={{
              background: "var(--accent-dim)",
              color: "var(--accent)",
              border: "1px solid var(--accent-glow)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--accent)";
              e.currentTarget.style.color = "var(--bg-primary)";
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow = "0 4px 20px var(--accent-glow)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--accent-dim)";
              e.currentTarget.style.color = "var(--accent)";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Get In Touch
          </motion.a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{ color: "var(--text-primary)" }}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden"
            style={{
              background: "rgba(5, 5, 5, 0.95)",
              backdropFilter: "blur(20px)",
              borderBottom: "1px solid var(--border-subtle)",
            }}
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="text-sm font-medium uppercase tracking-widest py-2 transition-colors hover:text-[var(--accent)]"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href={personalInfo.resume}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.06 }}
                className="text-sm font-medium uppercase tracking-widest py-2 inline-flex items-center gap-2 transition-colors hover:text-[var(--accent)]"
                style={{ color: "var(--text-secondary)" }}
              >
                <FileText size={14} /> Resume
              </motion.a>

              {/* Mobile Theme Selector */}
              <div style={{ marginTop: "8px", paddingTop: "16px", borderTop: "1px solid var(--border-subtle)" }}>
                <p style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "12px" }}>
                  Theme
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "8px" }}>
                  {COLOR_PROFILES.map((profile) => {
                    const isActive = activeProfile.id === profile.id;
                    return (
                      <div
                        key={profile.id}
                        onClick={() => {
                          setProfile(profile.id);
                        }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          padding: "8px 10px",
                          borderRadius: "8px",
                          cursor: "pointer",
                          background: isActive ? "var(--accent-dim)" : "rgba(255,255,255,0.03)",
                          border: `1px solid ${isActive ? "var(--accent)" : "var(--border-subtle)"}`,
                        }}
                      >
                        <div style={{ display: "flex", gap: "3px" }}>
                          {profile.preview.slice(0, 2).map((color, i) => (
                            <div key={i} style={{ width: "12px", height: "12px", borderRadius: "3px", background: color }} />
                          ))}
                        </div>
                        <span style={{ fontSize: "11px", color: isActive ? "var(--accent)" : "var(--text-secondary)" }}>
                          {profile.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
