"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const isReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (isTouch || isReduced) return;

    const glow = glowRef.current;
    if (!glow) return;

    glow.style.opacity = "1";

    const onMouseMove = (e: MouseEvent) => {
      glow.style.transform = `translate(${e.clientX - 60}px, ${e.clientY - 60}px)`;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  // SSR-safe: always render the div, hide via CSS for touch/reduced-motion
  return (
    <div
      ref={glowRef}
      className="fixed top-0 left-0 z-[9999] pointer-events-none opacity-0 hidden md:block"
      style={{
        width: 120,
        height: 120,
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(59,130,246,0.07) 0%, rgba(59,130,246,0.02) 50%, transparent 70%)",
        willChange: "transform",
        transition: "opacity 0.3s ease",
      }}
      aria-hidden="true"
    />
  );
}
