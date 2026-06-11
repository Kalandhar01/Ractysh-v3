import type { Metadata } from "next";
import { LandscapePlanningExperience } from "@/components/LandscapePlanningExperience";
import { MarketingChrome } from "@/components/MarketingChrome";
import { getServicePage } from "@/data/servicePages";
import { getSiteContent } from "@/lib/api";

const service = getServicePage("landscape-planning")!;

export const metadata: Metadata = {
  title: `${service.eyebrow} | Ractysh Services`,
  description: service.summary
};

export default async function LandscapePlanningPage() {
  const content = await getSiteContent();

  return (
    <MarketingChrome content={content}>
      <LandscapePlanningExperience />
    </MarketingChrome>
  );
}
