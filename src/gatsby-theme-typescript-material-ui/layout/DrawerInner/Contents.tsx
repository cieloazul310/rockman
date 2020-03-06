import * as React from 'react';
import { withPrefix } from 'gatsby';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import ListItemAppLink from 'gatsby-theme-typescript-material-ui/src/components/ListItemAppLink';
import { useLocation } from '@reach/router';
import {
  HomeIcon,
  ProgramIcon,
  ArtistIcon,
  CategoryIcon,
  SelectorIcon,
  CornerIcon,
} from '../../../icons';

function DrawerContent() {
  const { pathname } = useLocation();
  console.log(pathname);
  console.log(withPrefix(pathname));
  return (
    <>
      <List subheader={<ListSubheader>Menu</ListSubheader>}>
        <ListItemAppLink
          to="/"
          primary="トップページ"
          selected={withPrefix(pathname) === '/'}
          icon={<HomeIcon />}
        />
        <ListItemAppLink
          to="/programs/"
          primary="放送回"
          selected={withPrefix(pathname) === '/programs/'}
          icon={<ProgramIcon />}
        />
        <ListItemAppLink
          to="/artists/"
          primary="アーティスト"
          selected={withPrefix(pathname) === '/artists/'}
          icon={<ArtistIcon />}
        />
        <ListItemAppLink
          to="/categories/"
          primary="テーマ"
          selected={withPrefix(pathname) === '/categories/'}
          icon={<CategoryIcon />}
        />
        <ListItemAppLink
          to="/corners/"
          primary="コーナー"
          selected={withPrefix(pathname) === '/corners/'}
          icon={<CornerIcon />}
        />
        <ListItemAppLink
          to="/selectors/"
          primary="選曲者"
          selected={withPrefix(pathname) === '/selectors/'}
          icon={<SelectorIcon />}
        />
      </List>
      <Divider />
    </>
  );
}

export default DrawerContent;
