"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, X } from "lucide-react";

type WorkCard = {
  id: string;
  title: string;
  description: string;
  image: string;
  meta: string;
  content: string;
};

const works: WorkCard[] = [
  {
    id: "port-readiness",
    title: "Port Readiness Desk",
    description:
      "Container planning, port windows, and freight quote discipline for export movement.",
    image: "/images/import-export-hero.jpg",
    meta: "Ocean freight",
    content:
      "A controlled export workflow covering supplier confirmation, container release, sailing schedules, document checks, and client reporting before the cargo enters the port window.",
  },
  {
    id: "supplier-verification",
    title: "Supplier Verification Flow",
    description:
      "Structured supplier checks before procurement, purchase order, and shipment release.",
    image: "/images/showcase-import-export.webp",
    meta: "Sourcing control",
    content:
      "A trade desk sequence for supplier verification, product readiness, quotation comparison, payment milestone tracking, and pre-shipment proof collection.",
  },
  {
    id: "last-mile-control",
    title: "Last Mile Control",
    description:
      "Port-to-warehouse coordination with transport, delivery proof, and escalation visibility.",
    image: "/images/global-trade-transport.webp",
    meta: "Ground network",
    content:
      "A movement control layer for drayage, warehouse receiving, delivery slots, customs release timing, and exception updates until the consignment closes cleanly.",
  },
  {
    id: "documentation-audit",
    title: "Documentation Audit",
    description:
      "Commercial invoice, packing list, BL, COO, and compliance document review.",
    image: "/images/showcase-import-export.webp",
    meta: "Compliance",
    content:
      "A documentation review desk built to reduce shipment delays through structured invoice, packing list, BL, certificate, HS-code, and customs-support checks.",
  },
  {
    id: "route-intelligence",
    title: "Route Intelligence",
    description:
      "Compare lanes, transit risk, freight timing, and operational handoffs before booking.",
    image: "/images/import-export-hero.jpg",
    meta: "Route planning",
    content:
      "A lane comparison workflow for shipment timing, cost pressure, port congestion, carrier fit, insurance, and delivery commitments before a route is selected.",
  },
  {
    id: "trade-reporting",
    title: "Trade Reporting Pack",
    description:
      "Executive shipment summaries with stage status, documents, risks, and next actions.",
    image: "/images/global-trade-transport.webp",
    meta: "Client reporting",
    content:
      "A clean reporting pack for stakeholders who need shipment state, open risks, document status, commercial notes, and proof of completion without messy follow-ups.",
  },
];

export default function OurWorksExpandableCards() {
  const [active, setActive] = useState<WorkCard | null>(null);
  const id = useId();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setActive(null);
    }

    document.body.style.overflow = active ? "hidden" : "auto";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [active]);

  useOutsideClick(modalRef, () => setActive(null));

  return (
    <section
      id="routes"
      className="relative overflow-hidden bg-white px-5 py-24 text-slate-950 sm:px-8 lg:px-10 lg:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_10%,rgba(245,158,11,0.15),transparent_30%),radial-gradient(circle_at_82%_16%,rgba(234,179,8,0.12),transparent_32%),linear-gradient(180deg,#ffffff_0%,#fffdf7_54%,#ffffff_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(180,121,18,0.08)_1px,transparent_1px),linear-gradient(rgba(180,121,18,0.07)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-50" />

      <AnimatePresence>
        {active ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-slate-950/36 backdrop-blur-sm"
          />
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {active ? (
          <div className="fixed inset-0 z-[100] grid place-items-center px-4 py-10">
            <motion.div
              layoutId={`card-${active.id}-${id}`}
              ref={modalRef}
              className="relative flex max-h-[88vh] w-full max-w-3xl flex-col overflow-hidden rounded-[8px] border border-amber-700/16 bg-white shadow-[0_40px_140px_rgba(146,99,15,0.28)]"
            >
              <button
                type="button"
                aria-label="Close work detail"
                onClick={() => setActive(null)}
                className="absolute right-4 top-4 z-10 grid size-10 place-items-center rounded-full border border-amber-700/18 bg-white/90 text-slate-950 backdrop-blur-xl transition hover:bg-amber-500 hover:text-white"
              >
                <X className="size-4" aria-hidden="true" />
              </button>

              <motion.div
                layoutId={`image-${active.id}-${id}`}
                className="relative h-72 overflow-hidden sm:h-96"
              >
                <Image
                  src={active.image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.32))]" />
              </motion.div>

              <div className="overflow-y-auto p-6 sm:p-8">
                <motion.p
                  layoutId={`meta-${active.id}-${id}`}
                  className="text-xs font-bold uppercase tracking-[0.22em] text-amber-700"
                >
                  {active.meta}
                </motion.p>
                <motion.h3
                  layoutId={`title-${active.id}-${id}`}
                  className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl"
                >
                  {active.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${active.id}-${id}`}
                  className="mt-4 max-w-2xl text-base leading-8 text-slate-600"
                >
                  {active.description}
                </motion.p>
                <p className="mt-6 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  {active.content}
                </p>

                <a
                  href="#contact"
                  onClick={() => setActive(null)}
                  className="mt-7 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 px-6 text-sm font-semibold text-slate-950 shadow-[0_18px_50px_rgba(217,119,6,0.22)] transition hover:from-amber-400 hover:to-yellow-300"
                >
                  Route similar work
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-amber-700">
            Our Works
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Trade work handled through one private operating desk.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600">
            Open any card to see how Ractysh structures import, export, route,
            compliance, and reporting workflows.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {works.map((card) => (
            <motion.button
              key={card.id}
              type="button"
              layoutId={`card-${card.id}-${id}`}
              onClick={() => setActive(card)}
              className="group min-h-[25rem] overflow-hidden rounded-[8px] border border-amber-700/14 bg-white text-left shadow-[0_24px_90px_rgba(146,99,15,0.12)] outline-none transition hover:-translate-y-1 hover:border-amber-500/35 hover:shadow-[0_28px_100px_rgba(217,119,6,0.18)] focus-visible:border-amber-500"
            >
              <motion.div
                layoutId={`image-${card.id}-${id}`}
                className="relative h-56 overflow-hidden"
              >
                <Image
                  src={card.image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0),rgba(255,255,255,0.18))]" />
              </motion.div>

              <div className="p-5">
                <motion.p
                  layoutId={`meta-${card.id}-${id}`}
                  className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700"
                >
                  {card.meta}
                </motion.p>
                <motion.h3
                  layoutId={`title-${card.id}-${id}`}
                  className="mt-3 text-xl font-semibold tracking-tight text-slate-950"
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${card.id}-${id}`}
                  className="mt-3 text-sm leading-6 text-slate-600"
                >
                  {card.description}
                </motion.p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

function useOutsideClick(
  ref: React.RefObject<HTMLElement | null>,
  callback: () => void,
) {
  useEffect(() => {
    function listener(event: MouseEvent | TouchEvent) {
      const element = ref.current;

      if (!element || element.contains(event.target as Node)) return;

      callback();
    }

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [callback, ref]);
}
