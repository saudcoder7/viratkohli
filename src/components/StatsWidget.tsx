"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  gsap,
  getDramaticInitial,
  getDramaticTarget,
  getBodyInitial,
  getBodyTarget,
} from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import {
  FORMAT_LABELS,
  FORMAT_KEYS,
  FORMAT_MOMENTS,
  type FormatKey,
} from "@/lib/constants";
import { useFormat } from "@/lib/FormatContext";
import {
  useLiveStats,
  formatLastUpdatedLabel,
  type FormatStats,
} from "@/lib/stats";

interface StatRow {
  label: string;
  value: string | number;
}

function getStatRows(format: FormatKey, s?: FormatStats): StatRow[] {
  if (!s) return [];
  const rows: StatRow[] = [
    { label: "Matches", value: s.matches },
    { label: "Runs", value: s.runs.toLocaleString() },
    {
      label: "Batting Average",
      value: typeof s.average === "number" ? s.average.toFixed(2) : s.average,
    },
    { label: "Centuries (100s)", value: s.centuries },
  ];

  if (s.doubleCenturies !== undefined && s.doubleCenturies > 0) {
    rows.push({ label: "Double Centuries (200s)", value: s.doubleCenturies });
  }
  if (s.strikeRate !== undefined) {
    rows.push({
      label: "Strike Rate",
      value: typeof s.strikeRate === "number" ? s.strikeRate.toFixed(2) : s.strikeRate,
    });
  }
  if (s.fifties !== undefined) {
    rows.push({ label: "Half Centuries (50s)", value: s.fifties });
  }
  rows.push({ label: "Highest Score", value: s.bestScore });
  rows.push({
    label: "Career Status",
    value: s.status === "final" ? "Retired (Final)" : s.status,
  });

  return rows;
}

function getHeadlineStats(
  format: FormatKey,
  s?: FormatStats
): { value: string; label: string }[] {
  if (!s) return [];
  return [
    { value: s.runs.toLocaleString(), label: "Runs" },
    { value: String(s.centuries), label: "Centuries" },
    {
      value: typeof s.average === "number" ? s.average.toFixed(2) : String(s.average),
      label: "Average",
    },
    { value: String(s.matches), label: "Matches" },
  ];
}

