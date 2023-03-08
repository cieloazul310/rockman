import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useInView } from 'react-intersection-observer';
import { ProgramIcon, ArtistIcon, TuneIcon } from '../icons';
import useAnimation from '../utils/useAnimation';

type StatProps = {
  icon: React.ReactNode;
  value: number;
  label: string;
  title: string;
};

function StatCore({ value, disableAnimation = false }: { value: number; disableAnimation?: boolean }) {
  const animation = useAnimation('linear', value, 0);
  return <span>{disableAnimation ? value : Math.round(value * animation)}</span>;
}

StatCore.defaultProps = {
  disableAnimation: false,
};

export function Stat({ icon, value, label, title }: StatProps) {
  const triggered = typeof window === 'object' ? window.sessionStorage.getItem(`stat-triggered-${title}`) : null;
  const [ref, inView] = useInView({
    triggerOnce: true,
  });
  React.useEffect(() => {
    if (window && inView) {
      window.sessionStorage.setItem(`stat-triggered-${title}`, 'triggered');
    }
  }, [inView]);
  return (
    <Grid item xs={4} ref={ref}>
      <Box px={{ xs: 0, sm: 4, md: 8 }}>
        <Box display="flex" alignItems="center">
          <Typography display="flex" pr={0.5} variant="h5" component="span">
            {icon}
          </Typography>
          <Typography variant="body2" component="span">
            {title}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'flex-end', alignItems: 'baseline' }}>
          <Typography component="em" fontSize={{ xs: 'h5.fontSize', sm: 'h5.fontSize', md: 'h4.fontSize' }}>
            {inView ? <StatCore value={value} disableAnimation={Boolean(triggered)} /> : <span>0</span>}
          </Typography>
          <Typography component="span" ml=".5em">
            {label}
          </Typography>
        </Box>
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
  };
  allArtist: {
    totalCount: number;
  };
  allTunes: {
    totalCount: number;
  };
};

export default function Stats() {
  const { allProgram, allArtist, allTunes } = useStaticQuery<StatQueryData>(graphql`
    query {
      allProgram {
        totalCount
      }
      allArtist {
        totalCount
      }
      allTunes {
        totalCount
      }
    }
  `);

  return (
    <Grid container spacing={{ xs: 1, sm: 2 }}>
      <Stat icon={<ProgramIcon fontSize="inherit" />} value={allProgram.totalCount} title="放送" label="回" />
      <Stat icon={<TuneIcon fontSize="inherit" />} value={allTunes.totalCount} title="曲数" label="曲" />
      <Stat icon={<ArtistIcon fontSize="inherit" />} value={allArtist.totalCount} title="アーティスト" label="組" />
    </Grid>
  );
}
