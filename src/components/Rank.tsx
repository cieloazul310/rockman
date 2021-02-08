import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAppLink from 'gatsby-theme-aoi/src/components/ListItemAppLink';
import NationAvatar from './NationAvatar';
import { ArtistItem } from '../utils/graphql-hooks';

interface Props {
  items: ArtistItem[];
  title: string;
  itemTitle: (item: ArtistItem) => string;
  itemValue: (item: ArtistItem) => string | number;
  dense?: boolean;
}

function Rank({ items, title, itemTitle, itemValue, dense = false }: Props) {
  return (
    <List subheader={<ListSubheader>{title}</ListSubheader>}>
      {items.map((item) => (
        <ListItemAppLink key={item.fieldValue} button to={`/artist/${item.fieldValue}/`} dense={dense}>
          <ListItemAvatar>
            <NationAvatar nation={item.nation} img={item.img} alt={item.fieldValue} />
          </ListItemAvatar>
          <ListItemText primary={itemTitle(item)} />
          <Typography variant="button" component="span">
            {itemValue(item)}
          </Typography>
        </ListItemAppLink>
      ))}
    </List>
  );
}

export default Rank;
