import * as React from "react";
import { useLocation } from "@reach/router";
import {
  Layout,
  Section,
  Article,
  Alert,
} from "@cieloazul310/gatsby-theme-aoi";
import Jumbotron from "@/components/jumbotron";

function NotFoundPage() {
  const location = useLocation();
  return (
    <Layout title="Not Found">
      <Jumbotron title="Not Found" />
      <Section>
        <Article maxWidth="md">
          <Alert severity="warning">
            <code>{location.pathname}</code> doesn&#39;t exist.
          </Alert>
        </Article>
      </Section>
    </Layout>
  );
}

export default NotFoundPage;
