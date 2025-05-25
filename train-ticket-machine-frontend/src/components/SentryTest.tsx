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
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          Test Sentry (Caught Error - See Console)
        </button>
        <button
          onClick={testSentryFatalError}
          className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
        >
          Test Sentry (Uncaught Error + Dialog)
        </button>
      </div>

      <p className="mt-4 text-sm text-gray-600">
        Note: These buttons will only appear in local development mode
      </p>
    </div>
  );
}
