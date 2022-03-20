import * as React from 'react';
import Typography from '@mui/material/Typography';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { ListItemAppLink } from '@cieloazul310/gatsby-theme-aoi';
import NationAvatar from './NationAvatar';
import { sortArtists, SortType } from '../utils/sortByYomi';
import { ArtistListItem } from '../../types';

function renderRow({ index, style, data }: ListChildComponentProps) {
  const { node }: { node: ArtistListItem } = data[index];
  return (
    <ListItemAppLink button style={style} key={index} to={node.slug}>
      <ListItemAvatar>
        <NationAvatar nation={node.nation} img={node.program.image ?? undefined} alt={node.name} />
      </ListItemAvatar>
      <ListItemText primary={node.name} secondary={node.kana || null} />
      <Typography variant="button" component="span">
        {`${node.program.tunesCount}曲 / ${node.program.programsCount}回`}
      </Typography>
    </ListItemAppLink>
  );
}

type ArtistListProps = {
  artists: { node: ArtistListItem }[];
  width?: number;
  height?: number;
  itemSize?: number;
  filters?: ((artist: { node: ArtistListItem }) => boolean)[];
  sortType: SortType;
};

function ArtistList({ artists, width = 320, height = 480, itemSize = 60, filters, sortType }: ArtistListProps) {
  const sortedArtists = React.useMemo(
    () =>
      sortArtists(
        artists.filter((artist) => (filters?.length ? filters.length === filters.filter((filter) => filter(artist)).length : true)),
        { sortType }
      ),
    [artists, filters, sortType]
  );

  return (
    <FixedSizeList width={width} height={height} itemCount={artists.length} itemSize={itemSize} itemData={sortedArtists}>
      {renderRow}
    </FixedSizeList>
  );
}

ArtistList.defaultProps = {
  width: 320,
  height: 480,
  itemSize: 60,
  filters: [],
};

export default ArtistList;
