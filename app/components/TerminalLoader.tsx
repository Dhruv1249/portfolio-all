"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const loadingMessages = [
  "$ sudo init portfolio --load-essence",
  "$ Fetching achievements from database...",
  "$ Compiling projects into memory...",
  "$ Loading neural networks...",
  "$ Retrieving certifications...",
  "$ Initializing experience cache...",
  "$ Syncing education records...",
  "$ Ready to showcase work...",
  "$ Welcome aboard! ✓",
];

interface TerminalLoaderProps {
  isLoading: boolean;
  onComplete?: () => void;
}

export default function TerminalLoader({ isLoading, onComplete }: TerminalLoaderProps) {
  const [displayedMessages, setDisplayedMessages] = useState<string[]>([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (!isLoading) {
      return;
    }

    const timer = setTimeout(() => {
      if (currentMessageIndex < loadingMessages.length) {
        const currentMessage = loadingMessages[currentMessageIndex];

        if (charIndex < currentMessage.length) {
          // Typing effect
          setDisplayedMessages((prev) => {
            const updated = [...prev];
            if (updated[currentMessageIndex]) {
              updated[currentMessageIndex] += currentMessage[charIndex];
            } else {
              updated[currentMessageIndex] = currentMessage[charIndex];
            }
            return updated;
          });
          setCharIndex(charIndex + 1);
        } else {
          // Move to next message
          setCurrentMessageIndex(currentMessageIndex + 1);
          setCharIndex(0);
        }
      } else {
        // Loading complete
        onComplete?.();
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [isLoading, currentMessageIndex, charIndex, onComplete]);

  if (!isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        background: "linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-tertiary) 100%)",
      }}
    >
      {/* Animated background grid */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* Terminal container */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-2xl mx-4"
      >
        <div
          className="rounded-xl backdrop-blur-md border overflow-hidden shadow-2xl"
          style={{
            borderColor: "var(--border-glass)",
            background: "rgba(var(--bg-secondary-rgb), 0.4)",
          }}
        >
          {/* Terminal header */}
          <div
            className="flex items-center gap-3 px-4 py-3 border-b"
            style={{ borderColor: "var(--border-subtle)" }}
          >
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full opacity-60" style={{ background: "var(--accent)" }} />
              <div className="w-3 h-3 rounded-full opacity-40" style={{ background: "var(--accent)" }} />
              <div className="w-3 h-3 rounded-full opacity-20" style={{ background: "var(--accent)" }} />
            </div>
            <span
              className="text-xs font-mono ml-2"
              style={{ color: "var(--text-secondary)" }}
            >
              portfolio@localhost ~ %
            </span>
          </div>

          {/* Terminal content */}
          <div className="p-6 md:p-8 min-h-[300px] flex flex-col justify-center">
            {displayedMessages.map((message, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="mb-2 font-mono text-sm md:text-base"
                style={{ color: i === displayedMessages.length - 1 ? "var(--accent)" : "var(--text-secondary)" }}
              >
                {message}
                {/* Blinking cursor on last line */}
                {i === displayedMessages.length - 1 && currentMessageIndex < loadingMessages.length - 1 && (
                  <motion.span
                    animate={{ opacity: [1, 1, 0, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="ml-1"
                    style={{ color: "var(--accent)" }}
                  >
                    █
                  </motion.span>
                )}
              </motion.div>
            ))}
          </div>

          {/* Loading bar */}
          <div
            className="h-1"
            style={{ background: "var(--border-subtle)" }}
          >
            <motion.div
              className="h-full"
              animate={{
                width: `${(currentMessageIndex / loadingMessages.length) * 100}%`,
              }}
              transition={{ duration: 0.3 }}
              style={{ background: "var(--accent)" }}
            />
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ scaleY: [1, 0.8, 1] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
              className="w-1 h-8 rounded-full"
              style={{
                background: "var(--accent)",
                opacity: 0.4,
              }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
