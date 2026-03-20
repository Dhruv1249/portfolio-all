'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export interface ColorProfile {
  id: string;
  name: string;
  preview: string[];
  vars: Record<string, string>;
}

export const COLOR_PROFILES: ColorProfile[] = [
  {
    id: 'teal',
    name: 'Teal Dark',
    preview: ['#2dd4bf', '#14b8a6', '#050505', '#f5f5f5'],
    vars: {
      '--bg-primary': '#050505',
      '--bg-secondary': '#0a0a0a',
      '--bg-card': 'rgba(17, 17, 17, 0.6)',
      '--bg-card-solid': '#111111',
      '--bg-card-hover': 'rgba(22, 22, 22, 0.8)',
      '--border-subtle': 'rgba(255, 255, 255, 0.06)',
      '--border-hover': 'rgba(255, 255, 255, 0.15)',
      '--border-glass': 'rgba(255, 255, 255, 0.08)',
      '--text-primary': '#f5f5f5',
      '--text-secondary': '#a1a1aa',
      '--text-muted': '#52525b',
      '--accent': '#2dd4bf',
      '--accent-secondary': '#14b8a6',
      '--accent-dim': 'rgba(45, 212, 191, 0.12)',
      '--accent-glow': 'rgba(45, 212, 191, 0.25)',
      '--accent-bright': 'rgba(45, 212, 191, 0.6)',
    },
  },
  {
    id: 'tokyo-night',
    name: 'Tokyo Night',
    preview: ['#7aa2f7', '#bb9af7', '#0d0f18', '#c0caf5'],
    vars: {
      '--bg-primary': '#0d0f18',
      '--bg-secondary': '#141621',
      '--bg-card': 'rgba(26, 29, 46, 0.6)',
      '--bg-card-solid': '#1a1d2e',
      '--bg-card-hover': 'rgba(30, 34, 53, 0.8)',
      '--border-subtle': 'rgba(255, 255, 255, 0.06)',
      '--border-hover': 'rgba(255, 255, 255, 0.15)',
      '--border-glass': 'rgba(255, 255, 255, 0.08)',
      '--text-primary': '#c0caf5',
      '--text-secondary': '#a9b1d6',
      '--text-muted': '#565f89',
      '--accent': '#7aa2f7',
      '--accent-secondary': '#bb9af7',
      '--accent-dim': 'rgba(122, 162, 247, 0.12)',
      '--accent-glow': 'rgba(122, 162, 247, 0.25)',
      '--accent-bright': 'rgba(122, 162, 247, 0.6)',
    },
  },
  {
    id: 'catppuccin',
    name: 'Catppuccin Mocha',
    preview: ['#cba6f7', '#f38ba8', '#1e1e2e', '#cdd6f4'],
    vars: {
      '--bg-primary': '#1e1e2e',
      '--bg-secondary': '#181825',
      '--bg-card': 'rgba(49, 50, 68, 0.6)',
      '--bg-card-solid': '#313244',
      '--bg-card-hover': 'rgba(69, 71, 90, 0.8)',
      '--border-subtle': 'rgba(255, 255, 255, 0.06)',
      '--border-hover': 'rgba(255, 255, 255, 0.15)',
      '--border-glass': 'rgba(255, 255, 255, 0.08)',
      '--text-primary': '#cdd6f4',
      '--text-secondary': '#bac2de',
      '--text-muted': '#6c7086',
      '--accent': '#cba6f7',
      '--accent-secondary': '#f38ba8',
      '--accent-dim': 'rgba(203, 166, 247, 0.12)',
      '--accent-glow': 'rgba(203, 166, 247, 0.25)',
      '--accent-bright': 'rgba(203, 166, 247, 0.6)',
    },
  },
  {
    id: 'nord',
    name: 'Nord',
    preview: ['#88c0d0', '#81a1c1', '#2e3440', '#d8dee9'],
    vars: {
      '--bg-primary': '#2e3440',
      '--bg-secondary': '#3b4252',
      '--bg-card': 'rgba(67, 76, 94, 0.6)',
      '--bg-card-solid': '#434c5e',
      '--bg-card-hover': 'rgba(76, 86, 106, 0.8)',
      '--border-subtle': 'rgba(255, 255, 255, 0.06)',
      '--border-hover': 'rgba(255, 255, 255, 0.15)',
      '--border-glass': 'rgba(255, 255, 255, 0.08)',
      '--text-primary': '#d8dee9',
      '--text-secondary': '#e5e9f0',
      '--text-muted': '#4c566a',
      '--accent': '#88c0d0',
      '--accent-secondary': '#81a1c1',
      '--accent-dim': 'rgba(136, 192, 208, 0.12)',
      '--accent-glow': 'rgba(136, 192, 208, 0.25)',
      '--accent-bright': 'rgba(136, 192, 208, 0.6)',
    },
  },
  {
    id: 'dracula',
    name: 'Dracula',
    preview: ['#bd93f9', '#ff79c6', '#282a36', '#f8f8f2'],
    vars: {
      '--bg-primary': '#282a36',
      '--bg-secondary': '#21222c',
      '--bg-card': 'rgba(52, 55, 70, 0.6)',
      '--bg-card-solid': '#343746',
      '--bg-card-hover': 'rgba(68, 71, 90, 0.8)',
      '--border-subtle': 'rgba(255, 255, 255, 0.06)',
      '--border-hover': 'rgba(255, 255, 255, 0.15)',
      '--border-glass': 'rgba(255, 255, 255, 0.08)',
      '--text-primary': '#f8f8f2',
      '--text-secondary': '#ccc',
      '--text-muted': '#6272a4',
      '--accent': '#bd93f9',
      '--accent-secondary': '#ff79c6',
      '--accent-dim': 'rgba(189, 147, 249, 0.12)',
      '--accent-glow': 'rgba(189, 147, 249, 0.25)',
      '--accent-bright': 'rgba(189, 147, 249, 0.6)',
    },
  },
  {
    id: 'rose-pine',
    name: 'Rosé Pine',
    preview: ['#c4a7e7', '#ebbcba', '#191724', '#e0def4'],
    vars: {
      '--bg-primary': '#191724',
      '--bg-secondary': '#1f1d2e',
      '--bg-card': 'rgba(38, 35, 58, 0.6)',
      '--bg-card-solid': '#26233a',
      '--bg-card-hover': 'rgba(42, 40, 55, 0.8)',
      '--border-subtle': 'rgba(255, 255, 255, 0.06)',
      '--border-hover': 'rgba(255, 255, 255, 0.15)',
      '--border-glass': 'rgba(255, 255, 255, 0.08)',
      '--text-primary': '#e0def4',
      '--text-secondary': '#908caa',
      '--text-muted': '#6e6a86',
      '--accent': '#c4a7e7',
      '--accent-secondary': '#ebbcba',
      '--accent-dim': 'rgba(196, 167, 231, 0.12)',
      '--accent-glow': 'rgba(196, 167, 231, 0.25)',
      '--accent-bright': 'rgba(196, 167, 231, 0.6)',
    },
  },
  {
    id: 'gruvbox',
    name: 'Gruvbox',
    preview: ['#fabd2f', '#fe8019', '#1d2021', '#ebdbb2'],
    vars: {
      '--bg-primary': '#1d2021',
      '--bg-secondary': '#282828',
      '--bg-card': 'rgba(60, 56, 54, 0.6)',
      '--bg-card-solid': '#3c3836',
      '--bg-card-hover': 'rgba(80, 73, 69, 0.8)',
      '--border-subtle': 'rgba(255, 255, 255, 0.06)',
      '--border-hover': 'rgba(255, 255, 255, 0.15)',
      '--border-glass': 'rgba(255, 255, 255, 0.08)',
      '--text-primary': '#ebdbb2',
      '--text-secondary': '#d5c4a1',
      '--text-muted': '#665c54',
      '--accent': '#fabd2f',
      '--accent-secondary': '#fe8019',
      '--accent-dim': 'rgba(250, 189, 47, 0.12)',
      '--accent-glow': 'rgba(250, 189, 47, 0.25)',
      '--accent-bright': 'rgba(250, 189, 47, 0.6)',
    },
  },
];

