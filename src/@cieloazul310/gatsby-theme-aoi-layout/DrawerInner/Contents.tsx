import * as React from 'react';
import { Link as GatsbyLink, withPrefix } from 'gatsby';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemAppLink from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useLocation } from '@reach/router';
import { useSiteMenu } from '../../../utils/graphql-hooks';

function DrawerContent(): JSX.Element {
  const { pathname } = useLocation();
  const menu = useSiteMenu();
  return (
    <List subheader={<ListSubheader>コンテンツ</ListSubheader>}>
      {menu.map(({ name, path, icon }) => (
        <ListItemAppLink key={path} to={path} selected={pathname === withPrefix(path)} button component={GatsbyLink}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={name} />
        </ListItemAppLink>
      ))}
    </List>
  );
}

export default DrawerContent;
