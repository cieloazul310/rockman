import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import Switch from '@mui/material/Switch';
import SortIcon from '@mui/icons-material/Sort';
import { useAppState, useDispatch } from '../gatsby-theme-aoi-top-layout/utils/AppStateContext';

function ListItemToggleSort(): JSX.Element {
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
