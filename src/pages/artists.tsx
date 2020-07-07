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
import Checkbox from '@material-ui/core/Checkbox';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Modal from '@material-ui/core/Modal';
import Divider from '@material-ui/core/Divider';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import CancelIcon from '@material-ui/icons/Cancel';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FlagIcon from '@material-ui/icons/Flag';
import FilterListIcon from '@material-ui/icons/FilterList';
import { AutoSizer } from 'react-virtualized';
import Layout from 'gatsby-theme-aoi/src/layout';
import Artists from '../components/Artists';
import ContentBasis from '../components/ContentBasis';
import useWindowSize from '../utils/useWindowSize';
import { useAllNations, ArtistItem } from '../utils/graphql-hooks';
import { SortType } from '../utils/sortByYomi';

const useStyles = makeStyles((theme) =>
  createStyles({
    searchBox: {
      padding: `0 ${theme.spacing(2)}px`,
      display: 'flex',
    },
    searchText: {
      flex: 1,
    },
    modal: {
      position: 'absolute',
      width: 480,
      maxWidth: '90%',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      boxShadow: theme.shadows[5],
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  })
);

function ArtistsPage() {
  const classes = useStyles();
  const nations = useAllNations();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [sortType, setSortType] = React.useState<SortType>('abc');
  const [searchText, setSearchText] = React.useState('');
  const [appearMultiple, setAppearMultiple] = React.useState(true);
  const [appearOnce, setAppearOnce] = React.useState(true);
  const [nationFilter, setNationFilter] = React.useState(nations.map((nation) => nation.nation));
  const [nationFilterOpen, setNationFilterOpen] = React.useState(false);

  const searchFilter = React.useMemo(() => {
    if (searchText === '') {
      return () => true;
    } else {
      const regex = RegExp(`${searchText}`, 'i');
      return (artist: ArtistItem) => regex.test(artist.fieldValue) || regex.test(artist.kana);
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
  const _toggleModalOpen = () => {
    setModalOpen(!modalOpen);
  };
  const _closeModal = () => {
    setModalOpen(false);
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
      appearMultiple && appearOnce ? true : appearMultiple ? artist.edges.length > 1 : appearOnce ? artist.edges.length === 1 : false,
    [appearMultiple, appearOnce]
  );
  const nationFilters = React.useMemo(() => (artist: ArtistItem) => nationFilter.includes(artist.nation), [nationFilter]);
  const filters = React.useMemo(() => [searchFilter, appearFilters, nationFilters], [searchFilter, appearFilters, nationFilters]);
  const windowHeight = useWindowSize().height;

  const ArtistHandler = () => (
    <div>
      <List subheader={<ListSubheader>並び順</ListSubheader>}>
        <ListItem dense button onClick={_setSortType('abc')}>
          <ListItemIcon>
            <Checkbox edge="start" checked={sortType === 'abc'} />
          </ListItemIcon>
          <ListItemText primary="abc" />
        </ListItem>
        <ListItem dense button onClick={_setSortType('edges')}>
          <ListItemIcon>
            <Checkbox edge="start" checked={sortType === 'edges'} />
          </ListItemIcon>
          <ListItemText primary="登場回数" />
        </ListItem>
        <ListItem dense button onClick={_setSortType('tunes')}>
          <ListItemIcon>
            <Checkbox edge="start" checked={sortType === 'tunes'} />
          </ListItemIcon>
          <ListItemText primary="曲数" />
        </ListItem>
      </List>
      <Divider />
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
                  {nation.artists}
                </Typography>
              </ListItem>
            ))}
          </List>
        </Collapse>
      </List>
    </div>
  );

  return (
    <Layout title="アーティスト一覧" maxWidth="md" disablePaddingTop componentViewports={{ BottomNav: false }}>
      <ContentBasis>
        <Paper component="form" className={classes.searchBox}>
          <Hidden xsDown>
            <IconButton disabled edge="start">
              <SearchIcon />
            </IconButton>
          </Hidden>
          <Hidden smUp>
            <Tooltip title="フィルタを設定">
              <IconButton edge="start" onClick={_toggleModalOpen}>
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          </Hidden>
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
      </ContentBasis>
      <Grid container>
        <Hidden xsDown>
          <Grid item sm={4}>
            <ArtistHandler />
          </Grid>
        </Hidden>
        <Grid item xs={12} sm={8}>
          <ContentBasis>
            <AutoSizer disableHeight defaultHeight={windowHeight ? windowHeight - 240 : 400}>
              {({ width, height }) => <Artists width={width} height={height} filters={filters} sortType={sortType} />}
            </AutoSizer>
          </ContentBasis>
        </Grid>
      </Grid>
      <Modal open={modalOpen} onClose={_closeModal} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
        <Paper className={classes.modal}>
          <ArtistHandler />
        </Paper>
      </Modal>
    </Layout>
  );
}

export default ArtistsPage;
