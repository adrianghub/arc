import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ReactQueryDevTools } from "./components/ReactQueryDevTools";
import { StationsProvider } from "./context/StationsContext.tsx";
import "./index.css";
import { QueryProvider } from "./lib/QueryProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <StationsProvider>
        <App />
        <ReactQueryDevTools />
      </StationsProvider>
    </QueryProvider>
  </StrictMode>,
);
