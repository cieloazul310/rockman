import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

interface StyleProps {
  height: number;
  imgUrl?: string;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) =>
  createStyles({
    jumbotronBg: ({ imgUrl }) => ({
      height: '100%',
      backgroundColor: theme.palette.grey[700],
      backgroundImage: imgUrl ? `url(${imgUrl})` : null,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      filter: imgUrl ? 'blur(6px) brightness(0.8)' : null,
      transform: imgUrl ? 'scale(1.1)' : null
    }),
    jumbotronText: ({ height }) => ({
      height: height,
      color: 'white',
      position: 'absolute',
      transform: 'translate(0, -100%)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      zIndex: 2,
      padding: theme.spacing(2, 4),
      [theme.breakpoints.down('xs')]: {
        padding: theme.spacing(2)
      }
    }),
    jumbotronTitle: {
      fontWeight: 'bold'
    }
  })
);

interface Props {
  header?:
    | string
    | JSX.Element
    | JSX.Element[]
    | (JSX.Element | JSX.Element[])[];
  title: string | JSX.Element | JSX.Element[] | (JSX.Element | JSX.Element[])[];
  height?: number;
  artists?:
    | string
    | JSX.Element
    | JSX.Element[]
    | (JSX.Element | JSX.Element[])[];
  subtitle?:
    | string
    | JSX.Element
    | JSX.Element[]
    | (JSX.Element | JSX.Element[])[];
  imgUrl?: string;
}

function Jumbotron({
  header,
  subtitle,
  title,
  artists,
  imgUrl,
  height = 300
}: Props) {
  const classes = useStyles({ imgUrl, height });
  return (
    <Box height={height} overflow="hidden" position="relative">
      <div className={classes.jumbotronBg} />
      <div className={classes.jumbotronText}>
        <Typography variant="subtitle2">{header}</Typography>
        <Typography
          variant="h2"
          className={classes.jumbotronTitle}
          gutterBottom
        >
          {title}
        </Typography>
        {subtitle ? (
          <Typography variant="subtitle1">{subtitle}</Typography>
        ) : null}
        {artists ? (
          <Typography variant="body2" component="div">
            {artists}
          </Typography>
        ) : null}
      </div>
    </Box>
  );
}

export default Jumbotron;
