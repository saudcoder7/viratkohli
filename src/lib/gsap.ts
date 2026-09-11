"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, CustomEase);
  try {
    CustomEase.create("easeSmooth", "0.16, 1, 0.3, 1");
  } catch (e) {
    // fallback if already registered
  }
}

export { gsap, ScrollTrigger, CustomEase };

// ─── Update 23: Dramatic Blur + Spin Text Reveal Parameters ───

/**
 * Full dramatic blur+spin effect for headings, card titles, big stat numbers:
 * Starts blurred (14px), rotated (-4deg), larger (1.08), down (24px), opacity (0)
 * Resolves to sharp (0px), straight (0deg), normal (1), settled (0px), opacity (1)
 */
export const DRAMATIC_TEXT_INITIAL = {
  opacity: 0,
  filter: "blur(14px)",
  scale: 1.08,
  rotation: -4,
  y: 24,
  transformOrigin: "center center",
};

export const DRAMATIC_TEXT_TARGET = {
  opacity: 1,
  filter: "blur(0px)",
  scale: 1,
  rotation: 0,
  y: 0,
  duration: 1.0,
  ease: "easeSmooth",
};

/**
 * Lighter blur+spin effect for longer body text and description lines:
 * Near-zero rotation (-1deg), smaller scale difference (1.02), softer blur (8px)
 */
export const BODY_TEXT_INITIAL = {
  opacity: 0,
  filter: "blur(8px)",
  scale: 1.02,
  rotation: -1,
  y: 18,
  transformOrigin: "center left",
};

export const BODY_TEXT_TARGET = {
  opacity: 1,
  filter: "blur(0px)",
  scale: 1,
  rotation: 0,
  y: 0,
  duration: 1.0,
  ease: "easeSmooth",
};
