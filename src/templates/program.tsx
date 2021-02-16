import * as React from 'react';
import { graphql, navigate } from 'gatsby';
import SwipeableViews from 'react-swipeable-views';
import { bindKeyboard } from 'react-swipeable-views-utils';
import Layout from '../layout';
import Section, { SectionDivider } from '../components/Section';
import { ProgramPageHeader } from '../components/PageHeader';
import Tune from '../components/Tune';
import ArtistItemContainer from '../components/ArtistItemContainer';
import PageNavigation from '../components/PageNavigation';
import DrawerNavigation from '../components/DrawerNavigation';
import NavigationBox from '../components/NavigationBox';
import { AdBasic } from '../components/Ads';
import { ProgramTonarinoTab } from '../components/TonarinoTab';
import removeMultiple from '../utils/removeMultiple';
import nonNullable from '../utils/nonNullable';
import { ProgramTemplateQuery, SitePageContext } from '../../graphql-types';

const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);

interface Props {
  data: ProgramTemplateQuery;
  pageContext: SitePageContext;
}

function ProgramTemplate({ data, pageContext }: Props): JSX.Element {
  const program = nonNullable(data.program);
  const { previous, next } = pageContext;
  const initialIndex = previous ? 1 : 0;
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
}

export default ProgramTemplate;

export const query = graphql`
  query ProgramTemplate($slug: String!) {
    program(fields: { slug: { eq: $slug } }) {
      id
      date(formatString: "YYYY-MM-DD")
      subtitle
      title
      week
      year
      guests
      categories
      fields {
        image
      }
      playlist {
        artist {
          name
          image
          programCount
          tunesCount
        }
        corner
        id
        index
        indexInWeek
        label
        kana
        nation
        selector
        title
        year
        week
        youtube
      }
    }
  }
`;
