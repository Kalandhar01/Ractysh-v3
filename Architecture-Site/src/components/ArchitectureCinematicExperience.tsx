"use client";

import { FormEvent, MouseEvent, useCallback, useEffect, useRef, useState, type ReactNode, type RefObject, type SyntheticEvent } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion, useScroll, useTransform, type HTMLMotionProps, type Variants } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Check, ChevronLeft, ChevronRight, Loader2, Mail, X } from "lucide-react";
import { editorialPanels, storyBlocks, studioMetrics } from "@/lib/architectureContent";
import type { ArchitectureHeroView, ArchitectureProjectView } from "@/lib/architectureCms";
import { OptimizedImage as Image } from "@/components/OptimizedImage";

const easeOut = [0.22, 1, 0.36, 1] as const;
const power4Out = [0.16, 1, 0.3, 1] as const;
const heroVideoPlaybackRate = 1.35;
const architecturalPhrasePattern = /(Spatial Intelligence|Architecture|Design|Planning|Visualization)/gi;
const architecturalPhraseSet = new Set(["spatial intelligence", "architecture", "design", "planning", "visualization"]);
const studioStoryImages = [
  {
    src: "/images/architecture/ractysh-who-we-are-editorial-villa.webp",
    alt: "Luxury modern villa courtyard with stone, timber, glass, tropical planting, and natural daylight"
  },
  {
    src: "/images/architecture/ractysh-coimbatore-linear-house.avif",
    alt: "South Indian residence with contemporary roof planes, stone, glass, lawn, and shaded tropical edges"
  },
  {
    src: "/images/architecture/architecture-content-gallery-lobby-07.webp",
    alt: "Interior architecture with refined lobby materials, warm light, and composed spatial depth"
  }
] as const;

function configureHeroVideo(video: HTMLVideoElement) {
  video.defaultPlaybackRate = heroVideoPlaybackRate;
  video.playbackRate = heroVideoPlaybackRate;
  video.muted = true;
}

const reveal: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: power4Out }
  }
};

const staggerReveal: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05
    }
  }
};

const delayedStaggerReveal: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.28
    }
  }
};

const maskReveal: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08
    }
  }
};

const maskLineReveal: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.72, ease: power4Out }
  }
};

const maskCopyReveal: Variants = {
  hidden: { y: "112%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.8, ease: power4Out }
  }
};

const heroMaskCopyReveal: Variants = {
  hidden: { y: "112%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 1.2, ease: power4Out }
  }
};

const wordPhraseReveal: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.055,
      delayChildren: 0.1
    }
  }
};

const wordReveal: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: power4Out }
  }
};

const imageReveal: Variants = {
  hidden: { clipPath: "inset(0% 0% 100% 0%)" },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 1.4, ease: power4Out }
  }
};

const projectBoardReveal: Variants = {
  hidden: { clipPath: "inset(0% 100% 0% 0%)" },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 1.4, ease: power4Out }
  }
};

const imageScaleReveal: Variants = {
  hidden: { scale: 1.08 },
  visible: {
    scale: 1,
    transition: { duration: 1.4, ease: power4Out }
  }
};

const studioImageReveal: Variants = {
  hidden: { clipPath: "inset(0% 0% 100% 0%)" },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 1.2, ease: power4Out }
  }
};

const studioImageScaleReveal: Variants = {
  hidden: { scale: 1.08 },
  visible: {
    scale: 1,
    transition: { duration: 1.2, ease: power4Out }
  }
};

const ruleReveal: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.95, ease: power4Out }
  }
};

const formFieldReveal: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.68, ease: power4Out }
  }
};

const consultationDeskReveal: Variants = {
  hidden: { clipPath: "inset(0% 100% 0% 0%)", opacity: 0 },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    opacity: 1,
    transition: {
      duration: 1.05,
      ease: power4Out,
      staggerChildren: 0.085,
      delayChildren: 0.2
    }
  }
};

const heroLogoReveal: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: power4Out }
  }
};

const heroDescriptionReveal: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: power4Out, delay: 0.3 }
  }
};

const heroActionsReveal: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: power4Out, delay: 0.6 }
  }
};

const heroHeadingReveal: Variants = {
  hidden: { opacity: 0, y: 60, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: power4Out,
      staggerChildren: 0.085
    }
  }
};

function WordReveal({ phrase }: { phrase: string }) {
  const words = phrase.split(/\s+/).filter(Boolean);

  return (
    <motion.span className="arch-word-phrase" variants={wordPhraseReveal}>
      {words.map((word, index) => (
        <motion.span key={`${word}-${index}`} className="arch-word" variants={wordReveal}>
          {word}
          {index < words.length - 1 ? " " : null}
        </motion.span>
      ))}
    </motion.span>
  );
}

function renderArchitecturalText(text: string) {
  return text.split(architecturalPhrasePattern).map((part, index) => {
    if (architecturalPhraseSet.has(part.toLowerCase())) {
      return <WordReveal key={`${part}-${index}`} phrase={part} />;
    }

    return part;
  });
}

function renderRevealChildren(children: ReactNode) {
  return typeof children === "string" ? renderArchitecturalText(children) : children;
}

type MaskRevealH1Props = Omit<HTMLMotionProps<"h1">, "children"> & {
  children: ReactNode;
};

type MaskRevealH2Props = Omit<HTMLMotionProps<"h2">, "children"> & {
  children: ReactNode;
};

type MaskRevealH3Props = Omit<HTMLMotionProps<"h3">, "children"> & {
  children: ReactNode;
};

function MaskRevealH1({ children, className = "", variants = maskReveal, ...props }: MaskRevealH1Props) {
  return (
    <motion.h1 className={`arch-mask-reveal ${className}`} variants={variants} {...props}>
      <motion.span className="arch-draft-line" variants={maskLineReveal} aria-hidden="true" />
      <motion.span className="arch-mask-reveal-copy" variants={heroMaskCopyReveal}>
        {renderRevealChildren(children)}
      </motion.span>
    </motion.h1>
  );
}

function MaskRevealH2({ children, className = "", variants = maskReveal, ...props }: MaskRevealH2Props) {
  return (
    <motion.h2 className={`arch-mask-reveal ${className}`} variants={variants} {...props}>
      <motion.span className="arch-draft-line" variants={maskLineReveal} aria-hidden="true" />
      <motion.span className="arch-mask-reveal-copy" variants={maskCopyReveal}>
        {renderRevealChildren(children)}
      </motion.span>
    </motion.h2>
  );
}

function MaskRevealH3({ children, className = "", variants = maskReveal, ...props }: MaskRevealH3Props) {
  return (
    <motion.h3 className={`arch-mask-reveal ${className}`} variants={variants} {...props}>
      <motion.span className="arch-draft-line" variants={maskLineReveal} aria-hidden="true" />
      <motion.span className="arch-mask-reveal-copy" variants={maskCopyReveal}>
        {renderRevealChildren(children)}
      </motion.span>
    </motion.h3>
  );
}

type ArchitecturalTextProps = Omit<HTMLMotionProps<"p">, "children"> & {
  children: string;
};

function ArchitecturalText({ children, className = "", variants = reveal, ...props }: ArchitecturalTextProps) {
  return (
    <motion.p className={className} variants={variants} {...props}>
      {renderArchitecturalText(children)}
    </motion.p>
  );
}

function BrandLogo() {
  return (
    <span className="brand-logo">
      <Image
        src="/images/architecture/ractysh-architecture-logo.webp"
        alt="Ractysh Architecture emblem"
        fill
        sizes="(max-width: 720px) 44px, 56px"
        className="object-contain"
        placeholder="empty"
        style={{ background: "transparent" }}
      />
    </span>
  );
}

type DeskState = "idle" | "submitting" | "success" | "error";
type NavSectionId = "studio" | "works" | "consultation";

const navItems: { id: NavSectionId; label: string }[] = [
  { id: "studio", label: "Studio" },
  { id: "works", label: "Works" },
  { id: "consultation", label: "Consultation" }
];

