"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import { STATS as FALLBACK_STATS } from "./constants";
import type { FormatKey } from "./constants";

export interface FirestoreFormatStats {
  matches: number;
  runs: number;
  average: number;
  centuries: number;
  doubleCenturies?: number;
  fifties?: number;
  bestScore: string;
  strikeRate?: number;
  status: "Active" | "Retired" | "final";
  seasonStats?: string;
  currentForm?: number[];
  lastUpdated?: any;
  source?: string;
}

export type FormatStats = FirestoreFormatStats;

export interface AllFormatStats {
  test: FirestoreFormatStats;
  odi: FirestoreFormatStats;
  t20i: FirestoreFormatStats;
  ipl: FirestoreFormatStats;
}

export interface HeroStatItem {
  value: number;
  label: string;
  suffix?: string;
}

// ─── Initial Baseline Cache (Zero-delay fallback to prevent any LOADING flicker) ───
export const BASELINE_STATS: AllFormatStats = {
  test: {
    matches: 123,
    runs: 9230,
    average: 46.85,
    centuries: 30,
    doubleCenturies: 7,
    fifties: 31,
    bestScore: "254*",
    status: "final",
    lastUpdated: "2025-05-15T00:00:00.000Z",
    source: "official_record_espncricinfo",
  },
  odi: {
    matches: 314,
    runs: 14941,
    average: 58.59,
    strikeRate: 93.80,
    centuries: 54,
    fifties: 79,
    bestScore: "183",
    status: "Active",
    currentForm: [67, 100, 84, 22, 58],
    lastUpdated: new Date().toISOString(),
    source: "cricketdata.org",
  },
  t20i: {
    matches: 125,
    runs: 4188,
    average: 48.69,
    strikeRate: 137.04,
    centuries: 1,
    fifties: 38,
    bestScore: "122*",
    status: "final",
    lastUpdated: "2024-06-29T18:00:00.000Z",
    source: "official_record_espncricinfo",
  },
  ipl: {
    matches: 267,
    runs: 8661,
    average: 39.55,
    strikeRate: 131.97,
    centuries: 8,
    fifties: 63,
    bestScore: "113",
    status: "Active",
    seasonStats: "All-time leading run-scorer (8,661 runs)",
    lastUpdated: new Date().toISOString(),
    source: "cricketdata.org",
  },
};

const CACHE_STORAGE_KEY = "vk_live_stats_cache_v3";

/**
 * Format human-readable freshness label
 */
export function formatLastUpdatedLabel(
  lastUpdated: any,
  status: "Active" | "Retired" | "final"
): string {
  if (status === "final" || status === "Retired") {
    return "Final Career Record";
  }

  if (!lastUpdated) {
    return "Updated recently";
  }

  try {
    let date: Date;
    if (typeof lastUpdated === "object" && typeof lastUpdated.toDate === "function") {
      date = lastUpdated.toDate();
    } else if (typeof lastUpdated === "object" && lastUpdated.seconds) {
      date = new Date(lastUpdated.seconds * 1000);
    } else {
      date = new Date(lastUpdated);
    }

    if (isNaN(date.getTime())) return "Updated recently";

    const diffHours = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60));
    if (diffHours < 24) {
      return "Updated today";
    }
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) {
      return "Updated yesterday";
    }
    return `Updated ${diffDays} days ago`;
  } catch {
    return "Updated recently";
  }
}

/**
 * Derive Hero stats callouts dynamically from all 4 format stats
 */
export function calculateHeroStats(stats: AllFormatStats): HeroStatItem[] {
  // International centuries (Test: 30 + ODI: 54 + T20I: 1 = 85 International Centuries)
  const intlCenturies = (stats.test?.centuries || 0) + (stats.odi?.centuries || 0) + (stats.t20i?.centuries || 0);

  // International runs: Test (9,230) + ODI (14,941) + T20I (4,188) = 28,359
  const totalIntlRuns = (stats.test?.runs || 0) + (stats.odi?.runs || 0) + (stats.t20i?.runs || 0);

  return [
    { value: intlCenturies, label: "CENTURIES" }, // 85 International Centuries
    { value: Math.floor(totalIntlRuns / 1000) * 1000, suffix: "+", label: "INT'L RUNS" }, // 28,000+
    { value: 4, label: "ICC TROPHIES" },
    { value: 18, label: "YEARS" },
  ];
}

/**
 * Core React Hook: Live stats from Firestore with instantaneous fallback
 */
export function useLiveStats() {
  const [stats, setStats] = useState<AllFormatStats>(() => {
    if (typeof window !== "undefined") {
      try {
        const local = localStorage.getItem(CACHE_STORAGE_KEY);
        if (local) {
          const parsed = JSON.parse(local);
          if (parsed.test && parsed.odi && parsed.t20i && parsed.ipl) {
            return parsed;
          }
        }
      } catch (e) {
        console.warn("Could not read local stats cache:", e);
      }
    }
    return BASELINE_STATS;
  });

  const [isLive, setIsLive] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadFirestoreStats() {
      try {
        const formats: FormatKey[] = ["test", "odi", "t20i", "ipl"];
        const fetchPromises = formats.map(async (format) => {
          const docRef = doc(db, "stats", format);
          const snap = await getDoc(docRef);
          if (snap.exists()) {
            return { format, data: snap.data() as FirestoreFormatStats };
          }
          return null;
        });

        // 3-second timeout to guarantee no delayed loading state
        const timeoutPromise = new Promise<null>((resolve) =>
          setTimeout(() => resolve(null), 3000)
        );

        const results = await Promise.race([
          Promise.all(fetchPromises),
          timeoutPromise,
        ]);

        if (isMounted && results && Array.isArray(results)) {
          const updated = { ...stats };
          let foundAny = false;

          results.forEach((item) => {
            if (item && item.data) {
              foundAny = true;
              updated[item.format] = {
                ...updated[item.format],
                ...item.data,
              };
            }
          });

          if (foundAny) {
            setStats(updated);
            setIsLive(true);
            try {
              localStorage.setItem(CACHE_STORAGE_KEY, JSON.stringify(updated));
            } catch (e) {
              console.warn("Failed to persist stats cache:", e);
            }
          }
        }
      } catch (err) {
        console.warn("Firestore live stats fetch bypassed; using verified local cache:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadFirestoreStats();

    return () => {
      isMounted = false;
    };
  }, []);

  const heroStats = calculateHeroStats(stats);

  return {
    stats,
    heroStats,
    isLive,
    isFallback: !isLive,
    loading,
  };
}
