import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect, useState } from "react";

export function ReactQueryDevTools() {
  const [showDevtools, setShowDevtools] = useState(false);

  useEffect(() => {
    const isDevelopment = process.env.NODE_ENV === "development";
    setShowDevtools(isDevelopment);
  }, []);

  if (!showDevtools) return null;

  return <ReactQueryDevtools initialIsOpen={false} />;
}
