"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import type { FormatKey, FormatMoment } from "@/lib/constants";
import { FORMAT_LABELS, slugify } from "@/lib/constants";

interface FormatStoryTimelineProps {
  format: FormatKey;
  moments: FormatMoment[];
}

export default function FormatStoryTimeline({
  format,
  moments,
}: FormatStoryTimelineProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isIPL = format === "ipl";
  const accentColor = isIPL ? "bg-accent-red" : "bg-accent-blue";
  const formatInfo = FORMAT_LABELS[format];
  const totalMoments = moments.length;

  // Track active moment index via IntersectionObserver as sections scroll into view
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>(".moment-section");
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const indexAttr = entry.target.getAttribute("data-moment-index");
            if (indexAttr !== null) {
              const idx = parseInt(indexAttr, 10);
              if (!isNaN(idx)) {
                setActiveIndex(idx);
              }
            }
          }
        });
      },
      {
        root: null,
        rootMargin: "-25% 0px -25% 0px",
        threshold: 0.25,
      }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [moments]);

  // Smooth scroll to a specific moment by index
  const scrollToMoment = useCallback(
    (index: number, smooth: boolean = true) => {
      const clampedIndex = Math.max(0, Math.min(totalMoments - 1, index));
      const targetMoment = moments[clampedIndex];
      if (!targetMoment) return;

      const targetId = targetMoment.slug || targetMoment.id;
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({
          behavior: smooth ? "smooth" : "instant",
          block: "start",
        });
        setActiveIndex(clampedIndex);
      }
    },
    [moments, totalMoments]
  );

  // Deep-link support: Jump to specific moment on URL hash anchor
  useEffect(() => {
    const handleHash = () => {
      if (typeof window === "undefined") return;
      const rawHash = window.location.hash.replace(/^#/, "");
      if (!rawHash) {
        // No hash: user navigated via "See all moments" -> ensure start at top
        return;
      }

      const cleanHash = decodeURIComponent(rawHash).toLowerCase().trim();

      const foundIndex = moments.findIndex((m) => {
        const momentSlug = m.slug?.toLowerCase();
        const momentId = m.id?.toLowerCase();
        const generatedSlug = slugify(m.title);

        return (
          momentSlug === cleanHash ||
          momentId === cleanHash ||
          generatedSlug === cleanHash ||
          generatedSlug.includes(cleanHash) ||
          cleanHash.includes(generatedSlug)
        );
      });

      if (foundIndex !== -1) {
        const targetMoment = moments[foundIndex];
        const targetId = targetMoment.slug || targetMoment.id;
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
          setActiveIndex(foundIndex);
        }
      }
    };

    // Run on initial mount (with slight timeout to ensure DOM layout is complete)
    handleHash();
    const t1 = setTimeout(handleHash, 60);
    const t2 = setTimeout(handleHash, 250);

    window.addEventListener("hashchange", handleHash);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("hashchange", handleHash);
    };
  }, [moments]);

  // Keyboard navigation: ArrowUp, ArrowDown, PageUp, PageDown
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        scrollToMoment(activeIndex + 1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        scrollToMoment(activeIndex - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, scrollToMoment]);

  return (
    <div
      ref={containerRef}
      className="relative bg-base text-primary select-none w-full scroll-smooth"
    >
      {/* ── Fixed Header Bar (Exit Button & Dynamic Format Progress) ── */}
      <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 md:px-12 py-3 sm:py-6 flex items-center justify-between pointer-events-none">
        {/* Exit Button */}
        <Link
          href="/"
          className="pointer-events-auto flex items-center gap-1.5 sm:gap-2.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-base/85 border border-hairline hover:border-white/30 text-secondary hover:text-primary transition-all duration-300 font-[family-name:var(--font-display)] tracking-[0.16em] sm:tracking-[0.2em] text-[11px] sm:text-xs md:text-sm backdrop-blur-md shadow-lg shadow-black/40 group cursor-pointer"
        >
          <span className="group-hover:-translate-x-0.5 transition-transform duration-300">
            ←
          </span>
          <span>EXIT TO HOME</span>
        </Link>

        {/* Format Badge & Dynamic Moment Indicator */}
        <div className="pointer-events-auto flex items-center gap-2.5 sm:gap-4 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-base/85 border border-hairline backdrop-blur-md shadow-lg shadow-black/40">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className={`w-2 h-2 rounded-full ${accentColor}`} />
            <span className="font-[family-name:var(--font-display)] text-[11px] sm:text-xs md:text-sm tracking-[0.16em] sm:tracking-[0.2em] text-primary">
              {formatInfo.name} TIMELINE
            </span>
          </div>
          <span className="text-hairline">|</span>
          <span className="font-mono text-[11px] sm:text-xs text-secondary tracking-wider">
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(totalMoments).padStart(2, "0")}
          </span>
        </div>
      </header>

      {/* ── Fixed Right-Side Vertical Scrubber Dots ── */}
      <div className="fixed right-3 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-1.5 py-3 px-1.5 rounded-full bg-base/60 backdrop-blur-md border border-hairline">
        {moments.map((m, idx) => (
          <button
            key={m.id}
            onClick={() => scrollToMoment(idx)}
            className={`w-1.5 transition-all duration-300 rounded-full cursor-pointer ${
              idx === activeIndex
                ? `h-6 ${accentColor}`
                : "h-1.5 bg-white/20 hover:bg-white/40"
            }`}
            aria-label={`Go to moment ${idx + 1}: ${m.title}`}
          />
        ))}
      </div>

      {/* ── Fixed Bottom-Right Arrow Controls ── */}
      <div className="fixed bottom-3 sm:bottom-4 right-4 sm:right-12 md:right-20 z-40 flex items-center gap-3">
        <div className="flex items-center gap-1.5 bg-base/80 border border-hairline rounded-full p-1 backdrop-blur-md shadow-lg shadow-black/30">
          <button
            onClick={() => scrollToMoment(activeIndex - 1)}
            disabled={activeIndex === 0}
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs text-secondary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Previous moment"
          >
            ↑
          </button>
          <button
            onClick={() => scrollToMoment(activeIndex + 1)}
            disabled={activeIndex === totalMoments - 1}
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs text-secondary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Next moment"
          >
            ↓
          </button>
        </div>

        <span className="hidden sm:inline text-xs text-secondary/60 font-mono tracking-wider">
          Scroll or press ↓
        </span>
      </div>

      {/* ── Sequential Stack of Full-Screen Story Sections ── */}
      {/* Intact and fully scrollable in both directions from any landed moment */}
      <main className="w-full">
        {moments.map((moment, idx) => (
          <section
            key={moment.id}
            id={moment.slug || moment.id}
            data-moment-index={idx}
            className="moment-section relative min-h-[100dvh] h-[100dvh] sm:min-h-screen sm:h-screen w-full flex flex-col justify-end overflow-hidden snap-start scroll-mt-0"
          >
            {/* Background Media or Atmospheric Gradient */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              {moment.image ? (
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src={moment.image}
                    alt={moment.title}
                    fill
                    priority={idx < 2}
                    sizes="100vw"
                    className={`object-cover object-center animate-kenburns ${
                      moment.isRestrained
                        ? "grayscale contrast-95 brightness-75"
                        : "brightness-105 contrast-105 saturate-110"
                    }`}
                  />
                </div>
              ) : (
                <div
                  className={`relative w-full h-full ${
                    moment.isRestrained
                      ? "bg-gradient-to-br from-[#121417] via-[#0A0D10] to-[#050709]"
                      : isIPL
                      ? "bg-gradient-to-br from-[#2a0b12] via-[#12161f] to-[#0A0E14]"
                      : "bg-gradient-to-br from-[#0e1e38] via-[#111722] to-[#0A0E14]"
                  }`}
                >
                  <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="font-[family-name:var(--font-display)] text-[22vw] leading-none text-white/[0.03] select-none">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              )}

              {/* Bottom Scrim for typography legibility */}
              <div className="absolute bottom-0 left-0 right-0 h-3/4 sm:h-2/3 bg-gradient-to-t from-base via-base/80 to-transparent pointer-events-none" />

              {/* Top Scrim for header readability */}
              <div className="absolute top-0 left-0 right-0 h-28 sm:h-32 bg-gradient-to-b from-base/80 to-transparent pointer-events-none" />
            </div>

            {/* Typography & Moment Details */}
            <div className="relative z-20 px-5 sm:px-12 md:px-16 lg:px-24 pb-14 sm:pb-16 md:pb-24 max-w-5xl">
              {/* Metadata Badges */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-md text-[11px] sm:text-xs font-mono font-bold tracking-widest bg-white/10 text-white border border-white/10 backdrop-blur-md">
                  {moment.year}
                </span>

                {moment.isRestrained ? (
                  <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-md text-[10px] sm:text-xs font-[family-name:var(--font-display)] tracking-[0.18em] sm:tracking-[0.2em] bg-white/5 text-secondary/70 border border-white/5">
                    QUIET MILESTONE · RANJI TROPHY
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-md text-[10px] sm:text-xs font-[family-name:var(--font-display)] tracking-[0.18em] sm:tracking-[0.2em] bg-base/60 text-secondary border border-hairline">
                    MOMENT #{idx + 1} OF {totalMoments}
                  </span>
                )}

                {moment.stat && (
                  <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-base/80 border border-hairline">
                    <span className={`w-1.5 h-1.5 rounded-full ${accentColor}`} />
                    <span className="font-[family-name:var(--font-display)] text-[11px] sm:text-xs tracking-[0.1em] text-primary">
                      {moment.stat}
                    </span>
                  </div>
                )}
              </div>

              {/* Moment Title in Playfair Display italic */}
              <h1
                className={`font-[family-name:var(--font-serif)] italic text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-primary font-bold mb-2.5 sm:mb-4 tracking-tight leading-[1.2] ${
                  moment.isRestrained ? "opacity-90 font-normal" : ""
                }`}
              >
                {moment.title}
              </h1>

              {/* Description */}
              <p
                className={`font-[family-name:var(--font-body)] text-secondary text-sm sm:text-base md:text-xl max-w-3xl leading-relaxed ${
                  moment.isRestrained ? "text-secondary/75 italic max-w-2xl" : ""
                }`}
              >
                {moment.description}
              </p>
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
