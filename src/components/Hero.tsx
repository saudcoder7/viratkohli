"use client";

import { useRef, useState, useEffect } from "react";
import CountUp from "./CountUp";
import { useLiveStats, calculateHeroStats } from "@/lib/stats";
import {
  gsap,
  DRAMATIC_TEXT_INITIAL,
  DRAMATIC_TEXT_TARGET,
  BODY_TEXT_INITIAL,
  BODY_TEXT_TARGET,
} from "@/lib/gsap";
import { useGSAP } from "@gsap/react";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const { stats } = useLiveStats();
  const heroStats = calculateHeroStats(stats);

  useEffect(() => {
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setMuted(videoRef.current.muted);
    }
  };

  // Update 23: Dramatic blur + spin text reveal
  useGSAP(
    () => {
      if (!containerRef.current) return;

      if (reducedMotion) {
        gsap.set([".hero-title", ".hero-tagline", ".hero-stat-number", ".hero-stat-caption"], {
          opacity: 1,
          filter: "blur(0px)",
          scale: 1,
          rotation: 0,
          y: 0,
        });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play reverse play reverse",
        },
      });

      // 1. Headline: Dramatic blur (14px) + spin (-4deg) + scale (1.08) -> sharp
      tl.fromTo(
        ".hero-title",
        { ...DRAMATIC_TEXT_INITIAL, transformOrigin: "center center" },
        { ...DRAMATIC_TEXT_TARGET, delay: 0.15 }
      )
        // 2. Tagline: Lighter blur (8px) + gentle tilt (-1deg) following ~180ms behind
        .fromTo(
          ".hero-tagline",
          { ...BODY_TEXT_INITIAL, transformOrigin: "center center" },
          { ...BODY_TEXT_TARGET },
          "-=0.82"
        );

      // 3. Stat Numbers & Captions: Staggered entrance wave (160ms apart)
      const statItems = containerRef.current.querySelectorAll(".hero-stat-item");
      statItems.forEach((item, index) => {
        const num = item.querySelector(".hero-stat-number");
        const cap = item.querySelector(".hero-stat-caption");

        if (num && cap) {
          // Stat number dramatic blur+spin
          tl.fromTo(
            num,
            { ...DRAMATIC_TEXT_INITIAL, transformOrigin: "center center" },
            { ...DRAMATIC_TEXT_TARGET },
            index === 0 ? "-=0.6" : "-=0.84"
          );
          // Stat caption lighter blur following ~150ms behind
          tl.fromTo(
            cap,
            { ...BODY_TEXT_INITIAL, transformOrigin: "center center" },
            { ...BODY_TEXT_TARGET },
            "-=0.85"
          );
        }
      });
    },
    { scope: containerRef, dependencies: [reducedMotion] }
  );

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full h-screen overflow-hidden"
    >
      {/* Video Background */}
      <div className="absolute inset-0 overflow-hidden bg-base">
        {/* Fallback gradient behind video */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d1b2a] via-[#1b2838] to-[#0A0E14] -z-10" />

        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster="/video/hero-poster.jpg"
        >
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Bottom gradient for text contrast */}
      <div className="absolute bottom-0 left-0 right-0 h-[45%] bg-gradient-to-t from-base via-base/60 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-end pb-24 md:pb-32 px-6 sm:px-8">
        {/* Name with Dramatic Blur + Spin */}
        <h1 className="hero-title inline-block font-[family-name:var(--font-display)] text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white tracking-[0.15em] text-center leading-none mb-3 drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)] will-change-transform">
          VIRAT KOHLI
        </h1>

        {/* Tagline with Lighter Blur */}
        <p className="hero-tagline inline-block font-[family-name:var(--font-serif)] italic text-lg md:text-xl text-white/70 mb-8 md:mb-12 tracking-wide will-change-transform">
          Run Machine. King. Legend.
        </p>

        {/* Stats Strip */}
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {heroStats.map((stat, i) => (
            <div key={stat.label} className="hero-stat-item text-center">
              <div className="hero-stat-number inline-block will-change-transform">
                <CountUp
                  target={stat.value}
                  suffix={stat.suffix || ""}
                  className="font-[family-name:var(--font-display)] text-3xl md:text-4xl lg:text-5xl text-white"
                />
              </div>
              <p className="hero-stat-caption block text-white/50 text-[10px] md:text-xs tracking-[0.2em] mt-2 uppercase will-change-transform">
                {stat.label}
              </p>
              {i < heroStats.length - 1 && (
                <span className="hidden" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Mute toggle button with interactive hover/active physics */}
      <button
        onClick={toggleMute}
        className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 text-white text-sm cursor-pointer hover:bg-white/20 hover:scale-105 active:scale-95 transition-all duration-200"
        aria-label={muted ? "Unmute video" : "Mute video"}
      >
        <span className="text-base">{muted ? "🔇" : "🔊"}</span>
      </button>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 animate-bounce opacity-50">
        <svg
          width="18"
          height="18"
          viewBox="0 0 20 20"
          fill="none"
          className="text-white/50"
        >
          <path
            d="M10 4v12m0 0l-4-4m4 4l4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  );
}
