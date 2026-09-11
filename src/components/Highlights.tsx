"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  gsap,
  DRAMATIC_TEXT_INITIAL,
  DRAMATIC_TEXT_TARGET,
  BODY_TEXT_INITIAL,
  BODY_TEXT_TARGET,
} from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { motion, AnimatePresence } from "framer-motion";
import { HIGHLIGHTS, getHighlightHref } from "@/lib/constants";
import type { Highlight } from "@/lib/constants";

const FILTER_TABS = [
  { key: "all", label: "ALL" },
  { key: "test", label: "TEST" },
  { key: "odi", label: "ODI" },
  { key: "t20i", label: "T20I" },
  { key: "ipl", label: "IPL" },
];

const FORMAT_COLORS: Record<string, string> = {
  all: "bg-accent-blue",
  test: "bg-accent-blue",
  odi: "bg-accent-blue",
  t20i: "bg-accent-blue",
  ipl: "bg-accent-red",
};

const FORMAT_TEXT_COLORS: Record<string, string> = {
  all: "text-accent-blue",
  test: "text-accent-blue",
  odi: "text-accent-blue",
  t20i: "text-accent-blue",
  ipl: "text-accent-red",
};

const FORMAT_CONFIG: Record<string, { label: string; count: number; href: string }> = {
  test: { label: "Test", count: 16, href: "/test" },
  odi: { label: "ODI", count: 16, href: "/odi" },
  t20i: { label: "T20I", count: 11, href: "/t20i" },
  ipl: { label: "IPL", count: 12, href: "/ipl" },
};

// Gradient pairs for cards without images
const GRADIENT_PAIRS = [
  "from-[#1a2a4a]/60 to-[#0A0E14]/80",
  "from-[#2a1a3a]/60 to-[#0A0E14]/80",
  "from-[#1a3a2a]/60 to-[#0A0E14]/80",
  "from-[#3a2a1a]/60 to-[#0A0E14]/80",
  "from-[#1a2a3a]/60 to-[#0A0E14]/80",
  "from-[#2a3a1a]/60 to-[#0A0E14]/80",
];

