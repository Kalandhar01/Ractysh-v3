"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  ArrowRight,
  BadgeCheck,
  FileText,
  Menu,
  PackageCheck,
  Ship,
  X,
} from "lucide-react";

const navItems = [
  { label: "Services", href: "#services" },
  { label: "Routes", href: "#routes" },
  { label: "Compliance", href: "#compliance" },
  { label: "Contact", href: "#contact" },
];

const heroSlides = [
  {
    label: "Ocean lanes",
    image: "/images/import-export-hero.jpg",
    eyebrow: "Trade route control",
    support:
      "Container movement, freight decisions, and documentation clarity from first supplier note to final delivery.",
  },
  {
    label: "Trade desk",
    image: "/images/showcase-import-export.webp",
    eyebrow: "Executive import export desk",
    support:
      "A private operating layer for sourcing, quote review, shipment planning, customs checks, and client reporting.",
  },
  {
    label: "Ground network",
    image: "/images/global-trade-transport.webp",
    eyebrow: "Global supply movement",
    support:
      "Coordinate port, warehouse, last-mile, and proof handoffs with disciplined visibility across every active mandate.",
  },
];

const deskSignals = [
  { label: "Sourcing", value: "verified", Icon: BadgeCheck },
  { label: "Freight", value: "controlled", Icon: Ship },
  { label: "Customs", value: "checked", Icon: FileText },
  { label: "Delivery", value: "reported", Icon: PackageCheck },
];

const carouselDuration = 6.4;

export default function HeroWithBackgroundAndNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);
  const textRef = useRef<HTMLDivElement | null>(null);
  const previousSlideRef = useRef(0);
  const timerRef = useRef<number | null>(null);
  const active = heroSlides[activeSlide];

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      gsap.set(slideRefs.current, {
        autoAlpha: 0,
        scale: reduceMotion ? 1 : 1.08,
      });
      gsap.set(slideRefs.current[0], { autoAlpha: 1, scale: 1 });

      gsap.fromTo(
        "[data-trade-nav]",
        { opacity: 0, y: -14 },
        {
          opacity: 1,
          y: 0,
          duration: reduceMotion ? 0 : 0.8,
          ease: "power3.out",
        },
      );
      gsap.fromTo(
        "[data-trade-hero-reveal]",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: reduceMotion ? 0 : 0.9,
          stagger: reduceMotion ? 0 : 0.08,
          ease: "power3.out",
          delay: reduceMotion ? 0 : 0.1,
        },
      );
    });

    if (!reduceMotion) {
      timerRef.current = window.setInterval(() => {
        setActiveSlide((current) => (current + 1) % heroSlides.length);
      }, carouselDuration * 1000);
    }

    return () => {
      ctx.revert();
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const previousSlide = previousSlideRef.current;
    const outgoing = slideRefs.current[previousSlide];
    const incoming = slideRefs.current[activeSlide];

    if (previousSlide === activeSlide || !incoming) return;

    const timeline = gsap.timeline({ defaults: { ease: "power3.inOut" } });

    timeline
      .set(incoming, { autoAlpha: 0, scale: reduceMotion ? 1 : 1.08 })
      .to(
        outgoing,
        {
          autoAlpha: 0,
          scale: reduceMotion ? 1 : 1.02,
          duration: reduceMotion ? 0 : 1.25,
        },
        0,
      )
      .to(
        incoming,
        { autoAlpha: 1, scale: 1, duration: reduceMotion ? 0 : 1.25 },
        0,
      )
      .fromTo(
        textRef.current,
        { opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 14 },
        {
          opacity: 1,
          y: 0,
          duration: reduceMotion ? 0 : 0.56,
          ease: "power3.out",
        },
        reduceMotion ? 0 : 0.22,
      );

    previousSlideRef.current = activeSlide;
  }, [activeSlide]);

  return (
    <section className="relative min-h-svh overflow-hidden bg-[#06080a] text-white">
      <div className="absolute inset-0" aria-hidden="true">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.label}
            ref={(node) => {
              slideRefs.current[index] = node;
            }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${slide.image}')` }}
          />
        ))}
      </div>

      <div
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.62)_0%,rgba(0,0,0,0.42)_40%,rgba(0,0,0,0.78)_100%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.18),transparent_34%),radial-gradient(circle_at_16%_18%,rgba(6,182,212,0.24),transparent_30%),radial-gradient(circle_at_86%_78%,rgba(245,158,11,0.2),transparent_34%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:4.5rem_4.5rem] opacity-45"
        aria-hidden="true"
      />

      <header
        data-trade-nav
        className="relative z-30 mx-auto max-w-7xl px-5 pt-5 sm:px-8 lg:px-10"
      >
        <nav className="flex min-h-16 items-center justify-between rounded-full border border-white/16 bg-black/28 px-3 shadow-[0_24px_90px_rgba(0,0,0,0.28)] backdrop-blur-2xl sm:px-5">
          <Link
            href="/"
            className="flex min-w-0 items-center gap-3 text-white"
            aria-label="Ractysh Trade home"
          >
            <span className="grid size-10 shrink-0 place-items-center rounded-full border border-white/16 bg-white/10 text-cyan-100">
              <Ship className="size-5" aria-hidden="true" />
            </span>
            <span className="min-w-0 leading-none">
              <span className="block truncate text-sm font-bold tracking-tight sm:text-base">
                Ractysh Trade
              </span>
              <span className="mt-1 hidden text-xs font-semibold text-cyan-100/76 sm:block">
                Import Export Desk
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-1 rounded-full border border-white/12 bg-white/8 p-1 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 text-sm font-semibold text-white/72 transition hover:bg-white/12 hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </div>

          <a
            href="#contact"
            className="hidden h-11 items-center justify-center rounded-full bg-white px-5 text-sm font-semibold text-[#07090b] shadow-[0_18px_50px_rgba(0,0,0,0.28)] transition hover:bg-cyan-100 md:inline-flex"
          >
            Start shipment
          </a>

          <button
            type="button"
            className="grid size-10 place-items-center rounded-full border border-white/16 bg-white/10 text-white md:hidden"
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
          <div className="mt-3 rounded-[1.5rem] border border-white/16 bg-black/64 p-2 shadow-[0_18px_70px_rgba(0,0,0,0.34)] backdrop-blur-2xl md:hidden">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block rounded-2xl px-4 py-3 text-sm font-semibold text-white/78 transition hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="mt-2 flex h-11 items-center justify-center rounded-2xl bg-white px-4 text-sm font-semibold text-[#07090b]"
            >
              Start shipment
            </a>
          </div>
        ) : null}
      </header>

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-5.25rem)] max-w-7xl items-center justify-center px-5 py-16 text-center sm:px-8 lg:px-10">
        <div className="mx-auto max-w-5xl">
          <p
            data-trade-hero-reveal
            className="mx-auto mb-6 w-fit rounded-full border border-white/18 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-cyan-50 shadow-[0_18px_60px_rgba(0,0,0,0.2)] backdrop-blur"
          >
            Ractysh import export command center
          </p>

          <h1
            data-trade-hero-reveal
            className="mx-auto max-w-5xl text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            Import. Export. Move without uncertainty.
          </h1>

          <div
            ref={textRef}
            data-trade-hero-reveal
            className="mx-auto mt-7 max-w-3xl"
          >
            <p className="text-sm font-bold uppercase tracking-[0.26em] text-amber-200">
              {active.eyebrow}
            </p>
            <p className="mt-4 text-base leading-8 text-white/78 sm:text-lg sm:leading-8">
              {active.support}
            </p>
          </div>

          <div
            data-trade-hero-reveal
            className="mx-auto mt-9 grid max-w-4xl grid-cols-2 gap-3 md:grid-cols-4"
          >
            {deskSignals.map((item) => {
              const Icon = item.Icon;

              return (
                <div
                  key={item.label}
                  className="rounded-[8px] border border-white/14 bg-white/10 px-3 py-4 text-left shadow-[0_18px_60px_rgba(0,0,0,0.18)] backdrop-blur-xl"
                >
                  <Icon className="size-4 text-cyan-100" aria-hidden="true" />
                  <p className="mt-4 text-sm font-semibold text-white">
                    {item.label}
                  </p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-white/52">
                    {item.value}
                  </p>
                </div>
              );
            })}
          </div>

          <div
            data-trade-hero-reveal
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <a
              href="#contact"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-[#07090b] shadow-[0_20px_70px_rgba(0,0,0,0.26)] transition hover:bg-cyan-100"
            >
              Start import export request
              <ArrowRight
                className="size-4 transition group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
            <a
              href="#services"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/18 bg-white/10 px-6 text-sm font-semibold text-white shadow-[0_18px_60px_rgba(0,0,0,0.18)] backdrop-blur-xl transition hover:bg-white/16"
            >
              View trade services
              <FileText className="size-4 text-amber-200" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
