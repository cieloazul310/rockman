import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useInView } from 'react-intersection-observer';
import useAnimation from '../../utils/useAnimation';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: 'auto',
    },
    title: {
      display: 'flex',
      alignItems: 'center',
    },
    value: {
      margin: 'auto',
      maxWidth: theme.spacing(16),
      textAlign: 'right',
    },
    label: {
      marginLeft: '.5em',
    },
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
    <Grid item xs={4} ref={ref} className={classes.root}>
      <Grid container>
        <Grid className={classes.title} item xs={12} sm={5}>
          <Typography variant="h4" component="span">
            {icon}
          </Typography>
          <Typography variant="body2" component="span">
            {title}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={7}>
          <div className={classes.value}>
            <Typography variant="h3" component="em">
              {inView ? <StatCore value={value} /> : <span>0</span>}
            </Typography>
            <Typography component="span" className={classes.label}>
              {label}
            </Typography>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
}

function StatCore({ value }: { value: number }) {
  const animation = useAnimation('linear', value, 250);
  return <span>{Math.round(value * animation)}</span>;
}

export default Stat;
