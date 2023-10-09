import * as React from "react";
import { graphql, type PageProps } from "gatsby";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Radio from "@mui/material/Radio";
import Checkbox from "@mui/material/Checkbox";
import Collapse from "@mui/material/Collapse";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import SearchIcon from "@mui/icons-material/Search";
import CancelIcon from "@mui/icons-material/Cancel";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FlagIcon from "@mui/icons-material/Flag";
import { AutoSizer } from "react-virtualized";
import Layout from "../layout";
import Seo from "../components/Seo";
import ArtistList from "../components/ArtistList/Container";
import { AdInSectionDivider } from "../components/Ads";
import { useAllNations } from "../utils/graphql-hooks";
import useSortedArtists from "../utils/useSortedArtists";
import { kanaToHira } from "../utils/sortByYomi";
import type { ArtistListItem } from "../../types";

type SortListProps = {
  handleSortType: (sortType: "abc" | "programs" | "tunes") => () => void;
  sortType: "abc" | "programs" | "tunes";
};

function SortList({ sortType, handleSortType }: SortListProps) {
  return (
    <List subheader={<ListSubheader>並び順</ListSubheader>}>
      <ListItem dense button onClick={handleSortType("abc")}>
        <ListItemIcon>
          <Radio edge="start" checked={sortType === "abc"} color="secondary" />
        </ListItemIcon>
        <ListItemText primary="abc" />
      </ListItem>
      <ListItem dense button onClick={handleSortType("programs")}>
        <ListItemIcon>
          <Radio
            edge="start"
            checked={sortType === "programs"}
            color="secondary"
          />
        </ListItemIcon>
        <ListItemText primary="登場回数" />
      </ListItem>
      <ListItem dense button onClick={handleSortType("tunes")}>
        <ListItemIcon>
          <Radio
            edge="start"
            checked={sortType === "tunes"}
            color="secondary"
          />
        </ListItemIcon>
        <ListItemText primary="曲数" />
      </ListItem>
    </List>
  );
}

type FilterListProps = {
  appearMultiple: boolean;
  setAppearMultiple: React.Dispatch<React.SetStateAction<boolean>>;
  appearOnce: boolean;
  setAppearOnce: React.Dispatch<React.SetStateAction<boolean>>;
  nations: {
    country: string;
    alpha2: string;
    alpha3: string;
    numeric: string;
    fieldValue: string;
    totalCount: number;
  }[];
  nationFilter: string[];
  setNationFilter: React.Dispatch<React.SetStateAction<string[]>>;
};

