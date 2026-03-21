// ─── Portfolio Data ─────────────────────────────────────────────────────────

const personalInfo = {
  name: "Dhruv",
  roles: ["Full-Stack Developer", "DevOps Enthusiast", "ML Engineer"],
  tagline:
    "Designing data-driven applications that combine machine learning, scalable backends, and modern cloud infrastructure.",
  email: "dhruv1249.lm@gmail.com",
  phone: "+91 7876503573",
  github: "https://github.com/Dhruv1249",
  linkedin: "https://linkedin.com/in/dhruv-ds",
  resume: "https://drive.google.com/uc?export=download&id=1o-ec9gvMQjyXs09q_XlcKj9pg4hgCIqx",
};

const aboutText =
  `Computer Science undergraduate at Lovely Professional University with a focus on building end-to-end intelligent systems.\n
I enjoy working across the stack — from data ingestion and ML pipelines to backend services and production deployment. My work focuses on turning raw data into scalable, real-world applications.`;

const engineeringFocus = [
  {
    title: "Full-Stack Development",
    short: "React • Next.js • Node.js • TypeScript • MongoDB",
  },
  {
    title: "DevOps & Cloud",
    short: "Docker • GCP • Firebase • CI/CD • Git",
  },
  {
    title: "Machine Learning",
    short: "Regression • Time-Series • Data Pipelines • Python",
  },
];

export interface Project {
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  badge?: string;
  gradient: string;
  github: string;
  live?: string;
  image?: string;
  period?: string;
}

const featuredProjects: Project[] = [
  {
    title: "CALYX",
    subtitle: "Global Phenology Forecasting",
    description:
      "Climate analytics platform forecasting phenological patterns using ML and NASA MERRA-2, ERA5, iNaturalist datasets. ~75% prediction accuracy. Docker + GCP deployment.",
    tech: ["Python", "Docker", "GCP", "ML", "NASA APIs"],
    badge: "NASA Global Honorable Mention",
    gradient: "from-amber-500/20 via-orange-600/10 to-transparent",
    github: "https://github.com/Dhruv1249/Plant-Phenology-State-Detector",
    live: "https://plant-phenology-state-detector.vercel.app/",
    image: "/calyx.png",
    period: "Oct '25 — Nov '25",
  },
  {
    title: "UrbanSwap",
    subtitle: "AI Marketplace Listing Generator",
    description:
      "AI-powered platform converting product images into structured marketplace listings with titles, descriptions, and categories automatically.",
    tech: ["Next.js", "Firebase", "Gen AI", "TypeScript"],
    gradient: "from-violet-500/20 via-purple-600/10 to-transparent",
    github: "https://github.com/Dhruv1249/ai-marketplace-assistant",
    live: "https://ai-marketplace-assistant-162648101104.asia-south1.run.app/",
    image: "/urbanswap.png",
    period: "Sep '25",
  },
  {
    title: "PR Tracker",
    subtitle: "Developer Collaboration Monitor",
    description:
      "Centralized dashboard tracking pull request activity, review status, and merge progress across repositories using GitHub APIs.",
    tech: ["React", "Node.js", "GitHub API", "REST"],
    gradient: "from-cyan-500/20 via-blue-600/10 to-transparent",
    github: "https://github.com/Dhruv1249/Pr-Tracker",
    live: "https://pr-tracker-client.vercel.app/",
    image: "/pr-tracker.png",
    period: "Jan '26 — Feb '26",
  },
];

export interface AdditionalProject {
  title: string;
  short: string;
  tech: string[];
  github: string;
  live?: string;
  period?: string;
}

const additionalProjects: AdditionalProject[] = [
  {
    title: "Expense Tracker",
    short: "MERN-stack financial management with interactive dashboards",
    tech: ["React", "Node.js", "MongoDB", "REST"],
    github: "https://github.com/Dhruv1249/expense-react-client",
    live: "https://expense-react-client.vercel.app/",
    period: "Jan '26",
  },
  {
    title: "Neovim Config",
    short: "Custom dev environment with LSP, plugins & keybindings",
    tech: ["Lua", "Neovim", "LSP"],
    github: "https://github.com/Dhruv1249/my-customized-nvim-config",
    period: "Jan '26 — Present",
  },
];

