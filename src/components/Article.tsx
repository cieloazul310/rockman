import * as React from 'react';
import Container, { ContainerProps } from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import MuiLink, { LinkProps } from '@material-ui/core/Link';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2, 0),
      wordWrap: 'break-word',
    },
    section: {
      paddingBottom: theme.spacing(1),
    },
    h2: {
      paddingBottom: theme.spacing(4),
    },
    h4: {
      fontWeight: theme.typography.fontWeightBold,
    },
  })
);

function Article({ children, maxWidth, ...props }: ContainerProps): JSX.Element {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container maxWidth={maxWidth ?? 'sm'} {...props}>
        <article>{children}</article>
      </Container>
    </div>
  );
}

export default Article;

interface Props {
  children: React.ReactNode;
}

export function ArticleSection({ children }: Props): JSX.Element {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <section>{children}</section>
    </div>
  );
}

export function ArticleTitle({ children }: Props): JSX.Element {
  const classes = useStyles();
  return (
    <Typography className={classes.h2} variant="h6" component="h2" align="center">
      {children}
    </Typography>
  );
}

export function Paragraph({ children }: Props): JSX.Element {
  return (
    <Typography variant="body2" paragraph>
      {children}
    </Typography>
  );
}

export function H3({ children }: Props): JSX.Element {
  return (
    <Typography variant="subtitle1" component="h3" gutterBottom>
      {children}
    </Typography>
  );
}

export function H4({ children }: Props): JSX.Element {
  const classes = useStyles();
  return (
    <Typography className={classes.h4} variant="body2" component="h4" gutterBottom>
      {children}
    </Typography>
  );
}

export function Link({ children, href, ...props }: LinkProps): JSX.Element {
  return (
    <MuiLink color="secondary" href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </MuiLink>
  );
}
