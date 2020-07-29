import * as React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import useWindowSize from './useWindowSize';

function useFullHeight() {
  const { height } = useWindowSize();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  return React.useMemo(() => (height ? height - (isMobile ? 56 : 64) : 480), [height, isMobile]);
}

export default useFullHeight;
