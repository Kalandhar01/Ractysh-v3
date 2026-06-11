"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import DeferredDither from "@/components/deferred-dither";
import NavbarDemo from "@/components/navbar-menu-demo";
import { EncryptedText } from "@/components/ui/encrypted-text";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import {
  ArrowRight,
  Camera,
  ChevronDown,
  Flashlight,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

const ConnectedContactSection = dynamic(
  () => import("@/components/connected-contact-section"),
  { ssr: false },
);
const FeaturesSectionDemo = dynamic(
  () => import("@/components/ui/features-section-demo-3"),
  { ssr: false },
);
const SiteFooter = dynamic(() => import("@/components/site-footer"), {
  ssr: false,
});
const WorldMapDemo = dynamic(() => import("@/components/world-map-demo"), {
  ssr: false,
});

const trustPoints = [
  "Verified mandate desk",
  "Quote discipline",
  "Settlement proof",
];

const heroHeadlineSentences = [
  "Ractysh OTC Exchange for private blocks.",
  "Verified OTC mandates close clean deals.",
  "Private OTC routes protect clean blocks.",
  "Serious OTC desks route verified blocks.",
];

const HERO_HEADLINE_REVEAL_DELAY_MS = 42;
const HERO_HEADLINE_CONCEAL_DELAY_MS = 30;
const HERO_HEADLINE_HOLD_MS = 10000;
const HERO_HEADLINE_SWITCH_PAUSE_MS = 180;

const heroStats: Array<[value: string, label: string]> = [
  ["$24.8M", "Live quote lane"],
  ["18m", "Controlled lock"],
  ["03/04", "Execution stage"],
];

const phoneNotifications = [
  {
    app: "Ractysh OTC",
    icon: "R",
    time: "now",
    title: "Quote matched",
    body: "BTC / USDT block is ready. $24.8M locked for 18 min.",
  },
  {
    app: "Settlement",
    icon: "S",
    time: "2m ago",
    title: "Route approved",
    body: "Counterparty, wallet, and settlement window are verified.",
  },
  {
    app: "Archive",
    icon: "A",
    time: "5m ago",
    title: "Proof package ready",
    body: "Receipt, timestamps, and operator notes are synced.",
  },
];

const projectFaqs = [
  {
    question: "What type of OTC projects can move through the desk?",
    answer:
      "We support private block trades, treasury conversions, crypto-to-fiat routes, commodity-backed settlement conversations, and verified counterparty mandates where size, privacy, timing, and clean reporting matter.",
  },
  {
    question: "How does a project get accepted before pricing starts?",
    answer:
      "The desk first checks the entity profile, mandate authority, source-of-funds context, beneficiary details, route expectations, and trade intent. Once the project is clear, it can move into quote shaping.",
  },
  {
    question: "Can clients keep project details confidential?",
    answer:
      "Yes. Project information is handled on a need-to-know basis, with private routing, limited desk visibility, and deal notes structured so operators can act without exposing unnecessary client context.",
  },
  {
    question: "What happens after a quote is approved?",
    answer:
      "The project moves into controlled execution: price lock, expiry, wallet or bank confirmation, route approval, operator responsibility, and settlement timing are aligned before funds or assets move.",
  },
  {
    question: "Do you provide records after settlement?",
    answer:
      "Every completed project can include transfer proof, settlement timestamps, client-facing receipts, desk notes, and a final archive so the client has a clean record without chasing scattered messages.",
  },
];

const sectionReveal = {
  hidden: { opacity: 0, y: 46, filter: "blur(10px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const initialPhoneStatusTime = "9:41";
const initialPhoneLockDate = "Thursday, June 11";

function formatPhoneStatusTime() {
  const parts = new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).formatToParts(new Date());

  const hour = parts.find((part) => part.type === "hour")?.value ?? "9";
  const minute = parts.find((part) => part.type === "minute")?.value ?? "41";

  return `${hour}:${minute}`;
}

function formatPhoneLockDate() {
  return new Intl.DateTimeFormat(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date());
}

export function OtcExchangeLanding() {
  const [activeHeadlineIndex, setActiveHeadlineIndex] = useState(0);
  const [headlinePhase, setHeadlinePhase] = useState<"reveal" | "conceal">("reveal");
  const [phoneStatusTime, setPhoneStatusTime] = useState(
    initialPhoneStatusTime,
  );
  const [phoneLockDate, setPhoneLockDate] = useState(initialPhoneLockDate);
  const activeHeadline =
    heroHeadlineSentences[activeHeadlineIndex] ?? heroHeadlineSentences[0];

  useEffect(() => {
    const letterDelay =
      headlinePhase === "reveal"
        ? HERO_HEADLINE_REVEAL_DELAY_MS
        : HERO_HEADLINE_CONCEAL_DELAY_MS;
    const animationDuration = activeHeadline.length * letterDelay + 240;
    const phaseDelay =
      headlinePhase === "reveal"
        ? animationDuration + HERO_HEADLINE_HOLD_MS
        : animationDuration + HERO_HEADLINE_SWITCH_PAUSE_MS;

    const rotateHeadline = window.setTimeout(() => {
      if (headlinePhase === "reveal") {
        setHeadlinePhase("conceal");
        return;
      }

      setActiveHeadlineIndex(
        (currentIndex) => (currentIndex + 1) % heroHeadlineSentences.length,
      );
      setHeadlinePhase("reveal");
    }, phaseDelay);

    return () => window.clearTimeout(rotateHeadline);
  }, [activeHeadline, headlinePhase]);

  useEffect(() => {
    const updatePhoneStatusTime = () => {
      setPhoneStatusTime(formatPhoneStatusTime());
      setPhoneLockDate(formatPhoneLockDate());
    };

    updatePhoneStatusTime();
    const clockInterval = window.setInterval(updatePhoneStatusTime, 15_000);

    return () => window.clearInterval(clockInterval);
  }, []);

  return (
    <main
      className="relative min-h-svh overflow-x-hidden bg-[#070b08] text-white"
      aria-label="Animated OTC exchange landing background"
    >
      <div className="fixed inset-0 scale-110">
        <DeferredDither
          waveColor={[0.5, 0.5, 0.5]}
          disableAnimation={false}
          enableMouseInteraction
          mouseRadius={0.3}
          colorNum={4}
          pixelSize={2}
          waveAmplitude={0.42}
          waveFrequency={3.4}
          waveSpeed={0.11}
        />
      </div>
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_14%_24%,rgba(22,184,147,0.28),transparent_28%),radial-gradient(circle_at_78%_24%,rgba(189,121,29,0.2),transparent_31%),linear-gradient(120deg,rgba(4,9,7,0.84),rgba(7,11,8,0.52)_46%,rgba(4,7,10,0.9))]" />
      <div className="fixed inset-x-0 top-0 h-40 bg-gradient-to-b from-black/70 to-transparent" />
      <NavbarDemo />

      <section
        id="home"
        className="relative z-10 mx-auto grid min-h-svh w-full max-w-7xl items-center gap-12 px-6 pt-32 pb-14 sm:px-10 lg:grid-cols-[minmax(0,1fr)_minmax(340px,0.78fr)] lg:px-12 lg:pt-28"
      >
        <div className="max-w-3xl">
          <h1
            className="relative min-h-[16.75rem] max-w-4xl text-5xl font-semibold leading-[0.95] text-white sm:min-h-[14.25rem] sm:text-6xl lg:min-h-[17.25rem] lg:text-7xl"
            aria-label={activeHeadline}
          >
            <EncryptedText
              key={`${activeHeadlineIndex}-${headlinePhase}`}
              text={activeHeadline}
              direction={headlinePhase}
              className="absolute left-0 top-0 inline-block max-w-[11ch] whitespace-normal break-words font-mono tracking-normal sm:max-w-[12ch] lg:max-w-[13ch]"
              encryptedClassName="text-emerald-200/55"
              revealedClassName="text-white"
              revealDelayMs={
                headlinePhase === "reveal"
                  ? HERO_HEADLINE_REVEAL_DELAY_MS
                  : HERO_HEADLINE_CONCEAL_DELAY_MS
              }
              flipDelayMs={34}
              animateOnView={false}
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.64, duration: 0.62, ease: "easeOut" }}
            className="mt-9 max-w-2xl text-lg leading-8 text-white/72 sm:mt-7 sm:text-xl"
          >
            A private exchange desk for crypto, commodity, and treasury-sized
            mandates, built around verification, quote control, protected
            routing, and final settlement records.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.82, duration: 0.62, ease: "easeOut" }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a
              href="#contact"
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#16b893] px-6 text-sm font-bold text-[#04100c] shadow-[0_18px_60px_rgba(22,184,147,0.3)] transition hover:bg-[#54d7bb]"
            >
              Start OTC mandate
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
            <a
              href="#desk"
              className="inline-flex min-h-12 items-center rounded-full border border-white/16 bg-white/8 px-6 text-sm font-semibold text-white backdrop-blur-md transition hover:border-white/28 hover:bg-white/12"
            >
              View exchange desk
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.92, duration: 0.62, ease: "easeOut" }}
            className="mt-8 grid max-w-2xl grid-cols-3 border border-white/10 bg-black/24 backdrop-blur-md"
          >
            {heroStats.map(([value, label]) => (
              <div
                key={label}
                className="border-r border-white/10 px-4 py-4 last:border-r-0"
              >
                <p className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  {value}
                </p>
                <p className="mt-1 text-xs font-medium text-white/46">
                  {label}
                </p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.08, duration: 0.62, ease: "easeOut" }}
            className="mt-10 hidden max-w-2xl gap-3 sm:grid sm:grid-cols-3"
          >
            {trustPoints.map((point) => (
              <div
                key={point}
                className="flex min-h-14 items-center gap-3 border border-white/12 bg-black/22 px-4 py-3 backdrop-blur-md"
              >
                <ShieldCheck
                  className="size-4 shrink-0 text-[#bd791d]"
                  aria-hidden="true"
                />
                <span className="text-sm font-medium text-white/78">
                  {point}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 54, rotate: 4 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ delay: 0.42, duration: 0.8, ease: "easeOut" }}
          className="relative mx-auto flex w-full max-w-[390px] justify-center lg:justify-end"
        >
          <div
            className="absolute top-10 -right-8 h-72 w-44 rotate-12 bg-[#16b893]/18 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-0 -left-12 h-56 w-52 -rotate-12 bg-[#bd791d]/18 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative aspect-[1290/2796] w-[min(78vw,335px)] rounded-[3.35rem] bg-[linear-gradient(135deg,#a8adab_0%,#252b2b_18%,#070908_48%,#727977_78%,#d5dad7_100%)] p-[5px] shadow-[0_32px_100px_rgba(0,0,0,0.62),inset_0_0_0_1px_rgba(255,255,255,0.22)]">
            <span className="absolute -left-[7px] top-[7.3rem] h-14 w-[4px] rounded-l-full bg-[#858b89]" aria-hidden="true" />
            <span className="absolute -left-[7px] top-[10.9rem] h-10 w-[4px] rounded-l-full bg-[#858b89]" aria-hidden="true" />
            <span className="absolute -right-[7px] top-[9.8rem] h-20 w-[4px] rounded-r-full bg-[#858b89]" aria-hidden="true" />
            <div className="relative h-full rounded-[3.05rem] bg-[#050706] p-[8px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08),inset_0_0_30px_rgba(255,255,255,0.05)]">
              <div className="absolute left-1/2 top-[1.08rem] z-30 flex h-[2.15rem] w-[7.2rem] -translate-x-1/2 items-center justify-end rounded-full bg-black px-2 shadow-[0_9px_22px_rgba(0,0,0,0.42)]">
                <span className="h-2.5 w-2.5 rounded-full bg-[#101819] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08),0_0_10px_rgba(22,184,147,0.12)]" />
              </div>
              <div className="relative h-full overflow-hidden rounded-[2.58rem] border border-white/10 bg-[#07100d]">
                <div
                  id="desk"
                  className="absolute inset-0 overflow-hidden px-3.5 pb-4 pt-4"
                  aria-label="OTC private desk phone interface"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_15%,rgba(255,255,255,0.22),transparent_18%),radial-gradient(circle_at_78%_24%,rgba(22,184,147,0.68),transparent_34%),radial-gradient(circle_at_30%_78%,rgba(189,121,29,0.56),transparent_31%),linear-gradient(160deg,#0d1514_0%,#09251f_40%,#050403_100%)]" />
                  <div className="pointer-events-none absolute inset-0 bg-black/18 backdrop-blur-[0.5px]" />

                  <div
                    className="relative flex h-full min-h-0 flex-col px-1"
                    style={{
                      fontFamily:
                        "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', system-ui, sans-serif",
                    }}
                  >
                    <div className="flex h-8 items-center justify-between px-2 text-white">
                      <span
                        className="text-[13px] font-semibold tracking-normal"
                        aria-label={`Current time ${phoneStatusTime}`}
                        suppressHydrationWarning
                      >
                        {phoneStatusTime}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="hidden h-3.5 items-end gap-[2px] sm:flex" aria-hidden="true">
                          <i className="block h-1.5 w-[3px] rounded-sm bg-white/86" />
                          <i className="block h-2 w-[3px] rounded-sm bg-white/86" />
                          <i className="block h-2.5 w-[3px] rounded-sm bg-white/86" />
                          <i className="block h-3 w-[3px] rounded-sm bg-white/86" />
                        </span>
                        <span className="relative hidden h-3.5 w-4 sm:block" aria-hidden="true">
                          <i className="absolute bottom-0 left-0 h-3.5 w-4 rounded-t-full border-2 border-b-0 border-white/86" />
                          <i className="absolute bottom-0 left-[4px] h-2.5 w-2 rounded-t-full border-2 border-b-0 border-white/86" />
                        </span>
                        <span className="relative h-3.5 w-6 rounded-[4px] border border-white/86" aria-hidden="true">
                          <i className="absolute -right-[3px] top-[3px] h-1.5 w-[2px] rounded-r-sm bg-white/86" />
                          <i className="absolute inset-y-[2px] left-[2px] w-[15px] rounded-[2px] bg-white/86" />
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 flex justify-center">
                      <LockKeyhole
                        className="size-4 text-white/88"
                        strokeWidth={2.4}
                        aria-hidden="true"
                      />
                    </div>

                    <div className="mt-2 text-center text-white">
                      <p
                        className="text-[14px] font-medium leading-none text-white/86"
                        suppressHydrationWarning
                      >
                        {phoneLockDate}
                      </p>
                      <p
                        className="mt-1 text-[4.35rem] font-semibold leading-none text-white max-[420px]:text-[3.78rem]"
                        suppressHydrationWarning
                      >
                        {phoneStatusTime}
                      </p>
                    </div>

                    <div className="mt-5 space-y-2.5 max-[420px]:mt-4 max-[420px]:space-y-2">
                      {phoneNotifications.map((notification, index) => (
                        <motion.div
                          key={notification.title}
                          initial={{ opacity: 0, y: 18, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{
                            delay: 0.9 + index * 0.14,
                            duration: 0.42,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className={`rounded-[1.45rem] border border-white/45 bg-white/[0.78] p-3.5 text-[#111314] shadow-[0_18px_45px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur-2xl max-[420px]:p-3 ${
                            index === 2 ? "max-[420px]:hidden" : ""
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="grid size-7 shrink-0 place-items-center rounded-[0.65rem] bg-[linear-gradient(135deg,#17cfa6,#0a4037)] text-[12px] font-bold text-white shadow-[0_6px_14px_rgba(0,0,0,0.18)]">
                              {notification.icon}
                            </span>
                            <span className="min-w-0 flex-1 truncate text-[12px] font-semibold leading-none text-black/74">
                              {notification.app}
                            </span>
                            <span className="text-[12px] font-medium leading-none text-black/42">
                              {notification.time}
                            </span>
                          </div>
                          <p className="mt-2 text-[14px] font-semibold leading-5 text-black/90">
                            {notification.title}
                          </p>
                          <p className="mt-0.5 text-[13px] font-medium leading-5 text-black/64">
                            {notification.body}
                          </p>
                        </motion.div>
                      ))}
                    </div>

                    <div className="mt-auto pb-4 max-[420px]:pb-3">
                      <p className="mb-4 text-center text-[12px] font-medium text-white/66 max-[420px]:mb-3">
                        Swipe up to open
                      </p>
                      <div className="flex items-center justify-between px-7">
                        <button
                          type="button"
                          aria-label="Flashlight"
                          className="grid size-12 place-items-center rounded-full bg-black/28 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-xl"
                        >
                          <Flashlight className="size-5" aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          aria-label="Camera"
                          className="grid size-12 place-items-center rounded-full bg-black/28 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-xl"
                        >
                          <Camera className="size-5" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="pointer-events-none absolute bottom-2 left-1/2 h-1 w-28 -translate-x-1/2 rounded-full bg-white/74" />
                </div>
                <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/10" />
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <ConnectedPageBackground>
        <LazyRenderSection
          placeholderClassName="min-h-[1120px]"
          placeholderId="features"
        >
          <ScrollRevealSection>
            <FeaturesSectionDemo />
          </ScrollRevealSection>
        </LazyRenderSection>
        <LazyRenderSection
          placeholderClassName="min-h-[720px]"
          placeholderId="routes"
        >
          <ScrollRevealSection>
            <WorldMapDemo />
          </ScrollRevealSection>
        </LazyRenderSection>
        <LazyRenderSection
          placeholderClassName="min-h-[900px]"
          placeholderId="contact"
        >
          <ScrollRevealSection>
            <ConnectedContactSection />
          </ScrollRevealSection>
        </LazyRenderSection>
        <ScrollRevealSection>
          <ProjectsFaqSection />
        </ScrollRevealSection>
      </ConnectedPageBackground>
      <LazyRenderSection placeholderClassName="min-h-[720px]">
        <ScrollRevealSection amount={0.08}>
          <SiteFooter />
        </ScrollRevealSection>
      </LazyRenderSection>
    </main>
  );
}

function ConnectedPageBackground({ children }: { children: ReactNode }) {
  return (
    <div className="relative z-20 overflow-hidden bg-black">
      <StarsBackground
        className="pointer-events-none opacity-65"
        starDensity={0.00018}
        minTwinkleSpeed={0.65}
        maxTwinkleSpeed={1.3}
      />
      <ShootingStars
        className="pointer-events-none opacity-85"
        minSpeed={8}
        maxSpeed={18}
        minDelay={700}
        maxDelay={1600}
        starColor="#f7d27f"
        trailColor="#16b893"
        starWidth={14}
        starCount={5}
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.12),rgba(0,0,0,0.5)_32%,rgba(0,0,0,0.42)_72%,rgba(0,0,0,0.78)),radial-gradient(circle_at_16%_34%,rgba(22,184,147,0.08),transparent_30%),radial-gradient(circle_at_86%_58%,rgba(247,210,127,0.07),transparent_32%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black to-transparent" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function LazyRenderSection({
  children,
  placeholderClassName,
  placeholderId,
}: {
  children: ReactNode;
  placeholderClassName: string;
  placeholderId?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (shouldRender) return;

    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry && entry.isIntersecting && entry.intersectionRatio >= 0.05) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px", threshold: 0.05 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [shouldRender]);

  return (
    <div
      ref={containerRef}
      id={shouldRender ? undefined : placeholderId}
      className={shouldRender ? undefined : placeholderClassName}
    >
      {shouldRender ? children : null}
    </div>
  );
}

function ScrollRevealSection({
  children,
  amount = 0.16,
}: {
  children: ReactNode;
  amount?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={sectionReveal}
      transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function ProjectsFaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      id="project-faq"
      className="relative z-20 overflow-hidden bg-transparent px-5 py-20 text-white sm:px-8 lg:px-10 lg:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(22,184,147,0.025),rgba(4,7,6,0)_42%)]" />

      <div className="relative mx-auto grid max-w-[92rem] gap-10 lg:grid-cols-[0.72fr_1fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-emerald-200">
            Mandate questions
          </p>
          <h2 className="max-w-2xl text-3xl font-medium tracking-tight text-white sm:text-4xl lg:text-5xl">
            What serious desks ask before a private OTC mandate moves.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-8 text-white/56">
            Clear authority, route expectations, source context, and settlement
            records keep high-value exchange work disciplined from the first
            check to final reporting.
          </p>
        </div>

        <div className="border-y border-white/10">
          {projectFaqs.map((item, index) => {
            const isOpen = openIndex === index;
            const answerId = `project-faq-answer-${index}`;

            return (
              <div key={item.question} className="border-b border-white/10 last:border-b-0">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="group flex w-full items-center gap-4 py-6 text-left transition hover:bg-white/[0.03] sm:gap-6 sm:px-4"
                >
                  <span className="hidden text-sm font-semibold text-emerald-200/70 sm:block">
                    0{index + 1}
                  </span>
                  <span className="flex-1 text-lg font-medium leading-7 text-white sm:text-xl">
                    {item.question}
                  </span>
                  <span className="flex size-9 shrink-0 items-center justify-center border border-white/12 bg-white/[0.04] text-white/72 transition group-hover:border-emerald-200/30 group-hover:text-emerald-100">
                    <ChevronDown
                      className={`size-4 transition duration-300 ${isOpen ? "rotate-180" : ""}`}
                      aria-hidden="true"
                    />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      id={answerId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.26, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-3xl px-0 pb-6 text-sm leading-7 text-white/58 sm:px-14 sm:text-base">
                        {item.answer}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
