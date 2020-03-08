import * as React from 'react';
import { Link as GatsbyLink } from 'gatsby';
//import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useLocation } from '@reach/router';
import Layout from 'gatsby-theme-typescript-material-ui/src/layout/TabPageLayout';
import { useAllArtists } from '../utils/graphql-hooks/useAllPrograms';
import { ArtistItem } from '../types';
/*
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableView from 'react-swipeable-views';
*/

function ArtistPage() {
  const location = useLocation();
  const allArtists = useAllArtists();
  const artists = allArtists
    .filter(artist => artist[3].length === 1)
    .filter((artist, index) => index < 20);
  console.log(artists);
  const [current, setArtist] = React.useState('');
  const _onItemClicked = (artist: ArtistItem) => () => {
    setArtist(artist[0]);
  };
  React.useEffect(() => {
    console.log('useEffect');
    //window.location.search = `name=${current}`;
  }, [current]);
  return (
    <Layout title={current}>
      <List>
        {artists.map((artist, index) => (
          <ListItem
            key={index}
            button
            selected={current === artist[0]}
            onClick={_onItemClicked(artist)}
          >
            <ListItemText primary={artist[0]} />
          </ListItem>
        ))}
      </List>
    </Layout>
  );
}

export default ArtistPage;