const contactPillars = [
  {
    title: "Spatial Intelligence",
    body: "Every project begins with a deep understanding of context, movement, proportion and experience.",
    image: "/images/architecture/ractysh-coimbatore-linear-house.avif"
  },
  {
    title: "Timeless Design",
    body: "Architecture designed to remain relevant, functional and beautiful for years to come.",
    image: "/images/architecture/ractysh-editorial-stone-residence.avif"
  },
  {
    title: "End-to-End Coordination",
    body: "From concept and visualization to execution guidance, every stage remains connected.",
    image: "/images/architecture/ractysh-executive-work-pavilion.avif"
  }
] as const;

const architectureFooterColumns = [
  {
    title: "Studio",
    items: [
      { label: "Studio", href: "#studio" },
      { label: "Works", href: "#works" },
      { label: "Consultation", href: "#architecture-consultation-desk" }
    ]
  },
  {
    title: "Locations",
    items: [
      { label: "Coimbatore" },
      { label: "Palani" },
      { label: "Dindigul" }
    ]
  },
  {
    title: "Contact",
    items: [
      { label: "hello@ractysh.com", href: "mailto:hello@ractysh.com" },
      { label: "Architecture Consultation", href: "#architecture-consultation-desk" },
      { label: "Project Inquiries", href: "#architecture-consultation-desk" }
    ]
  }
] as const;

const architectureFooterStatement = ["Crafting", "Timeless", "Architecture."] as const;

const navSectionIds = navItems.map((item) => item.id);
const navScrollDuration = 1.35;
const navScrollEase = (time: number) => (time < 0.5 ? 4 * time * time * time : 1 - Math.pow(-2 * time + 2, 3) / 2);

let architectureLenis: {
  scrollTo: (
    target: HTMLElement | string | number,
    options?: {
      offset?: number;
      duration?: number;
      easing?: (time: number) => number;
      onComplete?: () => void;
      lock?: boolean;
      immediate?: boolean;
      force?: boolean;
    }
  ) => void;
  resize?: () => void;
  start?: () => void;
  stop?: () => void;
} | null = null;

function SmoothScroll() {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;

    let cancelled = false;
    let lenis: import("lenis").default | null = null;
    let frame = 0;

    void import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;

      lenis = new Lenis({
        duration: 1.3,
        easing: (time: number) => Math.min(1, 1.001 - Math.pow(2, -10 * time)),
        smoothWheel: true,
        wheelMultiplier: 0.74,
        touchMultiplier: 0.88,
        prevent: (node) => node.closest("[data-lenis-prevent]") !== null
      });
      architectureLenis = lenis;

      const raf = (time: number) => {
        lenis?.raf(time);
        frame = window.requestAnimationFrame(raf);
      };

      frame = window.requestAnimationFrame(raf);
    });

    return () => {
      cancelled = true;
      if (frame) window.cancelAnimationFrame(frame);
      if (architectureLenis === lenis) architectureLenis = null;
      lenis?.destroy();
    };
  }, [reduceMotion]);

  return null;
}

function useArchitectureGsap(rootRef: RefObject<HTMLElement | null>, reduceMotion: boolean | null) {
  useEffect(() => {
    if (reduceMotion) return;

    let cancelled = false;
    let context: { revert: () => void } | null = null;

    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([gsapModule, scrollModule]) => {
      const root = rootRef.current;
      if (cancelled || !root) return;

      const { gsap } = gsapModule;
      const { ScrollTrigger } = scrollModule;
      gsap.registerPlugin(ScrollTrigger);

      context = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>("[data-parallax-text]", root).forEach((item) => {
          gsap.to(item, {
            y: -34,
            ease: "none",
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
              end: "bottom 18%",
              scrub: true
            }
          });
        });

        const contactHero = root.querySelector<HTMLElement>("[data-contact-hero]");
        if (contactHero) {
          const contactVideo = contactHero.querySelector<HTMLElement>("[data-contact-hero-video]");
          const contactRevealItems = gsap.utils.toArray<HTMLElement>("[data-contact-reveal]", contactHero);
          const contactTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: contactHero,
              start: "top 72%",
              once: true
            }
          });

          if (contactVideo) {
            contactTimeline.fromTo(
              contactVideo,
              { opacity: 0, scale: 1.08 },
              { opacity: 1, scale: 1.02, duration: 1.9, ease: "power4.out" }
            );
          }

          if (contactRevealItems.length) {
            contactTimeline.fromTo(
              contactRevealItems,
              { opacity: 0, y: 36 },
              {
                opacity: 1,
                y: 0,
                duration: 1.05,
                ease: "power4.out",
                stagger: 0.16
              },
              contactVideo ? ">-0.15" : 0
            );
          }
        }

        gsap.utils.toArray<HTMLElement>("[data-studio-story]", root).forEach((item) => {
          const media = item.querySelector<HTMLElement>("[data-studio-story-media]");
          const image = item.querySelector<HTMLElement>("[data-studio-story-image]");
          const copyItems = item.querySelectorAll<HTMLElement>("[data-studio-story-copy] > *");

          if (media) {
            gsap.fromTo(
              media,
              { clipPath: "inset(0% 0% 100% 0%)" },
              {
                clipPath: "inset(0% 0% 0% 0%)",
                duration: 1.25,
                ease: "power4.out",
                scrollTrigger: {
                  trigger: item,
                  start: "top 82%",
                  once: true
                }
              }
            );
          }

          if (image) {
            gsap.fromTo(
              image,
              { scale: 1.08 },
              {
                scale: 1,
                duration: 1.35,
                ease: "power4.out",
                scrollTrigger: {
                  trigger: item,
                  start: "top 82%",
                  once: true
                }
              }
            );

            gsap.to(image, {
              yPercent: -7,
              ease: "none",
              scrollTrigger: {
                trigger: item,
                start: "top bottom",
                end: "bottom top",
                scrub: true
              }
            });
          }

          if (copyItems.length) {
            gsap.fromTo(
              copyItems,
              { opacity: 0, y: 28 },
              {
                opacity: 1,
                y: 0,
                duration: 0.82,
                stagger: 0.08,
                ease: "power4.out",
                scrollTrigger: {
                  trigger: item,
                  start: "top 78%",
                  once: true
                }
              }
            );
          }
        });

        ScrollTrigger.refresh();
      }, root);
    });

    return () => {
      cancelled = true;
      context?.revert();
    };
  }, [reduceMotion, rootRef]);
}

function navOffset() {
  const nav = document.querySelector<HTMLElement>(".architecture-nav");
  return Math.round((nav?.getBoundingClientRect().height || 74) + 18);
}

function navIdFromHash(hash: string) {
  return navSectionIds.includes(hash as NavSectionId) ? (hash as NavSectionId) : null;
}

function scrollTargetFromHref(href: string) {
  if (!href.startsWith("#")) return null;
  return href.slice(1);
}

async function premiumScrollTo(target: HTMLElement, onComplete: () => void) {
  const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - navOffset());

  try {
    const [{ gsap }, { ScrollToPlugin }] = await Promise.all([import("gsap"), import("gsap/ScrollToPlugin")]);
    gsap.registerPlugin(ScrollToPlugin);
    architectureLenis?.scrollTo(window.scrollY, { immediate: true, force: true });
    gsap.killTweensOf(window);
    gsap.to(window, {
      scrollTo: { y: top, autoKill: false },
      duration: navScrollDuration,
      ease: "power3.inOut",
      overwrite: true,
      onUpdate: () => architectureLenis?.resize?.(),
      onComplete: () => {
        architectureLenis?.resize?.();
        onComplete();
      }
    });
  } catch {
    if (!architectureLenis) return;
    architectureLenis.scrollTo(top, {
      duration: navScrollDuration,
      easing: navScrollEase,
      onComplete,
      lock: true
    });
  }
}

