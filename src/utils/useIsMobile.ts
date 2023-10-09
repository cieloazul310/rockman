import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

function useIsMobile() {
  const { breakpoints } = useTheme();
  const isMobile = useMediaQuery(breakpoints.only("xs"));

  return isMobile;
}

export default useIsMobile;
