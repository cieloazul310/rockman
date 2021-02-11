export interface ThemeState {
  darkMode: boolean;
  useSystemTheme: boolean;
}
export type PaletteType = 'light' | 'dark';

export const initialThemeState = (darkMode = false, useSystemTheme = false): ThemeState => ({
  darkMode,
  useSystemTheme,
});

export type ThemeAction = { type: 'TOGGLE_DARKMODE' } | { type: 'TOGGLE_USE_SYSTEM_THEME' };

export default function themeReducer(state: ThemeState, action: ThemeAction) {
  switch (action.type) {
    case 'TOGGLE_DARKMODE':
      return {
        ...state,
        darkMode: !state.darkMode,
      };
    case 'TOGGLE_USE_SYSTEM_THEME':
      return {
        ...state,
        useSystemTheme: !state.useSystemTheme,
      };
    default:
      throw new Error(`Unrecognized action type`);
  }
}
