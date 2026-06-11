import ConstructionNavbar from "@/components/ConstructionNavbar";
import ConstructionFooter from "@/components/ConstructionFooter";
import ContactSectionWithShader from "@/components/ContactSectionWithShader";
import CircularGallery from "@/components/CircularGallery";
import HeroCommandContent from "@/components/HeroCommandContent";
import HeroParallaxDemo from "@/components/hero-parallax-demo";
import HeroScrollDemo from "@/components/container-scroll-animation-demo";
import GridScan from "@/components/GridScan";
import MotionReveal from "@/components/MotionReveal";
import SubscribeCharm from "@/components/SubscribeCharm";
import SymmetricBentoGrid from "@/components/ui/symmetric-bento-grid";
import TestimonialsMarqueeGrid from "@/components/ui/testimonials-marquee-grid";
import WobbleCardDemo from "@/components/wobble-card-demo";

const footerGalleryItems = [
  { image: "/images/construction/our-work-finished-villa-08.webp", text: "" },
  { image: "/images/construction/our-work-finished-apartment-09.webp", text: "" },
  { image: "/images/construction/our-work-finished-commercial-office-10.webp", text: "" },
  { image: "/images/construction/our-work-finished-luxury-interior-11.webp", text: "" },
  { image: "/images/construction/our-work-finished-row-houses-12.webp", text: "" },
  { image: "/images/construction/our-work-finished-industrial-campus-13.webp", text: "" },
  { image: "/images/construction/our-work-premium-tower-dawn-04.webp", text: "" },
  { image: "/images/construction/our-work-premium-infra-viaduct-05.webp", text: "" },
  { image: "/images/construction/our-work-premium-handover-lobby-06.webp", text: "" },
  { image: "/images/construction/our-work-premium-site-command-07.webp", text: "" },
  { image: "/images/construction/construction-service-command-center-construction-india-commercial-tower-01.webp", text: "" },
  { image: "/images/construction/construction-service-command-center-construction-india-infrastructure-viaduct-03.webp", text: "" },
  { image: "/images/construction/construction-service-command-center-construction-india-rebar-deck-02.webp", text: "" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <ConstructionNavbar />
      <SubscribeCharm />
      <section
        id="home"
        className="relative isolate h-[100svh] overflow-hidden bg-[#05070c] text-white"
      >
        <div className="absolute inset-0">
          <GridScan
            sensitivity={0.62}
            lineThickness={1.1}
            linesColor="#5f1717"
            gridScale={0.085}
            scanColor="#ef4444"
            scanOpacity={0.48}
            enablePost
            bloomIntensity={0.72}
            bloomThreshold={0.02}
            bloomSmoothing={0.12}
            chromaticAberration={0.0025}
            noiseIntensity={0.012}
            lineJitter={0.12}
            scanDirection="pingpong"
            scanGlow={0.82}
            scanSoftness={2.1}
            scanDuration={1.9}
            scanDelay={1.2}
            scanOnClick
          />
        </div>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(153,27,27,0.25),transparent_33%),radial-gradient(circle_at_50%_105%,rgba(127,29,29,0.22),transparent_42%),linear-gradient(180deg,rgba(5,7,12,0.92)_0%,rgba(8,5,5,0.52)_45%,rgba(5,7,12,0.96)_100%)]" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#05070c] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#05070c] to-transparent" />

        <div className="absolute inset-0 z-10 flex h-full items-center justify-center px-6 pt-24 pb-8 text-center sm:px-10 sm:pt-28 lg:px-16">
          <HeroCommandContent />
        </div>
      </section>

      <MotionReveal id="intro" className="bg-white px-6 py-24 sm:px-10 lg:px-16">
        <WobbleCardDemo />
      </MotionReveal>

      <MotionReveal id="works" className="bg-white">
        <HeroParallaxDemo />
      </MotionReveal>

      <MotionReveal
        id="info-1"
        className="scroll-mt-36 border-y border-slate-200 bg-white md:scroll-mt-28"
      >
        <HeroScrollDemo />
      </MotionReveal>

      <MotionReveal
        id="info-2"
        className="bg-white"
      >
        <SymmetricBentoGrid />
      </MotionReveal>

      <MotionReveal as="div" amount={0.14}>
        <TestimonialsMarqueeGrid />
      </MotionReveal>

      <MotionReveal as="div" amount={0.12}>
        <ContactSectionWithShader />
      </MotionReveal>

      <div className="relative overflow-hidden bg-black bg-[radial-gradient(circle_at_20%_360px,rgba(153,27,27,0.28),transparent_34%),linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:auto,72px_72px,72px_72px] text-white sm:bg-[radial-gradient(circle_at_20%_440px,rgba(153,27,27,0.28),transparent_34%),linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] lg:bg-[radial-gradient(circle_at_20%_540px,rgba(153,27,27,0.28),transparent_34%),linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)]">
        <MotionReveal as="section" amount={0.18}>
          <section
            aria-label="Ractysh construction circular gallery"
            className="relative -mb-px h-[360px] w-full overflow-hidden text-white sm:h-[440px] lg:h-[540px]"
            style={{ height: "clamp(360px, 39.5vw, 540px)", minHeight: "360px" }}
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-red-500/30" />
            <div className="relative h-full w-full">
              <CircularGallery
                items={footerGalleryItems}
                bend={3.4}
                textColor="#fff7ed"
                borderRadius={0.055}
                font="bold 30px Inter"
                scrollEase={0.035}
                scrollSpeed={1.8}
                autoScrollSpeed={0.02}
              />
            </div>
          </section>
        </MotionReveal>

        <MotionReveal as="div" amount={0.2}>
          <ConstructionFooter />
        </MotionReveal>
      </div>
    </main>
  );
}