export default function Highlights() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  // Update 23/24: Section Header reveal with blur+spin and repeatable scroll toggleActions
  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const headerTitle = sectionRef.current.querySelector(".section-title");
      const headerRule = sectionRef.current.querySelector(".section-rule");

      if (!headerTitle || !headerRule) return;

      if (reducedMotion) {
        gsap.set([headerTitle, headerRule], { opacity: 1, filter: "blur(0px)", scale: 1, rotation: 0, y: 0 });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: headerTitle,
          start: "top 75%",
          toggleActions: "play reverse play reverse",
        },
      });

      // Title: Dramatic blur (14px) + spin (-4deg)
      tl.fromTo(
        headerTitle,
        { ...DRAMATIC_TEXT_INITIAL, transformOrigin: "center left" },
        { ...DRAMATIC_TEXT_TARGET }
      )
        // Accent rule: follows ~160ms behind
        .fromTo(
          headerRule,
          { opacity: 0, scaleX: 0, transformOrigin: "left center" },
          { opacity: 1, scaleX: 1, duration: 0.8, ease: "easeSmooth" },
          "-=0.84"
        );
    },
    { scope: sectionRef, dependencies: [reducedMotion] }
  );

  // Update 23/24: Cards entrance wave (staggered 160ms) with reliable reverse/play re-triggering
  useGSAP(
    () => {
      if (!gridRef.current) return;

      const cards = gridRef.current.querySelectorAll(".highlight-card");
      if (!cards.length) return;

      if (reducedMotion) {
        gsap.set(cards, { opacity: 1, scale: 1, y: 0 });
        cards.forEach((card) => {
          gsap.set(card.querySelectorAll(".card-title, .card-desc"), {
            opacity: 1,
            filter: "blur(0px)",
            scale: 1,
            rotation: 0,
            y: 0,
          });
        });
        return;
      }

      // Card containers entrance
      gsap.fromTo(
        cards,
        { opacity: 0, y: 24, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.16, // Staggered 160ms for GPU efficiency
          ease: "easeSmooth",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 75%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      // Card Title & Description internal blur+spin sequence
      cards.forEach((card, index) => {
        const title = card.querySelector(".card-title");
        const desc = card.querySelector(".card-desc");

        if (title && desc) {
          const cardTl = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: "top 78%",
              toggleActions: "play reverse play reverse",
            },
            delay: (index % 3) * 0.14,
          });

          // Moment Title: Dramatic blur (14px) + spin (-4deg)
          cardTl.fromTo(
            title,
            { ...DRAMATIC_TEXT_INITIAL, transformOrigin: "left center" },
            { ...DRAMATIC_TEXT_TARGET }
          )
            // Description: Lighter blur (8px) + gentle tilt (-1deg) following ~160ms behind
            .fromTo(
              desc,
              { ...BODY_TEXT_INITIAL, transformOrigin: "left center" },
              { ...BODY_TEXT_TARGET },
              "-=0.84"
            );
        }
      });
    },
    { scope: gridRef, dependencies: [reducedMotion, activeFilter] }
  );

  // Update 24: Exact format filtering (none of the 6 curated highlights are Test)
  const filteredHighlights = HIGHLIGHTS.filter((h) => {
    if (activeFilter === "all") return true;
    return h.format === activeFilter;
  });

  return (
    <section ref={sectionRef} id="highlights" className="section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="section-header">
          <h2 className="section-title inline-block font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-6xl text-primary will-change-transform">
            CAREER HIGHLIGHTS
          </h2>
          <div className="section-rule" />
        </div>

        {/* Filter Tabs with interactive scaling */}
        <div className="flex flex-wrap gap-3 mb-8 md:mb-12">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key)}
              className={`
                font-[family-name:var(--font-display)] text-sm tracking-[0.15em]
                px-6 py-3 rounded-xl transition-all duration-200 cursor-pointer
                hover:scale-[1.03] active:scale-95
                ${
                  activeFilter === tab.key
                    ? "bg-accent-blue text-white shadow-md shadow-accent-blue/25"
                    : "bg-surface text-secondary border border-hairline hover:border-white/20 hover:text-primary"
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Card Grid */}
        <div ref={gridRef}>
          <AnimatePresence mode="wait">
            {filteredHighlights.length === 0 ? (
              <motion.div
                key="empty-state"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="card p-8 md:p-12 text-center border border-hairline my-6 max-w-2xl mx-auto rounded-2xl"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center text-accent-blue">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h3 className="font-[family-name:var(--font-serif)] italic text-2xl text-primary font-bold mb-2">
                  No Test moments in this curated reel
                </h3>
                <p className="text-secondary text-sm leading-relaxed mb-6 max-w-md mx-auto">
                  This 6-moment highlight reel showcases iconic white-ball chases and world titles. Explore the complete 16-moment Test story from his Kingston debut to the modern era.
                </p>
                <Link
                  href="/test"
                  className="btn-interactive inline-flex items-center gap-2 px-6 py-3 bg-accent-blue rounded-xl text-white text-sm font-medium hover:bg-accent-blue/90 shadow-lg shadow-accent-blue/20 transition-all cursor-pointer"
                >
                  <span>Explore Full Test Story</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </motion.div>
            ) : (
              <motion.div
                key={activeFilter}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredHighlights.map((highlight, i) => (
                  <HighlightCard
                    key={highlight.id}
                    highlight={highlight}
                    index={i}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Expand to Full Story Button (Update 31) ── */}
        {activeFilter !== "all" && FORMAT_CONFIG[activeFilter] && (
          <div className="mt-12 flex justify-center">
            <Link
              href={FORMAT_CONFIG[activeFilter].href}
              className="btn-interactive inline-flex items-center gap-3 px-8 py-4 rounded-xl font-[family-name:var(--font-display)] text-sm tracking-[0.18em] uppercase bg-surface/90 border border-hairline hover:border-white/30 text-primary hover:text-white shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer backdrop-blur-md"
            >
              <span>
                See all {FORMAT_CONFIG[activeFilter].count} {FORMAT_CONFIG[activeFilter].label} moments
              </span>
              <span className="transition-transform duration-300 group-hover:translate-x-1.5 text-accent-blue">
                →
              </span>
            </Link>
          </div>
        )}

        {/* ── Format Story Explore Bar for ALL tab ── */}
        {activeFilter === "all" && (
          <div className="mt-12 pt-8 border-t border-hairline/40">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
              <p className="font-[family-name:var(--font-display)] text-xs tracking-[0.2em] text-secondary uppercase">
                Explore Complete Chronological Stories
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(FORMAT_CONFIG).map(([key, item]) => (
                <Link
                  key={key}
                  href={item.href}
                  className="card p-4 rounded-xl border border-hairline hover:border-white/30 transition-all duration-300 flex items-center justify-between group cursor-pointer bg-surface/60 hover:bg-surface"
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`w-2 h-2 rounded-full ${FORMAT_COLORS[key]}`} />
                    <span className="font-[family-name:var(--font-display)] text-xs tracking-[0.16em] text-primary">
                      See all {item.count} {item.label} moments
                    </span>
                  </div>
                  <span className="text-secondary group-hover:text-primary transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function HighlightCard({
  highlight,
  index,
}: {
  highlight: Highlight;
  index: number;
}) {
  const gradientClass = GRADIENT_PAIRS[index % GRADIENT_PAIRS.length];
  const accentDot = FORMAT_COLORS[highlight.format] || "bg-accent-blue";
  const destinationHref = getHighlightHref(highlight);

  return (
    <Link
      href={destinationHref}
      className="highlight-card card rounded-2xl group overflow-hidden cursor-pointer flex flex-col justify-between h-full no-underline block select-none"
      aria-label={`View ${highlight.title} in ${highlight.format.toUpperCase()} story timeline`}
    >
      <div className="flex flex-col flex-1">
        {/* Image / Video / Gradient area with clipped overflow for smooth photo zoom */}
        <div className="relative h-56 w-full overflow-hidden bg-surface-hover">
          {highlight.video ? (
            <video
              src={highlight.video}
              poster={highlight.image}
              autoPlay
              loop
              muted
              playsInline
              className="object-cover object-center w-full h-full card-img-zoom"
            />
          ) : highlight.image ? (
            <Image
              src={highlight.image}
              alt={highlight.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover object-center card-img-zoom"
            />
          ) : (
            <div
              className={`absolute inset-0 bg-gradient-to-br ${gradientClass}`}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-[family-name:var(--font-display)] text-[8rem] leading-none text-white/[0.04] select-none card-img-zoom">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
            </div>
          )}

          {/* Year badge */}
          <div className="absolute top-3 left-3 z-10">
            <span
              className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-mono tracking-wider bg-base/85 text-secondary border border-hairline backdrop-blur-md"
            >
              {highlight.year}
            </span>
          </div>

          {/* Format indicator & Hover Arrow Cue */}
          <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5">
            {highlight.format !== "all" && (
              <span
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-[family-name:var(--font-display)] tracking-[0.16em] bg-base/85 text-white/90 border border-hairline backdrop-blur-md"
              >
                <span className={`w-1.5 h-1.5 rounded-full ${accentDot}`} />
                {highlight.format.toUpperCase()}
              </span>
            )}
            <span
              className="w-6 h-6 rounded-md bg-base/85 border border-hairline backdrop-blur-md flex items-center justify-center text-white/70 group-hover:text-accent-blue group-hover:border-accent-blue/40 transition-all duration-300 opacity-80 group-hover:opacity-100 shadow-sm"
              aria-hidden="true"
            >
              <svg
                className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </span>
          </div>

          {/* Bottom gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-surface to-transparent pointer-events-none" />
        </div>

        {/* Content with Blur + Spin reveal target classes */}
        <div className="p-6 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="card-title inline-block font-[family-name:var(--font-serif)] italic text-xl sm:text-2xl font-bold tracking-normal text-primary mb-2 group-hover:text-accent-blue transition-colors duration-200 will-change-transform leading-snug">
              {highlight.title}
            </h3>
            <p className="card-desc block font-[family-name:var(--font-body)] text-secondary text-sm leading-relaxed mb-4 line-clamp-3 will-change-transform font-normal">
              {highlight.description}
            </p>
          </div>

          {/* Stat badge & Timeline link hint */}
          <div className="pt-3 flex items-center justify-between gap-2 border-t border-hairline/30 mt-2">
            {highlight.stat ? (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-base/70 border border-hairline">
                <span className={`w-1.5 h-1.5 rounded-full ${accentDot}`} />
                <span className="font-[family-name:var(--font-display)] text-xs tracking-[0.12em] text-primary">
                  {highlight.stat}
                </span>
              </div>
            ) : (
              <span />
            )}

            <span className="inline-flex items-center gap-1.5 text-[11px] font-[family-name:var(--font-display)] tracking-[0.16em] text-secondary/70 group-hover:text-accent-blue transition-colors duration-200">
              VIEW MOMENT
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
