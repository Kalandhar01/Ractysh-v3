"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Menu, Ship, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Overview", href: "#overview" },
  { label: "Services", href: "#services" },
  { label: "Routes", href: "#routes" },
  { label: "Compliance", href: "#compliance" },
];

export default function NavbarUnderline() {
  const [activeItem, setActiveItem] = useState(navItems[0].href);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-sky-100/80 bg-white/82 backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link
          href="/"
          className="flex items-center gap-3 text-slate-950"
          aria-label="Ractysh Import Export home"
        >
          <span className="grid size-10 place-items-center rounded-xl bg-sky-100 text-sky-700 ring-1 ring-sky-200">
            <Ship className="size-5" aria-hidden="true" />
          </span>
          <span className="leading-none">
            <span className="block text-sm font-bold tracking-tight sm:text-base">
              Ractysh Trade
            </span>
            <span className="mt-1 block text-xs font-medium text-sky-700/70">
              Import Export
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => {
            const isActive = activeItem === item.href;

            return (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setActiveItem(item.href)}
                className={cn(
                  "relative py-2 text-sm font-semibold transition-colors",
                  isActive ? "text-sky-700" : "text-slate-600 hover:text-slate-950",
                )}
              >
                {item.label}
                {isActive ? (
                  <motion.span
                    layoutId="navbar-underline"
                    className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-sky-500"
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                  />
                ) : null}
              </a>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="#contact"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-sky-600 px-5 text-sm font-semibold text-white shadow-sm shadow-sky-200 transition hover:bg-sky-700"
          >
            Get quote
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
        </div>

        <button
          type="button"
          className="grid size-10 place-items-center rounded-xl border border-sky-100 bg-white text-slate-800 shadow-sm md:hidden"
          aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((current) => !current)}
        >
          {mobileOpen ? (
            <X className="size-5" aria-hidden="true" />
          ) : (
            <Menu className="size-5" aria-hidden="true" />
          )}
        </button>
      </nav>

      {mobileOpen ? (
        <div className="border-t border-sky-100 bg-white px-5 py-4 shadow-xl shadow-sky-100/40 md:hidden">
          <div className="mx-auto grid max-w-7xl gap-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => {
                  setActiveItem(item.href);
                  setMobileOpen(false);
                }}
                className="relative rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-sky-50 hover:text-sky-700"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="mt-2 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-sky-600 px-4 text-sm font-semibold text-white transition hover:bg-sky-700"
            >
              Get quote
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
