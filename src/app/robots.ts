import type { MetadataRoute } from "next";

// The unlisted fit pages (/volvo, /foundra) are intentionally NOT disallowed
// here — listing them in robots.txt would advertise their paths. They carry
// their own robots noindex metadata instead.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://pranavyadav.dev/sitemap.xml",
  };
}
