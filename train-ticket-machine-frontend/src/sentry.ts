import * as Sentry from "@sentry/react";

const SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN;
const APP_ENV = "development";

if (SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,
    // Setting this option to true will send default PII data to Sentry
    sendDefaultPii: true,
    integrations: [Sentry.browserTracingIntegration(), Sentry.replayIntegration()],
    // Always capture 100% of transactions in development
    tracesSampleRate: 1.0,
    // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
    tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
    // Capture all session replays in development
    replaysSessionSampleRate: 1.0,
    replaysOnErrorSampleRate: 1.0,
    // Set environment explicitly to development
    environment: APP_ENV,
    // Use commit SHA for release - match the format set in vite.config.ts
    release: import.meta.env.VITE_COMMIT_SHA
      ? `train-ticket-machine-frontend@${import.meta.env.VITE_COMMIT_SHA.substring(0, 7)}`
      : undefined,
    debug: import.meta.env.DEV,
  });

  console.log(`Sentry initialized in ${APP_ENV} environment`);
} else {
  console.log("Sentry not initialized: No DSN provided");
}

export default Sentry;
