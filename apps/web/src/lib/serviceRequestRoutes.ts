export const routeServiceLabels = {
  "/architecture": "Architecture",
  "/architecture-service": "Architecture Service",
  "/architecture-design": "Architecture Design",
  "/ractysh-design": "Ractysh Design",
  "/construction": "Construction Division",
  "/construction-service": "Construction Service",
  "/infrastructure": "Construction Division",
  "/ractysh-infra": "Construction Division",
  "/real-estate": "Real Estate Division",
  "/real-estate-service": "Real Estate Service",
  "/3d-visualization": "3D Visualization",
  "/interior-design": "Interior Design",
  "/landscape-planning": "Landscape Planning",
  "/structural-work": "Structural Work",
  "/project-management": "Project Management",
  "/turnkey-projects": "Turnkey Projects",
  "/import-export": "Import & Export Division",
  "/import-export-service": "Import & Export Service",
  "/ractysh-import-export": "Ractysh Import & Export",
  "/otc-exchange": "OTC Exchange Division",
  "/otc-exchange-service": "OTC Exchange Service"
} as const;

export const serviceRequestRoutes = Object.keys(routeServiceLabels);

export function normalizeServiceRequestRoute(value: string | null | undefined): string {
  const raw = value?.trim();

  if (!raw) return "";

  try {
    const parsed = raw.startsWith("http://") || raw.startsWith("https://") ? new URL(raw).pathname : raw;
    const withoutQuery = parsed.split("?")[0]?.split("#")[0] || "";
    const withLeadingSlash = withoutQuery.startsWith("/") ? withoutQuery : `/${withoutQuery}`;
    return withLeadingSlash.length > 1 ? decodeURIComponent(withLeadingSlash).replace(/\/+$/, "") : withLeadingSlash;
  } catch {
    return "";
  }
}

export function getServiceRequestService(route: string | null | undefined): string | undefined {
  const normalizedRoute = normalizeServiceRequestRoute(route);
  return routeServiceLabels[normalizedRoute as keyof typeof routeServiceLabels];
}

export function isServiceRequestRoute(route: string | null | undefined): boolean {
  return Boolean(getServiceRequestService(route));
}
