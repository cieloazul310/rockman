import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Section from '../src/components/Section';
import { Stat, useStyles } from '../src/components/index/Stat';
import { ProgramIcon, ArtistIcon, TuneIcon } from '../src/icons';

const stories = { title: 'Stat' };
export default stories;

export function Basic() {
  const classes = useStyles();
  return (
    <Section>
      <Grid container className={classes.container}>
        <Stat icon={<ProgramIcon fontSize="inherit" />} value={280} title="放送" label="回" />
        <Stat icon={<TuneIcon fontSize="inherit" />} value={1040} title="曲数" label="曲" />
        <Stat icon={<ArtistIcon fontSize="inherit" />} value={812} title="アーティスト" label="組" />
      </Grid>
    </Section>
  );
}