const skills = {
  languages: ["Python", "TypeScript", "JavaScript", "C", "C++"],
  frontend: ["React", "Next.js", "Tailwind CSS", "HTML", "CSS"],
  backend: ["Node.js", "FastAPI", "REST APIs"],
  ml: ["Regression", "Time-Series", "Data Processing"],
  cloud: ["Docker", "GCP", "Firebase", "Git", "GitHub"],
};

const allTechNames = [
  "React",
  "Next.js",
  "TypeScript",
  "Python",
  "Node.js",
  "Docker",
  "GCP",
  "Firebase",
  "FastAPI",
  "MongoDB",
  "Tailwind",
  "Git",
  "C++",
  "REST APIs",
  "Machine Learning",
];

const experience = {
  role: "Freelance Full-Stack Developer",
  company: "Remote",
  period: "Nov '25 — Present",
  bullets: [
    "Developed responsive client websites focusing on UI/UX, mobile-first layouts, and performance optimization.",
    "Built front-end systems using Next.js, Tailwind CSS, and HTML/CSS with a focus on accessibility and clean component architecture.",
    "Automated enquiry workflows using NodeMailer and integrated Firebase with Google Sheets API for centralized lead management.",
    "Managed end-to-end project delivery from requirement gathering through deployment, using Git-based workflows and CI/CD pipelines.",
  ],
  tech: ["Next.js", "Tailwind CSS", "Firebase", "NodeMailer", "Google Sheets API", "SEO"],
};

const education = [
  {
    institution: "Lovely Professional University",
    location: "Punjab, India",
    degree: "B.Tech in Computer Science & Engineering",
    score: "CGPA: 8.66",
    period: "Aug '23 – Present",
  },
  {
    institution: "G.A.V Sr. Sec. School",
    location: "Kangra, Himachal Pradesh",
    degree: "Intermediate",
    score: "Percentage: 83%",
    period: "Apr '22 – Mar '23",
  },
  {
    institution: "M.V.M Public High School",
    location: "Kangra, Himachal Pradesh",
    degree: "Matriculation",
    score: "Percentage: 96%",
    period: "Apr '20 – Mar '21",
  },
];

const achievements = [
  {
    title: "NASA Space Apps Challenge",
    award: "Global Honorable Mention",
    detail: "One of the top 23 teams worldwide out of 11,000+ submissions",
    icon: "🏆",
    period: "Nov '25",
  },
  {
    title: "Innov-a-thon (NIT Rourkela)",
    award: "National Top 100",
    detail: "Competitive hackathon — rapid prototyping & system design",
    icon: "🥇",
    period: "Oct '25",
  },
];

const certifications = [
  {
    title: "Cloud Computing",
    issuer: "NPTEL",
    link: "https://drive.google.com/file/d/1oC01o8KJWbJgoAvF1imNXfG5KLEQgu9r/view?usp=sharing",
    image: "/cloud.png",
    period: "Apr '25",
  },
  {
    title: "Introduction to Large Language Models",
    issuer: "NPTEL",
    link: "https://drive.google.com/file/d/1Ypk5IU8V_YzrDsZ1wsVm00OnfqWnwZol/view?usp=sharing",
    image: "/llm.png",
    period: "Apr '25",
  },
];

export interface PortfolioData {
  personalInfo: typeof personalInfo;
  aboutText: typeof aboutText;
  engineeringFocus: typeof engineeringFocus;
  featuredProjects: Project[];
  additionalProjects: AdditionalProject[];
  skills: typeof skills;
  allTechNames: typeof allTechNames;
  experience: typeof experience;
  education: typeof education;
  achievements: typeof achievements;
  certifications: typeof certifications;
}

export const FALLBACK_PORTFOLIO_DATA: PortfolioData = {
  personalInfo,
  aboutText,
  engineeringFocus,
  featuredProjects,
  additionalProjects,
  skills,
  allTechNames,
  experience,
  education,
  achievements,
  certifications,
};

export {
  personalInfo,
  aboutText,
  engineeringFocus,
  featuredProjects,
  additionalProjects,
  skills,
  allTechNames,
  experience,
  education,
  achievements,
  certifications,
};
