export type FetchOptions = RequestInit;

export type Fetcher = <T = unknown>(url: string, options?: FetchOptions) => Promise<T>;

/**
 * Default fetcher implementation (currently using browser's fetch)
 */
export const fetcher: Fetcher = async <T = unknown>(
  url: string,
  options?: FetchOptions,
): Promise<T> => {
  const response = await fetch(url, options);
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const errorMessage = errorData?.message || `HTTP error! status: ${response.status}`;
    console.error("Fetch error:", errorMessage, "URL:", url, "Options:", options);
    throw new Error(errorMessage);
  }
  return response.json() as Promise<T>;
};
