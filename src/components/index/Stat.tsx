import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useInView } from 'react-intersection-observer';
import useAnimation from '../../utils/useAnimation';
import { ProgramIcon, ArtistIcon, TuneIcon } from '../../icons';
import { StatQuery } from '../../../graphql-types';

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

export function Stat({ icon, value, label, title }: Props) {
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
            <Typography variant="h4" component="em">
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
  const animation = useAnimation('linear', value, 0);
  return <span>{Math.round(value * animation)}</span>;
}

export function StatsFallBack() {
  return (
    <Grid container>
      <Stat icon={<ProgramIcon fontSize="inherit" />} value={0} title="放送" label="回" />
      <Stat icon={<TuneIcon fontSize="inherit" />} value={0} title="曲数" label="曲" />
      <Stat icon={<ArtistIcon fontSize="inherit" />} value={0} title="アーティスト" label="組" />
    </Grid>
  );
}

export default function Stats() {
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
    <Grid container>
      <Stat icon={<ProgramIcon fontSize="inherit" />} value={allProgram.totalCount} title="放送" label="回" />
      <Stat icon={<TuneIcon fontSize="inherit" />} value={allProgram.group[0].totalCount} title="曲数" label="曲" />
      <Stat icon={<ArtistIcon fontSize="inherit" />} value={allArtist.totalCount} title="アーティスト" label="組" />
    </Grid>
  );
}
