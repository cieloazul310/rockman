import * as React from "react";
import Typography from "@mui/material/Typography";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import { ListItemAppLink } from "@cieloazul310/gatsby-theme-aoi";
import type { ArtistListItem as ArtistListItemType } from "types";
import NationAvatar from "../nation-avatar";

type ArtistListItemProps = {
  data: ArtistListItemType;
  style: React.CSSProperties;
};

function ArtistListItem({ style, data }: ArtistListItemProps) {
  return (
    <ListItemAppLink style={style} href={data.slug}>
      <ListItemAvatar>
        <NationAvatar
          nation={data.nation}
          img={data.program.image ?? undefined}
          alt={data.name}
        />
      </ListItemAvatar>
      <ListItemText primary={data.name} secondary={data.kana || null} />
      <Typography variant="button" component="span">
        {`${data.program.tunesCount}曲 / ${data.program.programsCount}回`}
      </Typography>
    </ListItemAppLink>
  );
}

export default ArtistListItem;
