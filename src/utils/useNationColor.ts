import * as React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { blue, orange, green, red, purple, lime, grey } from '@material-ui/core/colors';

const colorScheme = {
  JPN: blue,
  UK: orange,
  US: green,
  FR: purple,
  CAN: red,
  AUS: lime,
};

export type SchemeNations = keyof typeof colorScheme;
export const schemeNations = Object.keys(colorScheme);
export function isSchemeNations(nation: string): nation is SchemeNations {
  return schemeNations.includes(nation);
}

// returns [nation color, contrast text color]
export default function useNationColor(nation: string): string[] {
  const { palette } = useTheme();
  return React.useMemo(() => {
    const isDark = palette.type === 'dark';
    if (isSchemeNations(nation)) {
      const nationColor = isDark ? colorScheme[nation][300] : colorScheme[nation][600];
      return [nationColor, palette.getContrastText(nationColor)];
    }
    return [grey[600], palette.getContrastText(grey[600])];
  }, [palette, nation]);
}
