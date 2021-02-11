import * as React from 'react';
import { graphql, navigate } from 'gatsby';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import { bindKeyboard } from 'react-swipeable-views-utils';
import Layout from '../layout/';
import Section, { SectionDivider } from '../components/Section';
import { ArtistPageHeader } from '../components/PageHeader';
import TunesByProgram, { TunesByProgramSkeleton } from '../components/TunesByProgram';
import ArtistItemContainer from '../components/ArtistItemContainer';
import PageNavigation from '../components/PageNavigation';
import DrawerNavigation from '../components/DrawerNavigation';
import NavigationBox from '../components/NavigationBox';
import { AdInArticle } from '../components/Ads';
import { useSortProgram } from '../utils/useSorter';
import { ArtistTemplateQuery, SitePageContext, SitePageContextPrevious, SitePageContextNext } from '../../graphql-types';

const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);

interface Props {
  data: ArtistTemplateQuery;
  pageContext: SitePageContext;
}

function ArtistTemplate({ data, pageContext }: Props) {
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
  };
  const programs = data.artist?.program?.map((program) => ({
    ...program,
    playlist: data.artist?.tunes?.filter((tune) => tune?.week === program?.week),
  }));
  const tabs = [
    previous ? <TonarinoTab key={previous?.name} item={previous} /> : null,
    <div key="main">
      <ArtistPageHeader artist={data.artist} />
      <SectionDivider />
      <Section>
        <Tabs indicatorColor="secondary" centered value={0}>
          <Tab label="曲" />
          <Tab label="詳細" />
        </Tabs>
        <div>
          {programs?.sort(sortProgram).map((program) => (
            <TunesByProgram key={program.week} program={program} />
          ))}
        </div>
      </Section>
      <SectionDivider />
      <AdInArticle />
      <SectionDivider />
      <Section>
        <ArtistItemContainer title="同じ回で登場したアーティスト" artists={data.artist?.relatedArtists} />
      </Section>
      <SectionDivider />
      <Section>
        <PageNavigation variant="artist" pageContext={pageContext} />
      </Section>
    </div>,
    next ? <TonarinoTab key={next.name} item={next} /> : null,
  ].filter((element): element is JSX.Element => Boolean(element));

  return (
    <Layout title={data.artist?.name} drawerContents={<DrawerNavigation pageContext={pageContext} variant="artist" />}>
      <BindKeyboardSwipeableViews index={1} onChangeIndex={handleChangeIndex} resistance>
        {tabs}
      </BindKeyboardSwipeableViews>
      <SectionDivider />
      <Section>
        <NavigationBox />
      </Section>
    </Layout>
  );

  interface TonarinoTabProps {
    item?: Pick<SitePageContextNext | SitePageContextPrevious, 'name' | 'image' | 'programCount' | 'tunesCount'> | null;
  }

  function TonarinoTab({ item }: TonarinoTabProps) {
    return (
      <div>
        <ArtistPageHeader artist={item} />
        <SectionDivider />
        <Section>
          <TunesByProgramSkeleton />
        </Section>
      </div>
    );
  }

  /*
  const allArtists = useAllArtists();
  const artists = React.useMemo(() => sortArtists(allArtists), [allArtists]);
  const { previous, next, index, fieldValue } = pageContext;
  const programs = data.allProgram.group.map(({ edges }) => edges[0]);
  const [loading, setLoading] = React.useState(false);
  const [tab, setTab] = React.useState(index);
  const _onChangeIndex = (i: number) => {
    setTab(i);
  };
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (tab !== index) {
        setLoading(true);
        navigate(`/artist/${artists[tab].fieldValue}`);
      }
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [tab, artists, index]);

  function slideRenderer({ index, key }: SlideRenderProps) {
    const item = artists[index];
    return (
      <div key={key}>
        <Jumbotron title={item.fieldValue} subtitle={`登場回: ${item.edges.length} 曲数: ${item.tunes.length}`} imgUrl={item.img} />
        <Container maxWidth="md">
          <Box pt={4}>
            {item.fieldValue === fieldValue ? (
              <div>
                <LazyViewer programs={programs.map(({ node }) => node)} filter={(tune) => tune.artist === fieldValue} />
                <ContentBasis>
                  <PageNavigation {...createNavigationProps(previous, next, '/artist')} />
                </ContentBasis>
                {item.fieldValue !== 'スピッツ' ? (
                  <ContentBasis>
                    <Typography variant="h6" component="h3" gutterBottom>
                      {item.fieldValue}と同じ回で登場したアーティスト
                    </Typography>
                    <RelatedArtists edges={programs} />
                  </ContentBasis>
                ) : null}
                <ContentBasis>
                  <NavigationBox />
                </ContentBasis>
              </div>
            ) : (
              <div>
                <Box py={2}>
                  <Typography variant="subtitle2">
                    <Skeleton variant="text" width={100} />
                  </Typography>
                  <Typography variant="h6">
                    <Skeleton variant="text" />
                  </Typography>
                  <TuneCardSkeleton />
                </Box>
              </div>
            )}
          </Box>
        </Container>
      </div>
    );
  }

  return (
    <Layout
      title={fieldValue}
      disableGutters
      disablePaddingTop
      loading={loading}
      maxWidth={false}
      componentViewports={{ BottomNav: false }}
      drawerContents={<DrawerNavigation {...createNavigationProps(previous, next, '/artist')} />}
    >
      <VirtualizedSwipeableViews
        index={tab}
        onChangeIndex={_onChangeIndex}
        slideRenderer={slideRenderer}
        slideCount={artists.length}
        resistance
      />
    </Layout>
  );
  */
}

export default ArtistTemplate;

export const query = graphql`
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
