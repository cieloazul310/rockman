import * as React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import useWindowSize from "./use-window-size";

function useFullHeight() {
  const { height } = useWindowSize();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return React.useMemo(
    () => (height ? height - (isMobile ? 56 : 64) : 480),
    [height, isMobile],
  );
}

export default useFullHeight;
