import * as React from 'react';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import ListItemAppLink from 'gatsby-theme-aoi/src/components/ListItemAppLink';
import NationAvatar from './NationAvatar';
import { useAllArtists, ArtistItem } from '../utils/graphql-hooks';
import { getYomi } from '../utils/sortByYomi';

function renderRow({ index, style, data }: ListChildComponentProps) {
  const artist: ArtistItem = data[index];
  return (
    <ListItemAppLink
      button
      style={style}
      key={index}
      to={`/artist/${artist.fieldValue}/`}
    >
      <ListItemAvatar>
        <NationAvatar nation={artist.nation} />
      </ListItemAvatar>
      <ListItemText
        primary={artist.fieldValue}
        secondary={artist.kana || null}
      />
      <Chip label={`${artist.tunes.length} / ${artist.edges.length}`} />
    </ListItemAppLink>
  );
}

interface Props {
  width?: number;
  height?: number;
  itemSize?: number;
  filter?: (artist: ArtistItem) => boolean;
  sort?: (a: ArtistItem, b: ArtistItem) => number;
}

function Artists({
  width = 320,
  height = 480,
  itemSize = 60,
  filter = () => true,
  sort = (a, b) => (b.edges.length - a.edges.length) || (b.tunes.length - a.tunes.length),
}: Props) {
  const allArtists = useAllArtists();
  const artists = React.useMemo(
    () =>
      allArtists
        .filter(filter)
        .sort(
          (a, b) =>
            sort(a, b) ||
            getYomi(a.fieldValue, a.kana).localeCompare(
              getYomi(b.fieldValue, b.kana)
            )
        ),
    [allArtists, filter, sort]
  );

  return (
    <FixedSizeList
      width={width}
      height={height}
      itemCount={artists.length}
      itemSize={itemSize}
      itemData={artists}
    >
      {renderRow}
    </FixedSizeList>
  );
}

export default Artists;
