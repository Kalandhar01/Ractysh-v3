"use client";

import { motion } from "motion/react";
import {
  ArrowRight,
  BadgeCheck,
  ClipboardCheck,
  FileCheck2,
  Globe2,
  PackageCheck,
  RadioTower,
  Route,
  ShieldCheck,
  Ship,
  Sparkles,
  Truck,
} from "lucide-react";
import { cn } from "@/lib/utils";

const routeNodes = ["Supplier", "Port", "Vessel", "Customs", "Warehouse"];

const exceptionItems = [
  ["Docs", "Bill of lading revision", "Priority"],
  ["Port", "Container inspection hold", "Live"],
  ["ETA", "Truck gate slot moved", "Clear"],
];

const documentItems = [
  ["Invoice", "Verified", "96%"],
  ["Packing list", "Matched", "88%"],
  ["Certificate", "Pending", "64%"],
  ["Bill of lading", "Locked", "100%"],
];

const approvalItems = [
  ["Supplier docs", "Signed"],
  ["Freight quote", "Approved"],
  ["Customs review", "In desk"],
  ["Release order", "Ready"],
];

const featureCards = [
  {
    title: "Route command board",
    description:
      "Plan supplier handoff, port movement, vessel leg, customs release, and final delivery from one premium operating view.",
    className: "lg:col-span-2",
    skeleton: <RouteCommandSkeleton />,
  },
  {
    title: "Exception control tower",
    description:
      "Surface document changes, port holds, ETA shifts, and owner actions before they slow the shipment.",
    className: "lg:col-span-1",
    skeleton: <ExceptionTowerSkeleton />,
  },
  {
    title: "Compliance radar",
    description:
      "Continuously watch HS code, route, sanction, insurance, and document risk signals across every trade lane.",
    className: "lg:col-span-1",
    skeleton: <ComplianceRadarSkeleton />,
  },
  {
    title: "Document engine",
    description:
      "Keep invoices, packing lists, certificates, and bill of lading records clean, matched, and ready for review.",
    className: "lg:col-span-1",
    skeleton: <DocumentEngineSkeleton />,
  },
  {
    title: "Handoff automation",
    description:
      "Move work between sourcing, freight, customs, finance, and warehouse teams with proof attached to every step.",
    className: "lg:col-span-1",
    skeleton: <HandoffSkeleton />,
  },
  {
    title: "Executive approval chain",
    description:
      "Give leaders a crisp settlement-style timeline for quote approval, customs clearance, release, and delivery proof.",
    className: "lg:col-span-2",
    skeleton: <ApprovalChainSkeleton />,
  },
];

