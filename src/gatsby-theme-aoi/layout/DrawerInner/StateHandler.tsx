import * as React from 'react';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemToggleDarkMode, {
  ListItemToggleUseSystemTheme
} from 'gatsby-theme-aoi/src/components/ListItemToggleDarkMode';
import ListItemToggleSort from '../../../components/ListItemToggleSort';

function StateHandler() {
  return (
    <List subheader={<ListSubheader>設定</ListSubheader>}>
      <ListItemToggleSort />
      <ListItemToggleDarkMode label="ダークモード" />
      <ListItemToggleUseSystemTheme label="自動ダークモード" />
    </List>
  );
}

export default StateHandler;
