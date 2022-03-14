import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';
import { useInView } from 'react-intersection-observer';
import { ProgramIcon, ArtistIcon, TuneIcon } from '../icons';
import useAnimation from '../utils/useAnimation';
import { StatQuery } from '../../graphql-types';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: theme.spacing(1),
    },
    root: {
      display: 'flex',
      padding: theme.spacing(2),
      alignItems: 'baseline',
      flexDirection: 'row',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'inherit',
        padding: theme.spacing(2, 0),
      },
    },
    title: {
      display: 'flex',
      alignItems: 'center',
    },
    valueField: {
      display: 'flex',
      flexGrow: 1,
      justifyContent: 'flex-end',
      alignItems: 'baseline',
    },
    icon: {
      display: 'flex',
      padding: theme.spacing(1, 0.5),
    },
    label: {
      marginLeft: '.5em',
    },
  })
);

interface Props {
  icon: React.ReactNode;
  value: number;
  label: string;
  title: string;
}

function StatCore({ value }: { value: number }): JSX.Element {
  const animation = useAnimation('linear', value, 0);
  return <span>{Math.round(value * animation)}</span>;
}

export function Stat({ icon, value, label, title }: Props): JSX.Element {
  const classes = useStyles();
  const [ref, inView] = useInView({
    triggerOnce: true,
  });
  return (
    <Grid item xs={4} ref={ref} className={classes.root}>
      <div className={classes.title}>
        <Typography className={classes.icon} variant="h5" component="div">
          {icon}
        </Typography>
        <Typography variant="body2" component="span">
          {title}
        </Typography>
      </div>
      <div className={classes.valueField}>
        <Typography variant="h5" component="em">
          {inView ? <StatCore value={value} /> : <span>0</span>}
        </Typography>
        <Typography component="span" className={classes.label}>
          {label}
        </Typography>
      </div>
    </Grid>
  );
}

export function StatsFallBack(): JSX.Element {
  return (
    <Grid container>
      <Stat icon={<ProgramIcon fontSize="inherit" />} value={0} title="放送" label="回" />
      <Stat icon={<TuneIcon fontSize="inherit" />} value={0} title="曲数" label="曲" />
      <Stat icon={<ArtistIcon fontSize="inherit" />} value={0} title="アーティスト" label="組" />
    </Grid>
  );
}

export default function Stats(): JSX.Element {
  const classes = useStyles();
  const { allProgram, allArtist } = useStaticQuery<StatQuery>(graphql`
    query Stat {
      allProgram {
        totalCount
        group(field: playlist) {
          totalCount
        }
      }
      allArtist {
        totalCount
      }
    }
  `);

  return (
    <Grid container className={classes.container}>
      <Stat icon={<ProgramIcon fontSize="inherit" />} value={allProgram.totalCount} title="放送" label="回" />
      <Stat icon={<TuneIcon fontSize="inherit" />} value={allProgram.group[0].totalCount} title="曲数" label="曲" />
      <Stat icon={<ArtistIcon fontSize="inherit" />} value={allArtist.totalCount} title="アーティスト" label="組" />
    </Grid>
  );
}