function useMobileHeroFrame() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 720px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return isMobile;
}

function heroVideoSources(videoUrl: string) {
  if (videoUrl === "/videos/architecture/ractysh-architecture-hero.mp4" || videoUrl === "/landingpage_bg-video.mp4") {
    return [
      { src: "/videos/architecture/ractysh-architecture-hero-mobile.mp4", type: "video/mp4", media: "(max-width: 720px)" },
      { src: "/videos/architecture/ractysh-architecture-hero-tablet.mp4", type: "video/mp4", media: "(max-width: 1023px)" },
      { src: "/videos/architecture/ractysh-architecture-hero.mp4", type: "video/mp4" }
    ];
  }

  return [{ src: videoUrl, type: videoUrl.endsWith(".webm") ? "video/webm" : "video/mp4" }];
}

function HeroFilm({
  hero,
  onContentReveal,
  onAnchorNavigate
}: {
  hero: ArchitectureHeroView;
  onContentReveal: () => void;
  onAnchorNavigate: (event: MouseEvent<HTMLAnchorElement>, href: string) => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const revealTriggeredRef = useRef(false);
  const reduceMotion = useReducedMotion();
  const isMobileHero = useMobileHeroFrame();
  const [contentRevealed, setContentRevealed] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const videoY = useTransform(scrollYProgress, [0, 1], reduceMotion || isMobileHero ? ["0%", "0%"] : ["0%", "14%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], reduceMotion ? ["0%", "0%"] : ["0%", "-12%"]);
  const sources = heroVideoSources(hero.videoUrl);

  const revealHeroContent = useCallback(() => {
    if (revealTriggeredRef.current) return;
    revealTriggeredRef.current = true;
    setContentRevealed(true);
    onContentReveal();
  }, [onContentReveal]);

  const handleSkipIntro = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      revealHeroContent();
    },
    [revealHeroContent]
  );

  const handleVideoReady = useCallback((event: SyntheticEvent<HTMLVideoElement>) => {
    const video = event.currentTarget;
    configureHeroVideo(video);
    void video.play().catch(() => undefined);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    configureHeroVideo(video);
    void video.play().catch(() => undefined);
  }, []);

  const handleVideoProgress = useCallback(
    (event: SyntheticEvent<HTMLVideoElement>) => {
      const video = event.currentTarget;
      configureHeroVideo(video);

      if (revealTriggeredRef.current) return;

      const duration = video.duration;
      const hasDuration = Number.isFinite(duration) && duration > 0;
      const revealAt = hasDuration ? duration * 0.5 : 4.5;

      if (video.currentTime >= revealAt) {
        revealHeroContent();
      }
    },
    [revealHeroContent]
  );

  return (
    <section ref={ref} className="arch-hero relative overflow-hidden text-white">
      {hero.posterUrl ? (
        <Image
          src={hero.posterUrl}
          alt=""
          fill
          priority
          quality={84}
          sizes="100vw"
          aria-hidden="true"
          className="arch-hero-poster object-cover"
        />
      ) : null}
      <motion.video
        ref={videoRef}
        className={`arch-hero-video absolute inset-0 w-full object-cover ${isMobileHero ? "h-full" : "h-[116%]"}`}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        onCanPlay={handleVideoReady}
        onLoadedMetadata={handleVideoReady}
        onPlay={handleVideoReady}
        onPlaying={handleVideoReady}
        onTimeUpdate={handleVideoProgress}
        initial={{ opacity: 0, scale: 1 }}
        animate={{ opacity: 1, scale: isMobileHero ? 1.01 : 1.05 }}
        transition={{
          opacity: { duration: 1.25, ease: easeOut },
          scale: { duration: 5, ease: power4Out }
        }}
        style={{ y: videoY }}
      >
        {sources.map((source) => (
          <source key={source.src} src={source.src} type={source.type} media={"media" in source ? source.media : undefined} />
        ))}
      </motion.video>
      <motion.div
        className="arch-hero-overlay absolute inset-0"
        initial={false}
        animate={{ opacity: contentRevealed ? 0.48 : 0.24 }}
        transition={{ duration: 1.15, ease: power4Out }}
      />
      <motion.a
        href="#architecture-hero-content"
        className="arch-skip-intro"
        onClick={handleSkipIntro}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: contentRevealed ? 0 : 0.6, y: contentRevealed ? -8 : 0 }}
        transition={{ duration: 0.55, ease: power4Out, delay: contentRevealed ? 0 : 0.2 }}
        style={{ pointerEvents: contentRevealed ? "none" : "auto" }}
        tabIndex={contentRevealed ? -1 : 0}
      >
        Skip Intro →
      </motion.a>
      <motion.div
        id="architecture-hero-content"
        className="arch-hero-content relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col items-center justify-center px-5 py-28 text-center sm:px-8 lg:px-12"
        style={{ y: contentY }}
        aria-hidden={!contentRevealed}
      >
        <motion.div
          className="hero-logo-lockup"
          initial="hidden"
          animate={contentRevealed ? "visible" : "hidden"}
          variants={heroLogoReveal}
        >
          <BrandLogo />
          <span className="brand-word">Ractysh Architecture</span>
        </motion.div>
        <MaskRevealH1
          className="arch-hero-title mt-8 font-display"
          initial="hidden"
          animate={contentRevealed ? "visible" : "hidden"}
          variants={heroHeadingReveal}
          data-parallax-text
        >
          {hero.heading
            .split(/\n+/)
            .map((line) => line.trim())
            .filter(Boolean)
            .map((line) => (
              <span key={line} className="arch-title-line">
                {renderArchitecturalText(line)}
              </span>
            ))}
        </MaskRevealH1>
        <ArchitecturalText
          className="arch-hero-subtitle mt-8 max-w-2xl"
          initial="hidden"
          animate={contentRevealed ? "visible" : "hidden"}
          variants={heroDescriptionReveal}
        >
          {hero.description}
        </ArchitecturalText>
        <motion.div
          className="arch-hero-actions"
          initial="hidden"
          animate={contentRevealed ? "visible" : "hidden"}
          variants={heroActionsReveal}
        >
          <a href={hero.primaryCtaHref} className="arch-hero-cta is-primary" onClick={(event) => onAnchorNavigate(event, hero.primaryCtaHref)}>
            <span>{hero.primaryCtaText}</span>
            <ArrowUpRight aria-hidden="true" />
          </a>
          <a href={hero.secondaryCtaHref} className="arch-hero-cta" onClick={(event) => onAnchorNavigate(event, hero.secondaryCtaHref)}>
            <span>{hero.secondaryCtaText}</span>
            <ArrowUpRight aria-hidden="true" />
          </a>
        </motion.div>
      </motion.div>
      <motion.div
        className="arch-scroll-line absolute bottom-8 left-1/2 z-10 h-16 w-px -translate-x-1/2 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: contentRevealed ? 1 : 0 }}
        transition={{ duration: 0.75, ease: power4Out, delay: contentRevealed ? 0.8 : 0 }}
      >
        <span />
      </motion.div>
    </section>
  );
}

