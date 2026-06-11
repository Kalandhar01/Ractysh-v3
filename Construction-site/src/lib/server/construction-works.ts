import "server-only";

import { prisma } from "@ractysh/db";
import { existsSync } from "node:fs";
import { join } from "node:path";

const constructionDivision = "construction";
const defaultTake = 6;
const maxTake = 12;

type ProjectRow = {
  id: string;
  slug: string;
  title: string;
  category: string;
  location: string;
  summary: string;
  year: string;
  status: string;
  imageUrl: string | null;
  featured: boolean;
  mediaAssets: Array<{ url: string }>;
};

export type ConstructionWorkItem = {
  id: string;
  slug: string;
  title: string;
  type: string;
  location: string;
  summary: string;
  year: string;
  status: string;
  image: string;
  featured: boolean;
};

export type ConstructionWorksResult = {
  items: ConstructionWorkItem[];
  total: number;
  nextSkip: number;
  hasMore: boolean;
};

function localAssetExists(url: string) {
  if (!url.startsWith("/")) return false;

  return existsSync(join(/* turbopackIgnore: true */ process.cwd(), "public", url));
}

function imageFor(row: ProjectRow) {
  const image = row.imageUrl || row.mediaAssets[0]?.url || "";

  return image && localAssetExists(image) ? image : "";
}

function mapWork(row: ProjectRow): ConstructionWorkItem | null {
  const image = imageFor(row);
  if (!image) return null;

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    type: row.category,
    location: row.location,
    summary: row.summary,
    year: row.year,
    status: row.status,
    image,
    featured: row.featured,
  };
}

async function allPublicWorks() {
  const rows = await prisma.project.findMany({
    where: {
      division: constructionDivision,
      status: {
        not: "archived",
      },
      OR: [
        {
          imageUrl: {
            not: null,
          },
        },
        {
          mediaAssets: {
            some: {
              kind: "image",
            },
          },
        },
      ],
    },
    orderBy: [{ position: "asc" }, { createdAt: "desc" }],
    include: {
      mediaAssets: {
        where: {
          kind: "image",
        },
        orderBy: { createdAt: "asc" },
        select: { url: true },
      },
    },
  });

  return rows
    .map(mapWork)
    .filter((item: ConstructionWorkItem | null): item is ConstructionWorkItem => Boolean(item));
}

export async function getConstructionWorks({
  skip = 0,
  take = defaultTake,
}: {
  skip?: number;
  take?: number;
} = {}): Promise<ConstructionWorksResult> {
  const safeSkip = Number.isFinite(skip) ? Math.max(0, Math.floor(skip)) : 0;
  const safeTake = Number.isFinite(take)
    ? Math.min(maxTake, Math.max(1, Math.floor(take)))
    : defaultTake;
  const works = await allPublicWorks();
  const items = works.slice(safeSkip, safeSkip + safeTake);
  const nextSkip = safeSkip + items.length;

  return {
    items,
    total: works.length,
    nextSkip,
    hasMore: nextSkip < works.length,
  };
}
