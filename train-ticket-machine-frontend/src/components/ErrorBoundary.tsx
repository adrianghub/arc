import * as Sentry from "@sentry/react";
import { Component, type ErrorInfo, type ReactNode } from "react";
import { ErrorDisplay } from "./common/ErrorDisplay";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onReset?: () => void;
  resetKeys?: Array<unknown>;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  reset = (): void => {
    this.setState({
      hasError: false,
      error: null,
    });

    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  componentDidUpdate(prevProps: ErrorBoundaryProps): void {
    if (
      this.state.hasError &&
      this.props.resetKeys &&
      prevProps.resetKeys &&
      this.props.resetKeys.some((key, idx) => key !== prevProps.resetKeys?.[idx])
    ) {
      this.reset();
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    Sentry.captureException(error, {
      contexts: {
        react: {
          componentStack: errorInfo.componentStack,
        },
      },
    });
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return <ErrorDisplay error={this.state.error} onRetry={this.reset} />;
    }

    return this.props.children;
  }
}

const SentryFallback = ({ error, resetError }: { error: unknown; resetError?: () => void }) => {
  return (
    <ErrorDisplay
      error={error instanceof Error ? error : new Error(String(error))}
      onRetry={() => resetError?.()}
    />
  );
};

export const SentryErrorBoundary = Sentry.withErrorBoundary(ErrorBoundary, {
  fallback: SentryFallback,
  showDialog: true,
});
