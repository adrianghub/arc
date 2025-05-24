import type { StationUIModel } from "../api/station";

const MAX_RECENT_SEARCHES = 5;
export const RECENT_STATION_SEARCHES_KEY = "recentStationsSearches";

export type RecentStation = StationUIModel;

// Memory storage for mocking localStorage
let memoryStorage: Record<string, string> = {};

const isLocalStorageAvailable = (): boolean => {
  try {
    const testKey = "__test_storage__";
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
};

const getStorage = () => {
  if (isLocalStorageAvailable()) {
    return window.localStorage;
  }

  // Return a memory storage implementation
  return {
    getItem: (key: string) => memoryStorage[key] || null,
    setItem: (key: string, value: string) => {
      memoryStorage[key] = value;
      if (typeof window !== "undefined") {
        const event = new Event("storage");
        window.dispatchEvent(event);
      }
    },
    removeItem: (key: string) => {
      delete memoryStorage[key];
    },
    clear: () => {
      memoryStorage = {};
    },
  };
};

export const getRecentSearches = (key: string = RECENT_STATION_SEARCHES_KEY): RecentStation[] => {
  try {
    const storage = getStorage();
    const item = storage.getItem(key);
    if (item) {
      const searches = JSON.parse(item);
      if (
        Array.isArray(searches) &&
        searches.every((s) => typeof s === "object" && s.name && s.code)
      ) {
        return searches;
      }
    }
  } catch (error) {
    console.error("Error reading recent searches from storage:", error);
  }
  return [];
};

export const addRecentSearch = (
  station: RecentStation,
  key: string = RECENT_STATION_SEARCHES_KEY,
): RecentStation[] => {
  if (!station || typeof station !== "object" || !station.name || !station.code) {
    return getRecentSearches(key);
  }

  let currentSearches = getRecentSearches(key);

  currentSearches = currentSearches.filter((s) => s.code !== station.code);

  currentSearches.unshift(station);

  if (currentSearches.length > MAX_RECENT_SEARCHES) {
    currentSearches = currentSearches.slice(0, MAX_RECENT_SEARCHES);
  }

  try {
    const storage = getStorage();
    storage.setItem(key, JSON.stringify(currentSearches));
  } catch (error) {
    console.error("Error saving recent searches to storage:", error);
  }
  return currentSearches;
};

// Clear memory storage (testing/storybook)
export const clearMemoryStorage = () => {
  memoryStorage = {};
};
