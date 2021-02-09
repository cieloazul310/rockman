import * as React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Layout, { LayoutProps } from 'gatsby-theme-aoi/src/layout';

const useStyles = makeStyles((theme) =>
  createStyles({
    content: {
      paddingTop: theme.spacing(2),
    },
  })
);

type Props = {
  jumbotron: JSX.Element | JSX.Element[];
} & LayoutProps;

export default function JumbotronLayout({ jumbotron, disableGutters, children, maxWidth = false, ...props }: Props) {
  const classes = useStyles();
  return (
    <Layout maxWidth={false} disableGutters disablePaddingTop componentViewports={{ BottomNav: false }} {...props}>
      {jumbotron}
      <Container maxWidth={maxWidth} disableGutters={disableGutters}>
        <div className={classes.content}>{children}</div>
      </Container>
    </Layout>
  );
}
