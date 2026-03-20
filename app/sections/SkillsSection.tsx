"use client";

import { motion } from "framer-motion";
import AnimateOnScroll from "../components/AnimateOnScroll";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiPython,
  SiNodedotjs,
  SiDocker,
  SiGooglecloud,
  SiFirebase,
  SiMongodb,
  SiTailwindcss,
  SiGit,
  SiGithub,
  SiFastapi,
  SiHtml5,
  SiCss,
  SiScikitlearn,
  SiNumpy,
  SiPandas,
  SiCplusplus,
  SiPostgresql,
  SiTensorflow,
} from "react-icons/si";
import { TbBinaryTree } from "react-icons/tb";

interface SkillItem {
  name: string;
  icon: React.ReactNode;
  color: string;
}

interface SkillCategory {
  title: string;
  skills: SkillItem[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    skills: [
      { name: "React", icon: <SiReact size={28} />, color: "#61DAFB" },
      { name: "Next.js", icon: <SiNextdotjs size={28} />, color: "#ffffff" },
      { name: "TypeScript", icon: <SiTypescript size={28} />, color: "#3178C6" },
      { name: "JavaScript", icon: <SiJavascript size={28} />, color: "#F7DF1E" },
      { name: "Tailwind", icon: <SiTailwindcss size={28} />, color: "#06B6D4" },
      { name: "HTML/CSS", icon: <SiHtml5 size={28} />, color: "#E34F26" },
    ],
  },
  {
    title: "Backend & Databases",
    skills: [
      { name: "Node.js", icon: <SiNodedotjs size={28} />, color: "#339933" },
      { name: "FastAPI", icon: <SiFastapi size={28} />, color: "#009688" },
      { name: "MongoDB", icon: <SiMongodb size={28} />, color: "#47A248" },
      { name: "Firebase", icon: <SiFirebase size={28} />, color: "#FFCA28" },
    ],
  },
  {
    title: "ML & Data Science",
    skills: [
      { name: "Python", icon: <SiPython size={28} />, color: "#3776AB" },
      { name: "scikit-learn", icon: <SiScikitlearn size={28} />, color: "#F7931E" },
      { name: "NumPy", icon: <SiNumpy size={28} />, color: "#013243" },
      { name: "Pandas", icon: <SiPandas size={28} />, color: "#150458" },
      { name: "XGBoost", icon: <TbBinaryTree size={28} />, color: "#FF6600" },
    ],
  },
  {
    title: "Cloud & DevOps",
    skills: [
      { name: "Docker", icon: <SiDocker size={28} />, color: "#2496ED" },
      { name: "GCP", icon: <SiGooglecloud size={28} />, color: "#4285F4" },
      { name: "Git", icon: <SiGit size={28} />, color: "#F05032" },
      { name: "GitHub", icon: <SiGithub size={28} />, color: "#ffffff" },
      { name: "CI/CD", icon: <SiGit size={28} />, color: "#E44332" },
      { name: "Cloud Run", icon: <SiGooglecloud size={28} />, color: "#4285F4" },
    ],
  },
];

// Flatten for marquee
const allSkills = skillCategories.flatMap((c) => c.skills);
const trailRow1 = [...allSkills.slice(0, 12), ...allSkills.slice(0, 12)];
const trailRow2 = [...allSkills.slice(12), ...allSkills.slice(12)];

export default function SkillsSection() {
  return (
    <section id="skills" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <AnimateOnScroll>
          <div className="text-center mb-20">
            <p
              className="text-3xl md:text-5xl font-bold tracking-tight mb-4"
              style={{ color: "var(--accent)" }}
            >
              Tech Stack
            </p>
            <h2 className="text-lg md:text-xl font-medium tracking-normal mb-4">
              <span className="gradient-text">Core Toolkit</span>
            </h2>
            <p
              className="text-base md:text-lg max-w-xl mx-auto"
              style={{ color: "var(--text-muted)" }}
            >
              Technologies I work with daily to build production-ready systems.
            </p>
          </div>
        </AnimateOnScroll>

        {/* 2×2 Symmetric Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((category, catIdx) => (
            <AnimateOnScroll key={category.title} delay={catIdx * 0.1}>
              <div className="glass-card-static p-8 h-full">
                <h3
                  className="text-sm font-mono tracking-[0.2em] mb-8 text-center"
                  style={{ color: "var(--accent)" }}
                >
                  {category.title}
                </h3>
                {/* Flex layout for symmetry — centers rows naturally */}
                <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                  {category.skills.map((skill) => (
                    <motion.div
                      key={skill.name}
                      className="skill-icon-card w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-0.75rem)] min-w-[84px]"
                      whileHover={{ scale: 1.08, y: -6 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    >
                      <span
                        className="skill-icon transition-all duration-300"
                        style={{ color: skill.color }}
                      >
                        {skill.icon}
                      </span>
                      <span
                        className="text-[10px] md:text-xs font-medium text-center leading-tight"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>

      {/* Moving Icon Trail */}
      <div className="mt-16 md:mt-20 py-8 md:py-10 space-y-4 md:space-y-5 overflow-hidden">
        <div className="overflow-hidden">
          <div className="marquee-track flex gap-4 md:gap-6 w-max">
            {trailRow1.map((skill, i) => (
              <div
                key={`r1-${skill.name}-${i}`}
                className="flex items-center gap-2.5 md:gap-3 px-4 md:px-5 py-2.5 md:py-3 rounded-full shrink-0"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid var(--border-subtle)",
                }}
              >
                <span style={{ color: skill.color, opacity: 0.7 }}>{skill.icon}</span>
                <span
                  className="text-sm font-medium whitespace-nowrap"
                  style={{ color: "var(--text-muted)" }}
                >
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="overflow-hidden">
          <div className="marquee-track-reverse flex gap-4 md:gap-6 w-max">
            {trailRow2.map((skill, i) => (
              <div
                key={`r2-${skill.name}-${i}`}
                className="flex items-center gap-2.5 md:gap-3 px-4 md:px-5 py-2.5 md:py-3 rounded-full shrink-0"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid var(--border-subtle)",
                }}
              >
                <span style={{ color: skill.color, opacity: 0.7 }}>{skill.icon}</span>
                <span
                  className="text-sm font-medium whitespace-nowrap"
                  style={{ color: "var(--text-muted)" }}
                >
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
