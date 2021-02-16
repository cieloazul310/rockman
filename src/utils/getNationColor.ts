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

export default function getNationColor(nation: string, isDark = false) {
  if (nation === 'JPN' || nation === 'UK' || nation === 'US' || nation === 'FR' || nation === 'AUS' || nation === 'CAN') {
    return isDark ? colorScheme[nation][300] : colorScheme[nation][500];
  } else {
    return grey[500];
  }
}

export function useGetNationColor() {
  const isDark = useTheme().palette.type === 'dark';
  return React.useCallback((nation: string) => getNationColor(nation, isDark), [isDark]);
}
