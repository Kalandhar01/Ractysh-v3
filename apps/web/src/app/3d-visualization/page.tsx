import type { Metadata } from "next";
import { MarketingChrome } from "@/components/MarketingChrome";
import { VisualizationLabPage } from "@/components/VisualizationLabPage";
import { getServicePage } from "@/data/servicePages";
import { getSiteContent } from "@/lib/api";

const service = getServicePage("3d-visualization")!;

export const metadata: Metadata = {
  title: `${service.eyebrow} | Ractysh Services`,
  description: service.summary
};

export default async function ThreeDVisualizationPage() {
  const content = await getSiteContent();

  return (
    <MarketingChrome content={content}>
      <VisualizationLabPage />
    </MarketingChrome>
  );
}
