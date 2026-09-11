"use client";

import Link from "next/link";

const QUICK_LINKS = [
  { label: "Test", href: "/test" },
  { label: "ODI", href: "/odi" },
  { label: "T20I", href: "/t20i" },
  { label: "IPL", href: "/ipl" },
  { label: "Achievements", href: "#awards" },
  { label: "Photos & Videos", href: "#gallery" },
  { label: "Fan Zone", href: "#fan-zone" },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-surface border-t border-hairline pt-16 md:pt-24 pb-12 md:pb-16 px-6 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {/* ── 3-Column Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 lg:gap-16 pb-12 md:pb-16 border-b border-hairline">
          {/* Left Column: Wordmark & Description */}
          <div className="md:col-span-4 flex flex-col justify-start">
            <Link href="/" className="inline-block group mb-3">
              <span className="font-[family-name:var(--font-display)] text-5xl sm:text-6xl tracking-[0.15em] text-primary group-hover:text-accent-blue transition-colors duration-200 leading-none">
                VK
              </span>
            </Link>
            <span className="font-[family-name:var(--font-display)] text-xs tracking-[0.2em] text-accent-blue uppercase mb-3">
              King Kohli: The Journey
            </span>
            <p className="text-secondary text-sm leading-relaxed max-w-sm">
              An unofficial fan tribute to Virat Kohli&apos;s career.
            </p>
          </div>

          {/* Middle Column: Quick Links with Animated Hover-Underline */}
          <div className="md:col-span-4">
            <h3 className="font-[family-name:var(--font-display)] text-sm tracking-[0.2em] text-primary uppercase mb-4">
              Quick Links
            </h3>
            <ul className="grid grid-cols-2 gap-y-2.5 gap-x-4">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group relative inline-block text-secondary hover:text-primary transition-colors duration-200 text-sm py-1"
                  >
                    <span>{link.label}</span>
                    <span
                      className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-accent-blue transition-all duration-200 group-hover:w-full"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: About & Disclaimer */}
          <div className="md:col-span-4">
            <h3 className="font-[family-name:var(--font-display)] text-sm tracking-[0.2em] text-primary uppercase mb-4">
              About This Tribute
            </h3>
            <p className="text-secondary text-xs sm:text-sm leading-relaxed">
              Unofficial fan tribute site. Not affiliated with or endorsed by
              Virat Kohli, BCCI, or any team. Images/video used for
              non-commercial fan-tribute purposes; rights belong to their
              respective owners.
            </p>
          </div>
        </div>

        {/* ── Bottom Bar: Full Width with Creator Credit ── */}
        <div className="pt-8 md:pt-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="text-xs sm:text-sm text-secondary flex flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-1.5 leading-relaxed">
            <span>© 2026 King Kohli: The Journey</span>
            <span className="hidden sm:inline text-hairline" aria-hidden="true">
              —
            </span>
            <span className="text-secondary">
              Made by{" "}
              <strong className="text-primary font-semibold">
                Saud Faisal
              </strong>
              , greatest fan of Virat Kohli
            </span>
          </div>

          {/* Back to Top Button */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-hairline/80 bg-base/60 text-secondary hover:text-accent-blue hover:border-accent-blue/40 transition-all duration-200 cursor-pointer group text-xs tracking-wider font-mono hover:scale-105 active:scale-95 shadow-sm"
            aria-label="Back to top of page"
          >
            <span>Back to top</span>
            <span
              className="group-hover:-translate-y-0.5 transition-transform duration-200"
              aria-hidden="true"
            >
              ↑
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
