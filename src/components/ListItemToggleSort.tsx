import * as React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Switch from '@material-ui/core/Switch';
import SortIcon from '@material-ui/icons/Sort';
import { useAppState, useDispatch } from '../gatsby-theme-aoi-top-layout/utils/AppStateContext';

function ListItemToggleSort() {
  const { sort } = useAppState();
  const dispatch = useDispatch();
  const toggleSort = () => {
    dispatch({ type: 'TOGGLE_SORT' });
  };
  return (
    <ListItem>
      <ListItemIcon>
        <SortIcon />
      </ListItemIcon>
      <ListItemText primary="新しい順" />
      <ListItemSecondaryAction>
        <Switch edge="end" onChange={toggleSort} checked={sort === 'newer'} inputProps={{ 'aria-labelledby': 'switch-list-toggle-sort' }} />
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default ListItemToggleSort;
