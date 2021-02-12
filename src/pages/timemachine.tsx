import * as React from 'react';
import { graphql, PageProps } from 'gatsby';
import Typography from '@material-ui/core/Typography';
import SwipeableViews from 'react-swipeable-views';
import { bindKeyboard } from 'react-swipeable-views-utils';
import Layout from '../layout';
import Jumbotron from '../components/Jumbotron';
import Section, { SectionDivider } from '../components/Section';
import Tune from '../components/Tune';
import { getDividedYears } from '../utils/cluster';
import { TimeMachineQuery } from '../../graphql-types';

const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);

function TimeMachinePage({ data }: PageProps<TimeMachineQuery>) {
  const [tab, setTab] = React.useState(0);
  const items = getDividedYears(data.allTunes ?? [], 5, (tune) => tune?.year ?? 0);
  const handleChangeIndex = (index: number) => {
    setTab(index);
  };

  return (
    <Layout title="ちょっぴりタイムマシン">
      <BindKeyboardSwipeableViews index={tab} onChangeIndex={handleChangeIndex} resistance>
        {items.map((fifth) => (
          <div key={fifth.value}>
            <Jumbotron title="ちょっぴりタイムマシン" />
            <SectionDivider />
            <Section>
              <Typography variant="h6" gutterBottom>
                {fifth.value}
              </Typography>
              <div>
                {fifth.items.map((annu) => (
                  <div key={annu.value}>
                    <Typography variant="body1" gutterBottom>
                      {annu.value}
                    </Typography>
                    <div>
                      {annu.items.map((tune) => (
                        <Tune key={tune?.id} tune={tune} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          </div>
        ))}
      </BindKeyboardSwipeableViews>
    </Layout>
  );
}

export default TimeMachinePage;

export const query = graphql`
  query TimeMachine {
    allTunes(corner: "ちょっぴりタイムマシン") {
      year
      title
      week
      youtube
      selector
      nation
      indexInWeek
      id
      corner
      artist {
        name
      }
    }
  }
`;
