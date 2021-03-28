import * as React from 'react';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ListItemAppLink from 'gatsby-theme-aoi/src/components/ListItemAppLink';
import { SitePageContext } from '../../graphql-types';

interface Props {
  variant: 'program' | 'artist';
  pageContext: SitePageContext;
}

function DrawerPageNavigation({ pageContext, variant }: Props): JSX.Element {
  const { previous, next } = pageContext;
  const isProgram = variant === 'program';
  return (
    <List subheader={<ListSubheader>Navigation</ListSubheader>}>
      {previous ? (
        <ListItemAppLink dense button to={isProgram ? previous.fields?.slug ?? '#' : previous.slug ?? '#'}>
          <ListItemIcon>
            <ArrowBackIcon />
          </ListItemIcon>
          <ListItemText
            primary={isProgram ? previous.title : previous.name}
            secondary={isProgram ? `第${previous.week}回` : `${previous.tunesCount}曲/${previous.programCount}回`}
          />
        </ListItemAppLink>
      ) : null}
      {next ? (
        <ListItemAppLink dense button to={isProgram ? next.fields?.slug ?? '#' : next.slug ?? '#'}>
          <ListItemIcon>
            <ArrowForwardIcon />
          </ListItemIcon>
          <ListItemText
            primary={isProgram ? next.title : next.name}
            secondary={isProgram ? `第${next.week}回` : `${next.tunesCount}曲/${next.programCount}回`}
          />
        </ListItemAppLink>
      ) : null}
    </List>
  );
}

export default DrawerPageNavigation;
