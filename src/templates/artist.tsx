import * as React from 'react';
import { graphql, navigate } from 'gatsby';
import SwipeableViews from 'react-swipeable-views';
import { bindKeyboard } from 'react-swipeable-views-utils';
import Layout from '../layout';
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

const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);

interface Props {
  data: ArtistTemplateQuery;
  pageContext: SitePageContext;
}

function ArtistTemplate({ data, pageContext }: Props): JSX.Element {
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
          slug
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
        slug
      }
    }
  }
`;
