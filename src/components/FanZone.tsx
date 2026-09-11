"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  gsap,
  DRAMATIC_TEXT_INITIAL,
  DRAMATIC_TEXT_TARGET,
  BODY_TEXT_INITIAL,
  BODY_TEXT_TARGET,
} from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { POLL_OPTIONS } from "@/lib/constants";

interface FanMessage {
  id: string;
  text: string;
  timestamp: number;
}

export default function FanZone() {
  const sectionRef = useRef<HTMLElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  // Update 23: Section Header & column titles reveal with dramatic blur+spin at ~75% viewport
  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const headerTitle = sectionRef.current.querySelector(".section-title");
      const headerRule = sectionRef.current.querySelector(".section-rule");
      const colTitle1 = sectionRef.current.querySelector(".col-title-1");
      const colTitle2 = sectionRef.current.querySelector(".col-title-2");
      const colDesc2 = sectionRef.current.querySelector(".col-desc-2");

      if (!headerTitle || !headerRule) return;

      if (reducedMotion) {
        gsap.set([headerTitle, headerRule, colTitle1, colTitle2, colDesc2], {
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
      )
        .fromTo(
          headerRule,
          { opacity: 0, scaleX: 0, transformOrigin: "left center" },
          { opacity: 1, scaleX: 1, duration: 0.8, ease: "easeSmooth" },
          "-=0.84"
        );

      if (colTitle1 && colTitle2) {
        tl.fromTo(
          [colTitle1, colTitle2],
          { ...DRAMATIC_TEXT_INITIAL, transformOrigin: "left center" },
          { ...DRAMATIC_TEXT_TARGET, stagger: 0.14 },
          "-=0.6"
        );
      }

      if (colDesc2) {
        tl.fromTo(
          colDesc2,
          { ...BODY_TEXT_INITIAL, transformOrigin: "left center" },
          { ...BODY_TEXT_TARGET },
          "-=0.84"
        );
      }
    },
    { scope: sectionRef, dependencies: [reducedMotion] }
  );

  const [messages, setMessages] = useState<FanMessage[]>([
    { id: "1", text: "King Kohli forever! 🏏 The greatest chaser cricket has ever seen.", timestamp: Date.now() - 300000 },
    { id: "2", text: "That 82* vs Pakistan... I still get chills watching it!", timestamp: Date.now() - 200000 },
    { id: "3", text: "From Delhi's gullies to the world stage. What a journey. 🇮🇳", timestamp: Date.now() - 100000 },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [pollVotes, setPollVotes] = useState<Record<string, number>>({
    [POLL_OPTIONS[0]]: 47,
    [POLL_OPTIONS[1]]: 23,
    [POLL_OPTIONS[2]]: 18,
    [POLL_OPTIONS[3]]: 12,
    [POLL_OPTIONS[4]]: 8,
    [POLL_OPTIONS[5]]: 15,
  });
  const [votedFor, setVotedFor] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const totalVotes = Object.values(pollVotes).reduce((a, b) => a + b, 0);

  const handleSubmitMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const msg: FanMessage = {
      id: Date.now().toString(),
      text: newMessage.trim(),
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, msg]);
    setNewMessage("");
  };

  const handleVote = (option: string) => {
    if (votedFor) return;
    setPollVotes((prev) => ({ ...prev, [option]: (prev[option] || 0) + 1 }));
    setVotedFor(option);
  };

  const formatTime = (ts: number) => {
    const diff = Math.floor((Date.now() - ts) / 60000);
    if (diff < 1) return "Just now";
    if (diff < 60) return `${diff}m ago`;
    return `${Math.floor(diff / 60)}h ago`;
  };

  return (
    <section ref={sectionRef} id="fan-zone" className="section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="section-header">
          <h2 className="section-title inline-block text-4xl sm:text-5xl md:text-6xl font-[family-name:var(--font-display)] text-primary will-change-transform">
            FAN ZONE
          </h2>
          <div className="section-rule" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Fan Wall */}
          <div>
            <h3 className="col-title-1 inline-block font-[family-name:var(--font-display)] text-2xl tracking-[0.1em] text-primary mb-6 will-change-transform">
              FAN MESSAGES
            </h3>

            {/* Messages */}
            <div className="space-y-3 max-h-[400px] overflow-y-auto mb-4 pr-2">
              <AnimatePresence>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="card rounded-2xl p-4 sm:p-6 hover:border-white/20"
                  >
                    <p className="text-primary text-sm leading-relaxed">
                      {msg.text}
                    </p>
                    <p className="text-secondary/50 text-xs mt-2 font-mono">
                      {formatTime(msg.timestamp)}
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmitMessage} className="flex gap-3">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Share your message for King Kohli..."
                maxLength={280}
                className="flex-1 bg-surface border border-hairline rounded-xl px-4 py-3 text-primary text-sm placeholder:text-secondary/40 focus:outline-none focus:border-accent-blue/50 transition-colors duration-200"
              />
              <button
                type="submit"
                disabled={!newMessage.trim()}
                className="px-6 py-3 bg-accent-blue rounded-xl text-white text-sm font-medium hover:bg-accent-blue-hover transition-all duration-200 hover:scale-[1.03] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer shadow-lg shadow-accent-blue/20"
              >
                Send
              </button>
            </form>
            <p className="text-secondary/40 text-xs mt-2 font-mono">
              Messages are public. Be respectful.
            </p>
          </div>

          {/* Live Poll */}
          <div>
            <h3 className="col-title-2 inline-block font-[family-name:var(--font-display)] text-2xl tracking-[0.1em] text-primary mb-2 will-change-transform">
              BEST KOHLI KNOCK EVER?
            </h3>
            <p className="col-desc-2 text-secondary text-sm mb-6 will-change-transform">
              {totalVotes} votes · {votedFor ? "You voted!" : "Cast your vote"}
            </p>

            <div className="space-y-3">
              {POLL_OPTIONS.map((option) => {
                const votes = pollVotes[option] || 0;
                const percentage =
                  totalVotes > 0 ? (votes / totalVotes) * 100 : 0;
                const isSelected = votedFor === option;

                return (
                  <motion.button
                    key={option}
                    onClick={() => handleVote(option)}
                    disabled={!!votedFor}
                    whileHover={!votedFor ? { scale: 1.015, y: -2 } : undefined}
                    whileTap={!votedFor ? { scale: 0.985 } : undefined}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className={`
                      w-full text-left rounded-2xl border p-4 sm:p-6 relative overflow-hidden cursor-pointer
                      transition-all duration-200
                      ${
                        isSelected
                          ? "border-accent-blue bg-accent-blue/15 shadow-lg shadow-accent-blue/10"
                          : "border-hairline bg-surface hover:border-white/20 hover:shadow-md"
                      }
                      ${votedFor && !isSelected ? "opacity-55" : ""}
                      disabled:cursor-default
                    `}
                  >
                    {/* Progress bar with spring animation on selection */}
                    {votedFor && (
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                          delay: 0.05,
                        }}
                        className={`absolute inset-y-0 left-0 rounded-xl ${
                          isSelected ? "bg-accent-blue/20" : "bg-white/5"
                        }`}
                      />
                    )}

                    <div className="relative z-10 flex items-center justify-between">
                      <span className="text-primary text-sm pr-4 font-medium">
                        {option}
                      </span>
                      {votedFor && (
                        <span className="text-secondary text-sm font-mono font-medium whitespace-nowrap">
                          {Math.round(percentage)}%
                        </span>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
