import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles<Theme, { imgUrl?: string }>((theme: Theme) =>
  createStyles({
    jumbotronBg: ({ imgUrl }) => ({
      height: '100%',
      backgroundColor: theme.palette.grey[700],
      backgroundImage: imgUrl ? `url(${imgUrl})` : null,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      filter: imgUrl ? 'blur(8px) brightness(0.6)' : null,
      transform: imgUrl ? 'scale(1.1)' : null
    }),
    jumbotronText: {
      height: 345,
      color: 'white',
      position: 'absolute',
      transform: 'translate(0, -100%)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      zIndex: 2,
      padding: theme.spacing(2)
    },
    jumbotronTitle: {
      fontWeight: 'bold'
    }
  })
);

interface Props {
  header: string;
  title: string;
  subtitle?: string;
  imgUrl?: string;
}

function Jumbotron({ header, subtitle, title, imgUrl }: Props) {
  const classes = useStyles({ imgUrl });
  return (
    <Box height={345} overflow="hidden">
      <div className={classes.jumbotronBg} />
      <div className={classes.jumbotronText}>
        <Typography variant="subtitle2">{header}</Typography>
        <Typography variant="h2" className={classes.jumbotronTitle}>
          {title}
        </Typography>
        {subtitle ? <Typography variant="subtitle1">{subtitle}</Typography> : null}
      </div>
    </Box>
  );
}

export default Jumbotron;
