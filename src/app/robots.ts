import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/audit" },
    sitemap: "https://hafsaff-portfolio.vercel.app/sitemap.xml",
  };
}
