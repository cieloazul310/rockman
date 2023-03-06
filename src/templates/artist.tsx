import * as React from 'react';
import { graphql, navigate, type PageProps, type HeadProps } from 'gatsby';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import SwipeableViews from 'react-swipeable-views';
import { bindKeyboard } from 'react-swipeable-views-utils';
import { Section, SectionDivider } from '@cieloazul310/gatsby-theme-aoi';
import { DrawerPageNavigation, PageNavigationContainer, PageNavigationItem } from '@cieloazul310/gatsby-theme-aoi-blog-components';
import Layout from '../layout';
import Seo from '../components/Seo';
import { ArtistPageHeader } from '../components/PageHeader';
import { ArtistTonarinoTab } from '../components/TonarinoTab';
import TunesByProgram from '../components/TunesByProgram';
import ArtistItemContainer from '../components/ArtistItemContainer';
import { AdInSectionDivider } from '../components/Ads';
import { ArtistIcon } from '../icons';
import { useSortProgram } from '../utils/useSorter';
import { useArtistDescriptionString } from '../utils/useDescriptionString';
import type { ArtistBrowser, ProgramBrowser, MinimumArtist, TuneFields } from '../../types';

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
  const sortProgram = useSortProgram();
  const initialIndex = previous ? 1 : 0;
  const handleChangeIndex = (index: number) => {
    if (index === initialIndex) return;
    if (next && index === initialIndex + 1) {
      navigate(next.slug);
    }
    if (previous && index === initialIndex - 1) {
      navigate(previous.slug);
    }
  };
  const tabs = [
    previous ? <ArtistTonarinoTab key={previous.slug} item={previous} /> : null,
    <React.Fragment key="main">
      <ArtistPageHeader artist={artist} />
      <SectionDivider />
      {artist.program.programs.sort(sortProgram).map((program) => (
        <TunesByProgram key={program.id} program={program} />
      ))}
      <AdInSectionDivider />
      <Section>
        <ArtistItemContainer title="同じ回で登場したアーティスト" artists={artist.program.relatedArtists} />
      </Section>
    </React.Fragment>,
    next ? <ArtistTonarinoTab key={next.slug} item={next} /> : null,
  ].filter((element): element is JSX.Element => Boolean(element));

  return (
    <Layout
      title={artist.name}
      drawerContents={
        <DrawerPageNavigation
          left={
            previous
              ? {
                  href: previous.slug,
                  title: previous.name,
                  secondaryText: `${previous.program.tunesCount}曲/${previous.program.programsCount}回`,
                }
              : undefined
          }
          right={
            next
              ? { href: next.slug, title: next.name, secondaryText: `${next.program.tunesCount}曲/${next.program.tunesCount}回` }
              : undefined
          }
        />
      }
    >
      <BindKeyboardSwipeableViews index={initialIndex} onChangeIndex={handleChangeIndex} resistance>
        {tabs}
      </BindKeyboardSwipeableViews>
      <SectionDivider />
      <Section>
        <PageNavigationContainer>
          <PageNavigationItem href={previous?.slug ?? '#'} disabled={!previous}>
            <Box display="flex" flexDirection="row" alignItems="center">
              <Avatar src={previous?.program.image ?? undefined} sx={{ mr: 2 }}>
                <ArtistIcon />
              </Avatar>
              <Box>
                <Typography variant="body2">{previous?.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {previous?.program.tunesCount}曲 / {previous?.program.programsCount}回
                </Typography>
              </Box>
            </Box>
          </PageNavigationItem>
          <PageNavigationItem href={next?.slug ?? '#'} right disabled={!next}>
            <Box display="flex" flexDirection="row-reverse" alignItems="center">
              <Avatar src={next?.program.image ?? undefined} sx={{ ml: 2 }}>
                <ArtistIcon />
              </Avatar>
              <Box>
                <Typography variant="body2">{next?.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {next?.program.tunesCount}曲 / {next?.program.programsCount}回
                </Typography>
              </Box>
            </Box>
          </PageNavigationItem>
        </PageNavigationContainer>
      </Section>
    </Layout>
  );
}

export default ArtistTemplate;

export function Head({ data }: HeadProps<ArtistTemplateData, ArtistTemplateContext>) {
  const { artist } = data;
  const description = useArtistDescriptionString(artist);
  return <Seo title={`${artist.name}のオンエア楽曲一覧`} description={description} />;
}

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
