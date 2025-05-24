import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState, useEffect } from "react";

/**
 * ReactQueryDevTools component that only renders in development mode
 * or when the '?react_query_devtools=true' query parameter is present
 */
export function ReactQueryDevTools() {
  const [showDevtools, setShowDevtools] = useState(false);

  useEffect(() => {
    const isDevelopment = process.env.NODE_ENV === "development";

    const showDevToolsFromUrl =
      new URLSearchParams(window.location.search).get("react_query_devtools") === "true";

    setShowDevtools(isDevelopment || showDevToolsFromUrl);
  }, []);

  if (!showDevtools) return null;

  return <ReactQueryDevtools initialIsOpen={false} />;
}
