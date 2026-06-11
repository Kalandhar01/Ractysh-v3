"use client";

import Image from "next/image";
import React from "react";
import { motion } from "motion/react";
import { WobbleCard } from "@/components/ui/wobble-card";

const ease = [0.22, 1, 0.36, 1] as const;
const cardInitial = { opacity: 0, y: 54, filter: "blur(12px)" };
const cardVisible = { opacity: 1, y: 0, filter: "blur(0px)" };

export default function WobbleCardDemo() {
  return (
    <div className="mx-auto w-full max-w-7xl">
      <motion.div
        className="mb-10 max-w-3xl"
        initial={{ opacity: 0, y: 42, filter: "blur(12px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.92, ease }}
      >
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-red-700">
          Project idea
        </p>
        <h2 className="text-4xl font-black tracking-normal text-slate-950 sm:text-5xl lg:text-6xl">
          Construction control for every moving part
        </h2>
        <p className="mt-4 text-base/7 font-medium text-slate-600 sm:text-lg/8">
          Ractysh is built for projects where approvals, procurement, site execution, quality checks, and client updates must stay visible from day one.
        </p>
      </motion.div>

      <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-3">
        <motion.div
          className="col-span-1 h-full lg:col-span-2"
          initial={cardInitial}
          whileInView={cardVisible}
          viewport={{ once: true, amount: 0.24 }}
          transition={{ duration: 0.72, delay: 0, ease }}
        >
          <WobbleCard containerClassName="h-full min-h-[430px] bg-[#7f1d1d] sm:min-h-[500px] lg:min-h-[320px]">
            <div className="relative z-10 max-w-[18rem] sm:max-w-xs">
              <p className="mb-4 text-left text-xs font-semibold uppercase tracking-[0.16em] text-red-100">
                Project command team
              </p>
              <h2 className="text-left text-base font-semibold text-balance text-white md:text-xl lg:text-3xl">
                We keep the owner, consultant, contractor, and site crew working from the same plan.
              </h2>
              <p className="mt-4 text-left text-base/6 text-red-50/85">
                Every scope decision is tied to drawings, materials, access, manpower, safety, and the next field action.
              </p>
            </div>
            <Image
              src="/images/construction/our-work-commercial-complex-site-01.webp"
              width={500}
              height={500}
              alt="Ractysh construction site coordination"
              className="pointer-events-none absolute -bottom-4 right-0 z-0 h-[10rem] w-full rounded-2xl object-cover opacity-15 grayscale filter sm:-right-12 sm:-bottom-12 sm:h-[21rem] sm:w-[28rem] sm:opacity-100 lg:-right-[30%]"
            />
          </WobbleCard>
        </motion.div>
        <motion.div
          className="col-span-1 h-full"
          initial={cardInitial}
          whileInView={cardVisible}
          viewport={{ once: true, amount: 0.24 }}
          transition={{ duration: 0.72, delay: 0.1, ease }}
        >
          <WobbleCard containerClassName="h-full min-h-[320px] bg-[#111827]">
              <p className="mb-4 text-left text-xs font-semibold uppercase tracking-[0.16em] text-slate-300">
              What the idea solves
            </p>
            <h2 className="max-w-80 text-left text-base font-semibold text-balance text-white md:text-xl lg:text-3xl">
              No more scattered site updates, unclear ownership, or last-minute handover panic.
            </h2>
            <p className="mt-4 max-w-[26rem] text-left text-base/6 text-slate-200">
              Ractysh turns daily site movement into readable progress, so decisions happen early and risks stay visible.
            </p>
          </WobbleCard>
        </motion.div>
        <motion.div
          className="col-span-1 h-full lg:col-span-3"
          initial={cardInitial}
          whileInView={cardVisible}
          viewport={{ once: true, amount: 0.24 }}
          transition={{ duration: 0.72, delay: 0.2, ease }}
        >
          <WobbleCard containerClassName="h-full min-h-[420px] bg-[#3b0d0d] sm:min-h-[520px] lg:min-h-[600px] xl:min-h-[320px]">
            <div className="relative z-10 max-w-sm">
              <p className="mb-4 text-left text-xs font-semibold uppercase tracking-[0.16em] text-red-100">
                How the model works
              </p>
              <h2 className="max-w-sm text-left text-base font-semibold text-balance text-white md:max-w-lg md:text-xl lg:text-3xl">
                One execution rhythm from concept approval to keys-in-hand handover.
              </h2>
              <p className="mt-4 max-w-[26rem] text-left text-base/6 text-red-50/85">
                We coordinate supervision, technical follow-up, vendor movement, client communication, and closeout evidence into one project workflow.
              </p>
            </div>
            <Image
              src="/images/construction/construction-service-command-center-construction-india-infrastructure-viaduct-03.webp"
              width={500}
              height={500}
              alt="Ractysh infrastructure execution"
              className="pointer-events-none absolute -bottom-4 right-0 z-0 h-[10rem] w-full rounded-2xl object-cover opacity-15 sm:-right-10 sm:-bottom-12 sm:h-[22rem] sm:w-[34rem] sm:opacity-100 md:-right-[32%] lg:-right-[12%]"
            />
          </WobbleCard>
        </motion.div>
      </div>
    </div>
  );
}