function WhoWeAreSection() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [sectionEntered, setSectionEntered] = useState(false);
  const sectionVisible = sectionEntered || reduceMotion === true;

  useEffect(() => {
    if (sectionEntered) return;

    const target = ref.current;
    if (!target) return;

    let frame = 0;

    const checkVisibility = () => {
      frame = 0;
      const rect = target.getBoundingClientRect();
      const entersViewport = rect.top < window.innerHeight * 0.88 && rect.bottom > window.innerHeight * 0.08;

      if (entersViewport) {
        setSectionEntered(true);
      }
    };

    const scheduleCheck = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(checkVisibility);
    };

    checkVisibility();
    window.addEventListener("scroll", scheduleCheck, { passive: true });
    window.addEventListener("resize", scheduleCheck);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleCheck);
      window.removeEventListener("resize", scheduleCheck);
    };
  }, [sectionEntered]);

  return (
    <section ref={ref} id="studio" className="arch-studio-section bg-white text-nearblack" data-arch-section>
      <div className="arch-studio-spread mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-8 sm:py-28 lg:grid-cols-[0.86fr_1.14fr] lg:px-12 lg:py-36">
        <motion.div className="arch-sticky-copy lg:sticky lg:top-28 lg:h-fit" initial="hidden" animate={sectionVisible ? "visible" : "hidden"} variants={staggerReveal}>
          <motion.p className="arch-kicker text-executive-red" variants={reveal}>
            Studio
          </motion.p>
          <MaskRevealH2 className="arch-section-title mt-5 font-display" data-parallax-text>
            A studio for spaces that feel inevitable.
          </MaskRevealH2>
          <motion.div className="arch-metrics mt-10" variants={staggerReveal}>
            {studioMetrics.map(([value, label]) => (
              <motion.div key={label} variants={reveal}>
                <span>{value}</span>
                <small>{label}</small>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div className="arch-story-rows" initial="hidden" animate={sectionVisible ? "visible" : "hidden"} variants={delayedStaggerReveal}>
          {storyBlocks.map((block, index) => {
            const image = studioStoryImages[index];
            const layoutClass = index === 0 ? "is-featured" : "is-image-left";

            return (
              <motion.article key={block.number} className={`arch-story-chapter ${layoutClass}`} variants={staggerReveal} data-studio-story>
                <motion.div className="arch-story-media" variants={studioImageReveal} data-studio-story-media>
                  <motion.div className="arch-story-media-plane" variants={studioImageScaleReveal} data-studio-story-image>
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes={index === 0 ? "(min-width: 1024px) 58vw, 100vw" : "(min-width: 1024px) 32vw, 100vw"}
                      className="object-cover"
                    />
                  </motion.div>
                </motion.div>
                <motion.div className="arch-story-content" variants={staggerReveal} data-studio-story-copy>
                  <motion.span className="arch-story-number" variants={reveal}>
                    {block.number}
                  </motion.span>
                  <motion.p className="arch-kicker text-warm-gold" variants={reveal}>
                    {block.eyebrow}
                  </motion.p>
                  <MaskRevealH3 className="font-display">{block.title}</MaskRevealH3>
                  <ArchitecturalText>{block.body}</ArchitecturalText>
                </motion.div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function portfolioCardClass(project: ArchitectureProjectView, index: number) {
  if (index === 0) return "is-featured";
  if (project.featured) return "is-wide";
  if (index % 6 === 1) return "is-tall";
  if (index % 6 === 2) return "is-wide";
  if (index % 6 === 4) return "is-quiet";
  return "";
}

function projectGallery(project: ArchitectureProjectView) {
  return Array.from(new Set([project.image, ...project.galleryImages].filter(Boolean))).slice(0, 6);
}

function PortfolioProjectCard({
  project,
  index,
  onSelect
}: {
  project: ArchitectureProjectView;
  index: number;
  onSelect: (project: ArchitectureProjectView) => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], reduceMotion ? ["0%", "0%"] : ["-7%", "7%"]);

  return (
    <motion.button
      ref={ref}
      type="button"
      className={`arch-portfolio-card ${portfolioCardClass(project, index)}`}
      variants={reveal}
      onClick={() => onSelect(project)}
    >
      <motion.span className="arch-portfolio-image-mask" variants={projectBoardReveal}>
        <motion.span className="arch-portfolio-image-plane" style={{ y: imageY }} variants={imageScaleReveal} data-arch-project-image>
          <Image
            src={project.image}
            alt={project.alt}
            fill
            priority={index === 0}
            sizes={index === 0 ? "(min-width: 1280px) 58vw, (min-width: 1024px) 54vw, 100vw" : "(min-width: 1280px) 34vw, (min-width: 1024px) 42vw, 100vw"}
            className="object-cover"
          />
        </motion.span>
      </motion.span>
      <span className="arch-portfolio-shade" aria-hidden="true" />
      <span className="arch-portfolio-index">{project.number}</span>
      <span className="arch-portfolio-content">
        <span className="arch-portfolio-kicker">{project.projectType}</span>
        <span className="arch-portfolio-title">{project.title}</span>
        <span className="arch-portfolio-description">{project.description}</span>
        <span className="arch-portfolio-location">{project.location}</span>
      </span>
      <span className="arch-portfolio-arrow" aria-hidden="true">
        <ArrowUpRight />
      </span>
    </motion.button>
  );
}

function compactLocation(location: string) {
  return location.split(",")[0]?.trim() || location;
}

function completedYear(project: ArchitectureProjectView) {
  return `Completed ${project.year}`;
}

function highlightProjectType(projectType: string) {
  if (/(villa|residence|estate|house)/i.test(projectType)) return "Private Residence";
  if (/(office|commercial|pavilion)/i.test(projectType)) return "Commercial Architecture";
  return projectType;
}

function designApproach(project: ArchitectureProjectView) {
  return [
    `Material selection for ${project.title} is guided by natural stone, warm surfaces and durable details that age with quiet confidence.`,
    "Spatial planning is organized around calm thresholds, courtyard moments and connected living zones so movement through the project feels composed rather than forced.",
    "Climate response shapes shaded edges, cross ventilation and deep openings, while natural lighting is calibrated to bring softness into the interiors throughout the day."
  ];
}

function numericMetric(value: string) {
  const match = value.match(/^(.*?)([\d,]+)(.*)$/);
  if (!match) return null;

  return {
    prefix: match[1],
    value: Number(match[2].replace(/,/g, "")),
    suffix: match[3]
  };
}

function ProjectMetric({ value, label }: { value: string; label: string }) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const metric = numericMetric(value);

  useEffect(() => {
    if (!metric || reduceMotion) return;

    let frame = 0;
    const startedAt = performance.now();
    const duration = 1100;
    const formatter = new Intl.NumberFormat("en-IN", { useGrouping: !/(completed|planned)/i.test(metric.prefix) });

    const tick = (time: number) => {
      const progress = Math.min(1, (time - startedAt) / duration);
      const eased = 1 - Math.pow(1 - progress, 4);
      const next = Math.round(metric.value * eased);

      if (ref.current) {
        ref.current.textContent = `${metric.prefix}${formatter.format(next)}${metric.suffix}`;
      }

      if (progress < 1) {
        frame = window.requestAnimationFrame(tick);
      }
    };

    frame = window.requestAnimationFrame(tick);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [metric, reduceMotion]);

  return (
    <div className="arch-project-case-metric" data-modal-reveal>
      <span ref={ref}>{value}</span>
      <small>{label}</small>
    </div>
  );
}

function ProjectDetailModal({
  project,
  onClose,
  onConsultationClick
}: {
  project: ArchitectureProjectView;
  onClose: () => void;
  onConsultationClick: (event: MouseEvent<HTMLAnchorElement>) => void;
}) {
  const gallery = projectGallery(project);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const approach = designApproach(project);
  const features = ["Courtyard Planning", "Natural Ventilation", "Stone Materials", "Luxury Living"];
  const metrics = [
    { value: project.area || project.scale, label: "Scale" },
    { value: highlightProjectType(project.projectType), label: "Project Type" },
    { value: compactLocation(project.location), label: "Location" },
    { value: completedYear(project), label: "Timeline" }
  ];

  const showPreviousImage = useCallback(() => {
    setLightboxIndex((index) => (index === null ? gallery.length - 1 : (index - 1 + gallery.length) % gallery.length));
  }, [gallery.length]);

  const showNextImage = useCallback(() => {
    setLightboxIndex((index) => (index === null ? 0 : (index + 1) % gallery.length));
  }, [gallery.length]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (lightboxIndex !== null) {
          setLightboxIndex(null);
          return;
        }

        onClose();
      }

      if (lightboxIndex !== null && event.key === "ArrowLeft") showPreviousImage();
      if (lightboxIndex !== null && event.key === "ArrowRight") showNextImage();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    architectureLenis?.stop?.();
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      architectureLenis?.start?.();
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxIndex, onClose, showNextImage, showPreviousImage]);

  useEffect(() => {
    if (reduceMotion) return;

    let cancelled = false;
    let context: { revert: () => void } | null = null;

    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([gsapModule, scrollModule]) => {
      if (cancelled || !modalRef.current || !bodyRef.current) return;

      const { gsap } = gsapModule;
      const { ScrollTrigger } = scrollModule;
      gsap.registerPlugin(ScrollTrigger);

      context = gsap.context(() => {
        const scroller = bodyRef.current;

        gsap.utils.toArray<HTMLElement>("[data-modal-reveal]", modalRef.current).forEach((item) => {
          gsap.fromTo(
            item,
            { opacity: 0, y: 28 },
            {
              opacity: 1,
              y: 0,
              duration: 0.78,
              ease: "power4.out",
              scrollTrigger: {
                trigger: item,
                scroller,
                start: "top 88%",
                once: true
              }
            }
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-modal-image]", modalRef.current).forEach((item) => {
          const image = item.querySelector("img");

          gsap.fromTo(
            item,
            { clipPath: "inset(0% 0% 100% 0%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1.05,
              ease: "power4.out",
              scrollTrigger: {
                trigger: item,
                scroller,
                start: "top 88%",
                once: true
              }
            }
          );

          if (image) {
            gsap.fromTo(
              image,
              { scale: 1.08 },
              {
                scale: 1,
                duration: 1.18,
                ease: "power4.out",
                scrollTrigger: {
                  trigger: item,
                  scroller,
                  start: "top 88%",
                  once: true
                }
              }
            );
          }
        });

        ScrollTrigger.refresh();
      }, modalRef);
    });

    return () => {
      cancelled = true;
      context?.revert();
    };
  }, [project.id, reduceMotion]);

  return (
    <motion.div
      ref={modalRef}
      className="arch-project-modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28, ease: easeOut }}
      onClick={(event) => {
        if (event.currentTarget === event.target) onClose();
      }}
    >
      <motion.article
        className="arch-project-modal-panel"
        initial={{ opacity: 0, y: 46, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.98 }}
        transition={{ duration: 0.55, ease: power4Out }}
      >
        <button type="button" className="arch-project-modal-close" onClick={onClose} aria-label="Close project view">
          <X aria-hidden="true" />
        </button>
        <div className="arch-project-modal-hero">
          <Image src={project.image} alt={project.alt} fill priority sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover" />
        </div>
        <div
          className="arch-project-modal-body"
          ref={bodyRef}
          data-lenis-prevent
          data-lenis-prevent-wheel
          data-lenis-prevent-touch
          onWheel={(event) => event.stopPropagation()}
          onTouchStart={(event) => event.stopPropagation()}
          onTouchMove={(event) => event.stopPropagation()}
        >
          <div className="arch-project-modal-copy" data-modal-reveal>
            <p className="arch-kicker text-executive-red">{project.projectType}</p>
            <h3 className="font-display">{project.title}</h3>
            <p>{project.description}</p>
          </div>
          <dl className="arch-project-modal-meta" data-modal-reveal>
            <div>
              <dt>Location</dt>
              <dd>{project.location}</dd>
            </div>
            <div>
              <dt>Project Type</dt>
              <dd>{project.projectType}</dd>
            </div>
            <div>
              <dt>Year</dt>
              <dd>{project.year}</dd>
            </div>
            <div>
              <dt>Scale</dt>
              <dd>{project.area || project.scale}</dd>
            </div>
          </dl>

          <div className="arch-project-case-metrics">
            {metrics.map((metric) => (
              <ProjectMetric key={metric.label} value={metric.value} label={metric.label} />
            ))}
          </div>

          <section className="arch-project-story" data-modal-reveal>
            <span>Design Approach</span>
            <h4 className="font-display">Material, climate and light shape the experience.</h4>
            {approach.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>

          <section className="arch-project-features" data-modal-reveal>
            <span>Architectural Features</span>
            <ul>
              {features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </section>

          <section className="arch-project-gallery-section">
            <div className="arch-project-gallery-head" data-modal-reveal>
              <span>Project Gallery</span>
              <p>{gallery.length} studies in material, proportion and atmosphere.</p>
            </div>
            <div className="arch-project-modal-gallery">
              {gallery.map((image, imageIndex) => (
                <button
                  key={`${project.id}-${image}`}
                  type="button"
                  className={imageIndex === 0 ? "is-large" : ""}
                  data-modal-image
                  onClick={() => setLightboxIndex(imageIndex)}
                >
                  <Image
                    src={image}
                    alt={`${project.title} gallery image ${imageIndex + 1}`}
                    fill
                    sizes={imageIndex === 0 ? "(min-width: 1024px) 42vw, 100vw" : "(min-width: 1024px) 24vw, 100vw"}
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </section>

          <div className="arch-project-modal-cta" data-modal-reveal>
            <span>Start Similar Project</span>
            <h4 className="font-display">Schedule Consultation</h4>
            <p>Share the site, ambition and atmosphere you want the space to hold.</p>
            <a href="#consultation" onClick={onConsultationClick}>
              <span>Schedule Consultation</span>
              <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </div>
      </motion.article>

      <AnimatePresence>
        {lightboxIndex !== null ? (
          <motion.div
            className="arch-project-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: easeOut }}
            onClick={(event) => {
              if (event.currentTarget === event.target) setLightboxIndex(null);
            }}
          >
            <button type="button" className="arch-project-lightbox-close" onClick={() => setLightboxIndex(null)} aria-label="Close gallery viewer">
              <X aria-hidden="true" />
            </button>
            <button type="button" className="arch-project-lightbox-arrow is-prev" onClick={showPreviousImage} aria-label="Previous gallery image">
              <ChevronLeft aria-hidden="true" />
            </button>
            <motion.div
              key={gallery[lightboxIndex]}
              className="arch-project-lightbox-image"
              initial={{ opacity: 0, scale: 0.985, clipPath: "inset(0 0 100% 0)" }}
              animate={{ opacity: 1, scale: 1, clipPath: "inset(0 0 0% 0)" }}
              exit={{ opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.55, ease: power4Out }}
            >
              <Image
                src={gallery[lightboxIndex]}
                alt={`${project.title} enlarged gallery image ${lightboxIndex + 1}`}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </motion.div>
            <button type="button" className="arch-project-lightbox-arrow is-next" onClick={showNextImage} aria-label="Next gallery image">
              <ChevronRight aria-hidden="true" />
            </button>
            <div className="arch-project-lightbox-caption">
              <span>{project.title}</span>
              <small>{String(lightboxIndex + 1).padStart(2, "0")} / {String(gallery.length).padStart(2, "0")}</small>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}

function WorksSection({ projects }: { projects: ArchitectureProjectView[] }) {
  const [selectedProject, setSelectedProject] = useState<ArchitectureProjectView | null>(null);
  const viewedProjectsRef = useRef(new Set<string>());

  const openProject = useCallback((project: ArchitectureProjectView) => {
    setSelectedProject(project);

    if (viewedProjectsRef.current.has(project.id)) return;
    viewedProjectsRef.current.add(project.id);

    void fetch("/api/architecture/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "project",
        path: window.location.pathname,
        projectId: project.id,
        projectSlug: project.slug
      })
    }).catch(() => undefined);
  }, []);

  const closeProject = useCallback(() => setSelectedProject(null), []);
  const startSimilarProject = useCallback((event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setSelectedProject(null);

    window.requestAnimationFrame(() => {
      const target = document.getElementById("consultation");
      if (!target) return;

      void premiumScrollTo(target, () => undefined);
      window.history.replaceState(null, "", "#consultation");
    });
  }, []);

  return (
    <section id="works" className="arch-works-section arch-portfolio-section bg-white text-nearblack">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
        <motion.div className="arch-works-intro" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={staggerReveal} data-arch-section>
          <motion.p className="arch-kicker text-executive-red" variants={reveal}>
            Our Works
          </motion.p>
          <MaskRevealH2 className="arch-section-title font-display" data-parallax-text>
            A living portfolio of private architectural work.
          </MaskRevealH2>
          <ArchitecturalText>
            Residences, work environments and private estates composed through proportion, light, material discipline and long-term purpose.
          </ArchitecturalText>
        </motion.div>

        {projects.length ? (
          <motion.div className="arch-portfolio-grid" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.08 }} variants={delayedStaggerReveal}>
            {projects.map((project, index) => (
              <PortfolioProjectCard key={project.id} project={project} index={index} onSelect={openProject} />
            ))}
          </motion.div>
        ) : (
          <motion.div className="arch-portfolio-empty" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={reveal}>
            <p>Selected architecture works are being curated.</p>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {selectedProject ? <ProjectDetailModal project={selectedProject} onClose={closeProject} onConsultationClick={startSimilarProject} /> : null}
      </AnimatePresence>
    </section>
  );
}

function EditorialPositionSection() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const headingY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [-34, 34]);
  const panelY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [38, -38]);

  return (
    <section ref={ref} className="arch-editorial-position bg-warm-100 text-nearblack" data-arch-section>
      <div className="mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-8 sm:py-28 lg:grid-cols-[0.78fr_1.22fr] lg:px-12 lg:py-36">
        <motion.div className="lg:sticky lg:top-28 lg:h-fit" style={{ y: headingY }} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.32 }} variants={staggerReveal}>
          <motion.p className="arch-kicker text-executive-red" variants={reveal}>
            Editorial Position
          </motion.p>
          <MaskRevealH2 className="arch-section-title mt-5 font-display">Atmosphere is planned before appearance.</MaskRevealH2>
          <motion.div className="arch-editorial-rule" variants={ruleReveal} aria-hidden="true" />
        </motion.div>
        <motion.div className="arch-editorial-panels" style={{ y: panelY }} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.18 }} variants={delayedStaggerReveal}>
          {editorialPanels.map((panel) => (
            <motion.article key={panel.number} variants={staggerReveal}>
              <motion.span variants={reveal}>{panel.number}</motion.span>
              <MaskRevealH3 className="font-display">{panel.title}</MaskRevealH3>
              <ArchitecturalText>{panel.body}</ArchitecturalText>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [state, setState] = useState<DeskState>("idle");
  const [message, setMessage] = useState("Every private brief is reviewed by the Ractysh architecture desk.");
  const reduceMotion = useReducedMotion();
  const contactHeroRef = useRef<HTMLDivElement>(null);
  const isContactHeroInView = useInView(contactHeroRef, { once: true, margin: "600px 0px" });
  const consultationImageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: contactHeroProgress } = useScroll({
    target: contactHeroRef,
    offset: ["start start", "end start"]
  });
  const { scrollYProgress: consultationImageProgress } = useScroll({
    target: consultationImageRef,
    offset: ["start end", "end start"]
  });
  const contactHeroVideoY = useTransform(contactHeroProgress, [0, 1], reduceMotion ? ["0%", "0%"] : ["0%", "12%"]);
  const contactHeroCopyY = useTransform(contactHeroProgress, [0, 1], reduceMotion ? ["0%", "0%"] : ["0%", "-10%"]);
  const consultationImageY = useTransform(consultationImageProgress, [0, 1], reduceMotion ? ["0%", "0%"] : ["8%", "-8%"]);

  const handleContactVideoReady = useCallback((event: SyntheticEvent<HTMLVideoElement>) => {
    const video = event.currentTarget;
    configureHeroVideo(video);
    void video.play().catch(() => undefined);
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setState("submitting");
    setMessage("Preparing your consultation request for the architecture desk.");

    try {
      const payload = Object.fromEntries(formData.entries());
      const response = await fetch("/api/architecture-consultation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      const result = (await response.json().catch(() => ({}))) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message || "Unable to route the consultation.");
      }

      setState("success");
      setMessage("Consultation Request Received. Our team will review your requirements and reach out shortly.");
      form.reset();
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Unable to route the consultation.");
    }
  }

  return (
    <section id="consultation" className="arch-contact-section arch-luxury-consultation arch-contact-experience bg-white text-nearblack" data-arch-section>
      <div ref={contactHeroRef} className="arch-contact-hero" data-contact-hero>
        <motion.video
          className="arch-contact-hero-video"
          src={isContactHeroInView ? "/videos/architecture/villa-orbit-golden-hour.mp4" : undefined}
          poster={isContactHeroInView ? "/images/architecture/architecture-hero-film-poster-01.avif" : undefined}
          autoPlay={isContactHeroInView}
          muted
          loop
          playsInline
          preload={isContactHeroInView ? "metadata" : "none"}
          aria-hidden="true"
          data-contact-hero-video
          onCanPlay={handleContactVideoReady}
          onLoadedMetadata={handleContactVideoReady}
          onPlay={handleContactVideoReady}
          onPlaying={handleContactVideoReady}
          style={{ y: contactHeroVideoY }}
        />
        <div className="arch-contact-hero-shade" aria-hidden="true" />
        <motion.div className="arch-contact-hero-copy" style={{ y: contactHeroCopyY }}>
          <div className="arch-contact-hero-lockup" data-contact-reveal>
            <BrandLogo />
            <span>Private Architectural Consultation</span>
          </div>
          <h2 className="arch-contact-hero-title font-display" data-contact-reveal>
            <span>Begin Your</span>
            <span>Architectural</span>
            <span>Journey.</span>
          </h2>
          <p data-contact-reveal>
            Private residences, contemporary spaces and architectural environments thoughtfully designed around your vision.
          </p>
          <a href="#architecture-consultation-desk" className="arch-contact-hero-cta" data-contact-reveal>
            <span>Request Consultation</span>
            <ArrowUpRight aria-hidden="true" />
          </a>
        </motion.div>
        <div className="arch-contact-hero-meta" data-contact-reveal>
          <span>Architecture Desk</span>
          <span>Kerala / Tamil Nadu / Private Commissions</span>
        </div>
      </div>

      <div id="architecture-consultation-desk" className="arch-consultation-private-grid mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 sm:py-28 lg:grid-cols-[0.95fr_1.05fr] lg:px-12 lg:py-36">
        <motion.div className="arch-consultation-editorial" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.16 }} variants={staggerReveal}>
          <motion.div className="arch-consultation-image-shell" ref={consultationImageRef} variants={imageReveal}>
            <motion.div className="arch-consultation-image" style={{ y: consultationImageY }} variants={imageScaleReveal}>
              <Image
                src="/images/architecture/ractysh-kerala-courtyard-consultation.webp"
                alt="Premium South Indian contemporary villa courtyard with natural stone, warm lighting, and tropical planting."
                fill
                sizes="(max-width: 1023px) 100vw, 48vw"
                className="object-cover"
              />
            </motion.div>
            <motion.div className="arch-consultation-image-note" variants={formFieldReveal}>
              <span>Private Consultation Desk</span>
              <span>Material, light, site and proportion reviewed together</span>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div className="arch-consultation-form-stage" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.14 }} variants={staggerReveal}>
          <motion.form className="consultation-desk arch-consultation-desk arch-luxury-consultation-desk" onSubmit={handleSubmit} variants={consultationDeskReveal}>
            <input className="hidden" tabIndex={-1} name="website" autoComplete="off" aria-label="Leave this field empty" />
            <input type="hidden" name="sourcePage" value="architecture-domain" />
            <motion.div className="arch-consultation-form-head" variants={formFieldReveal}>
              <p>RACTYSH ARCHITECTURE</p>
              <h3 className="font-display">
                <span>Architecture</span>
                <span>Begins With</span>
                <span>Vision.</span>
              </h3>
              <span>Share the site, intent, budget and atmosphere you want the space to hold. The architecture desk will review the brief privately.</span>
            </motion.div>
            <motion.div className="arch-consultation-field-grid grid gap-4 md:grid-cols-2" variants={staggerReveal}>
              <motion.label variants={formFieldReveal}>
                <span>Name</span>
                <input name="name" autoComplete="name" required placeholder="Principal contact" />
              </motion.label>
              <motion.label variants={formFieldReveal}>
                <span>Email</span>
                <input name="email" type="email" autoComplete="email" required placeholder="studio@example.com" />
              </motion.label>
              <motion.label variants={formFieldReveal}>
                <span>Phone</span>
                <input name="phone" type="tel" autoComplete="tel" placeholder="+91 contact number" />
              </motion.label>
              <motion.label variants={formFieldReveal}>
                <span>Project Type</span>
                <select name="projectType" defaultValue="Private residence">
                  <option>Private residence</option>
                  <option>Luxury villa</option>
                  <option>Courtyard home</option>
                  <option>Waterfront residence</option>
                  <option>Commercial architecture</option>
                  <option>Industrial design</option>
                  <option>Architectural visualization</option>
                </select>
              </motion.label>
              <motion.label variants={formFieldReveal}>
                <span>Location</span>
                <input name="location" placeholder="City / site region" />
              </motion.label>
              <motion.label variants={formFieldReveal}>
                <span>Budget</span>
                <input name="budget" placeholder="Estimated investment range" />
              </motion.label>
              <motion.label className="md:col-span-2" variants={formFieldReveal}>
                <span>Message</span>
                <textarea name="message" rows={5} required placeholder="Describe the site, ambition, timeline and the feeling the space should carry." />
              </motion.label>
            </motion.div>
            <motion.div className="arch-desk-footer" variants={formFieldReveal}>
              <p className={`desk-message ${state === "error" ? "is-error" : ""} ${state === "success" ? "is-success" : ""}`}>{message}</p>
              <motion.button
                className="desk-action arch-consultation-submit"
                type="submit"
                disabled={state === "submitting"}
                whileHover={state === "submitting" ? undefined : { y: -2 }}
                whileTap={state === "submitting" ? undefined : { scale: 0.985 }}
              >
                {state === "submitting" ? <Loader2 className="animate-spin" aria-hidden="true" /> : state === "success" ? <Check aria-hidden="true" /> : null}
                <span>{state === "submitting" ? "Sending Request" : state === "success" ? "Request Received" : "Request Consultation"}</span>
                <ArrowUpRight aria-hidden="true" />
              </motion.button>
            </motion.div>
            <AnimatePresence>
              {state === "success" ? (
                <motion.div
                  className="arch-consultation-success"
                  initial={{ opacity: 0, y: 18, clipPath: "inset(0 0 100% 0)" }}
                  animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.72, ease: power4Out }}
                >
                  <Check aria-hidden="true" />
                  <strong>Consultation Request Received.</strong>
                  <span>Our team will review your requirements and reach out shortly.</span>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.form>
        </motion.div>
      </div>

      <motion.div className="arch-contact-pillars arch-contact-editorial-pillars mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-12" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.16 }} variants={staggerReveal}>
        <motion.div className="arch-contact-section-head" variants={staggerReveal}>
          <motion.p className="arch-kicker arch-consultation-label" variants={reveal}>
            Why Work With Us
          </motion.p>
          <MaskRevealH2 className="arch-section-title arch-contact-editorial-title mt-5 font-display" data-parallax-text>
            Three principles behind every commission.
          </MaskRevealH2>
        </motion.div>
        <motion.div className="arch-contact-pillar-editorial-list" variants={delayedStaggerReveal}>
          {contactPillars.map((pillar, index) => (
            <ContactPillarBlock key={pillar.title} pillar={pillar} index={index} />
          ))}
        </motion.div>
      </motion.div>

      <FinalContactCTA />
      <ArchitectureJournalFooter />
    </section>
  );
}

