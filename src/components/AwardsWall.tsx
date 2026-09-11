"use client";

import { useRef, useEffect, useState } from "react";
import {
  gsap,
  DRAMATIC_TEXT_INITIAL,
  DRAMATIC_TEXT_TARGET,
  BODY_TEXT_INITIAL,
  BODY_TEXT_TARGET,
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

  // Update 23: Section Header reveal with dramatic blur+spin at ~75% viewport
  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const headerTitle = sectionRef.current.querySelector(".section-title");
      const headerRule = sectionRef.current.querySelector(".section-rule");

      if (!headerTitle || !headerRule) return;

      if (reducedMotion) {
        gsap.set([headerTitle, headerRule], {
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
          trigger: headerTitle,
          start: "top 75%",
          toggleActions: "play reverse play reverse",
        },
      });

      tl.fromTo(
        headerTitle,
        { ...DRAMATIC_TEXT_INITIAL, transformOrigin: "center left" },
        { ...DRAMATIC_TEXT_TARGET }
      ).fromTo(
        headerRule,
        { opacity: 0, scaleX: 0, transformOrigin: "left center" },
        { opacity: 1, scaleX: 1, duration: 0.8, ease: "easeSmooth" },
        "-=0.84"
      );
    },
    { scope: sectionRef, dependencies: [reducedMotion] }
  );

  // Update 23/24: Cards entrance wave (160ms stagger) + title dramatic blur+spin with reliable re-trigger
  useGSAP(
    () => {
      if (!gridRef.current) return;

      const cards = gridRef.current.querySelectorAll(".award-card");
      if (!cards.length) return;

      if (reducedMotion) {
        gsap.set(cards, { opacity: 1, scale: 1, y: 0 });
        cards.forEach((card) => {
          gsap.set(card.querySelectorAll(".award-title, .award-meta"), {
            opacity: 1,
            filter: "blur(0px)",
            scale: 1,
            rotation: 0,
            y: 0,
          });
        });
        return;
      }

      // Card container entrance wave
      gsap.fromTo(
        cards,
        { opacity: 0, y: 24, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.14,
          ease: "easeSmooth",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 75%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      // Card inner text blur+spin
      cards.forEach((card, index) => {
        const title = card.querySelector(".award-title");
        const meta = card.querySelector(".award-meta");

        if (title && meta) {
          const cardTl = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: "top 78%",
              toggleActions: "play reverse play reverse",
            },
            delay: (index % 4) * 0.12,
          });

          cardTl
            .fromTo(
              title,
              { ...DRAMATIC_TEXT_INITIAL, transformOrigin: "left center" },
              { ...DRAMATIC_TEXT_TARGET }
            )
            .fromTo(
              meta,
              { ...BODY_TEXT_INITIAL, transformOrigin: "left center" },
              { ...BODY_TEXT_TARGET },
              "-=0.84"
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
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
