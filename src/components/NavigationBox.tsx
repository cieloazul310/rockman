import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAppLink from 'gatsby-theme-aoi/src/components/ListItemAppLink';
import { HomeIcon, ProgramIcon, ArtistIcon, CategoryIcon, SelectorIcon, TakeOffIcon, TimeMachineIcon, AboutIcon } from '../icons';

interface NavigationItemProps {
  title: string;
  to: string;
  icon: React.ReactNode;
}

function NavigationItem({ title, to, icon }: NavigationItemProps): JSX.Element {
  return (
    <Grid item xs={12} sm={6} md={3}>
      <ListItemAppLink to={to} button>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={title} />
      </ListItemAppLink>
    </Grid>
  );
}

function NavigationBox(): JSX.Element {
  return (
    <Grid container component="nav" alignItems="center">
      <NavigationItem to="/" title="トップページ" icon={<HomeIcon />} />
      <NavigationItem to="/programs/" title="放送回一覧" icon={<ProgramIcon />} />
      <NavigationItem to="/artists/" title="アーティスト一覧" icon={<ArtistIcon />} />
      <NavigationItem to="/categories/" title="テーマ" icon={<CategoryIcon />} />
      <NavigationItem to="/selectors/" title="選曲者" icon={<SelectorIcon />} />
      <NavigationItem to="/takeoff/" title="漫遊前の一曲" icon={<TakeOffIcon />} />
      <NavigationItem to="/timemachine/" title="ちょっぴりタイムマシン" icon={<TimeMachineIcon />} />
      <NavigationItem to="/about/" title="サイトについて" icon={<AboutIcon />} />
    </Grid>
  );
}

export default NavigationBox;
