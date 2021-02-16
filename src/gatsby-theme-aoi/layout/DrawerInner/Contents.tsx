import * as React from 'react';
import { Link as GatsbyLink, withPrefix } from 'gatsby';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemAppLink from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
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
