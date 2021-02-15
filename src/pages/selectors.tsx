import * as React from 'react';
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
import { useAllSelectors } from '../utils/graphql-hooks/useAllSelectors';
import { useParseHash, useHash } from '../utils/useHash';

const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);

interface WindowState {
  selector?: string;
}

function SelectorsPage() {
  const selectors = useAllSelectors();
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
