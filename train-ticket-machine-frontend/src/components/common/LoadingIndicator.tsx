import { Loader2 } from "lucide-react";

interface LoadingIndicatorProps {
  size?: number;
  className?: string;
}

export function LoadingIndicator({ size = 24, className = "" }: LoadingIndicatorProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Loader2 size={size} className="animate-spin text-gray-600" aria-label="Loading" />
    </div>
  );
}
