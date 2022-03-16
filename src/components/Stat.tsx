import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useInView } from 'react-intersection-observer';
import { ProgramIcon, ArtistIcon, TuneIcon } from '../icons';
import useAnimation from '../utils/useAnimation';
// import { StatQuery } from '../../graphql-types';
/*
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
*/

type StatProps = {
  icon: React.ReactNode;
  value: number;
  label: string;
  title: string;
};

function StatCore({ value }: { value: number }) {
  const animation = useAnimation('linear', value, 0);
  return <span>{Math.round(value * animation)}</span>;
}

export function Stat({ icon, value, label, title }: StatProps) {
  // const classes = useStyles();
  const [ref, inView] = useInView({
    triggerOnce: true,
  });
  return (
    <Grid item xs={4} ref={ref}>
      <Box display="flex" alignItems="center">
        <Typography display="flex" py={1} px={0.5} variant="h5" component="div">
          {icon}
        </Typography>
        <Typography variant="body2" component="span">
          {title}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'flex-end', alignItems: 'baseline' }}>
        <Typography variant="h5" component="em">
          {inView ? <StatCore value={value} /> : <span>0</span>}
        </Typography>
        <Typography component="span" ml=".5em">
          {label}
        </Typography>
      </Box>
    </Grid>
  );
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

type StatQueryData = {
  allProgram: {
    totalCount: number;
    group: {
      totalCount: number;
    }[];
  };
  allArtist: {
    totalCount: number;
  };
};

export default function Stats() {
  const { allProgram, allArtist } = useStaticQuery<StatQueryData>(graphql`
    query {
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
    <Grid container spacing={{ xs: 1, sm: 2 }}>
      <Stat icon={<ProgramIcon fontSize="inherit" />} value={allProgram.totalCount} title="放送" label="回" />
      <Stat icon={<TuneIcon fontSize="inherit" />} value={allProgram.group[0].totalCount} title="曲数" label="曲" />
      <Stat icon={<ArtistIcon fontSize="inherit" />} value={allArtist.totalCount} title="アーティスト" label="組" />
    </Grid>
  );
}