function ContactPillarBlock({ pillar, index }: { pillar: (typeof contactPillars)[number]; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], reduceMotion ? ["0%", "0%"] : ["-8%", "8%"]);
  const copyY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [28, -28]);
  const isReverse = index % 2 === 1;

  return (
    <motion.article
      ref={ref}
      className={`arch-contact-pillar-block ${isReverse ? "is-reverse" : ""}`}
      variants={staggerReveal}
    >
      <motion.div className="arch-contact-pillar-media" variants={imageReveal}>
        <motion.div className="arch-contact-pillar-image" style={{ y: imageY }} variants={imageScaleReveal}>
          <Image
            src={pillar.image}
            alt={`${pillar.title} architectural atmosphere`}
            fill
            sizes="(min-width: 1024px) 42vw, 100vw"
            className="object-cover"
          />
        </motion.div>
      </motion.div>
      <motion.div className="arch-contact-pillar-copy" style={{ y: copyY }} variants={staggerReveal}>
        <motion.span variants={reveal}>{String(index + 1).padStart(2, "0")}</motion.span>
        <MaskRevealH3 className="font-display">{pillar.title}</MaskRevealH3>
        <ArchitecturalText variants={formFieldReveal}>{pillar.body}</ArchitecturalText>
      </motion.div>
    </motion.article>
  );
}

