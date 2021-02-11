import * as React from 'react';
import Container from '@material-ui/core/Container';
import Layout from '../layout/Template';
import Section, { SectionDivider } from '../components/Section';
import Jumbotron from '../components/Jumbotron';
import Programs from '../components/Programs';
import NavigationBox from '../components/NavigationBox';
import { AdInArticle } from '../components/Ads';

function ProgramsPage() {
  return (
    <Layout title="放送回" disableGutters disablePaddingTop jumbotron={<Jumbotron title="放送回一覧" />}>
      <Section>
        <Container maxWidth="md" disableGutters>
          <Programs />
        </Container>
      </Section>
      <SectionDivider />
      <AdInArticle />
      <SectionDivider />
      <Section>
        <NavigationBox />
      </Section>
    </Layout>
  );
}

export default ProgramsPage;
