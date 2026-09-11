"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import type { FormatKey } from "./constants";

interface FormatContextType {
  activeFormat: FormatKey;
  setActiveFormat: (format: FormatKey, scrollIntoView?: boolean) => void;
}

const FormatContext = createContext<FormatContextType | null>(null);

export function FormatProvider({ children }: { children: React.ReactNode }) {
  const [activeFormat, setActiveFormatState] = useState<FormatKey>("test");

  // Read URL hash on mount & listen for hash changes (e.g. back/forward button)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "").toLowerCase();
      if (hash === "test" || hash === "odi" || hash === "t20i" || hash === "ipl") {
        setActiveFormatState(hash as FormatKey);
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    window.addEventListener("popstate", handleHash);
    return () => {
      window.removeEventListener("hashchange", handleHash);
      window.removeEventListener("popstate", handleHash);
    };
  }, []);

  const setActiveFormat = useCallback(
    (format: FormatKey, scrollIntoView = false) => {
      setActiveFormatState(format);

      // Update URL hash with history entry for back/forward support
      if (window.location.hash !== `#${format}`) {
        window.history.pushState(null, "", `#${format}`);
      }

      if (scrollIntoView) {
        const el = document.getElementById("format-section");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    },
    []
  );

  return (
    <FormatContext.Provider value={{ activeFormat, setActiveFormat }}>
      {children}
    </FormatContext.Provider>
  );
}

export function useFormat() {
  const ctx = useContext(FormatContext);
  if (!ctx) {
    throw new Error("useFormat must be used within a FormatProvider");
  }
  return ctx;
}
