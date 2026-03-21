"use client";

import { motion } from "framer-motion";
import { Terminal, ArrowRight, Code, Monitor, Cpu } from "lucide-react";

export default function TechPortfolioSection() {
  const techPortfolioUrl = process.env.NEXT_PUBLIC_TECH_PORTFOLIO_URL || "https://dhruv-portfolio-os.vercel.app";

  return (
    <section className="relative py-16 md:py-24 mb-12 md:mb-16 overflow-hidden">
      {/* Background Grid & Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)] opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-[300px] bg-[var(--accent)] blur-[120px] opacity-10 rounded-full" />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative group cursor-pointer"
          onClick={() => window.open(techPortfolioUrl, "_blank")}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
          
          <div className="relative bg-[var(--bg-card)] backdrop-blur-md border border-[var(--border-hover)] rounded-2xl p-6 sm:p-8 md:p-12 overflow-hidden shadow-2xl transition-all duration-500 group-hover:border-[var(--accent)] group-hover:-translate-y-1">
            
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[var(--accent)] opacity-50 rounded-tl-2xl" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[var(--accent)] opacity-50 rounded-br-2xl" />

            <div className="flex flex-col items-center gap-6">
              <div className="p-4 bg-[var(--accent-dim)] rounded-2xl border border-[var(--accent-glow)] text-[var(--accent)]">
                <Terminal size={40} strokeWidth={1.5} />
              </div>
              
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-3 tracking-tight">
                  Into deep tech experiences?
                </h3>
                <p className="text-[var(--text-secondary)] text-lg max-w-xl mx-auto leading-relaxed">
                  I also built an OS-style portfolio with terminal commands and layered interactions, mostly to show my creativity. It&apos;s intentionally time-consuming, so open it only when you have a few extra minutes to explore.
                </p>
              </div>

              <div className="flex items-center gap-3 sm:gap-4 text-[var(--accent)] font-medium mt-4 bg-[var(--accent-dim)] px-5 sm:px-6 py-3 rounded-xl border border-[var(--accent-glow)] group-hover:bg-[var(--accent)] group-hover:text-[var(--bg-primary)] transition-all duration-300">
                <span>Open If You Have Time</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </div>

              <div className="flex flex-wrap justify-center gap-3 sm:gap-6 mt-6 opacity-60">
                <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]"><Code size={16} /> React</div>
                <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]"><Monitor size={16} /> OS UI</div>
                <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]"><Cpu size={16} /> Time-Heavy</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
