import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { blue, orange, green, red, purple, lime, grey } from '@mui/material/colors';

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
export default function useNationColor(nation: string) {
  const { palette } = useTheme();
  return React.useMemo(() => {
    const isDark = palette.mode === 'dark';
    if (isSchemeNations(nation)) {
      const nationColor = isDark ? colorScheme[nation][300] : colorScheme[nation][600];
      return {
        bgcolor: nationColor,
        color: palette.getContrastText(nationColor),
      };
    }
    return { bgcolor: grey[600], color: palette.getContrastText(grey[600]) };
  }, [palette, nation]);
}
