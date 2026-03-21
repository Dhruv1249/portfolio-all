"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { FALLBACK_PORTFOLIO_DATA, type PortfolioData } from "../data/portfolio-data";

interface PortfolioDataContextValue {
  data: PortfolioData;
  loading: boolean;
  source: "fallback" | "mongodb";
}

const PortfolioDataContext = createContext<PortfolioDataContextValue>({
  data: FALLBACK_PORTFOLIO_DATA,
  loading: true,
  source: "fallback",
});

export function PortfolioDataProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<PortfolioData>(FALLBACK_PORTFOLIO_DATA);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<"fallback" | "mongodb">("fallback");

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const response = await fetch("/api/portfolio-data", { cache: "no-store" });
        if (!response.ok) throw new Error("Failed to fetch portfolio data");

        const payload = await response.json();
        if (!cancelled && payload?.data) {
          setData(payload.data as PortfolioData);
          setSource("mongodb");
        }
      } catch {
        if (!cancelled) {
          setData(FALLBACK_PORTFOLIO_DATA);
          setSource("fallback");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo(
    () => ({ data, loading, source }),
    [data, loading, source],
  );

  return (
    <PortfolioDataContext.Provider value={value}>
      {children}
    </PortfolioDataContext.Provider>
  );
}

export function usePortfolioData() {
  return useContext(PortfolioDataContext);
}
