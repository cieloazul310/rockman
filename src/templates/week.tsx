import * as React from 'react';
import { graphql } from 'gatsby';
import Layout from 'gatsby-theme-typescript-material-ui/src/layout';
//import { AppLink, appNavigate } from 'gatsby-theme-typescript-material-ui/src/components/AppLink';
//import SwipeableViews from 'react-swipeable-views';
import JunkList from '../components/JunkList';
import PageNavigation from '../components/PageNavigation';
import Weeks from '../components/Weeks';
import { WeekTemplateQuery, SitePageContextNext, SitePageContextPrevious } from '../../graphql-types';

interface Props {
  data: WeekTemplateQuery;
  pageContext: {
    slug: string;
    previous: SitePageContextPrevious;
    next: SitePageContextNext;
  };
}

function WeekTemplate({ data, pageContext }: Props) {
  const program = data.yaml;
  const { previous, next } = pageContext;
  console.log(previous, next);
  return (
    <Layout title={program.title} drawerContents={<Weeks />} disablePaddingTop>
      <JunkList program={program} />
      <PageNavigation prev={previous} next={next} />
    </Layout>
  );
}

export default WeekTemplate;

export const query = graphql`
  query WeekTemplate($slug: String!) {
    yaml(fields: { slug: { eq: $slug } }) {
      id
      date(formatString: "YYYY-MM-DD")
      subtitle
      title
      week
      year
      guests
      categories
      playlist {
        artist
        corner
        id
        index
        indexInWeek
        label
        kana
        name
        nation
        producer
        selector
        title
        year
        week
        youtube
      }
    }
  }
`;
