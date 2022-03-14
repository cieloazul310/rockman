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

/**
 * A hook returns `ThemeState`.
 * @returns {Object} `ThemeState`
 */
export function useThemeContextState() {
  const { state } = React.useContext(ThemeDispatchContext);
  return state;
}

/**
 * A hook returns a callback function which toggles color mode.
 * @returns {function} () => void
 */
export function useToggleDark() {
  const { dispatch } = React.useContext(ThemeDispatchContext);
  return React.useCallback(() => {
    dispatch({ type: 'TOGGLE_DARKMODE' });
  }, [dispatch]);
}

/**
 * A hook returns a callback function which toggles system mode.
 * @returns {function} () => void
 */
export function useToggleUseSystem() {
  const { dispatch } = React.useContext(ThemeDispatchContext);
  return React.useCallback(() => {
    dispatch({ type: 'TOGGLE_USE_SYSTEM_THEME' });
  }, [dispatch]);
}
