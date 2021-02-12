import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { HomeIcon, ProgramIcon, ArtistIcon, CategoryIcon, SelectorIcon, TimeMachineIcon } from '../../icons';
import ListItemAppLink from 'gatsby-theme-aoi/src/components/ListItemAppLink';

interface NavigationItemProps {
  title: string;
  to: string;
  icon: React.ReactNode;
}

function NavigationItem({ title, to, icon }: NavigationItemProps) {
  return (
    <Grid item xs={12} sm={6} md={3}>
      <ListItemAppLink to={to} button>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={title} />
      </ListItemAppLink>
    </Grid>
  );
}

function NavigationBox() {
  return (
    <Grid container component="nav" alignItems="center">
      <NavigationItem to="/" title="トップページ" icon={<HomeIcon />} />
      <NavigationItem to="/programs/" title="放送回一覧" icon={<ProgramIcon />} />
      <NavigationItem to="/artists/" title="アーティスト一覧" icon={<ArtistIcon />} />
      <NavigationItem to="/categories/" title="テーマ" icon={<CategoryIcon />} />
      <NavigationItem to="/selectors/" title="選曲者" icon={<SelectorIcon />} />
      <NavigationItem to="/timemachine/" title="ちょっぴりタイムマシン" icon={<TimeMachineIcon />} />
    </Grid>
  );
}

export default NavigationBox;
