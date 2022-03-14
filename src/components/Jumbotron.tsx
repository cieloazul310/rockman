import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Theme } from '@mui/material/styles';

import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';

interface StyleProps {
  image?: string;
}
const height = 240;

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) =>
  createStyles({
    root: {
      height,
      overflow: 'hidden',
      position: 'relative',
    },
    jumbotronBg: ({ image }) => ({
      height: '100%',
      backgroundColor: !image && theme.palette.mode === 'light' ? theme.palette.secondary.light : theme.palette.grey[700],
      backgroundImage: image ? `url(${image})` : undefined,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      filter: image ? 'blur(6px) brightness(0.8)' : undefined,
      transform: image ? 'scale(1.1)' : undefined,
    }),
    jumbotronText: {
      height,
      color: 'white',
      position: 'absolute',
      transform: 'translate(0, -100%)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      zIndex: 2,
      padding: theme.spacing(2, 4),
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(2),
      },
    },
    jumbotronTitle: {
      fontWeight: 'bold',
    },
  })
);

interface Props {
  header?: React.ReactNode;
  title: React.ReactNode;
  footer?: React.ReactNode;
  image?: string;
}

function Jumbotron({ header, footer, title, image }: Props): JSX.Element {
  const classes = useStyles({ image });
  return (
    <div className={classes.root}>
      <div className={classes.jumbotronBg} />
      <div className={classes.jumbotronText}>
        {header ? <Typography variant="subtitle2">{header}</Typography> : null}
        <Typography variant="h5" component="h2" className={classes.jumbotronTitle} gutterBottom>
          {title}
        </Typography>
        {footer ? <Typography variant="subtitle2">{footer}</Typography> : null}
      </div>
    </div>
  );
}

Jumbotron.defaultProps = {
  header: undefined,
  footer: undefined,
  image: undefined,
};

export default Jumbotron;
