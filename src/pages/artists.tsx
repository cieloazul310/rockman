import * as React from 'react';
import { graphql, PageProps } from 'gatsby';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';

import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import Layout from '../layout';
/*
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Hidden from '@mui/material/Hidden';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Collapse from '@mui/material/Collapse';
import Radio from '@mui/material/Radio';
import Checkbox from '@mui/material/Checkbox';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme, Theme } from '@mui/material/styles';

import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FlagIcon from '@mui/icons-material/Flag';
import { AutoSizer } from 'react-virtualized';
import { Layout } from '@cieloazul310/gatsby-theme-aoi';
import Artists from '../components/Artists';
import useFullHeight from '../utils/useFullHeight';
*/
// import { ArtistItem, useAllNations } from '../utils/graphql-hooks';
import { SortType } from '../utils/sortByYomi';
import { MinimumArtist } from '../../types';

type ArtistsPageQueryData = {
  allArtist: {
    totalCount: number;
    edges: {
      node: MinimumArtist;
    }[];
  };
};

/*
const useStyles = makeStyles<Theme, StylesProps>((theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      height: ({ height }) => height,
    },
    searcher: {
      display: 'flex',
      flex: 'none',
      flexDirection: 'column',
      padding: theme.spacing(2, 0),
      maxHeight: '40vh',
    },
    searchBox: {
      display: 'flex',
      flexShrink: 1,
      padding: theme.spacing(0, 2),
    },
    searchText: {
      flexGrow: 1,
    },
    mobileFilters: {
      flexGrow: 1,
      overflow: 'auto',
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    main: {
      display: 'flex',
      flexGrow: 1,
      overflow: 'hidden',
    },
    gridContainer: {
      flexGrow: 1,
    },
    desktopGrid: {
      height: '100%',
      overflow: 'auto',
      webkitOverflowScrolling: 'touch',
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  })
);
*/
type StoredState = {
  sortType: SortType;
  searchText: string;
  appearMultiple: boolean;
  appearOnce: boolean;
  nationFilter: string[];
};

