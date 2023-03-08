import * as React from 'react';
import { graphql, navigate, type PageProps, type HeadProps } from 'gatsby';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import SwipeableViews from 'react-swipeable-views';
import { bindKeyboard } from 'react-swipeable-views-utils';
import { Section } from '@cieloazul310/gatsby-theme-aoi';
import { DrawerPageNavigation, PageNavigationContainer, PageNavigationItem } from '@cieloazul310/gatsby-theme-aoi-blog-components';
import Layout from '../../layout';
import Seo from '../../components/Seo';
import ProgramPageHeader from './PageHeader';
import ProgramTonarinoTab from './TonarinoTab';
import Tune from '../../components/Tunes/Item';
import ArtistItemContainer from '../../components/ArtistItem/Container';
import { AdInSectionDivider } from '../../components/Ads';
import removeMultiple from '../../utils/removeMultiple';
import { useProgramDescriptionString } from '../../utils/useDescriptionString';
import type { Program, Tune as TuneType } from '../../../types';

const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);

type ProgramTemplateData = {
  program: Program;
  previous:
    | (Pick<Program, 'slug' | 'week' | 'date' | 'title' | 'subtitle' | 'image' | 'categories'> & {
        playlist: Pick<TuneType, 'id'>[];
      })
    | null;
  next:
    | (Pick<Program, 'slug' | 'week' | 'date' | 'title' | 'subtitle' | 'image' | 'categories'> & {
        playlist: Pick<TuneType, 'id'>[];
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
  const drawerContents = (
    <DrawerPageNavigation
      left={previous ? { href: previous.slug, title: previous.title, secondaryText: `第${previous.week}回` } : undefined}
      right={next ? { href: next.slug, title: next.title, secondaryText: `第${next.week}回` } : undefined}
    />
  );
  const tabs = [
    previous ? <ProgramTonarinoTab key={previous.title} item={previous} /> : null,
    <Stack spacing={2} key="main">
      <ProgramPageHeader program={program} />
      <Section py={2}>
        <Container maxWidth="md">
          <Stack spacing={1}>
            {program.playlist.map((tune) => (
              <Tune key={tune.id} tune={tune} />
            ))}
          </Stack>
        </Container>
      </Section>
    </Stack>,
    next ? <ProgramTonarinoTab key={next.title} item={next} /> : null,
  ].filter((element): element is JSX.Element => Boolean(element));

  return (
    <Layout title={program.title} drawerContents={drawerContents}>
      <BindKeyboardSwipeableViews index={initialIndex} onChangeIndex={handleChangeIndex} resistance>
        {tabs}
      </BindKeyboardSwipeableViews>
      <AdInSectionDivider />
      <Section>
        <ArtistItemContainer title="登場アーティスト" artists={artists} />
      </Section>
      <Section>
        <PageNavigationContainer>
          <PageNavigationItem href={previous?.slug ?? '#'} disabled={!previous}>
            <Typography variant="body2">{previous?.title}</Typography>
            <Typography variant="body2" color="text.secondary">
              {previous?.date}
            </Typography>
          </PageNavigationItem>
          <PageNavigationItem href={next?.slug ?? '#'} right disabled={!next}>
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
        ...tuneItem
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
