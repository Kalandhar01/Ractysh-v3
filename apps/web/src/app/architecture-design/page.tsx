import type { Metadata } from "next";
import { ArchitectureDesignExperience } from "@/components/ArchitectureDesignExperience";
import { MarketingChrome } from "@/components/MarketingChrome";
import { getServicePage } from "@/data/servicePages";
import { getSiteContent } from "@/lib/api";

const service = getServicePage("architecture-design")!;

export const metadata: Metadata = {
  title: `${service.eyebrow} | Ractysh Services`,
  description: service.summary
};

export default async function ArchitectureDesignPage() {
  const content = await getSiteContent();

  return (
    <MarketingChrome content={content}>
      <ArchitectureDesignExperience />
    </MarketingChrome>
  );
}