function ArtistsPage({ data }: PageProps<ArtistsPageQueryData>) {
  const { allArtist } = data;
  const stored = typeof window === 'object' ? sessionStorage.getItem('artistFilters') : null;
  const initialState: Partial<StoredState> = stored ? JSON.parse(stored) : {};
  const [searchText, setSearchText] = React.useState(initialState.searchText ?? '');
  const onChangeSearchText = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    event.preventDefault();
    setSearchText(event.target.value);
  };
  const clearSearchText = () => {
    setSearchText('');
  };
  /*
  const stored = typeof window === 'object' ? sessionStorage.getItem('artistFilters') : null;
  const initialState: Partial<StoredState> = stored ? JSON.parse(stored) : {};

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const contentHeight = useFullHeight();
  const classes = useStyles({ height: contentHeight });
  const nations = useAllNations();

  const [sortType, setSortType] = React.useState<SortType>(initialState.sortType ?? 'edges');
  const [searchText, setSearchText] = React.useState(initialState.searchText ?? '');
  const [appearMultiple, setAppearMultiple] = React.useState(initialState.appearMultiple ?? true);
  const [appearOnce, setAppearOnce] = React.useState(initialState.appearOnce ?? true);
  const [nationFilter, setNationFilter] = React.useState(initialState.nationFilter ?? nations.map(({ fieldValue }) => fieldValue));
  const [nationFilterOpen, setNationFilterOpen] = React.useState(false);

  React.useEffect(() => {
    if (window && typeof window === 'object') {
      sessionStorage.setItem(
        'artistFilters',
        JSON.stringify({
          sortType,
          searchText,
          appearMultiple,
          appearOnce,
          nationFilter,
        })
      );
    }
  }, [sortType, searchText, appearMultiple, appearOnce, nationFilter]);

  const searchFilter = React.useMemo(() => {
    if (searchText === '') {
      return () => true;
    }
    const regex = RegExp(searchText.replace(/([.^$|*+?()[\]{}\\-])/g, '\\$1'), 'i');
    return (artist: ArtistItem) => regex.test(artist.node.name) || (artist.node.kana ? regex.test(artist.node.kana) : false);
  }, [searchText]);
  const onChangeSearchText = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    event.preventDefault();
    setSearchText(event.target.value);
  };
  const clearSearchText = () => {
    setSearchText('');
  };
  const handleSortType = (newSortType: SortType) => () => {
    setSortType(newSortType);
  };
  const toggleAppearMultiple = () => {
    setAppearMultiple(!appearMultiple);
  };
  const toggleAppearOnce = () => {
    setAppearOnce(!appearOnce);
  };
  const toggleNationFilterOpen = () => {
    setNationFilterOpen(!nationFilterOpen);
  };
  const toggleNationFilter = (newNation: string) => () => {
    if (nationFilter.includes(newNation)) {
      setNationFilter(nationFilter.filter((nation) => nation !== newNation));
    } else {
      setNationFilter([...nationFilter, newNation]);
    }
  };
  const clearNationFilter = () => {
    setNationFilter([]);
  };
  const resetNationFilter = () => {
    setNationFilter(nations.map(({ fieldValue }) => fieldValue));
  };
  const appearFilters = React.useMemo(
    () => (artist: ArtistItem) => {
      if (appearMultiple && appearOnce) return true;
      if (appearMultiple) return artist.node.programCount > 1;
      if (appearOnce) return artist.node.programCount === 1;
      return false;
    },
    [appearMultiple, appearOnce]
  );
  const nationFilters = React.useMemo(() => (artist: ArtistItem) => nationFilter.includes(artist.node.nation), [nationFilter]);
  const filters = React.useMemo(() => [searchFilter, appearFilters, nationFilters], [searchFilter, appearFilters, nationFilters]);

  const SortList = () => (
    <List subheader={<ListSubheader>並び順</ListSubheader>}>
      <ListItem dense button onClick={handleSortType('abc')}>
        <ListItemIcon>
          <Radio edge="start" checked={sortType === 'abc'} />
        </ListItemIcon>
        <ListItemText primary="abc" />
      </ListItem>
      <ListItem dense button onClick={handleSortType('edges')}>
        <ListItemIcon>
          <Radio edge="start" checked={sortType === 'edges'} />
        </ListItemIcon>
        <ListItemText primary="登場回数" />
      </ListItem>
      <ListItem dense button onClick={handleSortType('tunes')}>
        <ListItemIcon>
          <Radio edge="start" checked={sortType === 'tunes'} />
        </ListItemIcon>
        <ListItemText primary="曲数" />
      </ListItem>
    </List>
  );

  const FilterList = () => (
    <List subheader={<ListSubheader>フィルタ</ListSubheader>}>
      <ListItem dense button onClick={toggleAppearMultiple}>
        <ListItemIcon>
          <Checkbox edge="start" checked={appearMultiple} />
        </ListItemIcon>
        <ListItemText primary="複数回登場" />
      </ListItem>
      <ListItem dense button onClick={toggleAppearOnce}>
        <ListItemIcon>
          <Checkbox edge="start" checked={appearOnce} />
        </ListItemIcon>
        <ListItemText primary="1回のみ登場" />
      </ListItem>
      <ListItem button dense onClick={toggleNationFilterOpen}>
        <ListItemIcon>
          <FlagIcon />
        </ListItemIcon>
        <ListItemText primary="地域別" />
        {nationFilterOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItem>
      <Collapse in={nationFilterOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem className={classes.nested} button dense onClick={resetNationFilter}>
            <ListItemText primary="すべてのチェックをつける" />
          </ListItem>
          <ListItem className={classes.nested} button dense onClick={clearNationFilter}>
            <ListItemText primary="すべてのチェックを外す" />
          </ListItem>
          {nations.map((nation) => (
            <ListItem className={classes.nested} key={nation.fieldValue} dense button onClick={toggleNationFilter(nation.fieldValue)}>
              <ListItemIcon>
                <Checkbox edge="start" checked={nationFilter.includes(nation.fieldValue)} />
              </ListItemIcon>
              <ListItemText primary={nation.fieldValue} />
              <Typography variant="button" component="span">
                {nation.totalCount}
              </Typography>
            </ListItem>
          ))}
        </List>
      </Collapse>
    </List>
  );

  return (
    <Layout
      title="アーティスト一覧"
      disablePaddingTop
      componentViewports={{ BottomNav: false }}
      drawerContents={
        isMobile ? (
          <div>
            <SortList />
            <FilterList />
          </div>
        ) : undefined
      }
    >
      <div className={classes.root}>
        <div className={classes.searcher}>
          <div>
            <Paper component="form" className={classes.searchBox}>
              <IconButton disabled edge="start" size="large">
                <SearchIcon />
              </IconButton>
              <InputBase
                value={searchText}
                onChange={onChangeSearchText}
                className={classes.searchText}
                placeholder="アーティストを検索"
                inputProps={{ 'aria-label': 'search artists' }}
              />
              {searchText !== '' ? (
                <IconButton edge="end" onClick={clearSearchText} size="large">
                  <CancelIcon />
                </IconButton>
              ) : null}
            </Paper>
          </div>
        </div>
        <div className={classes.main}>
          <Grid container className={classes.gridContainer}>
            <Hidden smDown>
              <Grid item sm={4} className={classes.desktopGrid}>
                <SortList />
                <FilterList />
              </Grid>
            </Hidden>
            <Grid item xs={12} sm={8} className={classes.desktopGrid}>
              <AutoSizer defaultHeight={contentHeight}>
                {({ width, height }) => <Artists width={width} height={height} filters={filters} sortType={sortType} />}
              </AutoSizer>
            </Grid>
          </Grid>
        </div>
      </div>
    </Layout>
  );
  */
  return (
    <Layout title="アーティスト一覧">
      <Box
        display="flex"
        flexDirection={{ xs: 'column-reverse', sm: 'column' }}
        height={{ xs: 'calc(100vh - 56px)', sm: 'calc(100vh - 64px)' }}
      >
        <Container maxWidth="lg" sx={{ py: 1, flexShrink: 0 }}>
          <Paper component="form" sx={{ display: 'flex', flexShrink: 1, px: 2 }}>
            <IconButton disabled edge="start" size="large">
              <SearchIcon />
            </IconButton>
            <InputBase
              value={searchText}
              onChange={onChangeSearchText}
              sx={{ flexGrow: 1 }}
              placeholder="アーティストを検索"
              inputProps={{ 'aria-label': 'search artists' }}
            />
            {searchText !== '' ? (
              <IconButton edge="end" onClick={clearSearchText} size="large">
                <CancelIcon />
              </IconButton>
            ) : null}
          </Paper>
        </Container>
        <Container maxWidth="lg" sx={{ flexGrow: 1, overflow: 'hidden' }}>
          <Box display="flex" height={1}>
            <Box flex={1}>
              <p>aaa</p>
            </Box>
            <Box flex={2} overflow="auto">
              <Box>
                {allArtist.edges.map(({ node }) => (
                  <p key={node.slug}>{node.name}</p>
                ))}
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </Layout>
  );
}

export default ArtistsPage;

export const query = graphql`
  query {
    allArtist(sort: { fields: [program___programsCount, program___tunesCount], order: [DESC, DESC] }) {
      totalCount
      edges {
        node {
          ...minimumArtist
        }
      }
    }
  }
`;
