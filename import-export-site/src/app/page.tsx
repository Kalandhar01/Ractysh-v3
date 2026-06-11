import HeroWithBackgroundAndNavbar from "@/components/hero-with-background-and-navbar";
import FeaturesGridWithLargeSkeletons from "@/components/features-grid-with-large-skeletons";
import RouteIntelligenceBento from "@/components/route-intelligence-bento";

export default function Home() {
  return (
    <main className="min-h-svh bg-white text-slate-950">
      <HeroWithBackgroundAndNavbar />
      <FeaturesGridWithLargeSkeletons />
      <RouteIntelligenceBento />

      <section id="compliance" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10" />
      <section id="contact" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10" />
    </main>
  );
}
