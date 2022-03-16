import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { AppLink, Section, SectionDivider, Article } from '@cieloazul310/gatsby-theme-aoi';
import Tune from './Tune';
import TextSpan from './TextSpan';
import { ProgramBrowser, TuneFields } from '../../types';

type TunesByProgramProps = {
  program: Pick<ProgramBrowser, 'id' | 'week' | 'date' | 'slug' | 'title' | 'subtitle'> & {
    playlist: TuneFields[];
  };
};

function TunesByProgram({ program }: TunesByProgramProps) {
  return (
    <section>
      <Section>
        <Container maxWidth="md" disableGutters sx={{ py: 1 }}>
          <Box p={1}>
            <Typography variant="body1" color="textSecondary">
              <TextSpan label={`第${program.week}回`} />
              <TextSpan label={program.date} />
            </Typography>
            <Typography fontWeight="bold">
              <AppLink to={program.slug}>{program.title}</AppLink>
            </Typography>
            {program.subtitle ? <Typography variant="body2">{program.subtitle}</Typography> : null}
          </Box>
          <Box>
            {program.playlist.map((tune) => (
              <Tune key={tune.id} tune={tune} />
            ))}
          </Box>
        </Container>
      </Section>
      <SectionDivider />
    </section>
  );
}

export default TunesByProgram;
/*
interface TuneByProgramProps {
  tune: Maybe<
    TuneProps['tune'] & {
      program: Maybe<Pick<Program, 'week' | 'date' | 'fields' | 'title'>>;
    }
  >;
}

export function TuneByProgram({ tune }: TuneByProgramProps): JSX.Element {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Typography variant="body2" color="textSecondary">
          <TextSpan>第{tune?.program?.week}回</TextSpan>
          <TextSpan>{tune?.program?.date}</TextSpan>
        </Typography>
        <Typography className={classes.title} variant="body1">
          <AppLink to={tune?.program?.fields?.slug ?? '#'}>{tune?.program?.title}</AppLink>
        </Typography>
      </div>
      <div>
        <Tune tune={tune} />
      </div>
    </div>
  );
}

export function TunesByProgramSkeleton(): JSX.Element {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Typography variant="body2" color="textSecondary">
          <TextSpan>
            <Skeleton width={40} />
          </TextSpan>
          <TextSpan>
            <Skeleton width={60} />
          </TextSpan>
        </Typography>
        <Typography className={classes.title} variant="body1" color="secondary">
          <Skeleton width={260} />
        </Typography>
      </div>
      <div>{Array.from({ length: 4 }).map((_, index) => <TuneSkeleton key={index.toString()} />) ?? null}</div>
    </div>
  );
}
*/
