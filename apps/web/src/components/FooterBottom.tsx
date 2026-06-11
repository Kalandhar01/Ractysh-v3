"use client";

import { ArrowUpRight, CornerRightUp, Instagram, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { FooterNewsletterSubscribe } from "@/components/FooterNewsletterSubscribe";
import { COMPANY_CONTACT_ITEMS } from "@/lib/companyContact";
import type { NavItem, SocialLink } from "@/lib/types";

const ecosystemMarks = [
  { label: "Architecture", detail: "Spatial intelligence" },
  { label: "Construction", detail: "Delivery control" },
  { label: "Real Estate", detail: "Asset strategy" },
  { label: "Export & Import", detail: "Global trade" },
  { label: "OTC Exchange", detail: "Private deals" }
];

const fallbackLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Disclosure", href: "/disclosure" },
  { label: "Copyright Policy", href: "/copyright-policy" },
  { label: "Sitemap", href: "/sitemap" }
];

const labelOverrides: Record<string, string> = {
  "Company Stage": "Stages",
  Resources: "FAQ"
};

function isHiddenFooterLink(link: NavItem) {
  const label = link.label.toLowerCase();
  const href = link.href.toLowerCase();

  return label === "book consultation" || label.includes("trademark") || href.includes("trademark");
}

function normalizeFooterLink(link: NavItem): NavItem {
  if (link.label.toLowerCase() === "sitemap" && link.href === "/sitemap.xml") {
    return { ...link, href: "/sitemap" };
  }

  return link;
}

function FooterEnterpriseHeading() {
  return (
    <div className="relative mx-auto mt-5 max-w-[24rem] py-0.5 text-center md:mx-0 md:mt-5 md:max-w-[50rem] md:text-left">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-32 w-[18rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(224,197,121,0.18),rgba(224,197,121,0.075)_38%,transparent_72%)] blur-[2px] sm:w-[24rem] md:-left-14 md:h-40 md:w-[34rem] md:translate-x-0"
      />
      <h2 className="relative font-display text-[1.9rem] font-medium leading-[1] text-[#fff8ec] drop-shadow-[0_18px_42px_rgba(0,0,0,0.34)] sm:text-[2.2rem] md:text-[3.45rem] md:leading-[0.94] lg:text-[3.8rem]">
        <span className="block">Five pillars.</span>
        <span className="block text-[#f8efe0]/78">One ecosystem.</span>
      </h2>
    </div>
  );
}

function SocialLinkIcon({ label }: { label: string }) {
  const normalizedLabel = label.toLowerCase();

  if (normalizedLabel.includes("linkedin")) {
    return <Linkedin className="h-3.5 w-3.5" strokeWidth={2.1} />;
  }

  if (normalizedLabel.includes("instagram")) {
    return <Instagram className="h-3.5 w-3.5" strokeWidth={2.1} />;
  }

  return <Mail className="h-3.5 w-3.5" strokeWidth={2.1} />;
}

function FooterContactGrid({ className, cardClassName }: { className: string; cardClassName: string }) {
  return (
    <div className={className}>
      {COMPANY_CONTACT_ITEMS.map((item) => {
        const content = (
          <>
            <span className="block text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[#E0C579]">
              {item.label}
            </span>
            <span className="mt-1.5 block break-words text-[0.9rem] font-medium leading-6 text-[#fff8ec]/84">
              {item.value}
            </span>
          </>
        );

        return item.href ? (
          <a key={item.label} href={item.href} className={cardClassName}>
            {content}
          </a>
        ) : (
          <div key={item.label} className={cardClassName}>
            {content}
          </div>
        );
      })}
    </div>
  );
}

interface FooterBottomProps {
  headline: string;
  description: string;
  links: NavItem[];
  socialLinks?: SocialLink[];
}

