import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@tailwindcss/vite";

export default defineConfig({
  site: "https://vcarl.com",
  base: "/",
  output: "static",

  integrations: [
    react({
      include: "**/components/**/*.tsx",
    }),
  ],

  vite: {
    plugins: [tailwind()],
  },

  build: {
    assets: "_assets",
  },
});
