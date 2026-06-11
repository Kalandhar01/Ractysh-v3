"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import {
  BadgeCheck,
  Banknote,
  ClipboardCheck,
  FileCheck2,
  Globe2,
  Landmark,
  LockKeyhole,
  PackageCheck,
  Plane,
  Radar,
  Route,
  ShieldCheck,
  Ship,
  Sparkles,
  TrainFront,
  Truck,
  Warehouse,
  Waves,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const routeStats = [
  ["37", "active movements"],
  ["98.4%", "packet proof accuracy"],
  ["11h", "clearance buffer"],
];

const packetFlow = [
  { label: "Packed packets", detail: "invoice matched", Icon: PackageCheck },
  { label: "Waiting bay", detail: "port slot held", Icon: Warehouse },
  { label: "Ocean line", detail: "container moving", Icon: Ship },
  { label: "Air freight", detail: "priority parcels", Icon: Plane },
  { label: "Rail link", detail: "inland transfer", Icon: TrainFront },
  { label: "Road delivery", detail: "last mile live", Icon: Truck },
  { label: "Delivered", detail: "proof attached", Icon: BadgeCheck },
];

const portNodes = [
  { city: "Chennai", meta: "supplier locked", x: "14%", y: "67%" },
  { city: "Jebel Ali", meta: "transload ready", x: "39%", y: "48%" },
  { city: "Rotterdam", meta: "bonded window", x: "66%", y: "28%" },
  { city: "Nairobi", meta: "last mile queued", x: "77%", y: "72%" },
];

const signalRows = [
  { label: "HS code match", value: "99", icon: BadgeCheck },
  { label: "Sanction screen", value: "Clear", icon: ShieldCheck },
  { label: "Port dwell risk", value: "Low", icon: Radar },
];

const documentCards = [
  ["Commercial invoice", "Verified", "96%"],
  ["Packing list", "Matched", "91%"],
  ["Certificate origin", "Signed", "88%"],
  ["Bill of lading", "Draft ready", "74%"],
];

const gateSteps = [
  ["KYC", "clear"],
  ["Duty", "quoted"],
  ["Insurance", "bound"],
  ["Release", "ready"],
];

const cashProofRows: Array<[string, string, LucideIcon]> = [
  ["LC desk", "reviewed", Banknote],
  ["Duty payment", "scheduled", Landmark],
  ["Delivery proof", "attached", ClipboardCheck],
];

const timelineSteps = [
  { label: "Supplier", note: "PO confirmed", icon: PackageCheck },
  { label: "Ocean", note: "vessel booked", icon: Ship },
  { label: "Port", note: "gate slot held", icon: Waves },
  { label: "Customs", note: "release tracked", icon: ShieldCheck },
  { label: "Warehouse", note: "handover proof", icon: Warehouse },
  { label: "Road", note: "final ETA live", icon: Truck },
];

