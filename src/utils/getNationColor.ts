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

export default function getNationColor(nation: string, isDark = false): string {
  if (isSchemeNations(nation)) {
    return isDark ? colorScheme[nation][300] : colorScheme[nation][500];
  }
  return grey[500];
}

export function useGetNationColor(): (nation: string, isDark: boolean) => string {
  const isDark = useTheme().palette.type === 'dark';
  return React.useCallback((nation: string) => getNationColor(nation, isDark), [isDark]);
}
