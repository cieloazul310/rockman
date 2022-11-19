import * as React from 'react';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { type Swiper, Keyboard } from 'swiper';
import { Swiper as SwiperContainer, SwiperSlide } from 'swiper/react';
import { Article, Paragraph, Section, SectionDivider, TabPane } from '@cieloazul310/gatsby-theme-aoi';
import Layout from './TabLayout';
import Jumbotron from '../components/Jumbotron';
import Tab from '../components/MuiTab';
import { AdInSectionDivider } from '../components/Ads';
import { useParseHash, useHash } from '../utils/useHash';
import 'swiper/css';

type TabPageTemplateProps<T, S = null> = {
  title: string;
  description: string;
  items: T[];
  getTitle: (item: T) => string;
  getTabTitle?: (item: T) => string;
  getCounterText: (item: T) => string | undefined;
  getSecondaryText?: (item: T) => string;
  stateFunction?: (state?: S | null) => string | undefined | null;
  children: JSX.Element[];
  parentSetSwiper?: React.Dispatch<React.SetStateAction<Swiper | null>>;
};

function TabPageTemplate<T, S = null>({
  title,
  description,
  items,
  getTitle,
  getTabTitle,
  getCounterText,
  getSecondaryText,
  stateFunction,
  children,
  parentSetSwiper,
}: TabPageTemplateProps<T, S>) {
  const titles = React.useMemo(() => ['', ...items.map(getTitle)], [items, getTitle]);
  const initialTab = useParseHash<S>(titles, stateFunction);

  const [swiper, setSwiper] = React.useState<Swiper | null>(null);
  const [tab, setTab] = React.useState(initialTab);

  const handleChange = (event: React.SyntheticEvent, newTab: number) => {
    setTab(newTab);
    swiper?.slideTo(newTab);
  };
  const onItemClicked = (index: number) => () => {
    setTab(index);
    swiper?.slideTo(index);
  };
  const onSlideChange = (currentSwiper: Swiper) => {
    setTab(currentSwiper.activeIndex);
  };
  const onSwiper = (currentSwiper: Swiper) => {
    const swiperInstance = currentSwiper;
    setSwiper(swiperInstance);
    if (parentSetSwiper && typeof parentSetSwiper === 'function') {
      parentSetSwiper(swiperInstance);
    }
  };
  useHash(tab, titles);
  React.useEffect(() => {
    if (typeof window === 'object') {
      window.scrollTo(0, 0);
    }
  }, [tab]);

  return (
    <Layout
      title={title}
      tabs={
        <Tabs
          value={tab}
          onChange={handleChange}
          textColor="inherit"
          indicatorColor="secondary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="概要" />
          {items.map((item) => (
            <Tab key={getTitle(item)} label={getTabTitle ? getTabTitle(item) : getTitle(item)} />
          ))}
        </Tabs>
      }
    >
      <SwiperContainer
        modules={[Keyboard]}
        keyboard={{
          enabled: true,
        }}
        initialSlide={initialTab}
        simulateTouch={false}
        autoHeight
        observer
        observeSlideChildren
        onSwiper={onSwiper}
        onSlideChange={onSlideChange}
      >
        <SwiperSlide>
          <TabPane currentTab={tab} index={0} renderNeighbor>
            <Jumbotron title={title} />
            <SectionDivider />
            <Section>
              <Article maxWidth="md">
                <Paragraph>{description}</Paragraph>
                <List>
                  {items.map((item, index) => (
                    <ListItem key={getTitle(item)} button onClick={onItemClicked(index + 1)}>
                      <ListItemText primary={getTitle(item)} secondary={getSecondaryText ? getSecondaryText(item) : undefined} />
                      {getCounterText(item) ? (
                        <Typography variant="button" component="span">
                          {getCounterText(item)}
                        </Typography>
                      ) : null}
                    </ListItem>
                  ))}
                </List>
              </Article>
            </Section>
          </TabPane>
        </SwiperSlide>
        {children.map((element, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <SwiperSlide key={index.toString()}>
            <TabPane currentTab={tab} index={index + 1} renderNeighbor>
              {element}
            </TabPane>
          </SwiperSlide>
        ))}
      </SwiperContainer>
      <AdInSectionDivider />
    </Layout>
  );
}

TabPageTemplate.defaultProps = {
  stateFunction: undefined,
  getTabTitle: undefined,
  getSecondaryText: undefined,
  parentSetSwiper: undefined,
};

export default TabPageTemplate;
