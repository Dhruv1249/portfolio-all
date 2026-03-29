"use client";

import { useState, useEffect } from "react";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import { PortfolioDataProvider, usePortfolioData } from "./contexts/PortfolioDataContext";
import Navbar from "./components/Navbar";
import ParticleBackground from "./components/ParticleBackground";
import TerminalLoader from "./components/TerminalLoader";

function ParticleWrapper() {
  const { particleMode } = useTheme();
  return <ParticleBackground mode={particleMode as any} />;
}
import HeroSection from "./sections/HeroSection";
import AboutSection from "./sections/AboutSection";
import TechPortfolioSection from "./sections/TechPortfolioSection";
import ProjectsSection from "./sections/ProjectsSection";
import SkillsSection from "./sections/SkillsSection";
import ExperienceSection from "./sections/ExperienceSection";
import EducationSection from "./sections/EducationSection";
import CertificatesSection from "./sections/CertificatesSection";
import AchievementsSection from "./sections/AchievementsSection";
import ContactSection from "./sections/ContactSection";

function PageContent() {
  const { loading: dataLoading } = usePortfolioData();
  const [minCycleDone, setMinCycleDone] = useState(false);
  const [showWelcomeGuide, setShowWelcomeGuide] = useState(false);

  useEffect(() => {
    const MIN_ANIMATION_MS = 2200;
    const timer = window.setTimeout(() => {
      setMinCycleDone(true);
    }, MIN_ANIMATION_MS);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!minCycleDone || dataLoading || typeof window === "undefined") return;

    const key = "portfolio-nontech-startup-guide-seen";
    const hasSeenGuide = localStorage.getItem(key) === "true";

    if (!hasSeenGuide) {
      setShowWelcomeGuide(true);
    }
  }, [minCycleDone, dataLoading]);

  const dismissWelcomeGuide = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("portfolio-nontech-startup-guide-seen", "true");
    }
    setShowWelcomeGuide(false);
  };

  const isLoading = !minCycleDone || dataLoading;

  return (
    <>
      <TerminalLoader isLoading={isLoading} />
      {!isLoading && (
        <>
          {showWelcomeGuide && (
            <div
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 1200,
                background: "rgba(0, 0, 0, 0.62)",
                backdropFilter: "blur(6px)",
                display: "grid",
                placeItems: "center",
                padding: "1rem",
              }}
              role="dialog"
              aria-modal="true"
              aria-label="Portfolio quick guide"
            >
              <div
                style={{
                  width: "min(680px, 100%)",
                  background: "var(--bg-secondary)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "18px",
                  padding: "1.2rem",
                  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
                }}
              >
                <p style={{ color: "var(--accent)", fontSize: "0.78rem", letterSpacing: "0.08em", marginBottom: "0.35rem", fontWeight: 700 }}>
                  QUICK GUIDE
                </p>
                <h2 style={{ fontSize: "1.35rem", marginBottom: "0.75rem", color: "var(--text-primary)", fontWeight: 700 }}>
                  Welcome. Try themes and personalization options.
                </h2>
                <p style={{ color: "var(--text-secondary)", marginBottom: "0.9rem" }}>
                  Open the Theme menu in the navbar to switch color profiles and personalize your view.
                </p>
                <ul style={{ color: "var(--text-secondary)", paddingLeft: "1.1rem", marginBottom: "1.1rem", lineHeight: 1.7 }}>
                  <li>Change color themes from the Theme button.</li>
                  <li>Toggle animations on or off.</li>
                  <li>Adjust global font size for readability.</li>
                  <li>Switch particle backgrounds (including none).</li>
                </ul>
                <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", marginBottom: "1rem" }}>
                  On mobile, open the menu icon to access sections and quick actions.
                </p>
                <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.6rem" }}>
                  <button
                    onClick={dismissWelcomeGuide}
                    style={{
                      border: "1px solid var(--accent-glow)",
                      background: "var(--accent-dim)",
                      color: "var(--accent)",
                      padding: "0.6rem 0.95rem",
                      borderRadius: "10px",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          )}
          <ParticleWrapper />
          <Navbar />
          <main>
            <HeroSection />
            <div className="section-divider" />
            <TechPortfolioSection />
            <div className="section-divider" />
            <AboutSection />
            <div className="section-divider" />
            <ProjectsSection />
            <div className="section-divider" />
            <SkillsSection />
            <div className="section-divider" />
            <ExperienceSection />
            <div className="section-divider" />
            <EducationSection />
            <div className="section-divider" />
            <CertificatesSection />
            <div className="section-divider" />
            <AchievementsSection />
            <div className="section-divider" />
            <ContactSection />
          </main>
        </>
      )}
    </>
  );
}

export default function Home() {
  return (
    <ThemeProvider>
      <PortfolioDataProvider>
        <PageContent />
      </PortfolioDataProvider>
    </ThemeProvider>
  );
}
