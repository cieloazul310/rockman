import * as React from 'react';
import { graphql, PageProps } from 'gatsby';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import SwipeableViews from 'react-swipeable-views';
import { bindKeyboard } from 'react-swipeable-views-utils';
import Layout from '../layout/TabLayout';
import TabPane from '../layout/TabPane';
import Tab from '../components/MuiTab';
import Section, { SectionDivider } from '../components/Section';
import Article, { Paragraph } from '../components/Article';
import Jumbotron from '../components/Jumbotron';
import NavigationBox from '../components/NavigationBox';
import LazyViewer from '../components/LazyViewer';
import { AdInArticle } from '../components/Ads';
import { removeMultiple } from '../utils/removeMultiple';
import { useParseHash, useHash } from '../utils/useHash';
import { SelectorsPageQuery } from '../../graphql-types';

const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);

interface WindowState {
  selector?: string;
}

function SelectorsPage({ data }: PageProps<SelectorsPageQuery, WindowState>) {
  const selectors = React.useMemo(() => {
    const { allProgram, allTunes } = data;
    const tunes = allTunes?.sort((a, b) => (a?.week ?? 0) - (b?.week ?? 0) || (a?.indexInWeek ?? 0) - (b?.indexInWeek ?? 0)) ?? [];
    return allProgram.group
      .filter((group) => group.fieldValue !== '草野マサムネ')
      .map((group, index) => {
        const selected = tunes.filter((tune) => tune?.selector === group.fieldValue);
        return {
          fieldValue: group.fieldValue ?? index.toString(),
          totalCount: group.totalCount,
          edges: removeMultiple(group.edges, ({ node }) => node.id).map(({ node }) => ({
            node: {
              ...node,
              playlist: selected.filter((tune) => tune?.week === node.week),
            },
          })),
        };
      })
      .sort((a, b) => b.totalCount - a.totalCount || b.edges.length - a.edges.length);
  }, [data]);
  const titles = React.useMemo(() => ['', ...selectors.map(({ fieldValue }) => fieldValue)], [selectors]);
  const initialTab = useParseHash<WindowState>(titles, (state) => state?.selector ?? undefined);
  const [tab, setTab] = React.useState(initialTab);
  const [updater, setUpdateHeight] = React.useState<null | (() => void)>(null);
  const handleChange = (event: React.ChangeEvent<Record<string, unknown>>, newTab: number) => {
    setTab(newTab);
  };
  const handleChangeIndex = (index: number) => {
    setTab(index);
  };
  const onItemClicked = (index: number) => () => {
    setTab(index);
  };
  const onSeem = React.useCallback(
    (inView: boolean) => {
      if (inView && updater) {
        updater();
      }
    },
    [updater]
  );
  const actionCallbacks = ({ updateHeight }: { updateHeight: () => void }) => {
    setUpdateHeight(() => updateHeight);
  };

  useHash(tab, titles);
  React.useEffect(() => {
    if (typeof window === 'object') {
      window.scrollTo(0, 0);
    }
  }, [tab]);

  return (
    <Layout
      title="選曲者"
      tabs={
        <Tabs value={tab} onChange={handleChange} variant="scrollable" scrollButtons="auto" aria-label="scrollable auto tabs example">
          <Tab label="概要" />
          {selectors.map((d) => (
            <Tab key={d.fieldValue} label={`${d.fieldValue} ${d.totalCount}`} />
          ))}
        </Tabs>
      }
    >
      <BindKeyboardSwipeableViews
        index={tab}
        onChangeIndex={handleChangeIndex}
        resistance
        animateHeight={typeof window === 'object'}
        action={actionCallbacks}
      >
        <TabPane index={0} value={tab} disableGutters>
          <Jumbotron title="選曲者" />
          <SectionDivider />
          <Section>
            <Article>
              <Paragraph>ロック大陸漫遊記に登場したゲストやリクエストによる選曲を分類したページです。</Paragraph>
              <List>
                {selectors.map((selector, index) => (
                  <ListItem key={index} button onClick={onItemClicked(index + 1)}>
                    <ListItemText primary={selector.fieldValue} />
                    <Typography variant="button" component="span">
                      {selector.totalCount}曲/{selector.edges.length}回
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Article>
          </Section>
        </TabPane>
        {selectors.map((d, index) => (
          <TabPane key={index} value={tab} index={index + 1} disableGutters>
            <Jumbotron title={`${d.fieldValue}の選曲`} footer={`${d.totalCount}曲/${d.edges.length}回`} />
            <SectionDivider />
            <Section>
              <LazyViewer
                programs={d.edges.map((v) => v.node)}
                divisor={15}
                filter={(tune) => tune?.selector === d.fieldValue}
                onSeem={onSeem}
              />
            </Section>
          </TabPane>
        ))}
      </BindKeyboardSwipeableViews>
      <SectionDivider />
      <AdInArticle />
      <SectionDivider />
      <Section>
        <NavigationBox />
      </Section>
    </Layout>
  );
}

export default SelectorsPage;

export const query = graphql`
  query SelectorsPage {
    allProgram(filter: { playlist: { elemMatch: { selector: { regex: "/^(?!.*草野マサムネ).*$/" } } } }) {
      group(field: playlist___selector) {
        fieldValue
        totalCount
        edges {
          node {
            id
            week
            date(formatString: "YYYY-MM-DD")
            title
            fields {
              slug
            }
          }
        }
      }
    }
    allTunes {
      week
      title
      artist {
        name
      }
      year
      indexInWeek
      corner
      youtube
      id
      nation
      selector
    }
  }
`;
