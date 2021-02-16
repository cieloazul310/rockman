import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { HomeIcon, ProgramIcon, ArtistIcon, CategoryIcon, SelectorIcon } from '../../icons';
import ListItemAppLink from 'gatsby-theme-aoi/src/components/ListItemAppLink';

interface NavigationItemProps {
  title: string;
  to: string;
  icon: React.ReactNode;
  dense?: boolean;
}

function NavigationItem({ title, to, icon, dense = false }: NavigationItemProps) {
  return (
    <Grid item xs={12} sm={6} md={3}>
      <ListItemAppLink to={to} button dense={dense}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={title} />
      </ListItemAppLink>
    </Grid>
  );
}

function NavigationBox() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  return (
    <Grid container component="nav">
      <NavigationItem to="/" title="トップページ" icon={<HomeIcon />} dense={isMobile} />
      <NavigationItem to="/programs/" title="放送回一覧" icon={<ProgramIcon />} dense={isMobile} />
      <NavigationItem to="/artists/" title="アーティスト一覧" icon={<ArtistIcon />} dense={isMobile} />
      <NavigationItem to="/categories/" title="テーマ" icon={<CategoryIcon />} dense={isMobile} />
      <NavigationItem to="/selectors/" title="選曲者" icon={<SelectorIcon />} dense={isMobile} />
    </Grid>
  );
}

export default NavigationBox;