function FinalContactCTA() {
  return (
    <motion.div
      className="arch-contact-final-cta mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28 lg:px-12 lg:py-36"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.24 }}
      variants={staggerReveal}
    >
      <motion.p className="arch-kicker arch-consultation-label" variants={reveal}>
        Begin The Conversation
      </motion.p>
      <MaskRevealH2 className="arch-contact-final-title font-display" data-parallax-text>
        <span className="arch-title-line">Let&apos;s Create</span>
        <span className="arch-title-line">Something</span>
        <span className="arch-title-line">Timeless.</span>
      </MaskRevealH2>
      <ArchitecturalText className="arch-contact-final-copy" variants={formFieldReveal}>
        Whether you&apos;re planning a private residence, a commercial environment or an architectural transformation, our team is ready to begin the conversation.
      </ArchitecturalText>
      <motion.a className="arch-contact-final-button" href="#architecture-consultation-desk" variants={formFieldReveal}>
        <span>Schedule Consultation</span>
        <ArrowUpRight aria-hidden="true" />
      </motion.a>
    </motion.div>
  );
}

function ArchitectureJournalFooter() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterState, setNewsletterState] = useState<DeskState>("idle");
  const [newsletterMessage, setNewsletterMessage] = useState("");
  const [showNewsletterNotice, setShowNewsletterNotice] = useState(false);
  const newsletterSubmitting = newsletterState === "submitting";
  const newsletterSubscribed = newsletterState === "success";

  useEffect(() => {
    if (!newsletterSubscribed) {
      setShowNewsletterNotice(false);
      return;
    }

    setShowNewsletterNotice(true);

    const fadeTimer = window.setTimeout(() => {
      setShowNewsletterNotice(false);
    }, 2800);
    const resetTimer = window.setTimeout(() => {
      setNewsletterState("idle");
      setNewsletterMessage("");
    }, 3600);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(resetTimer);
    };
  }, [newsletterSubscribed]);

  async function handleNewsletterSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (newsletterSubmitting) return;

    const email = newsletterEmail.trim();
    if (!email) {
      setNewsletterState("error");
      setNewsletterMessage("Enter your email address.");
      return;
    }

    setNewsletterState("submitting");
    setNewsletterMessage("Subscribing...");

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source: "architecture_footer_newsletter",
        }),
      });
      const payload = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        success?: boolean;
        alreadySubscribed?: boolean;
        message?: string;
      };

      if (!response.ok || payload.ok === false || payload.success === false) {
        throw new Error(payload.message || "Unable to subscribe right now.");
      }

      setNewsletterState("success");
      setNewsletterMessage(payload.alreadySubscribed ? "Already subscribed" : "Subscribed");
      setNewsletterEmail("");
    } catch (error) {
      setNewsletterState("error");
      setNewsletterMessage(
        error instanceof Error
          ? error.message
          : "Unable to subscribe right now. Please try again.",
      );
    }
  }

  return (
    <motion.footer
      className="arch-journal-footer"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.22 }}
      variants={staggerReveal}
    >
      <div className="arch-journal-footer-grid" aria-hidden="true" />
      <div className="arch-journal-footer-inner">
        <motion.div className="arch-journal-footer-top" variants={staggerReveal}>
          <motion.div className="arch-journal-footer-brand" variants={heroLogoReveal}>
            <BrandLogo />
            <span>
              <span aria-hidden="true">&#10022;</span>
              Ractysh Architecture
            </span>
          </motion.div>
          <motion.a
            className="arch-journal-footer-group-link"
            href="https://ractysh.com"
            target="_blank"
            rel="noreferrer"
            variants={heroLogoReveal}
          >
            <span>Ractysh Group</span>
            <small>Enterprise Ecosystem</small>
            <ArrowUpRight aria-hidden="true" />
          </motion.a>
        </motion.div>

        <motion.h2 className="arch-journal-footer-statement font-display" variants={staggerReveal}>
          {architectureFooterStatement.map((line) => (
            <motion.span key={line} variants={maskCopyReveal}>
              {line}
            </motion.span>
          ))}
        </motion.h2>

        <motion.div className="arch-journal-newsletter" variants={reveal}>
          <div className="arch-journal-newsletter-copy">
            <span>Studio Notes</span>
            <p>Receive architecture updates, project stories and design intelligence from Ractysh.</p>
          </div>
          <div>
            <div className={`arch-journal-newsletter-shell ${newsletterSubscribed ? "is-success" : ""}`}>
              <form className="arch-journal-newsletter-form" onSubmit={handleNewsletterSubmit}>
                <label className="sr-only" htmlFor="architecture-newsletter-email">
                  Email address
                </label>
                <span className="arch-journal-newsletter-input-wrap">
                  <Mail aria-hidden="true" />
                  <input
                    id="architecture-newsletter-email"
                    name="email"
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(event) => {
                      setNewsletterEmail(event.target.value);
                      if (!newsletterSubmitting) {
                        setNewsletterState("idle");
                        setNewsletterMessage("");
                      }
                    }}
                    aria-describedby="architecture-newsletter-status"
                    placeholder="Email address"
                  />
                </span>
                <button type="submit" disabled={newsletterSubmitting}>
                  {newsletterSubmitting ? (
                    <Loader2 className="animate-spin" aria-hidden="true" />
                  ) : (
                    <ArrowUpRight aria-hidden="true" />
                  )}
                  <span>{newsletterSubmitting ? "Sending" : "Subscribe"}</span>
                </button>
              </form>
              <AnimatePresence>
                {newsletterSubscribed ? (
                  <motion.div
                    className="arch-journal-newsletter-success"
                    role="status"
                    aria-live="polite"
                    initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                    animate={{
                      opacity: showNewsletterNotice ? 1 : 0,
                      y: showNewsletterNotice ? 0 : 10,
                      filter: showNewsletterNotice ? "blur(0px)" : "blur(8px)",
                    }}
                    exit={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                    transition={{ duration: 0.6, ease: power4Out }}
                  >
                    <Check aria-hidden="true" />
                    <span>{newsletterMessage || "Subscribed"}</span>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
            <p
              id="architecture-newsletter-status"
              className={`arch-journal-newsletter-status ${newsletterState === "error" ? "is-error" : ""}`}
              aria-live="polite"
            >
              {newsletterSubscribed ? "" : newsletterMessage}
            </p>
          </div>
        </motion.div>

        <motion.div className="arch-journal-footer-columns" variants={delayedStaggerReveal}>
          {architectureFooterColumns.map((column) => (
            <motion.div key={column.title} className="arch-journal-footer-column" variants={staggerReveal}>
              <motion.h3 variants={reveal}>{column.title}</motion.h3>
              <motion.div variants={delayedStaggerReveal}>
                {column.items.map((item) =>
                  "href" in item && item.href ? (
                    <motion.a key={item.label} className="arch-journal-footer-link" href={item.href} variants={formFieldReveal}>
                      {item.label}
                    </motion.a>
                  ) : (
                    <motion.span key={item.label} className="arch-journal-footer-location" variants={formFieldReveal}>
                      {item.label}
                    </motion.span>
                  )
                )}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="arch-journal-footer-strip" variants={reveal}>
          <span>Ractysh Architecture</span>
          <span>
            Coimbatore <span aria-hidden="true">&bull;</span> Palani <span aria-hidden="true">&bull;</span> Dindigul
          </span>
          <span>&copy; 2026</span>
        </motion.div>
      </div>
    </motion.footer>
  );
}

export function ArchitectureCinematicExperience({
  hero,
  projects
}: {
  hero: ArchitectureHeroView;
  projects: ArchitectureProjectView[];
}) {
  const rootRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [heroContentRevealed, setHeroContentRevealed] = useState(false);
  const [activeSection, setActiveSection] = useState<NavSectionId>("studio");
  const [navOverLight, setNavOverLight] = useState(false);

  useArchitectureGsap(rootRef, reduceMotion);

  useEffect(() => {
    void fetch("/api/architecture/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "page", path: window.location.pathname })
    }).catch(() => undefined);
  }, []);

  useEffect(() => {
    let frame = 0;

    const updateActiveSection = () => {
      frame = 0;
      const offset = navOffset() + 120;
      const current = navSectionIds.reduce<NavSectionId>((active, id) => {
        const section = document.getElementById(id);
        if (!section) return active;
        return section.offsetTop - offset <= window.scrollY ? id : active;
      }, "studio");

      setActiveSection(current);
      setNavOverLight(window.scrollY > window.innerHeight * 0.72);
    };

    const scheduleUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  const handleAnchorNavigate = useCallback((event: MouseEvent<HTMLAnchorElement>, href: string) => {
    const targetId = scrollTargetFromHref(href);
    if (!targetId) return;

    const target = document.getElementById(targetId);
    if (!target) return;

    event.preventDefault();
    const navId = navIdFromHash(targetId);
    if (navId) setActiveSection(navId);
    void premiumScrollTo(target, () => {
      if (navId) setActiveSection(navId);
    });
    window.history.replaceState(null, "", `#${targetId}`);
  }, []);

  const handleHeroContentReveal = useCallback(() => {
    setHeroContentRevealed(true);
  }, []);

  return (
    <main ref={rootRef} className="architecture-site bg-white text-nearblack" data-arch-root>
      <SmoothScroll />

      <motion.header
        className={`architecture-nav fixed left-0 right-0 top-0 z-40 ${navOverLight ? "is-over-light" : ""}`}
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: heroContentRevealed ? 1 : 0, y: heroContentRevealed ? 0 : -16 }}
        transition={{ duration: 0.8, ease: power4Out, delay: heroContentRevealed ? 0.12 : 0 }}
        style={{ pointerEvents: heroContentRevealed ? "auto" : "none" }}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-12" aria-label="Architecture navigation">
          <Link href="/" className="nav-mark" aria-label="Ractysh Architecture home">
            <BrandLogo />
            <small>Ractysh Architecture</small>
          </Link>
          <div className="architecture-nav-links">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`architecture-nav-link ${activeSection === item.id ? "is-active" : ""}`}
                aria-current={activeSection === item.id ? "page" : undefined}
                onClick={(event) => handleAnchorNavigate(event, `#${item.id}`)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      </motion.header>

      <HeroFilm hero={hero} onContentReveal={handleHeroContentReveal} onAnchorNavigate={handleAnchorNavigate} />
      <WhoWeAreSection />
      <WorksSection projects={projects} />
      <EditorialPositionSection />
      <ContactSection />
    </main>
  );
}
