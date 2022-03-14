import * as React from 'react';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
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
