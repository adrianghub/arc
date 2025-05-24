import { AlertCircle } from "lucide-react";

interface ErrorDisplayProps {
  error: Error | string | unknown;
  className?: string;
  onRetry?: () => void;
}

export function ErrorDisplay({ error, className = "", onRetry }: ErrorDisplayProps) {
  const errorMessage =
    error instanceof Error
      ? error.message
      : typeof error === "string"
        ? error
        : "An unexpected error occurred";

  return (
    <div className={`rounded-md bg-red-50 p-4 text-red-700 ${className}`} role="alert">
      <div className="flex items-center gap-2">
        <AlertCircle className="h-5 w-5" aria-hidden="true" />
        <h3 className="font-medium">Error loading data</h3>
      </div>
      <div className="mt-2 text-sm">{errorMessage}</div>
      <div className="mt-4">
        <button
          type="button"
          onClick={onRetry ? onRetry : () => window.location.reload()}
          className="rounded-md bg-red-100 px-4 py-2 text-sm font-medium text-red-800 hover:bg-red-200"
        >
          {onRetry ? "Try again" : "Refresh page"}
        </button>
      </div>
    </div>
  );
}
