import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useInView } from 'react-intersection-observer';
import useAnimation from '../../utils/useAnimation';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      padding: theme.spacing(2),
    },
    left: {
      display: 'flex',
      flexDirection: 'column',
    },
    icon: {
      fontSize: theme.typography.h3.fontSize,
    },
    title: {},
    right: {
      display: 'flex',
      //flexDirection: 'column',
      flexGrow: 1,
    },
    value: {
      display: 'flex',
      flexDirection: 'row-reverse',
      flexGrow: 1,
      fontSize: theme.typography.h3.fontSize,
      fontStyle: 'italic',
    },
    label: {},
  })
);

interface Props {
  icon: JSX.Element;
  value: number;
  label: string;
  title: string;
}

function Stat({ icon, value, label, title }: Props) {
  const classes = useStyles();
  const [ref, inView] = useInView({
    triggerOnce: true,
  });
  return (
    <Grid item xs={12} sm={4} ref={ref}>
      <div className={classes.root}>
        <div className={classes.left}>
          <div className={classes.icon}>{icon}</div>
          <Typography className={classes.title} component="div" variant="body2">
            {title}
          </Typography>
        </div>
        <div className={classes.right}>
          <div className={classes.value}>{inView ? <StatCore value={value} /> : <span>0</span>}</div>
          <Typography className={classes.label} variant="body1" component="div">
            {label}
          </Typography>
        </div>
      </div>
    </Grid>
  );
}

function StatCore({ value }: { value: number }) {
  const animation = useAnimation('linear', value * 2, 250);
  return <span>{Math.round(value * animation)}</span>;
}

export default Stat;
