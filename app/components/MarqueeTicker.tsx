"use client";

import { allTechNames } from "../data/portfolio-data";

export default function MarqueeTicker() {
  const doubled = [...allTechNames, ...allTechNames];

  return (
    <div className="w-full overflow-hidden py-8 border-t border-b"
      style={{ borderColor: "var(--border-subtle)" }}
    >
      <div className="marquee-track flex gap-12 whitespace-nowrap w-max">
        {doubled.map((tech, i) => (
          <span
            key={`${tech}-${i}`}
            className="text-sm font-mono tracking-widest uppercase"
            style={{ color: "var(--text-muted)" }}
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
