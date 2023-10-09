import * as React from "react";
import Box from "@mui/material/Box";
import Typography, { type TypographyProps } from "@mui/material/Typography";
import useNationColor from "../utils/useNationColor";

type NationLabelProps = {
  nation: string;
} & Omit<TypographyProps, "variant" | "fontWeight" | "color">;

function NationLabel({ nation, ...typographyProps }: NationLabelProps) {
  const { bgcolor, color } = useNationColor(nation);
  return (
    <Box sx={{ py: 0, bgcolor, color }}>
      <Typography
        variant="caption"
        fontWeight="bold"
        color="inherit"
        px=".2em"
        {...typographyProps}
      >
        {nation}
      </Typography>
    </Box>
  );
}

export default NationLabel;
