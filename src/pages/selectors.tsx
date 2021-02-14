import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useLocation, WindowLocation } from '@reach/router';
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

const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);

function SelectorsPage() {
  const { hash, state, pathname } = useLocation() as WindowLocation<{
    selector?: string;
  }>;
  // [[name, programs]]
  const selectors = useAllSelectors();
  const initialSelector = hash !== '' ? decodeURI(hash.slice(1)) : null;
  const fieldValues = ['', ...selectors.map(({ fieldValue }) => fieldValue)];
  const initialValue =
    initialSelector && fieldValues.indexOf(initialSelector) >= 0
      ? fieldValues.indexOf(initialSelector)
      : state?.selector
      ? fieldValues.indexOf(state?.selector)
      : 0;
  const [value, setValue] = React.useState(initialValue);
  const [updater, setUpdateHeight] = React.useState<null | (() => void)>(null);
  const _handleChange = (event: React.ChangeEvent<Record<string, unknown>>, newValue: number) => {
    setValue(newValue);
  };
  const _handleChangeIndex = (index: number) => {
    setValue(index);
  };
  const onItemClicked = (index: number) => () => {
    setValue(index);
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
  React.useEffect(() => {
    if (window && typeof window === 'object')
      window.history.replaceState(value, '', value !== 0 ? `#${selectors[value - 1].fieldValue}` : pathname);
  }, [value, selectors, pathname]);
  React.useEffect(() => {
    if (typeof window === 'object') {
      window.scrollTo(0, 0);
    }
  }, [value]);

  return (
    <Layout
      title="選曲者"
      tabs={
        <Tabs value={value} onChange={_handleChange} variant="scrollable" scrollButtons="auto" aria-label="scrollable auto tabs example">
          <Tab label="概要" />
          {selectors.map((d) => (
            <Tab key={d.fieldValue} label={`${d.fieldValue} ${d.playlist.length}`} />
          ))}
        </Tabs>
      }
    >
      <BindKeyboardSwipeableViews index={value} onChangeIndex={_handleChangeIndex} resistance animateHeight action={actionCallbacks}>
        <TabPane index={0} value={value} disableGutters>
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
                      {selector.playlist.length}曲/{selector.edges.length}回
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Article>
          </Section>
        </TabPane>
        {selectors.map((d, index) => (
          <TabPane key={index} value={value} index={index + 1} disableGutters>
            <Jumbotron title={`${d.fieldValue}の選曲`} footer={`${d.playlist.length}曲/${d.edges.length}回`} />
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
