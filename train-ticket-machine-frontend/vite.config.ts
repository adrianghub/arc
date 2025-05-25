import { sentryVitePlugin } from "@sentry/vite-plugin";
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

const hasSentryToken = Boolean(process.env.SENTRY_AUTH_TOKEN);

// https://vite.dev/config/
export default defineConfig({
  build: {
    sourcemap: true,
  },
  plugins: [
    react(),
    tailwindcss(),
    storybookRedirectPlugin(),
    ...(hasSentryToken
      ? [
          sentryVitePlugin({
            org: "the-startup-y3",
            project: "train-ticket-machine-frontend",
            authToken: process.env.SENTRY_AUTH_TOKEN,
            debug: true,
            silent: false,
            sourcemaps: {
              filesToDeleteAfterUpload: ["./dist/**/*.js.map"],
            },
            release: {
              name: process.env.GITHUB_SHA
                ? `train-ticket-machine-frontend@${process.env.GITHUB_SHA.substring(0, 7)}`
                : undefined,
            },
          }),
        ]
      : []),
  ],
});