export default function RouteIntelligenceBento() {
  return (
    <section
      id="routes"
      className="relative isolate overflow-hidden bg-white px-5 py-24 text-slate-950 sm:px-8 lg:px-10 lg:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#ffffff_0%,#fffdf7_48%,#ffffff_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(245,158,11,0.15),transparent_30%),radial-gradient(circle_at_82%_18%,rgba(234,179,8,0.13),transparent_28%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(180,121,18,0.22)_1px,transparent_1px),linear-gradient(90deg,rgba(180,121,18,0.18)_1px,transparent_1px)] [background-size:88px_88px]" />
      <motion.div
        aria-hidden="true"
        animate={{ x: ["-12%", "12%", "-12%"], opacity: [0.18, 0.34, 0.18] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute left-1/2 top-16 h-px w-[70rem] -translate-x-1/2 bg-gradient-to-r from-transparent via-amber-500/45 to-transparent"
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-amber-700 shadow-[0_18px_55px_rgba(217,119,6,0.12)]"
            >
              <Sparkles className="size-3.5" aria-hidden="true" />
              Our works movement board
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.06, duration: 0.65, ease: "easeOut" }}
              className="max-w-3xl text-3xl font-semibold tracking-tight text-slate-950 sm:text-5xl"
            >
              Packed packets, waiting cargo, and delivered proof in one premium
              control layer.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.12, duration: 0.65, ease: "easeOut" }}
              className="mt-5 max-w-2xl text-base leading-8 text-slate-600"
            >
              See the work move from packed goods to waiting bay, ship, air,
              rail, road delivery, and final proof without losing route,
              clearance, or document context.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.16, duration: 0.65, ease: "easeOut" }}
            className="grid gap-3 sm:grid-cols-3"
          >
            {routeStats.map(([value, label]) => (
              <div
                key={label}
                className="rounded-lg border border-amber-700/14 bg-white p-4 shadow-[0_18px_70px_rgba(146,99,15,0.1)]"
              >
                <p className="text-2xl font-semibold text-slate-950">{value}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  {label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        <PacketMovementBoard />

        <div className="mt-16 grid gap-7 lg:grid-cols-6 lg:gap-8">
          <BentoCard
            title="Live lane atlas"
            description="Container route, port handoff, customs position, and final delivery readiness stay visible as the mandate moves."
            icon={<Globe2 className="size-4" aria-hidden="true" />}
            className="lg:col-span-4"
            delay={0}
          >
            <LiveLaneSkeleton />
          </BentoCard>

          <BentoCard
            title="Risk signal stack"
            description="Trade desk exceptions are sorted by clearance impact before they become shipment friction."
            icon={<Radar className="size-4" aria-hidden="true" />}
            className="lg:col-span-2"
            delay={0.04}
          >
            <RiskSignalSkeleton />
          </BentoCard>

          <BentoCard
            title="Document vault"
            description="Invoices, packing lists, origin certificates, and lading drafts align with the same shipment truth."
            icon={<FileCheck2 className="size-4" aria-hidden="true" />}
            className="lg:col-span-2"
            delay={0.08}
          >
            <DocumentVaultSkeleton />
          </BentoCard>

          <BentoCard
            title="Customs gate"
            description="HS, duty, KYC, insurance, and release status are staged for decisive clearance reviews."
            icon={<ShieldCheck className="size-4" aria-hidden="true" />}
            className="lg:col-span-2"
            delay={0.12}
          >
            <CustomsGateSkeleton />
          </BentoCard>

          <BentoCard
            title="Finance and proof"
            description="Payment readiness and delivery evidence move with a settlement-grade trail for every client update."
            icon={<LockKeyhole className="size-4" aria-hidden="true" />}
            className="lg:col-span-2"
            delay={0.16}
          >
            <FinanceProofSkeleton />
          </BentoCard>

          <BentoCard
            title="Executive movement timeline"
            description="A calm shipment timeline helps leadership read progress, ownership, and next action without chasing status."
            icon={<Route className="size-4" aria-hidden="true" />}
            className="lg:col-span-6"
            delay={0.2}
            wide
          >
            <MovementTimelineSkeleton />
          </BentoCard>
        </div>
      </div>
    </section>
  );
}

function BentoCard({
  children,
  className,
  delay,
  description,
  icon,
  title,
  wide = false,
}: {
  children: ReactNode;
  className?: string;
  delay: number;
  description: string;
  icon: ReactNode;
  title: string;
  wide?: boolean;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ delay, duration: 0.64, ease: "easeOut" }}
      className={cn(
        "group relative min-h-[35rem] overflow-hidden rounded-lg border border-amber-700/14 bg-white p-4 shadow-[0_30px_110px_rgba(146,99,15,0.12)] transition duration-500 hover:-translate-y-1 hover:border-amber-500/35 hover:shadow-[0_34px_110px_rgba(217,119,6,0.18)] sm:p-5",
        wide && "min-h-[30rem]",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(245,158,11,0.12),transparent_36%),radial-gradient(circle_at_92%_18%,rgba(234,179,8,0.11),transparent_30%)] opacity-90" />
      <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-amber-500/45 to-transparent" />

      <div className="relative flex h-full flex-col">
        <div className="min-h-[21rem] overflow-hidden rounded-lg border border-amber-700/14 bg-[#fffaf0] shadow-inner shadow-amber-100">
          {children}
        </div>

        <div className="mt-6 flex items-start gap-3">
          <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-lg border border-amber-600/18 bg-amber-50 text-amber-700">
            {icon}
          </span>
          <div>
            <h3 className="text-xl font-semibold tracking-tight text-slate-950">
              {title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {description}
            </p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function LiveLaneSkeleton() {
  return (
    <div className="relative h-full min-h-[21rem] overflow-hidden p-5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_72%,rgba(245,158,11,0.16),transparent_26%),radial-gradient(circle_at_75%_24%,rgba(234,179,8,0.13),transparent_28%)]" />
      <div className="absolute inset-x-6 top-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-amber-700">
            Shipment IMX-8604
          </p>
          <p className="mt-2 text-xl font-semibold text-slate-950 sm:text-2xl">
            Chennai to Rotterdam
          </p>
        </div>
        <span className="rounded-full border border-amber-500/30 bg-white px-3 py-1 text-xs font-bold text-amber-700">
          Live
        </span>
      </div>

      <div className="absolute inset-x-4 bottom-4 top-24 rounded-lg border border-amber-700/14 bg-white/70">
        <motion.svg
          viewBox="0 0 720 320"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <path
            d="M75 225 C165 145 250 205 334 150 C445 78 520 72 642 104"
            fill="none"
            stroke="rgba(146,99,15,0.18)"
            strokeWidth="2"
          />
          <motion.path
            d="M75 225 C165 145 250 205 334 150 C445 78 520 72 642 104"
            fill="none"
            stroke="url(#routeGoldGlow)"
            strokeLinecap="round"
            strokeWidth="3"
            initial={{ pathLength: 0.08, pathOffset: 0 }}
            animate={{
              pathLength: [0.08, 0.32, 0.08],
              pathOffset: [0, 0.62, 1],
            }}
            transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
          />
          <defs>
            <linearGradient id="routeGoldGlow" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0" />
              <stop offset="50%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#ca8a04" stopOpacity="0" />
            </linearGradient>
          </defs>
        </motion.svg>

        {portNodes.map((node) => (
          <div
            key={node.city}
            className="absolute"
            style={{ left: node.x, top: node.y }}
          >
            <span className="relative block size-3 rounded-full bg-amber-500 shadow-[0_0_22px_rgba(245,158,11,0.6)]" />
            <div className="mt-2 w-32 rounded-lg border border-amber-700/14 bg-white/90 p-2 shadow-[0_14px_34px_rgba(146,99,15,0.12)]">
              <p className="text-xs font-bold text-slate-950">{node.city}</p>
              <p className="mt-0.5 text-[10px] font-medium text-slate-500">
                {node.meta}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RiskSignalSkeleton() {
  return (
    <div className="relative h-full min-h-[21rem] p-5">
      <div className="mb-5 flex items-center justify-between">
        <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-amber-700">
          Signal priority
        </p>
        <Radar className="size-5 text-amber-700" aria-hidden="true" />
      </div>
      <div className="space-y-3">
        {signalRows.map((row, index) => {
          const Icon = row.icon;

          return (
            <motion.div
              key={row.label}
              initial={{ opacity: 0, x: 18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.45 }}
              className="rounded-lg border border-amber-700/14 bg-white p-4 shadow-sm"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-lg bg-amber-100 text-amber-700">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-semibold text-slate-700">
                    {row.label}
                  </span>
                </div>
                <span className="text-sm font-bold text-amber-700">
                  {row.value}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function DocumentVaultSkeleton() {
  return (
    <div className="relative h-full min-h-[21rem] p-5">
      <div className="grid grid-cols-2 gap-3">
        {documentCards.map(([title, state, progress], index) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.06, duration: 0.45 }}
            className="rounded-lg border border-amber-700/14 bg-white p-4 shadow-sm"
          >
            <FileCheck2 className="size-5 text-amber-700" aria-hidden="true" />
            <p className="mt-4 text-sm font-semibold text-slate-950">{title}</p>
            <p className="mt-1 text-xs text-slate-500">{state}</p>
            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-amber-100">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: progress }}
                viewport={{ once: true }}
                transition={{ delay: 0.18 + index * 0.08, duration: 0.7 }}
                className="h-full rounded-full bg-gradient-to-r from-amber-500 to-yellow-300"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function CustomsGateSkeleton() {
  return (
    <div className="relative h-full min-h-[21rem] overflow-hidden p-5">
      <div className="absolute left-1/2 top-8 h-[15rem] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-amber-500/35 to-transparent" />
      <div className="relative grid grid-cols-2 gap-3">
        {gateSteps.map(([label, state], index) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08, duration: 0.45 }}
            className="rounded-lg border border-amber-700/14 bg-white p-4 text-center shadow-sm"
          >
            <div className="mx-auto grid size-11 place-items-center rounded-full bg-amber-100 text-amber-700">
              <ShieldCheck className="size-5" aria-hidden="true" />
            </div>
            <p className="mt-4 text-sm font-semibold text-slate-950">{label}</p>
            <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
              {state}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function FinanceProofSkeleton() {
  return (
    <div className="relative h-full min-h-[21rem] p-5">
      <div className="space-y-4">
        {cashProofRows.map(([label, state, Icon], index) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, x: -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08, duration: 0.45 }}
            className="rounded-lg border border-amber-700/14 bg-white p-4 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-amber-100 text-amber-700">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-950">{label}</p>
                <p className="mt-1 text-xs font-medium text-slate-500">
                  {state}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function MovementTimelineSkeleton() {
  return (
    <div className="relative h-full min-h-[21rem] p-5">
      <div className="relative grid gap-3 md:grid-cols-6">
        <div className="pointer-events-none absolute left-8 right-8 top-6 hidden h-px bg-amber-700/16 md:block" />
        {timelineSteps.map((step, index) => {
          const Icon = step.icon;

          return (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06, duration: 0.45 }}
              className="relative rounded-lg border border-amber-700/14 bg-white p-4 shadow-sm"
            >
              <span className="grid size-10 place-items-center rounded-lg bg-amber-100 text-amber-700">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <p className="mt-5 text-sm font-semibold text-slate-950">
                {step.label}
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                {step.note}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function PacketMovementBoard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ delay: 0.18, duration: 0.64, ease: "easeOut" }}
      className="mt-14 overflow-hidden rounded-lg border border-amber-700/14 bg-white p-4 shadow-[0_30px_110px_rgba(146,99,15,0.12)] sm:p-5"
    >
      <div className="grid gap-3 md:grid-cols-7">
        {packetFlow.map((item, index) => {
          const Icon = item.Icon;

          return (
            <div
              key={item.label}
              className="relative rounded-lg border border-amber-700/14 bg-[#fffaf0] p-4"
            >
              {index < packetFlow.length - 1 ? (
                <span className="absolute -right-2 top-1/2 hidden h-px w-4 bg-amber-500/36 md:block" />
              ) : null}
              <span className="grid size-11 place-items-center rounded-lg bg-white text-amber-700 shadow-sm">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <p className="mt-4 text-sm font-semibold text-slate-950">
                {item.label}
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                {item.detail}
              </p>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
