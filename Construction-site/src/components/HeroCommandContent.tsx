"use client";

import { motion } from "motion/react";
import BlurText from "@/components/BlurText";

const tickerItems = [
  "project command",
  "scope approvals",
  "partner movement",
  "daily progress",
  "quality evidence",
  "handover ready",
];

export default function HeroCommandContent() {
  return (
    <div className="relative mx-auto flex h-full w-full max-w-7xl flex-col items-center justify-center">
      <div className="mx-auto flex w-full max-w-5xl -translate-y-4 flex-col items-center text-center sm:-translate-y-3">
        <div className="relative w-full">
          <motion.div
            aria-hidden="true"
            animate={{ opacity: [0.14, 0.36, 0.14], scaleX: [0.9, 1.08, 0.9] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-1/2 top-1/2 h-28 w-[min(92vw,820px)] -translate-x-1/2 -translate-y-1/2 bg-[#7f1d1d]/24 blur-3xl"
          />
          <BlurText
            text="Ractysh"
            delay={80}
            animateBy="words"
            direction="bottom"
            stepDuration={0.45}
            className="hero-display-font relative mx-auto justify-center text-center text-6xl uppercase leading-[0.9] text-white [text-shadow:0_0_46px_rgba(185,28,28,0.36)] sm:text-8xl lg:text-[9rem]"
          />
          <BlurText
            text="Construction"
            delay={80}
            animateBy="words"
            direction="bottom"
            stepDuration={0.42}
            rootMargin="-8% 0px"
            className="hero-display-font relative mx-auto justify-center text-center text-5xl uppercase leading-[0.9] text-white [text-shadow:0_0_46px_rgba(153,27,27,0.32)] sm:text-7xl lg:text-[7.5rem]"
          />
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0, y: 26, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: [0, -8, 0], filter: "blur(0px)" }}
            transition={{
              opacity: { duration: 0.72, delay: 0.7 },
              filter: { duration: 0.72, delay: 0.7 },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            }}
            className="absolute right-0 top-4 hidden border border-white/15 bg-white/[0.04] px-3 py-2 text-left text-xs text-white/70 backdrop-blur-md lg:block"
          >
            <span className="block text-[#fca5a5]">RC-PROJECT</span>
            site command live
          </motion.div>
        </div>

        <BlurText
          text="A project-control construction partner for owners who need drawings, vendors, site teams, approvals, and handover moving in one accountable rhythm."
          delay={36}
          animateBy="words"
          direction="bottom"
          rootMargin="-8% 0px"
          className="mx-auto mt-6 max-w-2xl justify-center text-center text-base leading-7 text-white/78 sm:text-lg sm:leading-8"
        />

        <motion.div
          initial={{ opacity: 0, y: 34, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.82, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-9 sm:flex-row"
        >
          <a
            href="mailto:hello@ractysh.com"
            className="group relative inline-flex h-12 min-w-40 items-center justify-center overflow-hidden bg-[#991b1b] px-6 text-sm font-semibold text-white shadow-[0_0_34px_rgba(127,29,29,0.34)] transition hover:bg-[#b91c1c]"
          >
            <span className="relative z-10">Plan a Project</span>
            <span className="absolute inset-y-0 -left-12 w-10 rotate-12 bg-white/45 transition duration-500 group-hover:left-[120%]" />
          </a>
          <a
            href="#works"
            className="inline-flex h-12 min-w-40 items-center justify-center border border-white/20 bg-white/[0.03] px-6 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-[#ef4444]/80 hover:text-[#fecaca]"
          >
            Explore Work
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 42, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.94, delay: 1.35, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-x-0 bottom-7 mx-auto w-full max-w-5xl overflow-hidden border-y border-white/12 bg-white/[0.025] py-3 sm:bottom-10"
      >
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="flex w-max gap-6 whitespace-nowrap text-xs font-semibold uppercase text-white/62"
        >
          {[...tickerItems, ...tickerItems, ...tickerItems].map((item, index) => (
            <span key={`${item}-${index}`} className="flex items-center gap-6">
              {item}
              <span className="h-1 w-1 bg-[#ef4444]" />
            </span>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
