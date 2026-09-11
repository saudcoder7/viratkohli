"use client";

import { useRef, useState, useEffect } from "react";
import CountUp from "./CountUp";
import { useLiveStats, calculateHeroStats } from "@/lib/stats";
import {
  gsap,
  getDramaticInitial,
  getDramaticTarget,
  getBodyInitial,
  getBodyTarget,
} from "@/lib/gsap";
import { useGSAP } from "@gsap/react";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const userManuallyMutedRef = useRef(false);
  const isHeroInViewRef = useRef(true);
  const [muted, setMuted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const { stats } = useLiveStats();
  const heroStats = calculateHeroStats(stats);

  useEffect(() => {
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );

    const video = videoRef.current;
    if (!video) return;

    // Start unmuted by default ("no mute as we turn on the website")
    video.muted = false;

    const startAudioPlayback = async () => {
      try {
        await video.play();
        setMuted(false);
      } catch {
        // If autoplay with sound is blocked by browser policy before user interaction:
        // Play muted initially, and unlock audio immediately on first user interaction
        video.muted = true;
        setMuted(true);
        video.play().catch(() => {});

        const unlockOnInteraction = () => {
          if (!userManuallyMutedRef.current && isHeroInViewRef.current && videoRef.current) {
            videoRef.current.muted = false;
            setMuted(false);
            videoRef.current.play().catch(() => {});
          }
          window.removeEventListener("click", unlockOnInteraction);
          window.removeEventListener("touchstart", unlockOnInteraction);
          window.removeEventListener("keydown", unlockOnInteraction);
          window.removeEventListener("scroll", unlockOnInteraction);
        };

        window.addEventListener("click", unlockOnInteraction, { once: true });
        window.addEventListener("touchstart", unlockOnInteraction, { once: true });
        window.addEventListener("keydown", unlockOnInteraction, { once: true });
        window.addEventListener("scroll", unlockOnInteraction, { once: true });
      }
    };

    startAudioPlayback();
  }, []);

  // Auto-mute and pause video when scrolling down past hero; auto-unmute and play when scrolling back up
  useEffect(() => {
    const heroEl = containerRef.current;
    if (!heroEl) return;

    const handleVisibilityChange = (inView: boolean) => {
      isHeroInViewRef.current = inView;
      const video = videoRef.current;
      if (!video) return;

      if (!inView) {
        // Scrolled down away from hero: pause video and mute sound to completely free GPU and battery
        if (!video.muted) {
          video.muted = true;
        }
        video.pause();
        setMuted(true);
      } else {
        // Scrolled back up to hero: resume video playback smoothly
        video.play().catch(() => {});
        if (!userManuallyMutedRef.current) {
          video.muted = false;
          setMuted(false);
        }
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        handleVisibilityChange(entry.isIntersecting && entry.intersectionRatio > 0.15);
      },
      { threshold: [0, 0.15, 0.5] }
    );

    observer.observe(heroEl);

    const handleScroll = () => {
      const rect = heroEl.getBoundingClientRect();
      const inView = rect.bottom > 100 && rect.top < window.innerHeight;
      handleVisibilityChange(inView);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      setMuted(nextMuted);
      // Remember user manual choice
      userManuallyMutedRef.current = nextMuted;
      if (!nextMuted) {
        videoRef.current.play().catch(() => {});
      }
    }
  };

  // Zero-lag text entrance reveal
  useGSAP(
    () => {
      if (!containerRef.current) return;

      if (reducedMotion) {
        gsap.set([".hero-title", ".hero-tagline", ".hero-stat-number", ".hero-stat-caption"], {
          opacity: 1,
          scale: 1,
          y: 0,
        });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      const dramaticInit = getDramaticInitial();
      const dramaticTgt = getDramaticTarget();
      const bodyInit = getBodyInitial();
      const bodyTgt = getBodyTarget();

      // 1. Headline
      tl.fromTo(
        ".hero-title",
        { ...dramaticInit, transformOrigin: "center center" },
        { ...dramaticTgt, delay: 0.1 }
      )
        // 2. Tagline
        .fromTo(
          ".hero-tagline",
          { ...bodyInit, transformOrigin: "center center" },
          { ...bodyTgt },
          "-=0.55"
        );

      // 3. Stat Numbers & Captions
      const statItems = containerRef.current.querySelectorAll(".hero-stat-item");
      statItems.forEach((item, index) => {
        const num = item.querySelector(".hero-stat-number");
        const cap = item.querySelector(".hero-stat-caption");

        if (num && cap) {
          tl.fromTo(
            num,
            { ...dramaticInit, transformOrigin: "center center" },
            { ...dramaticTgt },
            index === 0 ? "-=0.5" : "-=0.6"
          );
          tl.fromTo(
            cap,
            { ...bodyInit, transformOrigin: "center center" },
            { ...bodyTgt },
            "-=0.6"
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
      className="relative w-full h-screen min-h-[100dvh] overflow-hidden"
    >
      {/* Video Background with Hardware Acceleration */}
      <div className="absolute inset-0 overflow-hidden bg-base">
        {/* Fallback gradient behind video */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d1b2a] via-[#1b2838] to-[#0A0E14] -z-10" />

        <video
          ref={videoRef}
          autoPlay
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
          className="w-full h-full object-cover pointer-events-none transform-gpu will-change-transform"
          poster="/video/hero-poster.jpg"
        >
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Bottom gradient for text contrast */}
      <div className="absolute bottom-0 left-0 right-0 h-[50%] sm:h-[45%] bg-gradient-to-t from-base via-base/70 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-end pb-20 sm:pb-24 md:pb-32 px-4 sm:px-8">
        {/* Name with Responsive Typography */}
        <h1 className="hero-title inline-block font-[family-name:var(--font-display)] text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white tracking-[0.12em] sm:tracking-[0.15em] text-center leading-none mb-2 sm:mb-3 drop-shadow-[0_2px_20px_rgba(0,0,0,0.6)] will-change-transform">
          VIRAT KOHLI
        </h1>

        {/* Tagline */}
        <p className="hero-tagline inline-block font-[family-name:var(--font-serif)] italic text-base sm:text-lg md:text-xl text-white/80 mb-6 sm:mb-8 md:mb-12 tracking-wide text-center will-change-transform">
          Run Machine. King. Legend.
        </p>

        {/* Stats Strip - Responsive 2x2 grid on mobile, row on tablet/desktop */}
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-3 sm:gap-8 md:gap-16 w-full max-w-xs sm:max-w-none">
          {heroStats.map((stat) => (
            <div
              key={stat.label}
              className="hero-stat-item text-center px-3 py-2 sm:px-0 sm:py-0 bg-black/25 sm:bg-transparent rounded-xl backdrop-blur-sm sm:backdrop-blur-none border border-white/10 sm:border-none"
            >
              <div className="hero-stat-number inline-block will-change-transform">
                <CountUp
                  target={stat.value}
                  suffix={stat.suffix || ""}
                  className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white drop-shadow-md"
                />
              </div>
              <p className="hero-stat-caption block text-white/60 text-[10px] md:text-xs tracking-[0.18em] sm:tracking-[0.2em] mt-1 sm:mt-2 uppercase will-change-transform">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Sound toggle button */}
      <button
        onClick={toggleMute}
        className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 z-20 flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm cursor-pointer hover:bg-black/70 hover:scale-105 active:scale-95 transition-all duration-200 shadow-xl"
        aria-label={muted ? "Unmute video sound" : "Mute video sound"}
      >
        <span className="text-sm sm:text-base">{muted ? "🔇" : "🔊"}</span>
        <span className="text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-white/90">
          {muted ? "Muted" : "Sound On"}
        </span>
      </button>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 animate-bounce opacity-50 pointer-events-none">
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
