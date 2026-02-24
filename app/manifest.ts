import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "UGT Editorial",
    short_name: "UGT",
    description: "Revista digital UGT Sanidad Salamanca",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#C70025",
    icons: [{ src: "/icon-192.png", sizes: "192x192", type: "image/png" }]
  };
}
