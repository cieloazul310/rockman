import * as React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';
import { ProgramPageHeader, ArtistPageHeader } from './PageHeader';
import Section, { SectionDivider } from './Section';
import { TuneSkeleton } from './Tune';
import { TunesByProgramSkeleton } from './TunesByProgram';
import { SitePageContextNext, SitePageContextPrevious } from '../../graphql-types';

const useStyles = makeStyles((theme) =>
  createStyles({
    tabs: {
      padding: theme.spacing(3, 0),
    },
  })
);

function TabsDummy() {
  const classes = useStyles();
  return <div className={classes.tabs} />;
}

interface ProgramTonarinoTabProps {
  item: Pick<NonNullable<SitePageContextNext> | NonNullable<SitePageContextPrevious>, 'fields' | 'week' | 'title' | 'date'>;
}

export function ProgramTonarinoTab({ item }: ProgramTonarinoTabProps): JSX.Element {
  return (
    <div>
      <ProgramPageHeader program={item} />
      <SectionDivider />
      <Section>
        <TabsDummy />
        <TuneSkeleton />
        <TuneSkeleton />
        <TuneSkeleton />
        <TuneSkeleton />
        <TuneSkeleton />
        <TuneSkeleton />
      </Section>
    </div>
  );
}

interface ArtistTonarinoTabProps {
  item: Pick<NonNullable<SitePageContextNext> | NonNullable<SitePageContextPrevious>, 'name' | 'image' | 'programCount' | 'tunesCount'>;
}

export function ArtistTonarinoTab({ item }: ArtistTonarinoTabProps): JSX.Element {
  return (
    <div>
      <ArtistPageHeader artist={item} />
      <SectionDivider />
      <Section>
        <TabsDummy />
        <TunesByProgramSkeleton />
      </Section>
    </div>
  );
}
