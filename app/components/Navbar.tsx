"use client";

import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, FileText, Palette, Check, ChevronDown, Terminal, Zap } from "lucide-react";
import { useTheme, COLOR_PROFILES } from "../contexts/ThemeContext";
import { usePortfolioData } from "../contexts/PortfolioDataContext";

const navLinks = [
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Certificates", href: "#certificates" },
  { label: "Achievements", href: "#achievements" },
];

const desktopItems = [
  ...navLinks,
  { label: "Resume", href: "#", download: "Dhruv_Resume.pdf" },
];

export default function Navbar() {
  const { data } = usePortfolioData();

  const FONT_MIN = 70;
  const FONT_MAX = 160;
  const DESKTOP_NAV_START_OFFSET = 160;

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(desktopItems.length);
  const [pendingFontScale, setPendingFontScale] = useState(1);

  const navRef = useRef<HTMLDivElement>(null);
  const desktopNavRowRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const themeRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);
  const measureRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const moreMeasureRef = useRef<HTMLSpanElement>(null);
  const visibleCountRef = useRef(visibleCount);
  const rafIdRef = useRef<number | null>(null);

  const { activeProfile, setProfile, animations, setAnimations, particleMode, setParticleMode, fontScale, applyFontScale } = useTheme();

  const navItems = [
    ...navLinks,
    { label: "Resume", href: data.personalInfo.resume, download: "Dhruv_Resume.pdf" },
  ];

  const visibleItems = navItems.slice(0, visibleCount);
  const overflowItems = navItems.slice(visibleCount);

  useEffect(() => {
    if (overflowItems.length === 0 && moreOpen) {
      setMoreOpen(false);
    }
  }, [overflowItems.length, moreOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (themeRef.current && !themeRef.current.contains(e.target as Node)) {
        setThemeOpen(false);
      }
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    setPendingFontScale(fontScale);
  }, [fontScale]);

  useEffect(() => {
    visibleCountRef.current = visibleCount;
  }, [visibleCount]);

  useLayoutEffect(() => {
    const MIN_GAP = 24;

    const recompute = () => {
      rafIdRef.current = null;

      if (!window.matchMedia("(min-width: 768px)").matches) {
        if (visibleCountRef.current !== navItems.length) {
          visibleCountRef.current = navItems.length;
          setVisibleCount(navItems.length);
        }
        return;
      }

      if (!logoRef.current || !navItemsRef.current || !controlsRef.current) return;

      const logoRect = logoRef.current.getBoundingClientRect();
      const controlsRect = controlsRef.current.getBoundingClientRect();
      const itemGap = parseFloat(getComputedStyle(navItemsRef.current).gap || "24");
      const moreButtonWidth = (moreMeasureRef.current?.offsetWidth ?? 52) + 18;

      const availableWidth = Math.max(
        0,
        controlsRect.left - logoRect.right - MIN_GAP * 2 - DESKTOP_NAV_START_OFFSET,
      );
      const itemWidths = navItems.map((item, i) => {
        const labelWidth = measureRefs.current[i]?.offsetWidth ?? 92;
        return labelWidth + (item.label === "Resume" ? 22 : 0);
      });

      const widthForCount = (count: number) => {
        let width = 0;

        for (let i = 0; i < count; i += 1) {
          width += itemWidths[i];
        }

        if (count > 1) {
          width += (count - 1) * itemGap;
        }

        if (count < navItems.length) {
          width += moreButtonWidth + (count > 0 ? itemGap : 0);
        }

        return width;
      };

      let targetCount = 0;
      for (let count = 0; count <= navItems.length; count += 1) {
        if (widthForCount(count) <= availableWidth) {
          targetCount = count;
        } else {
          break;
        }
      }

      if (targetCount !== visibleCountRef.current) {
        visibleCountRef.current = targetCount;
        setVisibleCount(targetCount);
      }
    };

    const run = () => {
      if (rafIdRef.current !== null) return;
      rafIdRef.current = window.requestAnimationFrame(recompute);
    };

    run();

    const ro = new ResizeObserver(run);
    if (navRef.current) ro.observe(navRef.current);
    if (desktopNavRowRef.current) ro.observe(desktopNavRowRef.current);
    if (navItemsRef.current) ro.observe(navItemsRef.current);
    if (controlsRef.current) ro.observe(controlsRef.current);
    if (logoRef.current) ro.observe(logoRef.current);
    window.addEventListener("resize", run);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", run);
      if (rafIdRef.current !== null) {
        window.cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [fontScale, DESKTOP_NAV_START_OFFSET, navItems]);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
      className="sticky top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(5, 5, 5, 0.7)" : "transparent",
        backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
        borderBottom: scrolled ? "1px solid var(--border-subtle)" : "1px solid transparent",
      }}
    >
      <div
        style={{
          position: "fixed",
          top: -9999,
          left: -9999,
          visibility: "hidden",
          pointerEvents: "none",
          whiteSpace: "nowrap",
        }}
      >
        {navItems.map((item, i) => (
          <span
            key={`measure-${item.label}`}
            ref={(el) => {
              measureRefs.current[i] = el;
            }}
            style={{ fontSize: "1.1rem", fontWeight: 500 }}
          >
            {item.label}
          </span>
        ))}
        <span
          ref={moreMeasureRef}
          style={{ fontSize: "1rem", fontWeight: 500 }}
        >
          More
        </span>
      </div>

      <div
        ref={navRef}
        className="max-w-7xl mx-auto px-6 md:px-12 flex items-center h-20 md:h-24"
        style={{ gap: "2rem", justifyContent: "space-between" }}
      >
        {/* Logo */}
        <a
          ref={logoRef}
          href="#"
          className="font-bold tracking-tight"
          style={{ color: "var(--text-primary)", fontSize: "1.9rem", whiteSpace: "nowrap", flexShrink: 0 }}
        >
          Dhruv<span style={{ color: "var(--accent)" }}>.</span>
        </a>

        {/* Desktop Nav */}
        <div
          ref={desktopNavRowRef}
          className="hidden md:flex items-center"
          style={{
            flex: 1,
            justifyContent: "flex-end",
            gap: "1.5rem",
            minWidth: 0,
            overflow: "visible",
            paddingLeft: `${DESKTOP_NAV_START_OFFSET}px`,
          }}
        >
          <div ref={navItemsRef} style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexShrink: 0 }}>
            {/* Visible nav items */}
            {visibleItems.map((item, i) => (
              <motion.a
                key={item.href}
                href={item.href}
                download={item.label === "Resume" ? "Dhruv_Resume.pdf" : undefined}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.08 }}
                className="transition-colors duration-300 hover:text-[var(--accent)] inline-flex items-center"
                style={{
                  color: "var(--text-muted)",
                  fontSize: "1.1rem",
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                  textDecoration: "none",
                  gap: item.label === "Resume" ? "0.35rem" : 0,
                }}
              >
                {item.label === "Resume" && <FileText size={17} />}
                {item.label}
              </motion.a>
            ))}

            {/* More dropdown */}
            {overflowItems.length > 0 && (
              <div ref={moreRef} style={{ position: "relative", flexShrink: 0 }}>
                <button
                  onClick={() => setMoreOpen((v) => !v)}
                  className="inline-flex items-center gap-1 transition-colors duration-300 hover:text-[var(--accent)]"
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "1rem",
                    fontWeight: 500,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    whiteSpace: "nowrap",
                  }}
                >
                  More <ChevronDown size={15} />
                </button>

                <AnimatePresence>
                  {moreOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.97 }}
                      transition={{ duration: 0.18 }}
                      style={{
                        position: "absolute",
                        top: "calc(100% + 12px)",
                        right: 0,
                        width: "220px",
                        background: "var(--bg-secondary)",
                        border: "1px solid var(--border-subtle)",
                        borderRadius: "12px",
                        padding: "8px",
                        backdropFilter: "blur(16px)",
                        boxShadow: "0 20px 48px rgba(0,0,0,0.45)",
                        zIndex: 120,
                      }}
                    >
                      {overflowItems.map((item) => (
                        <a
                          key={item.href}
                          href={item.href}
                          download={item.label === "Resume" ? "Dhruv_Resume.pdf" : undefined}
                          onClick={() => setMoreOpen(false)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            padding: "9px 12px",
                            borderRadius: "8px",
                            color: "var(--text-secondary)",
                            textDecoration: "none",
                            fontSize: "0.95rem",
                            fontWeight: 500,
                            transition: "background 0.15s",
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = "var(--accent-dim)")}
                          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                        >
                          {item.label === "Resume" && <FileText size={15} />}
                          {item.label}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Static controls: Theme + Get in Touch — measured via controlsRef */}
          <div
            ref={controlsRef}
            style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexShrink: 0 }}
          >
            {/* Theme Selector */}
            <div ref={themeRef} style={{ position: "relative" }}>
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                onClick={() => setThemeOpen(!themeOpen)}
                className="inline-flex items-center gap-1.5 transition-colors duration-300 hover:text-[var(--accent)]"
                style={{
                  color: "var(--text-muted)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontSize: "1.1rem",
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                }}
              >
                <Palette size={18} /> Theme
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
                    <p style={{ fontSize: "12px", letterSpacing: "0.05em", color: "var(--text-muted)", marginBottom: "8px", padding: "0 4px" }}>
                      Color Profile
                    </p>
                    {COLOR_PROFILES.map((profile) => {
                      const isActive = activeProfile.id === profile.id;
                      return (
                        <div
                          key={profile.id}
                          onClick={() => { setProfile(profile.id); setThemeOpen(false); }}
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

                    <div style={{ height: "1px", background: "var(--border-subtle)", margin: "8px 0" }} />
                    <p style={{ fontSize: "0.75rem", letterSpacing: "0.05em", color: "var(--text-muted)", marginBottom: "0.5rem", padding: "0 0.25rem" }}>
                      Global Font Size
                    </p>
                    <div style={{ padding: "6px 4px 10px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                        <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>Scale</span>
                        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                          <input
                            className="font-scale-input"
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            min={FONT_MIN}
                            max={FONT_MAX}
                            step={1}
                            value={Math.round(pendingFontScale * 100)}
                            onChange={(e) => {
                              const val = parseInt(e.target.value, 10);
                              if (!Number.isNaN(val)) {
                                setPendingFontScale(val / 100);
                              }
                            }}
                            onBlur={(e) => {
                              const val = parseInt(e.target.value || `${FONT_MIN}`, 10);
                              const clamped = Math.max(FONT_MIN, Math.min(FONT_MAX, Number.isNaN(val) ? FONT_MIN : val));
                              setPendingFontScale(clamped / 100);
                            }}
                            style={{
                              width: "62px",
                              color: "var(--accent)",
                              background: "transparent",
                              border: "1px solid var(--border-subtle)",
                              borderRadius: "6px",
                              fontWeight: 700,
                              fontSize: "0.875rem",
                              fontFamily: "monospace",
                              textAlign: "right",
                              padding: "4px 6px",
                            }}
                          />
                          <span style={{ color: "var(--accent)", fontSize: "0.875rem", fontWeight: 700 }}>%</span>
                        </div>
                      </div>
                      <input
                        type="range"
                        min={FONT_MIN}
                        max={FONT_MAX}
                        value={Math.round(pendingFontScale * 100)}
                        onChange={(e) => setPendingFontScale(parseInt(e.target.value, 10) / 100)}
                        style={{
                          width: "100%",
                          height: "6px",
                          WebkitAppearance: "none",
                          appearance: "none",
                          background: `linear-gradient(to right, var(--accent) 0%, var(--accent) ${((pendingFontScale - 0.7) / 0.9) * 100}%, var(--bg-card-solid) ${((pendingFontScale - 0.7) / 0.9) * 100}%, var(--bg-card-solid) 100%)`,
                          borderRadius: "999px",
                          outline: "none",
                          cursor: "pointer",
                          marginBottom: "10px",
                        }}
                      />
                      <button
                        onClick={() => applyFontScale(pendingFontScale)}
                        disabled={Math.abs(pendingFontScale - fontScale) < 0.005}
                        style={{
                          width: "100%",
                          borderRadius: "10px",
                          padding: "8px 10px",
                          border: `1px solid ${Math.abs(pendingFontScale - fontScale) < 0.005 ? "var(--border-subtle)" : "var(--accent)"}`,
                          background: Math.abs(pendingFontScale - fontScale) < 0.005 ? "transparent" : "var(--accent-dim)",
                          color: Math.abs(pendingFontScale - fontScale) < 0.005 ? "var(--text-muted)" : "var(--accent)",
                          fontSize: "12px",
                          fontWeight: 600,
                          cursor: Math.abs(pendingFontScale - fontScale) < 0.005 ? "not-allowed" : "pointer",
                        }}
                      >
                        Apply
                      </button>
                    </div>

                    <div style={{ height: "1px", background: "var(--border-subtle)", margin: "8px 0" }} />
                    <p style={{ fontSize: "0.75rem", letterSpacing: "0.05em", color: "var(--text-muted)", marginBottom: "0.5rem", padding: "0 0.25rem" }}>
                      Particles
                    </p>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "4px" }}>
                      {[
                        { id: "none", name: "None" },
                        { id: "nodes", name: "Nodes" },
                        { id: "rain", name: "Rain" },
                        { id: "floatinglines", name: "Lines" },
                        { id: "starfield", name: "Stars" },
                        { id: "galaxy", name: "Galaxy" },
                        { id: "threads", name: "Threads" },
                        { id: "lightrays", name: "Rays" },
                      ].map((effect) => {
                        const isActive = particleMode === effect.id;
                        return (
                          <div
                            key={effect.id}
                            onClick={() => setParticleMode(effect.id)}
                            style={{
                              padding: "6px 4px",
                              textAlign: "center",
                              borderRadius: "8px",
                              cursor: "pointer",
                              background: isActive ? "var(--accent-dim)" : "transparent",
                              color: isActive ? "var(--accent)" : "var(--text-secondary)",
                              fontSize: "11px",
                              transition: "background 0.2s",
                            }}
                          >
                            {effect.name}
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Tech Portfolio */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              style={{ position: "relative" }}
              className="group"
            >
              <motion.a
                href={process.env.NEXT_PUBLIC_TECH_PORTFOLIO_URL || "https://dhruv-portfolio-os.vercel.app"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold tracking-wide px-4 py-2.5 rounded-xl transition-all duration-300 flex items-center gap-2 relative"
                style={{
                  background: "linear-gradient(135deg, rgba(168, 85, 247, 0.15) 0%, rgba(139, 92, 246, 0.1) 100%)",
                  color: "var(--accent)",
                  border: "1px solid var(--accent-glow)",
                  whiteSpace: "nowrap",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "linear-gradient(135deg, rgba(168, 85, 247, 0.25) 0%, rgba(139, 92, 246, 0.15) 100%)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(168, 85, 247, 0.25)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "linear-gradient(135deg, rgba(168, 85, 247, 0.15) 0%, rgba(139, 92, 246, 0.1) 100%)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <Terminal size={16} />
                <span>Tech Portfolio</span>
                <Zap size={13} fill="currentColor" />
              </motion.a>

              {/* Tooltip */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                style={{
                  position: "absolute",
                  bottom: "100%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  marginBottom: "8px",
                  background: "var(--bg-secondary)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "8px",
                  padding: "8px 12px",
                  fontSize: "11px",
                  color: "var(--text-secondary)",
                  whiteSpace: "nowrap",
                  opacity: 0,
                  pointerEvents: "none",
                  zIndex: 1000,
                }}
                className="group-hover:opacity-100"
              >
                Advanced UI — best on desktop
              </motion.div>
            </motion.div>

            {/* Get in Touch */}
            <motion.a
              href="#contact"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.85 }}
              className="text-sm font-semibold tracking-wide px-5 py-2.5 rounded-xl transition-all duration-300"
              style={{
                background: "var(--accent-dim)",
                color: "var(--accent)",
                border: "1px solid var(--accent-glow)",
                whiteSpace: "nowrap",
                textDecoration: "none",
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
              Get in Touch
            </motion.a>
          </div>
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
            <div
              className="px-6 py-6 flex flex-col gap-4"
              style={{
                maxHeight: "calc(100dvh - 5rem)",
                overflowY: "auto",
                overscrollBehavior: "contain",
                paddingBottom: "max(1.25rem, env(safe-area-inset-bottom))",
              }}
            >
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="text-base font-medium tracking-widest py-2 transition-colors hover:text-[var(--accent)]"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href={data.personalInfo.resume}
                download="Dhruv_Resume.pdf"
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.06 }}
                className="text-base font-medium tracking-wide py-2 inline-flex items-center gap-2 transition-colors hover:text-[var(--accent)]"
                style={{ color: "var(--text-secondary)", fontSize: "1.1rem" }}
              >
                <FileText size={18} /> Resume
              </motion.a>

              {/* Mobile Action Buttons */}
              <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: "1px solid var(--border-subtle)", display: "flex", flexDirection: "column", gap: "10px" }}>
                <motion.a
                  href={process.env.NEXT_PUBLIC_TECH_PORTFOLIO_URL || "https://dhruv-portfolio-os.vercel.app"}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (navLinks.length + 1) * 0.06 }}
                  className="text-base font-semibold tracking-wide py-2 inline-flex items-center gap-2 rounded-lg transition-colors"
                  style={{
                    background: "linear-gradient(135deg, rgba(168, 85, 247, 0.15) 0%, rgba(139, 92, 246, 0.1) 100%)",
                    color: "var(--accent)",
                    border: "1px solid var(--accent-glow)",
                    textDecoration: "none",
                  }}
                >
                  <Terminal size={16} />
                  <span>Tech Portfolio</span>
                  <Zap size={13} fill="currentColor" />
                </motion.a>

                <motion.a
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (navLinks.length + 2) * 0.06 }}
                  className="text-base font-semibold tracking-wide py-2 text-center rounded-lg transition-colors"
                  style={{
                    background: "var(--accent-dim)",
                    color: "var(--accent)",
                    border: "1px solid var(--accent-glow)",
                    textDecoration: "none",
                  }}
                >
                  Get in Touch
                </motion.a>
              </div>

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
                        onClick={() => setProfile(profile.id)}
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

                <div style={{ marginTop: "16px" }}>
                  <p style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "12px" }}>
                    Font Size
                  </p>
                  <div style={{ display: "grid", gap: "10px", marginBottom: "14px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>Global Scale</span>
                      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        <input
                          className="font-scale-input"
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          min={FONT_MIN}
                          max={FONT_MAX}
                          step={1}
                          value={Math.round(pendingFontScale * 100)}
                          onChange={(e) => {
                            const val = parseInt(e.target.value, 10);
                            if (!Number.isNaN(val)) {
                              setPendingFontScale(val / 100);
                            }
                          }}
                          onBlur={(e) => {
                            const val = parseInt(e.target.value || `${FONT_MIN}`, 10);
                            const clamped = Math.max(FONT_MIN, Math.min(FONT_MAX, Number.isNaN(val) ? FONT_MIN : val));
                            setPendingFontScale(clamped / 100);
                          }}
                          style={{
                            width: "62px",
                            color: "var(--accent)",
                            background: "transparent",
                            border: "1px solid var(--border-subtle)",
                            borderRadius: "6px",
                            fontWeight: 700,
                            fontSize: "0.875rem",
                            fontFamily: "monospace",
                            textAlign: "right",
                            padding: "4px 6px",
                          }}
                        />
                        <span style={{ color: "var(--accent)", fontSize: "0.875rem", fontWeight: 700 }}>%</span>
                      </div>
                    </div>
                    <input
                      type="range"
                      min={FONT_MIN}
                      max={FONT_MAX}
                      value={Math.round(pendingFontScale * 100)}
                      onChange={(e) => setPendingFontScale(parseInt(e.target.value, 10) / 100)}
                      style={{
                        width: "100%",
                        height: "6px",
                        WebkitAppearance: "none",
                        appearance: "none",
                        background: `linear-gradient(to right, var(--accent) 0%, var(--accent) ${((pendingFontScale - 0.7) / 0.9) * 100}%, var(--bg-card-solid) ${((pendingFontScale - 0.7) / 0.9) * 100}%, var(--bg-card-solid) 100%)`,
                        borderRadius: "999px",
                        outline: "none",
                        cursor: "pointer",
                      }}
                    />
                    <button
                      onClick={() => applyFontScale(pendingFontScale)}
                      disabled={Math.abs(pendingFontScale - fontScale) < 0.005}
                      style={{
                        borderRadius: "8px",
                        padding: "8px",
                        border: `1px solid ${Math.abs(pendingFontScale - fontScale) < 0.005 ? "var(--border-subtle)" : "var(--accent)"}`,
                        background: Math.abs(pendingFontScale - fontScale) < 0.005 ? "rgba(255,255,255,0.03)" : "var(--accent-dim)",
                        color: Math.abs(pendingFontScale - fontScale) < 0.005 ? "var(--text-muted)" : "var(--accent)",
                        fontSize: "12px",
                        fontWeight: 600,
                        cursor: Math.abs(pendingFontScale - fontScale) < 0.005 ? "not-allowed" : "pointer",
                      }}
                    >
                      Apply
                    </button>
                  </div>

                  <p style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "12px" }}>
                    Particles
                  </p>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "8px" }}>
                    {[
                      { id: "none", name: "None" },
                      { id: "nodes", name: "Nodes" },
                      { id: "rain", name: "Rain" },
                      { id: "floatinglines", name: "Lines" },
                      { id: "starfield", name: "Stars" },
                      { id: "galaxy", name: "Galaxy" },
                      { id: "threads", name: "Threads" },
                      { id: "lightrays", name: "Rays" },
                    ].map((effect) => {
                      const isActive = particleMode === effect.id;
                      return (
                        <div
                          key={effect.id}
                          onClick={() => setParticleMode(effect.id)}
                          style={{
                            padding: "8px",
                            textAlign: "center",
                            borderRadius: "8px",
                            cursor: "pointer",
                            background: isActive ? "var(--accent-dim)" : "rgba(255,255,255,0.03)",
                            border: `1px solid ${isActive ? "var(--accent)" : "var(--border-subtle)"}`,
                            color: isActive ? "var(--accent)" : "var(--text-secondary)",
                            fontSize: "11px",
                            fontWeight: isActive ? 500 : 400,
                          }}
                        >
                          {effect.name}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}