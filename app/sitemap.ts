import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const paths = ["/", "/carcase", "/containere", "/portofoliu", "/proces", "/despre", "/oferta"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();
  return paths.flatMap((path) =>
    site.locales.map((locale) => ({
      url: `${site.url}/${locale}${path === "/" ? "" : path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: path === "/" ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          site.locales.map((alt) => [
            alt === "ro" ? "ro-MD" : "ru-MD",
            `${site.url}/${alt}${path === "/" ? "" : path}`,
          ]),
        ),
      },
    })),
  );
}
