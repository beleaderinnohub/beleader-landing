// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// The site stays fully static (output: "static"). The registration
// endpoint lives in /functions and is deployed as a Cloudflare Pages
// Function alongside the static assets — no SSR adapter needed.
// See docs/adr/0001-static-site-on-cloudflare-pages.md
export default defineConfig({
  site: "https://beleaderinnohub.com",
  output: "static",
  vite: {
    plugins: [tailwindcss()],
  },
});
