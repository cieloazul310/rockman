import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import ListItemLink from './ListItemLink';
import NationAvatar from './NationAvatar';
import { getYomi } from '../utils/sortByYomi';
import { ArtistItem } from '../types';
import { AllDataQuery } from '../../graphql-types';

function renderRow({ index, style, data }: ListChildComponentProps) {
  const artist: ArtistItem = data[index];
  return (
    <ListItemLink
      button
      style={style}
      key={index}
      to={
        artist[3].length > 1
          ? `/artist/${artist[0]}/`
          : `/artist/?name=${artist[0]}`
      }
    >
      <ListItemAvatar>
        <NationAvatar nation={artist[2]} />
      </ListItemAvatar>
      <ListItemText primary={artist[0]} secondary={artist[1] || null} />
      <Chip label={artist[3].length} />
    </ListItemLink>
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
  sort = (a, b) => b[3].length - a[3].length,
}: Props) {
  const data = useStaticQuery<AllDataQuery>(graphql`
    query AllData {
      allProgram(sort: { fields: week, order: ASC }) {
        edges {
          node {
            id
            title
            date(formatString: "YYYY-MM-DD")
            categories
            fields {
              slug
            }
            guests
            subtitle
            week
            year
            playlist {
              artist
              corner
              id
              indexInWeek
              index
              kana
              label
              name
              nation
              producer
              selector
              title
              week
              year
              youtube
            }
          }
        }
      }
    }
  `);
  const allTunes = React.useMemo(
    () =>
      data.allProgram.edges
        .map(({ node }) => node.playlist)
        .reduce((accum, curr) => [...accum, ...curr]),
    [data]
  );
  // [artist, kana, nation, playlist][]
  const artists = React.useMemo(
    () =>
      allTunes
        .reduce<ArtistItem[]>((accum, curr) => {
          const existedIndex = accum.map(d => d[0]).indexOf(curr.artist);
          if (existedIndex < 0) {
            return [...accum, [curr.artist, curr.kana, curr.nation, [curr]]];
          } else {
            accum[existedIndex][3].push(curr);
            return accum;
          }
        }, [])
        .filter(filter)
        .sort(
          (a, b) =>
            sort(a, b) || getYomi(a[0], a[1]).localeCompare(getYomi(b[0], b[1]))
        ),
    [allTunes, filter, sort]
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
