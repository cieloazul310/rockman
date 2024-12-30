import * as React from "react";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import SwipeableViews from "react-swipeable-views";
import { bindKeyboard } from "react-swipeable-views-utils";
import {
  Article,
  Paragraph,
  Section,
  SectionWrapper,
  TabPane,
} from "@cieloazul310/gatsby-theme-aoi";
import Jumbotron from "@/components/jumbotron";
import Tab from "@/components/mui-tab";
import { AdInSectionDivider } from "@/components/ads";
import { useParseHash, useHash } from "@/utils/use-hash";
import Layout from "./tab-layout";

const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);

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
  swipeableViewsActions?: ({
    updateHeight,
  }: {
    updateHeight: () => void;
  }) => void;
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
  swipeableViewsActions,
}: TabPageTemplateProps<T, S>) {
  const titles = React.useMemo(
    () => ["", ...items.map(getTitle)],
    [items, getTitle],
  );
  const initialTab = useParseHash<S>(titles, stateFunction);

  const [tab, setTab] = React.useState(initialTab);

  const handleChange = (event: React.SyntheticEvent, newTab: number) => {
    setTab(newTab);
  };
  const handleChangeIndex = (index: number) => {
    setTab(index);
  };
  const onItemClicked = (index: number) => () => {
    setTab(index);
  };
  useHash(tab, titles);
  React.useEffect(() => {
    if (typeof window === "object") {
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
            <Tab
              key={getTitle(item)}
              label={getTabTitle ? getTabTitle(item) : getTitle(item)}
            />
          ))}
        </Tabs>
      }
    >
      <BindKeyboardSwipeableViews
        index={tab}
        onChangeIndex={handleChangeIndex}
        resistance
        animateHeight
        action={swipeableViewsActions}
      >
        <TabPane currentTab={tab} index={0} renderNeighbor>
          <SectionWrapper component="article">
            <Jumbotron component="header" title={title} />
            <Section component="main">
              <Article maxWidth="md">
                <Paragraph>{description}</Paragraph>
                <List>
                  {items.map((item, index) => (
                    <ListItem key={getTitle(item)} disablePadding>
                      <ListItemButton onClick={onItemClicked(index + 1)}>
                        <ListItemText
                          primary={getTitle(item)}
                          secondary={
                            getSecondaryText
                              ? getSecondaryText(item)
                              : undefined
                          }
                        />
                        {getCounterText(item) ? (
                          <Typography variant="button" component="span">
                            {getCounterText(item)}
                          </Typography>
                        ) : null}
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Article>
            </Section>
          </SectionWrapper>
        </TabPane>
        {children.map((element, index) => (
          <TabPane
            currentTab={tab}
            index={index + 1}
            renderNeighbor
            // eslint-disable-next-line react/no-array-index-key
            key={index.toString()}
          >
            {element}
          </TabPane>
        ))}
      </BindKeyboardSwipeableViews>
      <AdInSectionDivider />
    </Layout>
  );
}

TabPageTemplate.defaultProps = {
  stateFunction: undefined,
  getTabTitle: undefined,
  getSecondaryText: undefined,
  swipeableViewsActions: undefined,
};

export default TabPageTemplate;
