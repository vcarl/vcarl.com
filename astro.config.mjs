import { defineConfig } from "astro/config";
import react from "@astrojs/react";

import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://vcarl.com",
  base: "/",
  output: "static",

  integrations: [
    react({
      include: "**/components/**/*.tsx",
    }),
  ],

  build: {
    assets: "_assets",
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
