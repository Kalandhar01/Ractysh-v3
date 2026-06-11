import { ArchitectureCinematicExperience } from "@/components/ArchitectureCinematicExperience";
import { getArchitecturePageData } from "@/lib/architectureCms";

export const revalidate = 300;

const architectureStructuredData = {
  "@context": "https://schema.org",
  "@type": "ArchitecturalService",
  name: "Ractysh Architecture",
  url: "https://architecture.ractysh.com",
  logo: "https://architecture.ractysh.com/images/architecture/ractysh-architecture-logo.webp",
  image: "https://architecture.ractysh.com/images/architecture/ractysh-built-beyond-blueprints-poster.webp",
  description: "Private villas, modern residences and composed spatial experiences shaped through light, proportion and restraint.",
  areaServed: ["Coimbatore", "Palani", "Dindigul", "Tamil Nadu", "Kerala"],
  email: "hello@ractysh.com",
  parentOrganization: {
    "@type": "Organization",
    name: "Ractysh Group",
    url: "https://ractysh.com"
  },
  serviceType: ["Private villas", "Modern residences", "Architecture consultation", "Spatial planning"]
};

export default async function Home() {
  const data = await getArchitecturePageData();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(architectureStructuredData) }} />
      <ArchitectureCinematicExperience hero={data.hero} projects={data.projects} />
    </>
  );
}
