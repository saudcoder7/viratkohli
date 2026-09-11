"use client";

import { useState, useEffect, useCallback } from "react";
import { NAV_LINKS, type NavLinkItem } from "@/lib/constants";
import { useFormat } from "@/lib/FormatContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [mobileOpen, setMobileOpen] = useState(false);
  const { activeFormat, setActiveFormat } = useFormat();

  // Track scroll position for header background transition
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.35);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sectionIds = [
      "hero",
      "highlights",
      "stats",
      "awards",
      "gallery",
      "fan-zone",
    ];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: "-20% 0px -40% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleLinkClick = useCallback(
    (link: NavLinkItem) => {
      setMobileOpen(false);
      if (link.format) {
        // Dedicated format story route
        window.location.href = link.href;
      } else {
        const id = link.href.replace("#", "");
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          window.history.pushState(null, "", link.href);
        } else {
          window.location.href = "/" + link.href;
        }
      }
    },
    []
  );

  return (
    <>
      <nav
        className={`
          fixed top-0 left-0 right-0 z-50
          px-6 sm:px-8 py-4
          transition-all duration-500
          ${
            scrolled
              ? "bg-base/95 border-b border-hairline shadow-lg shadow-black/20"
              : "bg-transparent border-b border-transparent"
          }
        `}
        style={
          scrolled
            ? {
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
              }
            : undefined
        }
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* VK Wordmark */}
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              window.history.pushState(null, "", window.location.pathname);
            }}
            className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold tracking-wider text-primary cursor-pointer hover:text-accent-blue transition-colors duration-300 mr-4"
          >
            VK
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {NAV_LINKS.map((link) => {
              // Determine whether this link is active
              let isActive = false;
              if (link.format) {
                isActive =
                  (activeSection === "format-section" ||
                    activeSection === link.format) &&
                  activeFormat === link.format;
              } else {
                const targetId = link.href.replace("#", "");
                isActive = activeSection === targetId;
              }

              const isIPLActive = isActive && link.format === "ipl";
              const underlineColor = isIPLActive
                ? "bg-accent-red"
                : "bg-accent-blue";

              return (
                <button
                  key={link.label}
                  onClick={() => handleLinkClick(link)}
                  className={`
                    group relative py-1 font-[family-name:var(--font-display)] text-xs xl:text-sm tracking-[0.18em]
                    transition-all duration-200 cursor-pointer hover:scale-[1.03] active:scale-95
                    ${
                      isActive
                        ? "text-primary opacity-100 font-semibold"
                        : "text-secondary opacity-70 hover:opacity-100 hover:text-primary"
                    }
                  `}
                >
                  {link.label}
                  {/* Active-state underline */}
                  {isActive ? (
                    <motion.span
                      layoutId="nav-active-underline"
                      className={`absolute -bottom-1 left-0 right-0 h-[2px] rounded-full ${underlineColor}`}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 32,
                      }}
                    />
                  ) : (
                    /* Hover underline: grows from 0 to full width smoothly */
                    <span
                      className={`absolute -bottom-1 left-0 right-0 h-[2px] rounded-full ${
                        link.format === "ipl" ? "bg-accent-red/70" : "bg-accent-blue/70"
                      } scale-x-0 group-hover:scale-x-100 transition-transform duration-250 origin-left ease-[cubic-bezier(0.16,1,0.3,1)]`}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Medium screen Nav */}
          <div className="hidden md:flex lg:hidden items-center gap-4 overflow-x-auto no-scrollbar">
            {NAV_LINKS.map((link) => {
              let isActive = false;
              if (link.format) {
                isActive =
                  (activeSection === "format-section" ||
                    activeSection === link.format) &&
                  activeFormat === link.format;
              } else {
                const targetId = link.href.replace("#", "");
                isActive = activeSection === targetId;
              }

              const isIPLActive = isActive && link.format === "ipl";
              const underlineColor = isIPLActive
                ? "bg-accent-red"
                : "bg-accent-blue";

              return (
                <button
                  key={link.label}
                  onClick={() => handleLinkClick(link)}
                  className={`
                    group relative py-1 font-[family-name:var(--font-display)] text-xs tracking-[0.15em]
                    transition-all duration-200 cursor-pointer whitespace-nowrap hover:scale-[1.03] active:scale-95
                    ${
                      isActive
                        ? "text-primary opacity-100 font-semibold"
                        : "text-secondary opacity-70 hover:opacity-100 hover:text-primary"
                    }
                  `}
                >
                  {link.label}
                  {isActive ? (
                    <span
                      className={`absolute -bottom-1 left-0 right-0 h-[2px] rounded-full ${underlineColor}`}
                    />
                  ) : (
                    <span
                      className={`absolute -bottom-1 left-0 right-0 h-[2px] rounded-full ${
                        link.format === "ipl" ? "bg-accent-red/70" : "bg-accent-blue/70"
                      } scale-x-0 group-hover:scale-x-100 transition-transform duration-250 origin-left ease-[cubic-bezier(0.16,1,0.3,1)]`}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden relative w-6 h-5 flex flex-col justify-between cursor-pointer z-50 p-1"
            aria-label="Toggle menu"
          >
            <span
              className={`block h-[2px] w-full rounded bg-primary transition-all duration-300 ${
                mobileOpen ? "rotate-45 translate-y-[8px]" : ""
              }`}
            />
            <span
              className={`block h-[2px] w-full rounded bg-primary transition-all duration-300 ${
                mobileOpen ? "opacity-0 scale-0" : ""
              }`}
            />
            <span
              className={`block h-[2px] w-full rounded bg-primary transition-all duration-300 ${
                mobileOpen ? "-rotate-45 -translate-y-[8px]" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-base/98 backdrop-blur-xl flex flex-col items-center justify-center gap-6 px-6 py-12"
          >
            {NAV_LINKS.map((link, i) => {
              let isActive = false;
              if (link.format) {
                isActive =
                  (activeSection === "format-section" ||
                    activeSection === link.format) &&
                  activeFormat === link.format;
              } else {
                const targetId = link.href.replace("#", "");
                isActive = activeSection === targetId;
              }

              return (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ delay: i * 0.04, duration: 0.3 }}
                  onClick={() => handleLinkClick(link)}
                  className={`relative font-[family-name:var(--font-display)] text-2xl sm:text-3xl tracking-[0.25em] transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "text-primary opacity-100 font-bold"
                      : "text-secondary opacity-70 hover:opacity-100 hover:text-primary"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span
                      className={`block w-12 h-[2px] mx-auto mt-1 rounded-full ${
                        link.format === "ipl" ? "bg-accent-red" : "bg-accent-blue"
                      }`}
                    />
                  )}
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