function FilterList({
  appearMultiple,
  setAppearMultiple,
  appearOnce,
  setAppearOnce,
  nations,
  nationFilter,
  setNationFilter,
}: FilterListProps) {
  const [nationFilterOpen, setNationFilterOpen] = React.useState(false);
  const toggleNationFilterOpen = () => {
    setNationFilterOpen(!nationFilterOpen);
  };
  const toggleAppearMultiple = () => {
    setAppearMultiple(!appearMultiple);
  };
  const toggleAppearOnce = () => {
    setAppearOnce(!appearOnce);
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

  return (
    <List subheader={<ListSubheader>フィルタ</ListSubheader>}>
      <ListItem dense>
        <ListItemButton onClick={toggleAppearMultiple}>
          <ListItemIcon>
            <Checkbox edge="start" checked={appearMultiple} color="secondary" />
          </ListItemIcon>
          <ListItemText primary="複数回登場" />
        </ListItemButton>
      </ListItem>
      <ListItem dense>
        <ListItemButton onClick={toggleAppearOnce}>
          <ListItemIcon>
            <Checkbox edge="start" checked={appearOnce} color="secondary" />
          </ListItemIcon>
          <ListItemText primary="1回のみ登場" />
        </ListItemButton>
      </ListItem>
      <ListItem dense>
        <ListItemButton onClick={toggleNationFilterOpen}>
          <ListItemIcon>
            <FlagIcon />
          </ListItemIcon>
          <ListItemText primary="地域別" />
          {nationFilterOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItemButton>
      </ListItem>
      <Collapse in={nationFilterOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem sx={{ pl: 4 }} dense>
            <ListItemButton onClick={resetNationFilter}>
              <ListItemText primary="すべてのチェックをつける" />
            </ListItemButton>
          </ListItem>
          <ListItem sx={{ pl: 4 }} dense>
            <ListItemButton onClick={clearNationFilter}>
              <ListItemText primary="すべてのチェックを外す" />
            </ListItemButton>
          </ListItem>
          {nations.map(({ fieldValue, totalCount, country }) => (
            <ListItem sx={{ pl: 4 }} key={fieldValue} dense>
              <ListItemButton onClick={toggleNationFilter(fieldValue)}>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={nationFilter.includes(fieldValue)}
                    color="secondary"
                  />
                </ListItemIcon>
                <ListItemText primary={country} />
                <Typography variant="button" component="span">
                  {totalCount}
                </Typography>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Collapse>
    </List>
  );
}

type SearchFieldProps = {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
};

function SearchField({ searchText, setSearchText }: SearchFieldProps) {
  const onChangeSearchText = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    event.preventDefault();
    setSearchText(event.target.value);
  };
  const clearSearchText = () => {
    setSearchText("");
  };
  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <Paper
      component="form"
      sx={{ display: "flex", flexShrink: 1, px: 2 }}
      onSubmit={onSubmit}
    >
      <IconButton disabled edge="start" size="large">
        <SearchIcon />
      </IconButton>
      <InputBase
        value={searchText}
        onChange={onChangeSearchText}
        sx={{ flexGrow: 1, fontSize: { xs: "16px", sm: "16px" } }}
        placeholder="アーティストを検索"
        inputProps={{ "aria-label": "search artists" }}
      />
      {searchText !== "" ? (
        <IconButton edge="end" onClick={clearSearchText} size="large">
          <CancelIcon />
        </IconButton>
      ) : null}
    </Paper>
  );
}

type ArtistsPageQueryData = {
  allArtist: {
    totalCount: number;
    nodes: ArtistListItem[];
    /*
    nodes: (Omit<Artist, 'program'> & {
      program: Pick<Artist['program'], 'programsCount' | 'tunesCount' | 'image'>;
    })[];
    */
  };
};

type StoredState = {
  sortType: "programs" | "tunes" | "abc";
  searchText: string;
  appearMultiple: boolean;
  appearOnce: boolean;
  nationFilter: string[];
};

function ArtistsPage({ data }: PageProps<ArtistsPageQueryData>) {
  const { allArtist } = data;
  const { breakpoints } = useTheme();
  const isMobile = useMediaQuery(breakpoints.only("xs"));
  const nations = useAllNations();

  const stored =
    typeof window === "object" ? sessionStorage.getItem("artistFilters") : null;
  const initialState: Partial<StoredState> = stored ? JSON.parse(stored) : {};
  const [sortType, setSortType] = React.useState<"programs" | "tunes" | "abc">(
    initialState.sortType ?? "programs",
  );
  const [appearMultiple, setAppearMultiple] = React.useState(
    initialState.appearMultiple ?? true,
  );
  const [appearOnce, setAppearOnce] = React.useState(
    initialState.appearOnce ?? true,
  );
  const [nationFilter, setNationFilter] = React.useState(
    initialState.nationFilter ?? nations.map(({ fieldValue }) => fieldValue),
  );
  const [searchText, setSearchText] = React.useState(
    initialState.searchText ?? "",
  );

  React.useEffect(() => {
    if (window && typeof window === "object") {
      sessionStorage.setItem(
        "artistFilters",
        JSON.stringify({
          sortType,
          searchText,
          appearMultiple,
          appearOnce,
          nationFilter,
        }),
      );
    }
  }, [sortType, searchText, appearMultiple, appearOnce, nationFilter]);

  const handleSortType = (newSortType: "abc" | "programs" | "tunes") => () => {
    setSortType(newSortType);
  };
  const searchFilter = React.useCallback(
    (artist: ArtistListItem) => {
      if (searchText === "") return true;
      const regex = RegExp(
        searchText.replace(/([.^$|*+?()[\]{}\\-])/g, "\\$1"),
        "i",
      );
      const { name, kana } = artist;
      if (regex.test(name)) return true;
      if (regex.test(name.replace(/([^a-zA-z0-9]+)/g, () => ""))) return true;
      if (regex.test(kanaToHira(name))) return true;
      if (kana && regex.test(kana)) return true;
      return false;
    },
    [searchText],
  );
  const appearFilters = React.useCallback(
    (artist: ArtistListItem) => {
      if (appearMultiple && appearOnce) return true;
      if (appearMultiple) return artist.program.programsCount > 1;
      if (appearOnce) return artist.program.programsCount === 1;
      return false;
    },
    [appearMultiple, appearOnce],
  );
  const nationFilters = React.useCallback(
    (artist: ArtistListItem) => nationFilter.includes(artist.nation),
    [nationFilter],
  );
  const filters = React.useCallback(
    (artist: ArtistListItem) =>
      [searchFilter, nationFilters, appearFilters].every((filter) =>
        filter(artist),
      ),
    [searchFilter, nationFilters, appearFilters],
  );

  const filteredArtists = React.useMemo(
    () => allArtist.nodes.filter(filters),
    [allArtist, filters],
  );
  const renderArtists = useSortedArtists(filteredArtists, sortType);

  return (
    <Layout
      title="アーティスト一覧"
      drawerContents={
        isMobile ? (
          <div>
            <SortList sortType={sortType} handleSortType={handleSortType} />
            <FilterList
              appearMultiple={appearMultiple}
              setAppearMultiple={setAppearMultiple}
              appearOnce={appearOnce}
              setAppearOnce={setAppearOnce}
              nations={nations}
              nationFilter={nationFilter}
              setNationFilter={setNationFilter}
            />
          </div>
        ) : undefined
      }
    >
      <Box
        display="flex"
        flexDirection="column"
        height={{ xs: "calc(100vh - 56px)", sm: "calc(100vh - 64px)" }}
      >
        <Container maxWidth="lg" sx={{ py: 2, flexShrink: 0 }}>
          <SearchField searchText={searchText} setSearchText={setSearchText} />
        </Container>
        <Container
          maxWidth="lg"
          sx={{ flexGrow: 1, overflow: "hidden" }}
          disableGutters={isMobile}
        >
          <Box display="flex" height={1}>
            {!isMobile ? (
              <Box flex={1} height={1} overflow="auto">
                <SortList sortType={sortType} handleSortType={handleSortType} />
                <FilterList
                  appearMultiple={appearMultiple}
                  setAppearMultiple={setAppearMultiple}
                  appearOnce={appearOnce}
                  setAppearOnce={setAppearOnce}
                  nations={nations}
                  nationFilter={nationFilter}
                  setNationFilter={setNationFilter}
                />
              </Box>
            ) : null}
            <Box flex={2} display="flex" flexDirection="column">
              <Box
                display="flex"
                px={2}
                pt={1}
                justifyContent="flex-end"
                alignItems="baseline"
              >
                <Typography variant="body2">
                  {filteredArtists.length}組 / 全{allArtist.totalCount}組
                </Typography>
              </Box>
              <Box flexGrow={1} p={1}>
                <AutoSizer defaultHeight={400}>
                  {({ width, height }) => (
                    <ArtistList
                      width={width}
                      height={height}
                      artists={renderArtists}
                    />
                  )}
                </AutoSizer>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
      <AdInSectionDivider />
    </Layout>
  );
}

export default ArtistsPage;

export function Head() {
  return <Seo title="オンエアアーティスト一覧" />;
}

export const query = graphql`
  {
    allArtist(
      sort: [
        { program: { programsCount: DESC } }
        { program: { tunesCount: DESC } }
        { sortName: ASC }
      ]
    ) {
      totalCount
      nodes {
        ...minimumArtist
        kana
        sortName
      }
    }
  }
`;
