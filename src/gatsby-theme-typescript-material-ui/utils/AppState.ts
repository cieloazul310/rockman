import { WindowLocation } from '@reach/router';

export interface AppState {
  count: number;
  tab: 0 | 1 | 2 | 3 | 4;
}
export interface LocationWithState extends WindowLocation {
  state: {
    appState: AppState;
    key: string;
  } | null;
}

export const initialAppState: AppState = {
  count: 0,
  tab: 0,
};
export function createInitialAppState(location: LocationWithState) {
  return !location.state || !location.state.appState ? initialAppState : location.state.appState;
}
