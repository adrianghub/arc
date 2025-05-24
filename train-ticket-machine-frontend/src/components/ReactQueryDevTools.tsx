import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect, useState } from "react";

/**
 * ReactQueryDevTools component that only renders in development mode
 * or when the '?react_query_devtools=true' query parameter is present
 */
export function ReactQueryDevTools() {
  const [showDevtools, setShowDevtools] = useState(false);

  useEffect(() => {
    const isDevelopment = process.env.NODE_ENV === "development";
    const showDevToolsFromUrl = window.location.search.includes("react_query_devtools=true");

    setShowDevtools(isDevelopment || showDevToolsFromUrl);
  }, []);

  if (!showDevtools) return null;

  return <ReactQueryDevtools initialIsOpen={false} />;
}
