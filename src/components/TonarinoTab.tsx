import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
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
  item?: Pick<SitePageContextNext | SitePageContextPrevious, 'fields' | 'week' | 'title' | 'date'> | null;
}

export function ProgramTonarinoTab({ item }: ProgramTonarinoTabProps) {
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
  item?: Pick<SitePageContextNext | SitePageContextPrevious, 'name' | 'image' | 'programCount' | 'tunesCount'> | null;
}

export function ArtistTonarinoTab({ item }: ArtistTonarinoTabProps) {
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
