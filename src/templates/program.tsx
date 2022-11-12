import * as React from 'react';
import { graphql, navigate, type PageProps, type HeadProps } from 'gatsby';
import Typography from '@mui/material/Typography';
import SwipeableViews from 'react-swipeable-views';
import { bindKeyboard } from 'react-swipeable-views-utils';
import { Section, SectionDivider, Article } from '@cieloazul310/gatsby-theme-aoi';
import { DrawerPageNavigation, PageNavigationContainer, PageNavigationItem } from '@cieloazul310/gatsby-theme-aoi-blog-components';
import Layout from '../layout';
import Seo from '../components/Seo';
import { ProgramPageHeader } from '../components/PageHeader';
import Tune from '../components/Tune';
import ArtistItemContainer from '../components/ArtistItemContainer';
import { ProgramTonarinoTab } from '../components/TonarinoTab';
import { AdInSectionDivider } from '../components/Ads';
import removeMultiple from '../utils/removeMultiple';
import { useProgramDescriptionString } from '../utils/useDescriptionString';
import type { ProgramBrowser, TuneBrowser } from '../../types';

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
          previous={previous ? { to: previous.slug, title: previous.title, secondaryText: `第${previous.week}回` } : undefined}
          next={next ? { to: next.slug, title: next.title, secondaryText: `第${next.week}回` } : undefined}
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
}

export default ProgramTemplate;

export function Head({ data }: HeadProps<ProgramTemplateData, ProgramTemplateContext>) {
  const { program } = data;
  const { title, week, date } = program;
  const headTitle = `第${week}回 ${title} (${date})`;
  const description = useProgramDescriptionString(program);
  return <Seo title={headTitle} description={description} />;
}

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
