import * as React from 'react';
import Grid from '@mui/material/Grid';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemAppLink from 'gatsby-theme-aoi/src/components/ListItemAppLink';
import { useSiteMenu } from '../utils/graphql-hooks';

interface NavigationItemProps {
  title: string;
  to: string;
  icon: React.ReactNode;
}

function NavigationItem({ title, to, icon }: NavigationItemProps): JSX.Element {
  return (
    <Grid item xs={12} sm={6} md={3}>
      <ListItemAppLink to={to} button>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={title} />
      </ListItemAppLink>
    </Grid>
  );
}

function NavigationBox(): JSX.Element {
  const menu = useSiteMenu();
  return (
    <Grid container component="nav" alignItems="center">
      {menu.map(({ name, path, icon }) => (
        <NavigationItem key={path} to={path} title={name} icon={icon} />
      ))}
    </Grid>
  );
}

export default NavigationBox;
