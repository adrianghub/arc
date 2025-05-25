import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// Import Sentry as early as possible
import * as Sentry from "@sentry/react";
import App from "./App.tsx";
import { ReactQueryDevTools } from "./components/ReactQueryDevTools";
import { StationsProvider } from "./context/StationsContext.tsx";
import "./index.css";
import { QueryProvider } from "./lib/QueryProvider";
import "./sentry";

const container = document.getElementById("root")!;
const root = createRoot(container, {
  // Callback called when an error is thrown and not caught by an ErrorBoundary.
  onUncaughtError: Sentry.reactErrorHandler((error, errorInfo) => {
    console.warn("Uncaught error", error, errorInfo?.componentStack);
  }),
  // Callback called when React catches an error in an ErrorBoundary.
  onCaughtError: Sentry.reactErrorHandler(),
  // Callback called when React automatically recovers from errors.
  onRecoverableError: Sentry.reactErrorHandler(),
});

root.render(
  <StrictMode>
    <QueryProvider>
      <StationsProvider>
        <App />
        <ReactQueryDevTools />
      </StationsProvider>
    </QueryProvider>
  </StrictMode>,
);
