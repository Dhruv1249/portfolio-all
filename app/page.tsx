"use client";

import { useState, useEffect } from "react";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import { PortfolioDataProvider } from "./contexts/PortfolioDataContext";
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
  const [minCycleDone, setMinCycleDone] = useState(false);

  useEffect(() => {
    const MIN_ANIMATION_MS = 2200;
    const timer = window.setTimeout(() => {
      setMinCycleDone(true);
    }, MIN_ANIMATION_MS);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  const isLoading = !minCycleDone;

  return (
    <>
      <TerminalLoader isLoading={isLoading} />
      {!isLoading && (
        <>
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
