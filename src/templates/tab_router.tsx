import * as React from 'react';
import { graphql, navigate } from 'gatsby';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import List from '@material-ui/core/List';
import Skeleton from '@material-ui/lab/Skeleton';
import SwipeableViews from 'react-swipeable-views';
import { bindKeyboard } from 'react-swipeable-views-utils';
import Layout from 'gatsby-theme-aoi/src/layouts/TabPageLayout';
import ListItemLink from 'gatsby-theme-aoi/src/components/ListItemLink';
import useAllCategories from '../utils/graphql-hooks/useAllCategories';
import { CategoryQuery, SitePageContext } from '../../graphql-types';

const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);

interface Props {
  data: CategoryQuery;
  pageContext: {
    previous?: any;
    next?: any;
    index: number;
    fieldValue: string;
  };
}

function CategoryTemplate({ data, pageContext }: Props) {
  const { index, fieldValue, previous, next } = pageContext;
  const categories = useAllCategories();
  const [tab, setTab] = React.useState(index);
  const tabs = (
    <Tabs value={tab} variant="scrollable" scrollButtons="auto" onChange={(_, i) => {
      setTab(i);
    }}>
      {categories.map((category, i) => (
        <Tab
          key={i}
          label={`${category.fieldValue} ${category.edges.length}`}
        />
      ))}
    </Tabs>
  );
  const _onChangeIndex = (i: number) => {
    setTab(i);
  }
  const _onTransitionEnd = () => {
    navigate(`/categories/${categories[tab].fieldValue}`);
  }

  return (
    <Layout tabSticky tabs={tabs}>
      <BindKeyboardSwipeableViews
        resistance
        index={tab}
        onChangeIndex={_onChangeIndex}
        onTransitionEnd={_onTransitionEnd}
      >
        {categories.map(({ fieldValue, edges }, i) => (
          <div>
            <p>{fieldValue}</p>
            {i === index ? (
              <List>
                {data.allProgram.edges.map(({ node }) => (
                  <ListItemLink
                    key={node.id}
                    to={node.fields.slug}
                    primaryText={node.title}
                    secondaryText={`第${node.week}回 ${node.date}`}
                    divider
                  />
                ))}
              </List>
            ) : null}
          </div>
        ))}
      </BindKeyboardSwipeableViews>
    </Layout>
  );
}

export default CategoryTemplate;

export const query = graphql`
  query Category($fieldValue: String!) {
    allProgram(
      sort: { fields: date, order: ASC }
      filter: { categories: { eq: $fieldValue } }
    ) {
      edges {
        node {
          id
          title
          week
          date(formatString: "YYYY-MM-DD")
          fields {
            slug
          }
        }
      }
    }
  }
`;
