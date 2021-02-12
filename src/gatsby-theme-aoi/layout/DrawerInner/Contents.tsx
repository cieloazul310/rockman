import * as React from 'react';
import { Link as GatsbyLink, withPrefix } from 'gatsby';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemAppLink from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { useLocation } from '@reach/router';
import { HomeIcon, ProgramIcon, ArtistIcon, CategoryIcon, SelectorIcon, TakeOffIcon, TimeMachineIcon } from '../../../icons';

function DrawerContent() {
  const { pathname } = useLocation();
  return (
    <List subheader={<ListSubheader>Menu</ListSubheader>}>
      <ListItemAppLink to="/" selected={pathname === withPrefix('/')} button component={GatsbyLink}>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="トップページ" />
      </ListItemAppLink>
      <ListItemAppLink to="/programs/" selected={pathname === withPrefix('/programs/')} button component={GatsbyLink}>
        <ListItemIcon>
          <ProgramIcon />
        </ListItemIcon>
        <ListItemText primary="放送回一覧" />
      </ListItemAppLink>
      <ListItemAppLink to="/artists/" selected={pathname === withPrefix('/artists/')} button component={GatsbyLink}>
        <ListItemIcon>
          <ArtistIcon />
        </ListItemIcon>
        <ListItemText primary="アーティスト" />
      </ListItemAppLink>
      <ListItemAppLink to="/categories/" selected={pathname === withPrefix('/categories/')} button component={GatsbyLink}>
        <ListItemIcon>
          <CategoryIcon />
        </ListItemIcon>
        <ListItemText primary="テーマ" />
      </ListItemAppLink>
      <ListItemAppLink to="/selectors/" selected={pathname === withPrefix('/selectors/')} button component={GatsbyLink}>
        <ListItemIcon>
          <SelectorIcon />
        </ListItemIcon>
        <ListItemText primary="選曲者" />
      </ListItemAppLink>
      <ListItemAppLink to="/boarding/" selected={pathname === withPrefix('/boarding/')} button component={GatsbyLink}>
        <ListItemIcon>
          <TakeOffIcon />
        </ListItemIcon>
        <ListItemText primary="漫遊前の一曲" />
      </ListItemAppLink>
      <ListItemAppLink to="/timemachine/" selected={pathname === withPrefix('/timemachine/')} button component={GatsbyLink}>
        <ListItemIcon>
          <TimeMachineIcon />
        </ListItemIcon>
        <ListItemText primary="ちょっぴりタイムマシン" />
      </ListItemAppLink>
    </List>
  );
}

export default DrawerContent;
