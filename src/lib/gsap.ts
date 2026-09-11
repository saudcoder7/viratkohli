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
  scale: 0.98,
  y: 18,
  transformOrigin: "center center",
};

export const DRAMATIC_TEXT_TARGET = {
  opacity: 1,
  scale: 1,
  y: 0,
  duration: 0.55,
  ease: "easeSmooth",
};

export const BODY_TEXT_INITIAL = {
  opacity: 0,
  y: 12,
  transformOrigin: "center left",
};

export const BODY_TEXT_TARGET = {
  opacity: 1,
  y: 0,
  duration: 0.55,
  ease: "easeSmooth",
};

/**
 * Mobile-friendly checks and dynamic animation presets that skip heavy CSS filter blur
 * on mobile/touch screens to ensure smooth 60fps/120fps scrolling with zero jank.
 */
export const isMobileDevice = () => {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches;
};

export const getDramaticInitial = () => {
  if (isMobileDevice()) {
    return {
      opacity: 0,
      scale: 0.98,
      y: 16,
      transformOrigin: "center center",
    };
  }
  return DRAMATIC_TEXT_INITIAL;
};

export const getDramaticTarget = () => {
  if (isMobileDevice()) {
    return {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.7,
      ease: "easeSmooth",
    };
  }
  return DRAMATIC_TEXT_TARGET;
};

export const getBodyInitial = () => {
  if (isMobileDevice()) {
    return {
      opacity: 0,
      y: 12,
      transformOrigin: "center left",
    };
  }
  return BODY_TEXT_INITIAL;
};

export const getBodyTarget = () => {
  if (isMobileDevice()) {
    return {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: "easeSmooth",
    };
  }
  return BODY_TEXT_TARGET;
};

