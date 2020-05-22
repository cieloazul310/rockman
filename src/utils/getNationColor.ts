import { blue, orange, green, red, purple, grey } from '@material-ui/core/colors';

const colorScheme = {
  JPN: blue,
  UK: orange,
  US: green,
  FR: purple,
  CAN: red,
};

export default function getNationColor(nation: string, isDark = false) {
  if (nation === 'JPN' || nation === 'UK' || nation === 'US' || nation === 'FR' || nation === 'CAN') {
    return isDark ? colorScheme[nation][300] : colorScheme[nation][500];
  } else {
    return grey[500];
  }
}
