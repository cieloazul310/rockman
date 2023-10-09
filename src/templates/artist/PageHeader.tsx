import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { Jumbotron } from "@cieloazul310/gatsby-theme-aoi";
import { ArtistIcon } from "../../icons";
import { useParseNation } from "../../utils/graphql-hooks";
import type { Artist } from "../../../types";

function ArtistPageHeader({
  artist,
}: {
  artist: Pick<Artist, "name" | "nation"> & {
    program: Pick<Artist["program"], "image" | "programsCount" | "tunesCount">;
  };
}) {
  const { country } = useParseNation(artist.nation);
  return (
    <Jumbotron component="header" maxWidth="md">
      <Box
        display="flex"
        flexGrow={1}
        width={1}
        height={1}
        flexDirection="row"
        alignItems="center"
      >
        <Box flexShrink={0}>
          <Avatar
            src={artist.program.image ?? undefined}
            sx={{
              width: ({ spacing }) => ({
                xs: spacing(11),
                sm: spacing(13),
                md: spacing(15),
              }),
              height: ({ spacing }) => ({
                xs: spacing(11),
                sm: spacing(13),
                md: spacing(15),
              }),
            }}
          >
            <ArtistIcon />
          </Avatar>
        </Box>
        <Box
          flexGrow={1}
          display="flex"
          flexDirection="column"
          pl={{ xs: 2, sm: 3 }}
        >
          <Typography
            fontWeight="bold"
            lineHeight={1.2}
            component="h1"
            fontSize={{
              xs: "h4.fontSize",
              sm: "h3.fontSize",
              md: "h2.fontSize",
            }}
          >
            {artist.name}
          </Typography>
          <Typography variant="body2">{country}</Typography>
          <Typography variant="body1">
            {artist.program.tunesCount}曲 / {artist.program.programsCount}回
          </Typography>
        </Box>
      </Box>
    </Jumbotron>
  );
}

export default ArtistPageHeader;
