import * as React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useLocation, WindowLocation } from '@reach/router';
import SwipeableViews from 'react-swipeable-views';
import { bindKeyboard } from 'react-swipeable-views-utils';
import Layout from 'gatsby-theme-aoi/src/layouts/TabPageLayout';
import TabPane from '../layout/TabPane';
import Section, { SectionDivider } from '../components/Section';
import Jumbotron from '../components/Jumbotron';
import NavigationBox from '../components/NavigationBox';
import LazyViewer from '../components/LazyViewer';
import { AdInArticle } from '../components/Ads';
import { useAllSelectors } from '../utils/graphql-hooks/useAllSelectors';

const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);

function SelectorsPage() {
  const { hash, state } = useLocation() as WindowLocation<{
    selector?: string;
  }>;
  // [[name, programs]]
  const selectors = useAllSelectors();
  const initialSelector = hash !== '' ? decodeURI(hash.slice(1)) : null;
  const fieldValues = selectors.map(({ fieldValue }) => fieldValue);
  const initialValue =
    initialSelector && fieldValues.indexOf(initialSelector) >= 0
      ? fieldValues.indexOf(initialSelector)
      : state?.selector
      ? fieldValues.indexOf(state?.selector)
      : 0;
  const [value, setValue] = React.useState(initialValue);
  const _handleChange = (event: React.ChangeEvent<Record<string, unknown>>, newValue: number) => {
    setValue(newValue);
  };
  const _handleChangeIndex = (index: number) => {
    setValue(index);
  };
  React.useEffect(() => {
    if (window && typeof window === 'object') window.history.replaceState(value, '', `#${selectors[value].fieldValue}`);
  }, [value, selectors]);
  React.useEffect(() => {
    if (typeof window === 'object') {
      window.scrollTo(0, 0);
    }
  }, [value]);

  return (
    <Layout
      title="選曲者"
      tabSticky
      disableGutters
      componentViewports={{ BottomNav: false }}
      tabs={
        <Tabs value={value} onChange={_handleChange} variant="scrollable" scrollButtons="auto" aria-label="scrollable auto tabs example">
          {selectors.map((d) => (
            <Tab key={d.fieldValue} label={`${d.fieldValue} ${d.playlist.length}`} />
          ))}
        </Tabs>
      }
    >
      <BindKeyboardSwipeableViews index={value} onChangeIndex={_handleChangeIndex} resistance animateHeight>
        {selectors.map((d, index) => (
          <TabPane key={index} value={value} index={index} disableGutters>
            <Jumbotron title={`${selectors[value].fieldValue}の選曲`} footer={`${d.playlist.length}曲/${d.edges.length}回`} />
            <Section>
              <LazyViewer programs={d.edges.map((v) => v.node)} divisor={15} filter={(tune) => tune?.selector === d.fieldValue} />
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
