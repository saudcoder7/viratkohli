"use client";

import { useRef, useEffect, useState } from "react";
import {
  gsap,
  getDramaticInitial,
  getDramaticTarget,
  getBodyInitial,
  getBodyTarget,
} from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { AWARDS } from "@/lib/constants";

const CATEGORY_ICONS: Record<string, string> = {
  national: "🇮🇳",
  icc: "🏏",
  other: "🌍",
};

const CATEGORY_LABELS: Record<string, string> = {
  national: "National Honor",
  icc: "ICC Award",
  other: "Global Recognition",
};

export default function AwardsWall() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

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

  // Cards entrance wave (120ms stagger)
  useGSAP(
    () => {
      if (!gridRef.current) return;

      const cards = gridRef.current.querySelectorAll(".award-card");
      if (!cards.length) return;

      if (reducedMotion) {
        gsap.set(cards, { opacity: 1, scale: 1, y: 0 });
        return;
      }

      // Card container entrance wave
      gsap.fromTo(
        cards,
        { opacity: 0, y: 20, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: "easeSmooth",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      const dramaticInit = getDramaticInitial();
      const dramaticTgt = getDramaticTarget();
      const bodyInit = getBodyInitial();
      const bodyTgt = getBodyTarget();

      // Card inner text
      cards.forEach((card, index) => {
        const title = card.querySelector(".award-title");
        const meta = card.querySelector(".award-meta");

        if (title && meta) {
          const cardTl = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            delay: (index % 4) * 0.08,
          });

          cardTl
            .fromTo(
              title,
              { ...dramaticInit, transformOrigin: "left center" },
              { ...dramaticTgt }
            )
            .fromTo(
              meta,
              { ...bodyInit, transformOrigin: "left center" },
              { ...bodyTgt },
              "-=0.5"
            );
        }
      });
    },
    { scope: gridRef, dependencies: [reducedMotion] }
  );

  return (
    <section ref={sectionRef} id="awards" className="section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="section-header">
          <h2 className="section-title inline-block font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-6xl text-primary will-change-transform">
            AWARDS & HONORS
          </h2>
          <div className="section-rule" />
        </div>

        {/* Grid with staggered entrance and translateY(-6px) hover lift */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
        >
          {AWARDS.map((award) => (
            <div
              key={`${award.name}-${award.years}`}
              className="award-card card rounded-2xl group p-6 cursor-default flex flex-col justify-between h-full"
            >
              <div>
                {/* Category icon */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-200 inline-block">
                    {CATEGORY_ICONS[award.category]}
                  </span>
                  <span className="text-[11px] text-secondary/70 tracking-wider uppercase font-mono">
                    {CATEGORY_LABELS[award.category]}
                  </span>
                </div>

                {/* Award name with dramatic blur+spin */}
                <h3 className="award-title inline-block font-[family-name:var(--font-display)] text-xl sm:text-2xl tracking-[0.05em] text-primary mb-2 group-hover:text-accent-blue transition-colors duration-200 will-change-transform">
                  {award.name}
                </h3>
              </div>

              {/* Years with lighter blur */}
              <p className="award-meta text-secondary/80 text-xs sm:text-sm font-mono tracking-wider pt-4 mt-4 border-t border-hairline/60 will-change-transform">
                {award.years}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
