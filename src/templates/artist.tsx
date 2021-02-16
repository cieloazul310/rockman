import * as React from 'react';
import { graphql, navigate } from 'gatsby';
import SwipeableViews from 'react-swipeable-views';
<<<<<<< HEAD
import { virtualize, bindKeyboard, SlideRenderProps } from 'react-swipeable-views-utils';
import Layout from 'gatsby-theme-aoi/src/layout';
import Jumbotron from '../components/Jumbotron';
import LazyViewer from '../components/LazyViewer';
import { TuneCardSkeleton } from '../components/TuneCard';
=======
import { bindKeyboard } from 'react-swipeable-views-utils';
import Layout from '../layout';
import Section, { SectionDivider } from '../components/Section';
import { ArtistPageHeader } from '../components/PageHeader';
import TunesByProgram from '../components/TunesByProgram';
import ArtistItemContainer from '../components/ArtistItemContainer';
import PageNavigation from '../components/PageNavigation';
>>>>>>> develop
import DrawerNavigation from '../components/DrawerNavigation';
import NavigationBox from '../components/NavigationBox';
<<<<<<< HEAD
import RelatedArtists from '../components/RelatedArtists';
import sortArtists from '../utils/sortByYomi';
import { useAllArtists } from '../utils/graphql-hooks/';
import { ArtistTemplateQuery, Program, ProgramPlaylist } from '../../graphql-types';

const VirtualizedSwipeableViews = bindKeyboard(virtualize(SwipeableViews));

interface Artist {
  fieldValue: string;
  edges: Program[];
  tunes: ProgramPlaylist[];
  img?: string;
}
=======
import { AdBasic } from '../components/Ads';
import { ArtistTonarinoTab } from '../components/TonarinoTab';
import { useSortProgram } from '../utils/useSorter';
import nonNullable from '../utils/nonNullable';
import { ArtistTemplateQuery, SitePageContext } from '../../graphql-types';

const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);
>>>>>>> develop

interface Props {
  data: ArtistTemplateQuery;
  pageContext: {
    fieldValue: string;
    previous?: Artist;
    next?: Artist;
    current: Artist;
    index: number;
  };
}

<<<<<<< HEAD
function ArtistTemplate({ data, pageContext }: Props) {
  const allArtists = useAllArtists();
  const artists = React.useMemo(() => sortArtists(allArtists), [allArtists]);
  const { previous, next, index, fieldValue } = pageContext;
  const programs = data.allProgram.group.map(({ edges }) => edges[0]);
  const [loading, setLoading] = React.useState(false);
  const [tab, setTab] = React.useState(index);
  const _onChangeIndex = (i: number) => {
    setTab(i);
=======
function ArtistTemplate({ data, pageContext }: Props): JSX.Element {
  const artist = nonNullable(data.artist);
  const { previous, next } = pageContext;
  const sortProgram = useSortProgram();
  const initialIndex = previous ? 1 : 0;
  const handleChangeIndex = (index: number) => {
    if (index === initialIndex) return;
    if (next && index === initialIndex + 1) {
      navigate(`/artist/${next.name}`);
    }
    if (previous && index === initialIndex - 1) {
      navigate(`/artist/${previous?.name}`);
    }
>>>>>>> develop
  };
  const programs = artist.program?.map((program) => ({
    ...program,
    playlist: artist.tunes?.filter((tune) => tune?.week === program?.week),
  }));
  const tabs = [
    previous ? <ArtistTonarinoTab key={previous?.name} item={previous} /> : null,
    <div key="main">
      <ArtistPageHeader artist={artist} />
      <SectionDivider />
      <Section>
        <div>
          {programs?.sort(sortProgram).map((program) => (
            <TunesByProgram key={program.week} program={program} />
          ))}
        </div>
      </Section>
      <SectionDivider />
      <AdBasic />
      <SectionDivider />
      <Section>
        <ArtistItemContainer title="同じ回で登場したアーティスト" artists={nonNullable(artist.relatedArtists)} />
      </Section>
      <SectionDivider />
      <Section>
        <PageNavigation variant="artist" pageContext={pageContext} />
      </Section>
    </div>,
    next ? <ArtistTonarinoTab key={next.name} item={next} /> : null,
  ].filter((element): element is JSX.Element => Boolean(element));

  return (
    <Layout title={artist.name} drawerContents={<DrawerNavigation pageContext={pageContext} variant="artist" />}>
      <BindKeyboardSwipeableViews index={initialIndex} onChangeIndex={handleChangeIndex} resistance>
        {tabs}
      </BindKeyboardSwipeableViews>
      <SectionDivider />
      <Section>
        <NavigationBox />
      </Section>
    </Layout>
  );
}

export default ArtistTemplate;

export const query = graphql`
<<<<<<< HEAD
  query ArtistTemplate($fieldValue: String!) {
    allProgram(filter: { playlist: { elemMatch: { artist: { eq: $fieldValue } } } }, sort: { fields: date, order: ASC }) {
      group(field: date, limit: 1) {
        edges {
          node {
            id
            title
            date(formatString: "YYYY-MM-DD")
            categories
            fields {
              slug
            }
            guests
            subtitle
            week
            year
            playlist {
              artist
              corner
              id
              indexInWeek
              index
              kana
              label
              name
              nation
              producer
              selector
              title
              week
              year
              youtube
            }
          }
        }
=======
  query ArtistTemplate($name: String!) {
    artist(name: { eq: $name }) {
      tunesCount
      programCount
      image
      kana
      name
      nation
      program {
        id
        date(formatString: "YYYY-MM-DD")
        week
        title
        subtitle
        fields {
          slug
        }
      }
      tunes {
        corner
        id
        indexInWeek
        artist {
          name
        }
        kana
        label
        nation
        selector
        title
        week
        year
        youtube
>>>>>>> develop
      }
      relatedArtists {
        name
        image
        tunesCount
        programCount
      }
    }
  }
`;
