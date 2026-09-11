"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import {
  gsap,
  getDramaticInitial,
  getDramaticTarget,
} from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { GALLERY_ITEMS, type GalleryItem } from "@/lib/constants";

const GRADIENT_PALETTE = [
  "from-blue-900/40 to-slate-900/60",
  "from-purple-900/40 to-slate-900/60",
  "from-emerald-900/40 to-slate-900/60",
  "from-amber-900/40 to-slate-900/60",
  "from-rose-900/40 to-slate-900/60",
  "from-cyan-900/40 to-slate-900/60",
];

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [activeVideo, setActiveVideo] = useState<GalleryItem | null>(null);

  useEffect(() => {
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  // Lock body scroll and listen for Escape key when video modal is open
  useEffect(() => {
    if (!activeVideo) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveVideo(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeVideo]);

  // Section Header reveal
  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const headerTitle = sectionRef.current.querySelector(".section-title");
      const headerRule = sectionRef.current.querySelector(".section-rule");

      if (!headerTitle || !headerRule) return;

      if (reducedMotion) {
        gsap.set([headerTitle, headerRule], {
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

      tl.fromTo(
        headerTitle,
        { ...dramaticInit, transformOrigin: "center left" },
        { ...dramaticTgt }
      ).fromTo(
        headerRule,
        { opacity: 0, scaleX: 0, transformOrigin: "left center" },
        { opacity: 1, scaleX: 1, duration: 0.6, ease: "easeSmooth" },
        "-=0.5"
      );
    },
    { scope: sectionRef, dependencies: [reducedMotion] }
  );

  // Gallery items entrance
  useGSAP(
    () => {
      if (!containerRef.current) return;

      const items = containerRef.current.querySelectorAll(".gallery-item");
      if (!items.length) return;

      if (reducedMotion) {
        gsap.set(items, { opacity: 1, y: 0, scale: 1 });
        return;
      }

      gsap.fromTo(
        items,
        { opacity: 0, y: 20, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: "easeSmooth",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: containerRef, dependencies: [reducedMotion] }
  );

  return (
    <section ref={sectionRef} id="gallery" className="section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Header with Dramatic Blur+Spin */}
        <div className="section-header">
          <h2 className="section-title inline-block text-4xl sm:text-5xl md:text-6xl font-[family-name:var(--font-display)] text-primary will-change-transform">
            GALLERY
          </h2>
          <div className="section-rule" />
        </div>

        {/* Masonry-style grid with responsive gap and auto-rows */}
        <div
          ref={containerRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[160px] sm:auto-rows-[190px] md:auto-rows-[220px] gap-3 sm:gap-6"
        >
          {GALLERY_ITEMS.map((item, i) => (
            <div
              key={item.id}
              onClick={() => {
                if (item.type === "video" && item.youtubeId) {
                  setActiveVideo(item);
                }
              }}
              className={`gallery-item ${item.span} card rounded-2xl overflow-hidden relative group cursor-pointer border border-hairline hover:border-white/25`}
            >
              {/* Media image or placeholder gradient with clipped overflow */}
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.label}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center card-img-zoom"
                />
              ) : (
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${
                    GRADIENT_PALETTE[i % GRADIENT_PALETTE.length]
                  }`}
                />
              )}

              {/* Type indicator */}
              <div className="absolute top-3 left-3 z-10">
                {item.type === "video" ? (
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-base/70 backdrop-blur-md border border-hairline text-xs text-secondary">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="currentColor"
                    >
                      <path d="M4 2.5v7l6-3.5-6-3.5z" />
                    </svg>
                    <span>Video</span>
                  </div>
                ) : null}
              </div>

              {/* Video Play Button Overlay */}
              {item.type === "video" && item.youtubeId && (
                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-black/60 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-lg shadow-accent-blue/30 group-hover:scale-110 group-hover:bg-accent-blue group-hover:border-accent-blue transition-all duration-300">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="text-white translate-x-0.5"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              )}

              {/* Hover overlay with smooth caption fade-in & slide-up */}
              <div className="absolute inset-0 bg-gradient-to-t from-base/90 via-base/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <span className="font-[family-name:var(--font-display)] text-base md:text-lg tracking-[0.15em] text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Video Player Lightbox Modal */}
        {activeVideo && activeVideo.youtubeId && (
          <div
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 md:p-10 animate-fade-in"
            onClick={() => setActiveVideo(null)}
          >
            <div
              className="relative w-full max-w-4xl bg-surface border border-white/20 rounded-2xl overflow-hidden shadow-2xl shadow-accent-blue/20"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-hairline bg-surface-elevated/80">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-accent-blue/20 text-accent-blue text-xs font-semibold tracking-wider">
                    VIDEO
                  </span>
                  <h3 className="font-[family-name:var(--font-display)] text-lg md:text-xl text-primary tracking-wide">
                    {activeVideo.label} — Virat Kohli
                  </h3>
                </div>
                <button
                  onClick={() => setActiveVideo(null)}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-secondary hover:text-white flex items-center justify-center transition-colors border border-hairline"
                  aria-label="Close modal"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* 16:9 Responsive Video Player */}
              <div className="relative aspect-video w-full bg-black">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0`}
                  title={activeVideo.label}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
