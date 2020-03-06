import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import CancelButton from '@material-ui/icons/Cancel';
import Layout from 'gatsby-theme-typescript-material-ui/src/layout';
import Artists, { ArtistItem } from '../components/Artists';

const useStyles = makeStyles((theme: Theme) => createStyles({
  searchBox: {
    padding: theme.spacing(1),
    display: 'flex'
  },
  searchText: {
    flex: 1
  }
}));

function ArtistsPage() {
  const classes = useStyles();
  const [searchText, setSearchText] = React.useState('');

  const filter = React.useMemo(() => {
    console.log(`search: ${searchText}`);
    if (searchText === '') {
      return () => true;
    } else {
      const regex = RegExp(`${searchText}`);
      return (artist: ArtistItem) => regex.test(artist[0]) || regex.test(artist[1]);
    }
  }, [searchText]);
  const _onChangeSearchText = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log(`input: ${event.target.value}`);
    setSearchText(event.target.value);
  }
  const _clearSearchText = () => {
    setSearchText('');
  }

  return (
    <Layout title="アーティスト一覧" maxWidth="md">
      <div>
        <Paper component="form" className={classes.searchBox}>
          <InputBase
            onChange={_onChangeSearchText}
            className={classes.searchText}
            placeholder="アーティストを検索"
            inputProps={{ 'aria-label': 'search artists' }}
          />
          <IconButton onClick={_clearSearchText}>
            <CancelButton />
          </IconButton>
        </Paper>
      </div>
      <Artists filter={filter} />
    </Layout>
  );
}

export default ArtistsPage;