interface ThemeContextType {
  activeProfile: ColorProfile;
  setProfile: (id: string) => void;
  animations: boolean;
  setAnimations: (val: boolean) => void;
  particleMode: string;
  setParticleMode: (mode: string) => void;
  fontScale: number;
  applyFontScale: (val: number) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  activeProfile: COLOR_PROFILES[0],
  setProfile: () => {},
  animations: true,
  setAnimations: () => {},
  particleMode: 'nodes',
  setParticleMode: () => {},
  fontScale: 1,
  applyFontScale: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [activeProfile, setActiveProfile] = useState<ColorProfile>(COLOR_PROFILES[0]);
  const [animations, setAnimationsState] = useState(true);
  const [particleMode, setParticleModeState] = useState<string>('nodes');
  const [fontScale, setFontScaleState] = useState(1);

  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-nontech-theme');
    if (savedTheme) {
      const found = COLOR_PROFILES.find(p => p.id === savedTheme);
      if (found) {
        setActiveProfile(found);
        applyTheme(found);
      }
    }

    const savedAnim = localStorage.getItem('portfolio-nontech-animations');
    if (savedAnim !== null) {
      const isEnabled = savedAnim === 'true';
      setAnimationsState(isEnabled);
      document.body.classList.toggle('disable-animations', !isEnabled);
    }

    const savedParticle = localStorage.getItem('portfolio-nontech-particles');
    if (savedParticle) {
      setParticleModeState(savedParticle);
    }

    const savedFontScale = localStorage.getItem('portfolio-nontech-font-scale');
    if (savedFontScale !== null) {
      const parsed = parseFloat(savedFontScale);
      const clamped = Math.max(0.7, Math.min(1.6, parsed));
      setFontScaleState(clamped);
      document.documentElement.style.setProperty('--font-scale', clamped.toString());
    }
  }, []);

  const setAnimations = useCallback((val: boolean) => {
    setAnimationsState(val);
    localStorage.setItem('portfolio-nontech-animations', val.toString());
    document.body.classList.toggle('disable-animations', !val);
  }, []);

  const setParticleMode = useCallback((mode: string) => {
    setParticleModeState(mode);
    localStorage.setItem('portfolio-nontech-particles', mode);
  }, []);

  const applyFontScale = useCallback((val: number) => {
    const clamped = Math.max(0.7, Math.min(1.6, val));
    setFontScaleState(clamped);
    localStorage.setItem('portfolio-nontech-font-scale', clamped.toString());
    document.documentElement.style.setProperty('--font-scale', clamped.toString());
  }, []);

  const applyTheme = useCallback((profile: ColorProfile) => {
    const root = document.documentElement;
    Object.entries(profile.vars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }, []);

  const setProfile = useCallback((id: string) => {
    const found = COLOR_PROFILES.find(p => p.id === id);
    if (found) {
      setActiveProfile(found);
      applyTheme(found);
      localStorage.setItem('portfolio-nontech-theme', id);
    }
  }, [applyTheme]);

  return (
    <ThemeContext.Provider value={{ activeProfile, setProfile, animations, setAnimations, particleMode, setParticleMode, fontScale, applyFontScale }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