export default function StatsWidget() {
  const sectionRef = useRef<HTMLElement>(null);
  const { activeFormat, setActiveFormat } = useFormat();
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const headerTitle = sectionRef.current.querySelector(".section-title");
      const headerDesc = sectionRef.current.querySelector(".section-desc");
      const headerRule = sectionRef.current.querySelector(".section-rule");

      if (!headerTitle) return;

      if (reducedMotion) {
        gsap.set([headerTitle, headerDesc, headerRule], {
          opacity: 1,
          scale: 1,
          y: 0,
        });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: headerTitle,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      const dramaticInit = getDramaticInitial();
      const dramaticTgt = getDramaticTarget();
      const bodyInit = getBodyInitial();
      const bodyTgt = getBodyTarget();

      tl.fromTo(
        headerTitle,
        { ...dramaticInit, transformOrigin: "center left" },
        { ...dramaticTgt }
      );

      if (headerDesc) {
        tl.fromTo(
          headerDesc,
          { ...bodyInit, transformOrigin: "center left" },
          { ...bodyTgt },
          "-=0.5"
        );
      }

      if (headerRule) {
        tl.fromTo(
          headerRule,
          { opacity: 0, scaleX: 0, transformOrigin: "left center" },
          { opacity: 1, scaleX: 1, duration: 0.6, ease: "easeSmooth" },
          "-=0.5"
        );
      }
    },
    { scope: sectionRef, dependencies: [reducedMotion] }
  );

  const { stats, loading, isFallback } = useLiveStats();
  const currentStats = stats[activeFormat];
  const formatInfo = FORMAT_LABELS[activeFormat];
  const isIPL = activeFormat === "ipl";
  const accentColor = isIPL ? "accent-red" : "accent-blue";
  const headlineStats = getHeadlineStats(activeFormat, currentStats);
  const statRows = getStatRows(activeFormat, currentStats);
  const moments = FORMAT_MOMENTS[activeFormat] || [];

  return (
    <section ref={sectionRef} id="stats" className="section-padding relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="section-header text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-[family-name:var(--font-display)] tracking-[0.25em] text-secondary mb-2 uppercase">
                Career Summary
              </p>
              <h2 className="section-title inline-block font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-6xl text-primary will-change-transform">
                CAREER STATS
              </h2>
            </div>
            <p className="section-desc text-secondary text-sm max-w-md will-change-transform">
              A quick-glance statistical summary across all four formats. Explore the full story mode for complete timelines.
            </p>
          </div>
          <div className="section-rule mt-4" />
        </div>

        {/* Tab Control with Sliding Active Indicator Pill and Mobile Swipe */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar flex-nowrap sm:flex-wrap pb-2 mb-6 sm:mb-8 md:mb-12 border-b border-hairline">
          {FORMAT_KEYS.map((key) => {
            const info = FORMAT_LABELS[key];
            const isActive = activeFormat === key;
            const tabIsIPL = key === "ipl";
            const activePillBg = tabIsIPL ? "bg-accent-red" : "bg-accent-blue";
            const count = FORMAT_MOMENTS[key]?.length ?? info.count;

            return (
              <button
                key={key}
                id={`tab-btn-${key}`}
                onClick={() => setActiveFormat(key, false)}
                className={`
                  relative flex items-center gap-2 sm:gap-2.5 px-4 py-2.5 sm:px-6 sm:py-3 rounded-xl transition-all duration-200 cursor-pointer whitespace-nowrap
                  font-[family-name:var(--font-display)] tracking-[0.18em] sm:tracking-[0.2em] text-xs sm:text-base hover:scale-[1.03] active:scale-95
                  ${
                    isActive
                      ? "text-white"
                      : "bg-surface border border-hairline text-secondary hover:text-primary hover:border-white/20"
                  }
                `}
              >
                {/* Sliding active indicator pill using Framer Motion layoutId */}
                {isActive && (
                  <motion.div
                    layoutId="active-format-tab-pill"
                    className={`absolute inset-0 rounded-xl ${activePillBg} shadow-lg shadow-black/30 z-0`}
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}

                <span
                  className={`relative z-10 w-2 h-2 rounded-full transition-colors duration-200 ${
                    isActive
                      ? "bg-white"
                      : tabIsIPL
                      ? "bg-accent-red"
                      : "bg-accent-blue"
                  }`}
                />
                <span className="relative z-10">{info.name}</span>
                <span
                  className={`relative z-10 text-[11px] sm:text-xs px-1.5 py-0.5 rounded font-mono ${
                    isActive ? "bg-black/25 text-white" : "bg-base text-secondary"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Format Content with Smooth Crossfade */}
        <div className="relative min-h-[420px]">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={activeFormat}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="w-full"
            >
              {/* Headline Numbers Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                {headlineStats.map((s, idx) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, filter: "blur(12px)", scale: 1.06, rotate: -3, y: 16 }}
                    animate={{ opacity: 1, filter: "blur(0px)", scale: 1, rotate: 0, y: 0 }}
                    transition={{
                      duration: 0.9,
                      delay: idx * 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className={`card rounded-2xl p-6 text-center cursor-default ${
                      isIPL ? "hover:border-accent-red/40" : "hover:border-accent-blue/40"
                    }`}
                  >
                    <p
                      className={`font-[family-name:var(--font-display)] text-3xl sm:text-4xl md:text-5xl text-${accentColor} mb-2`}
                    >
                      {s.value}
                    </p>
                    <p className="text-secondary text-xs sm:text-sm tracking-[0.15em] uppercase">
                      {s.label}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Detailed Stats Panel */}
              <div className="card rounded-2xl overflow-hidden mb-8">
                <div className="px-6 py-4 border-b border-hairline flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className={`w-2 h-2 rounded-full bg-${accentColor}`} />
                    <h3 className="font-[family-name:var(--font-display)] text-lg tracking-[0.15em] text-primary">
                      {formatInfo.name} CAREER RECORD
                    </h3>
                  </div>
                  <div className="flex items-center gap-3">
                    {/* Freshness / Last Updated Indicator (Update 26) */}
                    <div
                      title={currentStats?.status === "final" ? "Final career numbers; retired format" : "Synchronized daily with official records"}
                      className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-white/[0.04] border border-hairline text-secondary hover:border-white/20 transition-colors"
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          currentStats?.status === "final"
                            ? "bg-amber-400"
                            : "bg-emerald-400 animate-pulse"
                        }`}
                      />
                      <span>
                        {formatLastUpdatedLabel(currentStats?.lastUpdated, currentStats?.status)}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-secondary hidden sm:inline">
                      {statRows.length} ATTRIBUTES
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 divide-y sm:divide-y-0 divide-hairline">
                  {statRows.map((row) => (
                    <div
                      key={row.label}
                      className="group flex items-center justify-between px-6 py-4 border-b sm:border-r last:border-r-0 border-hairline hover:bg-surface-hover transition-colors duration-200 cursor-default"
                    >
                      <span className="text-secondary text-sm group-hover:text-primary transition-colors duration-200">
                        {row.label}
                      </span>
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-[family-name:var(--font-display)] text-base tracking-wider transition-transform duration-200 group-hover:translate-x-1 ${
                            row.label === "Career Status"
                              ? row.value === "Active"
                                ? "text-emerald-400 font-bold"
                                : "text-secondary"
                              : "text-primary font-semibold"
                          }`}
                        >
                          {row.value}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dedicated Story Mode Link Callout */}
              <div className="card rounded-2xl p-6 sm:p-8 bg-gradient-to-r from-surface to-base border border-hairline flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`w-2 h-2 rounded-full bg-${accentColor}`} />
                    <span className="font-[family-name:var(--font-display)] text-xs tracking-[0.2em] text-secondary uppercase">
                      Immersive Story View
                    </span>
                  </div>
                  <h4 className="font-[family-name:var(--font-serif)] italic text-2xl sm:text-3xl text-primary font-bold mb-2">
                    {formatInfo.name} Cricket Timeline
                  </h4>
                  <p className="text-secondary text-sm max-w-xl leading-relaxed">
                    Experience {formatInfo.name} career arc from debut to legend, presented full-bleed with {moments.length} defining milestones in chronological order.
                  </p>
                </div>
                <Link
                  href={`/${activeFormat}`}
                  className={`
                    group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-[family-name:var(--font-display)] tracking-[0.18em] text-sm whitespace-nowrap text-white transition-all duration-200 shadow-lg cursor-pointer hover:scale-[1.03] active:scale-95
                    ${
                      isIPL
                        ? "bg-accent-red hover:bg-accent-red/90 shadow-accent-red/20"
                        : "bg-accent-blue hover:bg-accent-blue/90 shadow-accent-blue/20"
                    }
                  `}
                >
                  <span>EXPLORE {formatInfo.name} STORY ({moments.length} MOMENTS)</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-1.5">
                    →
                  </span>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
