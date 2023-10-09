import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import ArtistItem from "./Item";
import { MinimumArtist } from "../../../types";

function isolateTouch(event: React.TouchEvent) {
  event.stopPropagation();
}

type ArtistItemContainerProps = {
  title: string;
  artists: MinimumArtist[];
};

function ArtistItemContainer({ artists, title }: ArtistItemContainerProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only("xs"));
  return (
    <Container maxWidth="md" sx={{ py: 1 }}>
      <Box py={1}>
        <Typography>{title}</Typography>
      </Box>
      <Box
        component="nav"
        sx={{
          overflowX: { xs: "auto", sm: "unset" },
          WebkitOverflowScrolling: { xs: "touch", sm: "unset" },
        }}
        onTouchMove={isolateTouch}
        onTouchStart={isolateTouch}
        onTouchEnd={isolateTouch}
      >
        <Grid
          container={!isMobile}
          sx={{
            display: { xs: "flex", sm: undefined },
            width: { xs: "max-content", sm: 1 },
          }}
          spacing={!isMobile ? 2 : undefined}
        >
          {artists
            .filter((artist) => artist.name !== "スピッツ")
            .map((artist) => (
              <Grid
                sx={{ width: { xs: "25vw", sm: "unset" } }}
                item={!isMobile || undefined}
                key={artist?.name}
                sm={!isMobile ? 2 : undefined}
                mr={!isMobile ? undefined : 1}
              >
                <ArtistItem artist={artist} />
              </Grid>
            ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default ArtistItemContainer;
