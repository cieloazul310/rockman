import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Collapse from '@material-ui/core/Collapse';
import Radio from '@material-ui/core/Radio';
import Checkbox from '@material-ui/core/Checkbox';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, createStyles, useTheme, Theme } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import CancelIcon from '@material-ui/icons/Cancel';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FlagIcon from '@material-ui/icons/Flag';
import { AutoSizer } from 'react-virtualized';
import Layout from 'gatsby-theme-aoi/src/layout';
import Artists from '../components/Artists';
import useFullHeight from '../utils/useFullHeight';
import { ArtistItem, useAllNations } from '../utils/graphql-hooks';
import { SortType } from '../utils/sortByYomi';

interface StylesProps {
  height: number;
}

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

interface StoredState {
  sortType: SortType;
  searchText: string;
  appearMultiple: boolean;
  appearOnce: boolean;
  nationFilter: string[];
}

function ArtistsPage() {
  const stored = typeof window === 'object' ? sessionStorage.getItem('artistFilters') : null;
  const initialState: Partial<StoredState> = stored ? JSON.parse(stored) : {};

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const contentHeight = useFullHeight();
  const classes = useStyles({ height: contentHeight });
  const nations = useAllNations();

  const [sortType, setSortType] = React.useState<SortType>(initialState.sortType ?? 'edges');
  const [searchText, setSearchText] = React.useState(initialState.searchText ?? '');
  const [appearMultiple, setAppearMultiple] = React.useState(initialState.appearMultiple ?? true);
  const [appearOnce, setAppearOnce] = React.useState(initialState.appearOnce ?? true);
  const [nationFilter, setNationFilter] = React.useState(initialState.nationFilter ?? nations.map(({ nation }) => nation));
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
    } else {
      const regex = RegExp(`${searchText}`, 'i');
      return (artist: ArtistItem) => regex.test(artist.node.name) || (artist.node.kana ? regex.test(artist.node.kana) : false);
    }
  }, [searchText]);
  const _onChangeSearchText = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    event.preventDefault();
    setSearchText(event.target.value);
  };
  const _clearSearchText = () => {
    setSearchText('');
  };
  const _setSortType = (newSortType: SortType) => () => {
    setSortType(newSortType);
  };
  const _toggleAppearMultiple = () => {
    setAppearMultiple(!appearMultiple);
  };
  const _toggleAppearOnce = () => {
    setAppearOnce(!appearOnce);
  };
  const _toggleNationFilterOpen = () => {
    setNationFilterOpen(!nationFilterOpen);
  };
  const _toggleNationFilter = (newNation: string) => () => {
    if (nationFilter.includes(newNation)) {
      setNationFilter(nationFilter.filter((nation) => nation !== newNation));
    } else {
      setNationFilter([...nationFilter, newNation]);
    }
  };
  const _clearNationFilter = () => {
    setNationFilter([]);
  };
  const _resetNationFilter = () => {
    setNationFilter(nations.map(({ nation }) => nation));
  };
  const appearFilters = React.useMemo(
    () => (artist: ArtistItem) =>
      appearMultiple && appearOnce
        ? true
        : appearMultiple
        ? artist.node.programCount > 1
        : appearOnce
        ? artist.node.programCount === 1
        : false,
    [appearMultiple, appearOnce]
  );
  const nationFilters = React.useMemo(() => (artist: ArtistItem) => nationFilter.includes(artist.node.nation), [nationFilter]);
  const filters = React.useMemo(() => [searchFilter, appearFilters, nationFilters], [searchFilter, appearFilters, nationFilters]);

  const SortList = () => (
    <List subheader={<ListSubheader>並び順</ListSubheader>}>
      <ListItem dense button onClick={_setSortType('abc')}>
        <ListItemIcon>
          <Radio edge="start" checked={sortType === 'abc'} />
        </ListItemIcon>
        <ListItemText primary="abc" />
      </ListItem>
      <ListItem dense button onClick={_setSortType('edges')}>
        <ListItemIcon>
          <Radio edge="start" checked={sortType === 'edges'} />
        </ListItemIcon>
        <ListItemText primary="登場回数" />
      </ListItem>
      <ListItem dense button onClick={_setSortType('tunes')}>
        <ListItemIcon>
          <Radio edge="start" checked={sortType === 'tunes'} />
        </ListItemIcon>
        <ListItemText primary="曲数" />
      </ListItem>
    </List>
  );

  const FilterList = () => (
    <List subheader={<ListSubheader>フィルタ</ListSubheader>}>
      <ListItem dense button onClick={_toggleAppearMultiple}>
        <ListItemIcon>
          <Checkbox edge="start" checked={appearMultiple} />
        </ListItemIcon>
        <ListItemText primary="複数回登場" />
      </ListItem>
      <ListItem dense button onClick={_toggleAppearOnce}>
        <ListItemIcon>
          <Checkbox edge="start" checked={appearOnce} />
        </ListItemIcon>
        <ListItemText primary="1回のみ登場" />
      </ListItem>
      <ListItem button dense onClick={_toggleNationFilterOpen}>
        <ListItemIcon>
          <FlagIcon />
        </ListItemIcon>
        <ListItemText primary="地域別" />
        {nationFilterOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItem>
      <Collapse in={nationFilterOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem className={classes.nested} button dense onClick={_resetNationFilter}>
            <ListItemText primary="すべてのチェックをつける" />
          </ListItem>
          <ListItem className={classes.nested} button dense onClick={_clearNationFilter}>
            <ListItemText primary="すべてのチェックを外す" />
          </ListItem>
          {nations.map((nation) => (
            <ListItem className={classes.nested} key={nation.nation} dense button onClick={_toggleNationFilter(nation.nation)}>
              <ListItemIcon>
                <Checkbox edge="start" checked={nationFilter.includes(nation.nation)} />
              </ListItemIcon>
              <ListItemText primary={nation.nation} />
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
      maxWidth="md"
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
              <IconButton disabled edge="start">
                <SearchIcon />
              </IconButton>
              <InputBase
                value={searchText}
                onChange={_onChangeSearchText}
                className={classes.searchText}
                placeholder="アーティストを検索"
                inputProps={{ 'aria-label': 'search artists' }}
              />
              {searchText !== '' ? (
                <IconButton edge="end" onClick={_clearSearchText}>
                  <CancelIcon />
                </IconButton>
              ) : null}
            </Paper>
          </div>
        </div>
        <div className={classes.main}>
          <Grid container className={classes.gridContainer}>
            <Hidden xsDown>
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
}

export default ArtistsPage;
