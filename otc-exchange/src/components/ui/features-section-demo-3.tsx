"use client";

import { cn } from "@/lib/utils";
import { EncryptedText } from "@/components/ui/encrypted-text";
import createGlobe from "cobe";
import Image from "next/image";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

const briefingLoadingText = "Verified OTC briefs route clean updates.";

export default function FeaturesSectionDemo() {
  const features = [
    {
      title: "Control every mandate",
      description:
        "Track quote state, counterparty checks, route approvals, and settlement responsibility from one private desk.",
      skeleton: <SkeletonOne />,
      className:
        "col-span-1 border-b border-white/10 lg:col-span-4 lg:border-r",
    },
    {
      title: "",
      description: "",
      skeleton: <SkeletonTwo />,
      className: "col-span-1 border-b border-white/10 lg:col-span-2",
      visualOnly: true,
    },
    {
      title: "Brief clients clearly",
      description:
        "Turn complex private-market movement into structured desk updates clients can understand quickly.",
      skeleton: <SkeletonThree />,
      className: "col-span-1 border-b border-white/10 lg:col-span-3 lg:border-r",
    },
    {
      title: "Route liquidity globally",
      description:
        "Coordinate operating hubs, partner desks, and verified corridors without exposing unnecessary deal context.",
      skeleton: <SkeletonFour />,
      className: "col-span-1 border-b border-white/10 lg:col-span-3 lg:border-b-0",
    },
  ];

  return (
    <section
      id="features"
      className="relative z-20 overflow-hidden bg-transparent text-white"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(22,184,147,0.025),rgba(4,7,6,0)_46%)]" />

      <div className="relative z-20 mx-auto max-w-[92rem] px-5 py-16 sm:px-8 lg:px-10 lg:py-32">
        <div className="px-0 sm:px-8">
          <p className="mb-4 text-center text-xs font-bold uppercase tracking-[0.2em] text-emerald-200">
            Verified mandate layer
          </p>
          <h2 className="mx-auto max-w-5xl text-center text-3xl font-medium tracking-tight text-white lg:text-5xl lg:leading-tight">
            OTC exchange infrastructure for verified mandates
          </h2>

          <p className="mx-auto my-4 max-w-2xl text-center text-sm font-normal leading-7 text-white/58 lg:text-base">
            Ractysh OTC turns high-value movement into a controlled operating
            layer: verified counterparties, disciplined quotes, private routes,
            and settlement records that are ready to report.
          </p>
        </div>

        <div className="relative">
          <div className="mt-12 grid grid-cols-1 overflow-hidden rounded-md border border-white/10 bg-black/35 shadow-[0_30px_100px_rgba(0,0,0,0.45)] backdrop-blur-xl lg:grid-cols-6">
            {features.map((feature) => (
              <FeatureCard key={feature.title || "deal-context-visual"} className={feature.className}>
                {!feature.visualOnly ? (
                  <>
                    <FeatureTitle>{feature.title}</FeatureTitle>
                    <FeatureDescription>{feature.description}</FeatureDescription>
                  </>
                ) : null}
                <div className="h-full w-full">{feature.skeleton}</div>
              </FeatureCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const FeatureCard = ({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("relative min-h-[420px] overflow-hidden p-4 sm:p-8", className)}>
      {children}
    </div>
  );
};

const FeatureTitle = ({ children }: { children?: ReactNode }) => {
  return (
    <h3 className="mx-auto max-w-5xl text-left text-xl tracking-tight text-white md:text-2xl md:leading-snug">
      {children}
    </h3>
  );
};

const FeatureDescription = ({ children }: { children?: ReactNode }) => {
  return (
    <p className="mx-0 my-2 max-w-sm text-left text-sm font-normal leading-6 text-white/55 md:text-sm">
      {children}
    </p>
  );
};

const SkeletonOne = () => {
  const rows = [
    ["BTC block order", "$8.4M", "Counterparty"],
    ["USDT treasury", "$4.9M", "Liquidity"],
    ["Gold settlement", "$2.7M", "Custody"],
  ];
  const checkpoints = ["Quote locked", "KYC clear", "Route assigned", "Settlement window"];

  return (
    <div className="relative flex h-full gap-10 px-1 py-8">
      <div className="group mx-auto h-full w-full overflow-hidden bg-[#07100d] shadow-2xl ring-1 ring-white/10">
        <div className="relative h-full w-full p-4 sm:p-5">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(22,184,147,0.28),transparent_35%),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:auto,42px_42px,42px_42px]" />
          <div className="relative grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="border border-white/10 bg-black/26 p-4">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">
                    Deal command
                  </p>
                  <p className="mt-2 text-3xl font-semibold text-white">$24.8M</p>
                </div>
                <span className="border border-yellow-300/30 bg-yellow-300/10 px-3 py-2 text-xs font-bold text-yellow-200">
                  Priority
                </span>
              </div>

              <div className="space-y-3">
                {rows.map(([deal, value, status], index) => (
                  <div
                    key={deal}
                    className="border border-white/10 bg-white/[0.045] p-3"
                  >
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-white">
                          {deal}
                        </p>
                        <p className="mt-1 text-xs text-white/42">{status}</p>
                      </div>
                      <span className="text-sm font-bold text-emerald-300">
                        {value}
                      </span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        animate={{ width: ["34%", "82%", "58%"] }}
                        transition={{
                          duration: 5 + index,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="h-full rounded-full bg-[#16b893]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              <div className="border border-white/10 bg-white/[0.04] p-4">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/40">
                  Active workflow
                </p>
                <div className="mt-4 space-y-3">
                  {checkpoints.map((checkpoint, index) => (
                    <div key={checkpoint} className="flex items-center gap-3">
                      <span className="grid size-6 shrink-0 place-items-center border border-emerald-300/30 bg-emerald-300/10 text-[10px] font-bold text-emerald-200">
                        {index + 1}
                      </span>
                      <span className="text-sm text-white/70">{checkpoint}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-yellow-300/20 bg-yellow-300/10 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-yellow-200/70">
                  Desk signal
                </p>
                <div className="mt-4 flex h-28 items-end gap-2">
                  {[42, 74, 58, 86, 64, 92].map((height, index) => (
                    <motion.span
                      key={height}
                      animate={{ height: [`${height}%`, "38%", `${height}%`] }}
                      transition={{
                        duration: 3.6 + index * 0.3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="min-h-8 flex-1 rounded-full bg-yellow-200/45"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-60 w-full bg-gradient-to-t from-[#050806] via-[#050806] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-40 h-28 w-full bg-gradient-to-b from-[#050806] via-[#050806]/45 to-transparent" />
    </div>
  );
};

const SkeletonThree = () => {
  const [animationCycle, setAnimationCycle] = useState(0);

  useEffect(() => {
    const phraseInterval = window.setInterval(() => {
      setAnimationCycle((currentCycle) => currentCycle + 1);
    }, 1800);

    return () => window.clearInterval(phraseInterval);
  }, []);

  return (
    <div
      className="relative flex h-full min-h-[330px] overflow-hidden bg-[#06100d]"
      aria-label="Animated encrypted desk briefing panel"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_28%_18%,rgba(22,184,147,0.28),transparent_32%),radial-gradient(circle_at_80%_78%,rgba(189,121,29,0.2),transparent_34%),linear-gradient(180deg,#091613_0%,#040807_58%,#020303_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:30px_30px] opacity-45" />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 -left-24 w-32 bg-gradient-to-r from-transparent via-emerald-200/20 to-transparent"
        animate={{ x: ["0%", "560%"] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative z-10 grid h-full w-full place-items-center border border-white/10 bg-black/24 p-6 text-center backdrop-blur-[2px]">
        <div className="w-full max-w-lg">
          <motion.div
            className="mx-auto mb-6 h-px max-w-xs bg-gradient-to-r from-transparent via-emerald-200/48 to-transparent"
            animate={{ opacity: [0.2, 1, 0.2], scaleX: [0.65, 1, 0.65] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
            <EncryptedText
              key={animationCycle}
              text={briefingLoadingText}
              className="block min-h-14 font-mono text-2xl font-semibold uppercase leading-tight text-white sm:text-3xl"
              encryptedClassName="text-emerald-200/42"
              revealedClassName="text-white"
              revealDelayMs={28}
              flipDelayMs={24}
              animateOnView={false}
            />
          <motion.div
            className="mx-auto mt-6 h-px max-w-xs bg-gradient-to-r from-transparent via-[#f3c987]/42 to-transparent"
            animate={{ opacity: [1, 0.2, 1], scaleX: [1, 0.65, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
    </div>
  );
};

const SkeletonTwo = () => {
  return (
    <div className="relative h-full min-h-[420px] overflow-hidden bg-[#050806]">
      <Image
        src="/images/otc-deal-context-collage.png"
        alt="Premium OTC deal context visual with secure documents, liquidity routing, approval controls, and settlement proof artifacts."
        fill
        sizes="(min-width: 1024px) 33vw, 100vw"
        className="object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_24%_20%,rgba(22,184,147,0.1),transparent_32%),linear-gradient(180deg,rgba(0,0,0,0.02),rgba(0,0,0,0.5))]" />
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
    </div>
  );
};

const SkeletonFour = () => {
  return (
    <div className="relative mt-10 flex h-64 flex-col items-center bg-transparent md:h-60">
      <Globe className="absolute -right-36 -bottom-96 h-[720px] w-[720px] max-w-none sm:-right-28 md:-right-10 md:-bottom-72 md:h-[600px] md:w-[600px]" />
    </div>
  );
};

const Globe = ({ className }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 600 * 2,
      height: 600 * 2,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 4000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.1, 0.8, 1],
      glowColor: [1, 1, 1],
      markers: [
        { location: [37.7595, -122.4367], size: 0.03 },
        { location: [40.7128, -74.006], size: 0.1 },
        { location: [25.2048, 55.2708], size: 0.07 },
        { location: [19.076, 72.8777], size: 0.06 },
      ],
    });

    let frameId: number;
    const animate = () => {
      phi += 0.01;
      globe.update({ phi });
      frameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      globe.destroy();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ aspectRatio: 1 }}
      className={cn("h-[600px] w-[600px] max-w-none", className)}
    />
  );
};
