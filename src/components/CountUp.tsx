"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "@/lib/gsap";

interface CountUpProps {
  target: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

export default function CountUp({
  target,
  suffix = "",
  duration = 1.0,
  className = "",
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!ref.current || hasAnimated) return;

    const el = ref.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      el.textContent = target.toLocaleString() + suffix;
      setHasAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const obj = { val: 0 };
          gsap.to(obj, {
            val: target,
            duration,
            ease: "power2.out",
            snap: { val: 1 },
            onUpdate: () => {
              if (el) el.textContent = Math.floor(obj.val).toLocaleString() + suffix;
            },
            onComplete: () => setHasAnimated(true),
          });
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, suffix, duration, hasAnimated]);

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}
