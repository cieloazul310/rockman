import * as React from 'react';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import ListItemAppLink from 'gatsby-theme-typescript-material-ui/src/components/ListItemAppLink';
import {
  HomeIcon,
  ProgramIcon,
  ArtistIcon,
  CategoryIcon,
  SelectorIcon,
} from '../../../icons';

function DrawerContent() {
  return (
    <>
      <List subheader={<ListSubheader>Menu</ListSubheader>}>
        <ListItemAppLink
          to="/"
          primary="トップページ"
          selected={false}
          icon={<HomeIcon />}
        />
        <ListItemAppLink
          to="/programs/"
          primary="放送回"
          selected={false}
          icon={<ProgramIcon />}
        />
        <ListItemAppLink
          to="/artists/"
          primary="アーティスト"
          selected={false}
          icon={<ArtistIcon />}
        />
        <ListItemAppLink
          to="/categories/"
          primary="テーマ"
          selected={false}
          icon={<CategoryIcon />}
        />
        <ListItemAppLink
          to="/selectors/"
          primary="選曲者"
          selected={false}
          icon={<SelectorIcon />}
        />
      </List>
      <Divider />
    </>
  );
}

export default DrawerContent;
