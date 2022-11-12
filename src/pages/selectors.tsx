import * as React from 'react';
import { graphql, type PageProps } from 'gatsby';
import { Section, SectionDivider } from '@cieloazul310/gatsby-theme-aoi';
import TabPageTemplate from '../layout/TabTemplate';
import Seo from '../components/Seo';
import Jumbotron from '../components/Jumbotron';
import LazyViewer from '../components/LazyViewer';
import type { Selector, ProgramBrowser, TuneFields } from '../../types';

type WindowState = {
  selector?: string;
};

type SelectorsPageQueryData = {
  allSelectors: (Omit<Selector, 'programs'> & {
    programs: (Pick<ProgramBrowser, 'id' | 'week' | 'date' | 'slug' | 'title' | 'subtitle'> & {
      playlist: TuneFields[];
    })[];
  })[];
};

function SelectorsPage({ data }: PageProps<SelectorsPageQueryData, unknown, WindowState>) {
  const { allSelectors } = data;
  const [updater, setUpdateHeight] = React.useState<null | (() => void)>(null);
  const actionCallbacks = ({ updateHeight }: { updateHeight: () => void }) => {
    setUpdateHeight(() => updateHeight);
  };
  const onSeem = React.useCallback(
    (inView: boolean) => {
      if (inView && updater) {
        updater();
      }
    },
    [updater]
  );

  return (
    <TabPageTemplate<SelectorsPageQueryData['allSelectors'][number], WindowState>
      title="選曲者"
      description="ロック大陸漫遊記に登場したゲストやリクエストによる選曲を分類したページです。"
      items={allSelectors}
      getTitle={({ name }) => name}
      getTabTitle={({ name, tunesCount }) => `${name} ${tunesCount}`}
      getCounterText={({ tunesCount, programsCount }) => `${tunesCount}曲/${programsCount}回`}
      stateFunction={(state) => state?.selector}
      swipeableViewsActions={actionCallbacks}
    >
      {allSelectors.map(({ name, tunesCount, programsCount, programs }) => (
        <React.Fragment key={name}>
          <Jumbotron title={`${name}の選曲`} footerText={`${tunesCount}曲/${programsCount}回`} />
          <SectionDivider />
          <Section>
            <LazyViewer programs={programs} divisor={15} onSeem={onSeem} />
          </Section>
        </React.Fragment>
      ))}
    </TabPageTemplate>
  );
}

export default SelectorsPage;

export function Head() {
  return <Seo title="選曲者一覧" />;
}

export const query = graphql`
  query {
    allSelectors {
      name
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
    }
  }
`;
