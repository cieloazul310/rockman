import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAppLink from 'gatsby-theme-aoi/src/components/ListItemAppLink';
import NationAvatar from './NationAvatar';
import { ProgramCountQuery, TunesCountQuery } from '../../graphql-types';

type ArtistEdges = ProgramCountQuery['allArtist']['edges'] | TunesCountQuery['allArtist']['edges'];

interface Props {
  edges: ArtistEdges;
  title: string;
  nodeTitle: (edge: ArtistEdges[number]['node']) => string;
  nodeValue: (edge: ArtistEdges[number]['node']) => string | number;
  dense?: boolean;
}

function Rank({ edges, title, nodeTitle, nodeValue, dense = false }: Props) {
  return (
    <List subheader={<ListSubheader>{title}</ListSubheader>}>
      {edges.map(({ node }) => (
        <ListItemAppLink key={node.id} button to={`/artist/${node.name}/`} dense={dense}>
          <ListItemAvatar>
            <NationAvatar nation={node.nation} img={node.image ?? undefined} alt={node.name} />
          </ListItemAvatar>
          <ListItemText primary={nodeTitle(node)} />
          <Typography variant="button" component="span">
            {nodeValue(node)}
          </Typography>
        </ListItemAppLink>
      ))}
    </List>
  );
}

export default Rank;