export function FooterBottom({ headline, description, links, socialLinks = [] }: FooterBottomProps) {
  const footerLinks = links.filter((link) => !isHiddenFooterLink(link)).map(normalizeFooterLink);
  const displayLinks = footerLinks.length > 0 ? footerLinks : fallbackLinks;

  return (
    <section className="relative">
      <div className="grid gap-9 border-y border-white/[0.12] py-7 md:grid-cols-[minmax(0,1fr)_minmax(18rem,0.46fr)] md:items-center md:gap-8 md:py-6">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto w-full max-w-[36rem] text-center md:mx-0 md:max-w-[45rem] md:text-left"
        >
          <div>
            <Link
              href="#hero"
              className="inline-flex flex-col items-center gap-3 text-[#fff8ec] transition duration-300 hover:text-[#E0C579] md:items-start"
              aria-label="Ractysh home"
            >
              <BrandLogo size="footer" decorative />
              <span className="font-display text-[1.85rem] font-semibold leading-none sm:text-[2rem] md:text-[2.35rem]">{headline}</span>
            </Link>
            <p className="mt-2 text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-[#E0C579]/82">
              PRIVATE ENTERPRISE GROUP
            </p>
          </div>

          <FooterEnterpriseHeading />

          <p className="mx-auto mt-5 max-w-[32rem] text-[0.94rem] leading-7 text-[#f8efe0]/78 md:mx-0 md:mt-5 md:max-w-[35rem] md:text-[1.06rem]">
            {description}
          </p>

          <FooterContactGrid
            className="mt-5 hidden max-w-[43rem] gap-3 sm:grid-cols-2 md:grid"
            cardClassName="rounded-[8px] border border-white/[0.09] bg-white/[0.035] px-4 py-3 transition duration-300 hover:border-[#E0C579]/38 hover:bg-white/[0.055]"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.72, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col justify-between gap-5 md:h-full md:self-center md:gap-4"
        >
          <FooterNewsletterSubscribe />

          <nav aria-label="Footer navigation" className="grid gap-x-5 md:grid-cols-2">
            <p className="mb-2 text-center text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#E0C579] md:hidden">
              Quick Links
            </p>
            {displayLinks.map((link, index) => (
              <Link
                key={`${link.label}-${link.href}`}
                href={link.href}
                className="group -mx-3 flex min-h-[3.35rem] items-center justify-between rounded-[7px] border-b border-white/[0.09] px-3 py-3 text-[#f8efe0]/82 transition duration-300 hover:border-[#E0C579]/55 hover:text-[#fff8ec] md:mx-0 md:min-h-0 md:rounded-none md:px-0 md:py-2.5"
              >
                <span className="flex items-center gap-4">
                  <span className="text-[0.74rem] font-semibold text-[#E0C579]/70">0{index + 1}</span>
                  <span className="text-[0.95rem] font-medium leading-5 md:text-[1rem]">{labelOverrides[link.label] ?? link.label}</span>
                </span>
                <ArrowUpRight className="h-4 w-4 opacity-45 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" strokeWidth={2.2} />
              </Link>
            ))}

            <div className="mt-3 flex justify-start border-t border-[#E0C579]/16 pt-4 md:col-span-2 md:justify-end">
              <Link
                href="/book-consultation"
                className="group inline-flex h-[3.15rem] w-full items-center justify-center gap-2 whitespace-nowrap rounded-[7px] border border-[#E0C579]/68 bg-[#f2e6cf] px-6 text-[0.88rem] font-semibold text-[#161109] shadow-[0_24px_70px_rgba(0,0,0,0.42),0_0_34px_rgba(224,197,121,0.18),inset_0_1px_0_rgba(255,255,255,0.72)] transition duration-300 hover:-translate-y-0.5 hover:border-[#E0C579]/90 hover:bg-[#fff2dc] hover:shadow-[0_28px_78px_rgba(0,0,0,0.48),0_0_46px_rgba(224,197,121,0.26),inset_0_1px_0_rgba(255,255,255,0.82)] sm:text-[0.95rem] md:h-[3rem]"
              >
                Book Consultation
                <ArrowUpRight className="h-4 w-4 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.3} />
              </Link>
            </div>
          </nav>
        </motion.div>
      </div>

      <div className="flex flex-col gap-4 border-b border-white/[0.08] py-6 md:flex-row md:items-center md:justify-between md:gap-3 md:py-4">
        <p className="text-center text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#E0C579] md:hidden">
          Services
        </p>
        <div className="flex flex-wrap justify-center gap-2.5 md:justify-start">
          {ecosystemMarks.map((mark) => (
            <span
              key={mark.label}
              className="inline-flex max-w-full items-center gap-2 rounded-full border border-[#E0C579]/25 bg-[#080807]/30 px-3 py-2 text-[0.72rem] font-medium leading-none text-[#fff8ec]/86 md:px-3.5 md:py-1.5 md:text-[0.78rem]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#E0C579]" />
              {mark.label}
              <span className="hidden text-[#f8efe0]/58 sm:inline">{mark.detail}</span>
            </span>
          ))}
        </div>
      </div>

      <div className="border-b border-white/[0.08] py-6 md:hidden">
        <p className="text-center text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#E0C579]">
          Contact Information
        </p>
        <FooterContactGrid
          className="mt-4 grid gap-3"
          cardClassName="min-h-[4.7rem] rounded-[8px] border border-white/[0.09] bg-white/[0.035] px-4 py-3.5 text-left transition duration-300 hover:border-[#E0C579]/38 hover:bg-white/[0.055]"
        />
      </div>

      <div className="flex flex-col items-center gap-5 pt-6 text-center text-[0.78rem] font-medium text-[#f8efe0]/62 md:flex-row md:items-center md:justify-between md:gap-3 md:pt-3 md:text-left md:text-[0.82rem]">
        <p className="order-2 leading-5 md:order-none">
          <span className="block">© 2026 Ractysh Group Private Limited.</span>
          <span className="block">All rights reserved.</span>
        </p>
        <div className="order-1 flex flex-wrap items-center justify-center gap-x-3 gap-y-3 md:order-none md:justify-start md:gap-x-5">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="group inline-flex min-h-11 items-center gap-2.5 rounded-full px-2 text-[#f8efe0]/68 transition duration-300 hover:text-[#fff8ec] md:min-h-0 md:rounded-none md:px-0"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.035] text-[#E0C579]/68 transition duration-300 group-hover:border-[#E0C579]/34 group-hover:bg-[#E0C579]/[0.08] group-hover:text-[#E0C579] md:h-8 md:w-8">
                <SocialLinkIcon label={link.label} />
              </span>
              <span>{link.label}</span>
            </a>
          ))}
          <Link href="/#hero" className="group inline-flex min-h-11 items-center gap-1.5 rounded-full px-2 text-[#f8efe0]/72 transition duration-300 hover:text-[#fff8ec] md:min-h-0 md:rounded-none md:px-0">
            Back to top
            <CornerRightUp className="h-3.5 w-3.5 transition duration-300 group-hover:-translate-y-0.5" strokeWidth={2.2} />
          </Link>
        </div>
      </div>
    </section>
  );
}
