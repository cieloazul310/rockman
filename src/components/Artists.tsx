import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import ListItemAppLink from 'gatsby-theme-aoi/src/components/ListItemAppLink';
//import NationAvatar from './NationAvatar';
import { useAllArtists, ArtistItem } from '../utils/graphql-hooks';
import sortArtists, { SortType } from '../utils/sortByYomi';

function renderRow({ index, style, data }: ListChildComponentProps) {
  const artist: ArtistItem = data[index];
  return (
    <ListItemAppLink button style={style} key={index} to={`/artist/${artist.fieldValue}/`}>
      <ListItemAvatar>
        <Avatar src={artist.img || undefined} alt={artist.fieldValue}>
          {artist.nation}
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={artist.fieldValue} secondary={artist.kana || null} />
      <Typography variant="button" component="span">
        {`${artist.tunes.length}曲 / ${artist.edges.length}回`}
      </Typography>
    </ListItemAppLink>
  );
}

interface Props {
  width?: number;
  height?: number;
  itemSize?: number;
  filters?: ((artist: ArtistItem) => boolean)[];
  sortType: SortType;
}

function Artists({ width = 320, height = 480, itemSize = 60, filters = [], sortType = 'abc' }: Props) {
  const allArtists = useAllArtists();
  const artists = React.useMemo(
    () =>
      sortArtists(
        allArtists.filter((artist) => (filters.length ? filters.length === filters.filter((filter) => filter(artist)).length : true)),
        { sortType }
      ),
    [allArtists, filters, sortType]
  );

  return (
    <FixedSizeList width={width} height={height} itemCount={artists.length} itemSize={itemSize} itemData={artists}>
      {renderRow}
    </FixedSizeList>
  );
}

export default Artists;
