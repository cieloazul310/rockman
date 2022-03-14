import * as React from 'react';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemToggleDarkMode, { ListItemToggleUseSystemTheme } from 'gatsby-theme-aoi/src/components/ListItemToggleDarkMode';
import ListItemToggleSort from '../../../components/ListItemToggleSort';

function StateHandler(): JSX.Element {
  return (
    <List subheader={<ListSubheader>設定</ListSubheader>}>
      <ListItemToggleSort />
      <ListItemToggleDarkMode label="ダークモード" />
      <ListItemToggleUseSystemTheme label="自動ダークモード" />
    </List>
  );
}

export default StateHandler;