export default function FeaturesGridWithLargeSkeletons() {
  return (
    <section
      id="services"
      className="relative isolate overflow-hidden bg-white px-5 py-24 text-slate-950 sm:px-8 lg:px-10 lg:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_8%,rgba(245,158,11,0.16),transparent_28%),radial-gradient(circle_at_86%_16%,rgba(234,179,8,0.14),transparent_26%),linear-gradient(180deg,#ffffff_0%,#fffdf7_48%,#ffffff_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(180,121,18,0.22)_1px,transparent_1px),linear-gradient(90deg,rgba(180,121,18,0.18)_1px,transparent_1px)] [background-size:72px_72px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-amber-700 shadow-[0_18px_55px_rgba(217,119,6,0.12)]">
            <Sparkles className="size-3.5" aria-hidden="true" />
            Trade intelligence layer
          </div>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            A gold-standard command center for every shipment.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600">
            Give your import-export team a sharper operating grid for planning,
            tracking, compliance, approvals, and proof across every high-value
            movement.
          </p>
          <div className="mx-auto mt-8 grid max-w-3xl grid-cols-2 gap-3 text-left sm:grid-cols-4">
            {["HS code", "Freight lane", "Customs", "Delivery proof"].map(
              (item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-amber-600/18 bg-white px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-700 shadow-[0_12px_40px_rgba(146,99,15,0.08)]"
                >
                  {item}
                </div>
              ),
            )}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {featureCards.map((feature, index) => (
            <motion.article
              key={feature.title}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{
                delay: index * 0.05,
                duration: 0.6,
                ease: "easeOut",
              }}
              className={cn(
                "group relative min-h-[32rem] overflow-hidden rounded-[2rem] border border-amber-700/14 bg-white p-4 shadow-[0_30px_100px_rgba(146,99,15,0.12)] transition duration-500 hover:-translate-y-1 hover:border-amber-500/35 hover:shadow-[0_34px_110px_rgba(217,119,6,0.18)] sm:p-5",
                feature.className,
              )}
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(245,158,11,0.13),transparent_34%),radial-gradient(circle_at_90%_18%,rgba(234,179,8,0.12),transparent_26%)] opacity-90" />
              <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-amber-500/45 to-transparent" />

              <div className="relative flex h-full flex-col">
                <div className="min-h-[20.5rem] overflow-hidden rounded-[1.5rem] border border-amber-700/14 bg-[#fffaf0] shadow-inner shadow-amber-100">
                  {feature.skeleton}
                </div>

                <div className="mt-6">
                  <h3 className="text-xl font-semibold tracking-tight text-slate-950">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function RouteCommandSkeleton() {
  return (
    <div className="relative h-full min-h-[20.5rem] overflow-hidden p-5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(245,158,11,0.15),transparent_24%),radial-gradient(circle_at_76%_70%,rgba(234,179,8,0.13),transparent_26%)]" />
      <div className="relative grid h-full gap-4 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-3xl border border-amber-700/14 bg-white/84 p-4 shadow-sm">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-amber-700">
                Export lane
              </p>
              <p className="mt-2 text-2xl font-semibold text-slate-950">
                Chennai - Jebel Ali
              </p>
            </div>
            <span className="rounded-full border border-amber-500/30 bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">
              Live
            </span>
          </div>

          <div className="relative">
            <div className="absolute left-5 right-5 top-6 h-px bg-amber-700/18" />
            <motion.div
              animate={{ x: ["0%", "92%", "0%"] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[1.15rem] z-10 h-2 w-2 rounded-full bg-amber-500 shadow-[0_0_22px_rgba(245,158,11,0.7)]"
            />

            <div className="relative grid grid-cols-5 gap-3">
              {routeNodes.map((node, index) => (
                <div key={node} className="flex flex-col items-center gap-3">
                  <div
                    className={cn(
                      "grid size-12 place-items-center rounded-2xl border text-amber-700 shadow-[0_14px_32px_rgba(146,99,15,0.12)]",
                      index < 3
                        ? "border-amber-500/35 bg-amber-100"
                        : "border-yellow-500/30 bg-yellow-50",
                    )}
                  >
                    {index === 0 && <PackageCheck className="size-4" />}
                    {index === 1 && <RadioTower className="size-4" />}
                    {index === 2 && <Ship className="size-4" />}
                    {index === 3 && <ShieldCheck className="size-4" />}
                    {index === 4 && <Truck className="size-4" />}
                  </div>
                  <span className="text-center text-[11px] font-semibold text-slate-600">
                    {node}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-3">
            {[
              ["96%", "Docs ready"],
              ["18h", "ETA buffer"],
              ["4/5", "Milestones"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-2xl border border-amber-700/14 bg-white p-3 shadow-sm"
              >
                <p className="text-lg font-semibold text-slate-950">{value}</p>
                <p className="mt-1 text-[11px] font-medium text-slate-500">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-amber-700/14 bg-white/80 p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-2xl bg-amber-100 text-amber-700">
              <Globe2 className="size-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Desk ref
              </p>
              <p className="text-sm font-semibold text-slate-950">IMX-2407</p>
            </div>
          </div>

          <div className="mt-7 space-y-4">
            {["Freight quote", "Insurance", "Bank docs"].map((item, index) => (
              <div key={item}>
                <div className="mb-2 flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-600">{item}</span>
                  <span className="font-bold text-amber-700">
                    {[82, 68, 91][index]}%
                  </span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-amber-100">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${[82, 68, 91][index]}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.12, duration: 0.8 }}
                    className="h-full rounded-full bg-gradient-to-r from-amber-500 to-yellow-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ExceptionTowerSkeleton() {
  return (
    <div className="relative h-full min-h-[20.5rem] p-5">
      <div className="mb-5 flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-amber-700">
          Exceptions
        </span>
        <span className="rounded-full border border-amber-500/30 bg-white px-3 py-1 text-xs font-bold text-amber-700">
          03 open
        </span>
      </div>

      <div className="space-y-3">
        {exceptionItems.map(([tag, title, status], index) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08, duration: 0.45 }}
            className="rounded-3xl border border-amber-700/14 bg-white p-4 shadow-sm"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700">
                {tag}
              </span>
              <span className="text-xs font-semibold text-slate-500">
                {status}
              </span>
            </div>
            <p className="mt-4 text-sm font-semibold leading-5 text-slate-950">
              {title}
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-slate-500">
              <span className="h-px flex-1 bg-amber-700/14" />
              Owner assigned
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ComplianceRadarSkeleton() {
  return (
    <div className="relative grid h-full min-h-[20.5rem] place-items-center overflow-hidden p-5">
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(245,158,11,0.14),transparent_54%)]" />
      <div className="absolute size-64 rounded-full border border-amber-600/14" />
      <div className="absolute size-48 rounded-full border border-amber-600/14" />
      <div className="absolute size-32 rounded-full border border-amber-600/14" />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute size-64 rounded-full border border-dashed border-amber-500/45"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        className="absolute h-64 w-32 rounded-l-full border-l border-t border-yellow-500/35"
      />
      <div className="relative grid size-36 place-items-center rounded-full border border-amber-500/30 bg-white shadow-[0_0_80px_rgba(245,158,11,0.16)]">
        <ShieldCheck className="size-10 text-amber-700" aria-hidden="true" />
        <span className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
          Clear
        </span>
      </div>
      {["HS", "KYC", "Route", "Duty"].map((item, index) => (
        <span
          key={item}
          className={cn(
            "absolute rounded-full border border-amber-700/14 bg-white px-3 py-1 text-xs font-bold text-slate-700 shadow-sm",
            index === 0 && "left-8 top-10",
            index === 1 && "right-8 top-20",
            index === 2 && "bottom-12 left-10",
            index === 3 && "bottom-20 right-8",
          )}
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function DocumentEngineSkeleton() {
  return (
    <div className="relative h-full min-h-[20.5rem] p-5">
      <div className="mb-5 flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-amber-700">
          Document stack
        </span>
        <FileCheck2 className="size-5 text-amber-700" aria-hidden="true" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        {documentItems.map(([name, status, value], index) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.06, duration: 0.45 }}
            className="rounded-3xl border border-amber-700/14 bg-white p-4 shadow-sm"
          >
            <div className="mb-5 grid size-10 place-items-center rounded-2xl bg-amber-100 text-amber-700">
              <FileCheck2 className="size-5" aria-hidden="true" />
            </div>
            <p className="text-sm font-semibold text-slate-950">{name}</p>
            <p className="mt-1 text-xs font-medium text-slate-500">{status}</p>
            <div className="mt-4 flex items-center gap-2">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-amber-100">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: value }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.18 + index * 0.08, duration: 0.75 }}
                  className="h-full rounded-full bg-gradient-to-r from-amber-500 to-yellow-300"
                />
              </div>
              <span className="text-[10px] font-bold text-slate-500">
                {value}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function HandoffSkeleton() {
  return (
    <div className="relative h-full min-h-[20.5rem] overflow-hidden p-5">
      <div className="absolute left-1/2 top-8 h-[15rem] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-amber-500/35 to-transparent" />
      <div className="relative space-y-4">
        {[
          [ClipboardCheck, "Sourcing", "Supplier docs locked"],
          [Route, "Freight", "Lane booked"],
          [ShieldCheck, "Customs", "Risk screen passed"],
          [BadgeCheck, "Finance", "Payment proof ready"],
        ].map(([Icon, team, note], index) => {
          const LucideIcon = Icon as typeof ClipboardCheck;

          return (
            <motion.div
              key={team as string}
              initial={{ opacity: 0, x: index % 2 === 0 ? -18 : 18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.45 }}
              className={cn(
                "flex items-center gap-3 rounded-3xl border border-amber-700/14 bg-white p-3 shadow-sm",
                index % 2 === 1 && "ml-8",
              )}
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-amber-100 text-amber-700">
                <LucideIcon className="size-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-slate-950">
                  {team as string}
                </span>
                <span className="block text-xs font-medium text-slate-500">
                  {note as string}
                </span>
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function ApprovalChainSkeleton() {
  return (
    <div className="relative h-full min-h-[20.5rem] overflow-hidden p-5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(234,179,8,0.15),transparent_28%)]" />
      <div className="relative grid h-full gap-4 lg:grid-cols-[0.75fr_1.25fr]">
        <div className="rounded-3xl border border-amber-700/14 bg-white/84 p-4 shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-amber-700">
            Approval health
          </p>
          <div className="mt-7 grid place-items-center">
            <div className="relative grid size-36 place-items-center rounded-full border border-amber-500/30 bg-white">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
                className="absolute inset-2 rounded-full border border-dashed border-amber-500/45"
              />
              <div className="text-center">
                <p className="text-3xl font-semibold text-slate-950">4/4</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                  Ready
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {approvalItems.map(([title, status], index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.45 }}
              className="rounded-3xl border border-amber-700/14 bg-white p-4 shadow-sm"
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="grid size-10 place-items-center rounded-2xl bg-amber-100 text-amber-700">
                  <BadgeCheck className="size-5" aria-hidden="true" />
                </span>
                <ArrowRight
                  className="size-4 text-amber-600"
                  aria-hidden="true"
                />
              </div>
              <p className="text-sm font-semibold text-slate-950">{title}</p>
              <p className="mt-1 text-xs font-medium text-slate-500">
                {status}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
