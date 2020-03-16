import * as React from 'react';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ListItemAppLink from 'gatsby-theme-aoi/src/components/ListItemAppLink';
import { QueriedProgram } from '../types';

interface Props {
  previous: QueriedProgram;
  next: QueriedProgram;
}

function DrawerPageNavigation({ previous, next }: Props) {
  return (
    <List subheader={<ListSubheader>Navigation</ListSubheader>}>
      {previous ? (
        <ListItemAppLink dense button to={previous.fields.slug}>
          <ListItemIcon>
            <ArrowBackIcon />
          </ListItemIcon>
          <ListItemText primary={previous.title} secondary="prev" />
        </ListItemAppLink>
      ) : null}
      {next ? (
        <ListItemAppLink dense button to={next.fields.slug}>
          <ListItemIcon>
            <ArrowForwardIcon />
          </ListItemIcon>
          <ListItemText primary={next.title} secondary="next" />
        </ListItemAppLink>
      ) : null}
    </List>
  );
}

export default DrawerPageNavigation;
