import * as React from 'react';
import { graphql, navigate, PageProps } from 'gatsby';
import Typography from '@mui/material/Typography';
import SwipeableViews from 'react-swipeable-views';
import { bindKeyboard } from 'react-swipeable-views-utils';
import { Section, SectionDivider, Article } from '@cieloazul310/gatsby-theme-aoi';
import { DrawerPageNavigation, PageNavigationContainer, PageNavigationItem } from '@cieloazul310/gatsby-theme-aoi-blog-components';
import Layout from '../layout';
import { ProgramPageHeader } from '../components/PageHeader';
import Tune from '../components/Tune';
import ArtistItemContainer from '../components/ArtistItemContainer';
import { ProgramTonarinoTab } from '../components/TonarinoTab';
import { AdInSectionDivider } from '../components/Ads';
import removeMultiple from '../utils/removeMultiple';
import { ProgramBrowser, TuneBrowser } from '../../types';

const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);

type ProgramTemplateData = {
  program: ProgramBrowser;
  previous:
    | (Pick<ProgramBrowser, 'slug' | 'week' | 'date' | 'title' | 'subtitle' | 'image' | 'categories'> & {
        playlist: Pick<TuneBrowser, 'id'>[];
      })
    | null;
  next:
    | (Pick<ProgramBrowser, 'slug' | 'week' | 'date' | 'title' | 'subtitle' | 'image' | 'categories'> & {
        playlist: Pick<TuneBrowser, 'id'>[];
      })
    | null;
};

type ProgramTemplateContext = {
  slug: string;
  previous: string | null;
  next: string | null;
};

function ProgramTemplate({ data }: PageProps<ProgramTemplateData, ProgramTemplateContext>) {
  const { program, previous, next } = data;
  const initialIndex = previous ? 1 : 0;
  const handleChangeIndex = (index: number) => {
    if (index === initialIndex) return;
    if (next && next.slug && index === initialIndex + 1) {
      navigate(next.slug);
    }
    if (previous && previous.slug && index === initialIndex - 1) {
      navigate(previous.slug);
    }
  };
  const artists = program.playlist
    ? removeMultiple(
        program.playlist.map((tune) => tune?.artist),
        (item) => item?.name
      )
    : [];
  const tabs = [
    previous ? <ProgramTonarinoTab key={previous.title} item={previous} /> : null,
    <React.Fragment key="main">
      <ProgramPageHeader program={program} />
      <SectionDivider />
      <Section>
        <Article maxWidth="md" disableGutters>
          {program.playlist.map((tune) => (
            <Tune key={tune.id} tune={tune} />
          ))}
        </Article>
      </Section>
    </React.Fragment>,
    next ? <ProgramTonarinoTab key={next.title} item={next} /> : null,
  ].filter((element): element is JSX.Element => Boolean(element));

  return (
    <Layout
      title={program.title}
      drawerContents={
        <DrawerPageNavigation
          previous={previous ? { to: previous.slug, title: previous.title } : undefined}
          next={next ? { to: next.slug, title: next.title } : undefined}
        />
      }
    >
      <BindKeyboardSwipeableViews index={initialIndex} onChangeIndex={handleChangeIndex} resistance>
        {tabs}
      </BindKeyboardSwipeableViews>
      <AdInSectionDivider />
      <Section>
        <ArtistItemContainer title="登場アーティスト" artists={artists} />
      </Section>
      <SectionDivider />
      <Section>
        <PageNavigationContainer>
          <PageNavigationItem to={previous?.slug ?? '#'} disabled={!previous}>
            <Typography variant="body2">{previous?.title}</Typography>
            <Typography variant="body2" color="text.secondary">
              {previous?.date}
            </Typography>
          </PageNavigationItem>
          <PageNavigationItem to={next?.slug ?? '#'} next disabled={!next}>
            <Typography variant="body2">{next?.title}</Typography>
            <Typography variant="body2" color="text.secondary">
              {next?.date}
            </Typography>
          </PageNavigationItem>
        </PageNavigationContainer>
      </Section>
    </Layout>
  );
  /*
  const handleChangeIndex = (index: number) => {
    if (index === initialIndex) return;
    if (next && next?.fields?.slug && index === initialIndex + 1) {
      navigate(next.fields.slug);
    }
    if (previous && previous?.fields?.slug && index === initialIndex - 1) {
      navigate(previous.fields.slug);
    }
  };
  const artists = program.playlist
    ? removeMultiple(
        program.playlist.map((tune) => tune?.artist),
        (item) => item?.name
      )
    : [];

  const tabs = [
    previous ? <ProgramTonarinoTab key={previous.title} item={previous} /> : null,
    <div key="main">
      <ProgramPageHeader program={program} />
      <SectionDivider />
      <Section>
        <div>
          {program.playlist?.map((tune) => (
            <Tune key={tune?.id} tune={tune} />
          ))}
        </div>
      </Section>
      <SectionDivider />
      <AdBasic />
      <SectionDivider />
      <Section>
        <ArtistItemContainer title="登場アーティスト" artists={artists} />
      </Section>
      <SectionDivider />
      <Section>
        <PageNavigation variant="program" pageContext={pageContext} />
      </Section>
    </div>,
    next ? <ProgramTonarinoTab key={next.title} item={next} /> : null,
  ].filter((element): element is JSX.Element => Boolean(element));
  return (
    <Layout title={program?.title} drawerContents={<DrawerNavigation pageContext={pageContext} variant="program" />}>
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

export default ProgramTemplate;

export const query = graphql`
  query ProgramTemplate($slug: String!, $previous: String, $next: String) {
    program(slug: { eq: $slug }) {
      id
      year
      week
      date(formatString: "YYYY-MM-DD")
      title
      image
      subtitle
      guests
      categories
      playlist {
        ...tuneFields
      }
    }
    previous: program(slug: { eq: $previous }) {
      id
      week
      slug
      date(formatString: "YYYY-MM-DD")
      title
      subtitle
      image
      categories
      playlist {
        id
      }
    }
    next: program(slug: { eq: $next }) {
      id
      week
      slug
      date(formatString: "YYYY-MM-DD")
      title
      subtitle
      image
      categories
      playlist {
        id
      }
    }
  }
`;
