import * as React from 'react';
import Tabs from '@material-ui/core/Tabs';
import SwipeableViews from 'react-swipeable-views';
import { bindKeyboard } from 'react-swipeable-views-utils';
import Layout from '../TabLayout';
import Tab from '../components/MuiTab';
import Section, { SectionDivider } from '../components/Section';
import NavigationBox from '../components/NavigationBox';
import { AdInArticle } from '../components/Ads';
import { useParseHash, useHash } from '../utils/useHash';

const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);

interface Props<T, S = null> {
  items: T[];
  getTitle: (item: T) => string;
  stateFunction?: (state: S) => string;
  tabs: JSX.Element[];
  children: JSX.Element[];
}

function TabTemplate<T, S>({ items, getTitle, stateFunction, tabs, children }: Props<T, S>) {
  const titles = React.useMemo(() => ['', ...items.map(getTitle)], [items, getTitle]);
  const initialTab = useParseHash<S>(titles, stateFunction);

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
  React.useEffect(() => {
    const resize = () => {
      if (updater) updater();
    };
    if (typeof window === 'object') {
      window.addEventListener('resize', resize);
      return window.removeEventListener('resize', resize);
    }
  }, [updater]);

  return (
    <Layout
      title="選曲者"
      tabs={
        <Tabs value={tab} onChange={handleChange} variant="scrollable" scrollButtons="auto" aria-label="scrollable auto tabs example">
          <Tab label="概要" />
          {tabs}
        </Tabs>
      }
    >
      <BindKeyboardSwipeableViews index={tab} onChangeIndex={handleChangeIndex} resistance animateHeight action={actionCallbacks}>
        {children}
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

export default TabTemplate;
