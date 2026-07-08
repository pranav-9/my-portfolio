import type { MetadataRoute } from "next";
import { getProjectsWithCaseStudies } from "@/lib/projects";

const BASE_URL = "https://pranavyadav.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const caseStudies = getProjectsWithCaseStudies();

  const caseStudyEntries: MetadataRoute.Sitemap = caseStudies.map((p) => ({
    url: `${BASE_URL}/projects/${p.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const decisionEntries: MetadataRoute.Sitemap = caseStudies.flatMap((p) =>
    (p.caseStudy?.decisions ?? []).map((d) => ({
      url: `${BASE_URL}/projects/${p.slug}/decisions/${d.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    }))
  );

  return [
    {
      url: BASE_URL,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...caseStudyEntries,
    ...decisionEntries,
  ];
}
