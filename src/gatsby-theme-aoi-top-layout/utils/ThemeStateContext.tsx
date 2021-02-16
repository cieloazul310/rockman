import * as React from 'react';
import { initialThemeState, ThemeState, ThemeAction } from './ThemeState';

type Context = { state: ThemeState; dispatch: React.Dispatch<ThemeAction> };
const ThemeDispatchContext = React.createContext<Context>({
  state: initialThemeState(),
  dispatch: () => {
    throw new Error();
  },
});
export default ThemeDispatchContext;

// Context Hooks
export function useThemeContextState(): ThemeState {
  const { state } = React.useContext(ThemeDispatchContext);
  return state;
}
export function useToggleDark(): () => void {
  const { dispatch } = React.useContext(ThemeDispatchContext);
  return React.useCallback(() => {
    dispatch({ type: 'TOGGLE_DARKMODE' });
  }, [dispatch]);
}
export function useToggleUseSystem(): () => void {
  const { dispatch } = React.useContext(ThemeDispatchContext);
  return React.useCallback(() => {
    dispatch({ type: 'TOGGLE_USE_SYSTEM_THEME' });
  }, [dispatch]);
}
