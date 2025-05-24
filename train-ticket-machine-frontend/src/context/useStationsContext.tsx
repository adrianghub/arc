import { createContext, useContext } from "react";
import type { StationUIModel } from "../api/station";
import type { StationsAction, StationsState } from "./StationsReducer";

export interface StationsContextValue extends StationsState {
  // Action creators
  setSearchTerm: (term: string) => void;
  selectStation: (station: StationUIModel) => void;
  clearSelectedStation: () => void;
  refetch: () => Promise<unknown>;
  dispatch: React.Dispatch<StationsAction>;
}

export const StationsContext = createContext<StationsContextValue | undefined>(undefined);

export function useStationsContext() {
  const context = useContext(StationsContext);

  if (context === undefined) {
    throw new Error("useStationsContext must be used within a StationsProvider");
  }

  return context;
}
