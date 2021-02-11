import * as React from 'react';
import Layout from '../layout';
import Section, { SectionDivider } from '../components/Section';
import Jumbotron from '../components/Jumbotron';
import Programs from '../components/Programs';
import NavigationBox from '../components/NavigationBox';
import { AdInArticle } from '../components/Ads';

function ProgramsPage() {
  return (
    <Layout title="放送回">
      <Jumbotron title="放送回一覧" />
      <SectionDivider />
      <Section>
        <Programs />
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
