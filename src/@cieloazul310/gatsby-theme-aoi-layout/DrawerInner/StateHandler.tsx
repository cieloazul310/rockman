import * as React from 'react';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import { ListItemToggleDarkMode, ListItemToggleUseSystemTheme } from '@cieloazul310/gatsby-theme-aoi';
import ListItemToggleSort from '../../../components/ListItemToggleSort';

function StateHandler() {
  return (
    <List subheader={<ListSubheader>表示設定</ListSubheader>}>
      <ListItemToggleSort />
      <ListItemToggleDarkMode label="ダークモード" />
      <ListItemToggleUseSystemTheme label="自動ダークモード" />
    </List>
  );
}

export default StateHandler;
