"use client";

import { ThemeProvider } from "./contexts/ThemeContext";
import Navbar from "./components/Navbar";
import HeroSection from "./sections/HeroSection";
import AboutSection from "./sections/AboutSection";
import ProjectsSection from "./sections/ProjectsSection";
import SkillsSection from "./sections/SkillsSection";
import ExperienceSection from "./sections/ExperienceSection";
import EducationSection from "./sections/EducationSection";
import AchievementsSection from "./sections/AchievementsSection";
import ContactSection from "./sections/ContactSection";

export default function Home() {
  return (
    <ThemeProvider>
      <Navbar />
      <main>
        <HeroSection />
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
        <AchievementsSection />
        <div className="section-divider" />
        <ContactSection />
      </main>
    </ThemeProvider>
  );
}
