import * as Sentry from "@sentry/react";

export function SentryTest() {
  const testSentryError = () => {
    try {
      throw new Error("Test Sentry Error");
    } catch (error) {
      Sentry.captureException(error);
    }
  };

  const testSentryFatalError = () => {
    const eventId = Sentry.captureException(new Error("Test Sentry Fatal Error"));
    Sentry.showReportDialog({ eventId });
    throw new Error("Test Sentry Fatal Error");
  };

  return (
    <div className="mt-8 text-center">
      <h2 className="mb-4 text-xl font-semibold">Sentry Testing Tools</h2>
      <div className="flex flex-col justify-center gap-4 sm:flex-row">
        <button
          onClick={testSentryError}
          className="flex flex-col rounded bg-blue-200 px-4 py-2 font-bold text-blue-600 hover:bg-blue-300"
        >
          <span>Test Sentry</span>
          <span>(Caught Error - Console Log)</span>
        </button>
        <button
          onClick={testSentryFatalError}
          className="flex flex-col rounded bg-red-200 px-4 py-2 font-bold text-red-600 hover:bg-red-300"
        >
          <span>Test Sentry</span>
          <span>(Uncaught Error + Dialog)</span>
        </button>
      </div>

      <p className="mt-4 text-sm text-gray-600">
        Note: These buttons will only appear in local development mode
      </p>
    </div>
  );
}
