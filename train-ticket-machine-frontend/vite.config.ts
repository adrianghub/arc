import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import type { ViteDevServer } from "vite";
import { defineConfig } from "vite";

// Simple plugin to redirect /storybook to the Storybook server in development
// In production, the static build will handle this
const storybookRedirectPlugin = () => ({
  name: "storybook-redirect",
  configureServer(server: ViteDevServer) {
    server.middlewares.use((req, res, next) => {
      const url = (req as { url?: string }).url || "";

      // In development, redirect to Storybook server
      if (url === "/storybook" || url === "/storybook/") {
        res.writeHead(302, {
          Location: "http://localhost:6006",
        });
        res.end();
        return;
      }

      next();
    });
  },
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), storybookRedirectPlugin()],
});
