import * as React from 'react';
import { graphql, navigate, PageProps } from 'gatsby';
import Typography from '@mui/material/Typography';
import SwipeableViews from 'react-swipeable-views';
import { bindKeyboard } from 'react-swipeable-views-utils';
import { Section, SectionDivider } from '@cieloazul310/gatsby-theme-aoi';
import { PageNavigationContainer, PageNavigationItem } from '@cieloazul310/gatsby-theme-aoi-blog-components';
import Layout from '../layout';
import { ArtistPageHeader } from '../components/PageHeader';
import TunesByProgram from '../components/TunesByProgram';
import ArtistItemContainer from '../components/ArtistItemContainer';
import { ArtistBrowser, ProgramBrowser, MinimumArtist, TuneFields } from '../../types';
/*
import Section, { SectionDivider } from '../components/Section';
import { ArtistPageHeader } from '../components/PageHeader';
import TunesByProgram from '../components/TunesByProgram';
import ArtistItemContainer from '../components/ArtistItemContainer';
import PageNavigation from '../components/PageNavigation';
import DrawerNavigation from '../components/DrawerNavigation';
import NavigationBox from '../components/NavigationBox';
import { AdBasic } from '../components/Ads';
import { ArtistTonarinoTab } from '../components/TonarinoTab';
import { useSortProgram } from '../utils/useSorter';
import nonNullable from '../utils/nonNullable';
import { ArtistTemplateQuery, SitePageContext } from '../../graphql-types';
*/

const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);

type ArtistTemplateData = {
  artist: Pick<ArtistBrowser, 'name' | 'kana' | 'nation'> & {
    program: Pick<ArtistBrowser['program'], 'programsCount' | 'tunesCount' | 'image'> & {
      programs: (Pick<ProgramBrowser, 'id' | 'week' | 'date' | 'slug' | 'title' | 'subtitle'> & {
        playlist: TuneFields[];
      })[];
      relatedArtists: MinimumArtist[];
    };
  };
  previous: MinimumArtist | null;
  next: MinimumArtist | null;
};
type ArtistTemplateContext = {
  index: number;
};

function ArtistTemplate({ data }: PageProps<ArtistTemplateData, ArtistTemplateContext>) {
  const { artist, previous, next } = data;
  // const { index } = pageContext;

  return (
    <Layout title={artist.name}>
      <ArtistPageHeader artist={artist} />
      <SectionDivider />
      {artist.program.programs.map((program) => (
        <TunesByProgram key={program.id} program={program} />
      ))}
      <Section>
        <ArtistItemContainer title="同じ回で登場したアーティスト" artists={artist.program.relatedArtists} />
      </Section>
      <SectionDivider />
      <Section>
        <PageNavigationContainer>
          <PageNavigationItem to={previous?.slug ?? '#'} disabled={!previous}>
            <Typography variant="body2">{previous?.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {previous?.program.tunesCount}曲 / {previous?.program.programsCount}回
            </Typography>
          </PageNavigationItem>
          <PageNavigationItem to={next?.slug ?? '#'} next disabled={!next}>
            <Typography variant="body2">{next?.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {next?.program.tunesCount}曲 / {next?.program.programsCount}回
            </Typography>
          </PageNavigationItem>
        </PageNavigationContainer>
      </Section>
    </Layout>
  );
  /*
  const artist = nonNullable(data.artist);
  const { previous, next } = pageContext;
  const sortProgram = useSortProgram();
  const initialIndex = previous ? 1 : 0;
  const handleChangeIndex = (index: number) => {
    if (index === initialIndex) return;
    if (next && index === initialIndex + 1) {
      navigate(next.slug ?? '#');
    }
    if (previous && index === initialIndex - 1) {
      navigate(previous.slug ?? '#');
    }
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
*/
}

export default ArtistTemplate;

export const query = graphql`
  query ArtistTemplate($slug: String!, $previous: String, $next: String) {
    artist(slug: { eq: $slug }) {
      name
      nation
      kana
      program {
        programs {
          id
          week
          title
          slug
          date(formatString: "YYYY-MM-DD")
          subtitle
          playlist {
            ...tuneFields
          }
        }
        programsCount
        tunesCount
        image
        relatedArtists {
          ...minimumArtist
        }
      }
    }
    previous: artist(slug: { eq: $previous }) {
      ...minimumArtist
    }
    next: artist(slug: { eq: $next }) {
      ...minimumArtist
    }
  }
`;
