import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import AppLink from 'gatsby-theme-aoi/src/components/AppLink';
import Tune, { TuneSkeleton, TuneProps } from './Tune';
import TextSpan from './TextSpan';
import { Maybe, Program } from '../../graphql-types';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      padding: theme.spacing(1, 0),
    },
    header: {
      padding: theme.spacing(1),
    },
    title: {
      fontWeight: theme.typography.fontWeightBold,
    },
  })
);

export interface TunesByProgramProps {
  program: Maybe<
    Pick<Program, 'id' | 'week' | 'date' | 'fields' | 'title'> & {
      playlist: TuneProps['tune'][];
    }
  >;
}

function TunesByProgram({ program }: TunesByProgramProps): JSX.Element {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Typography variant="body2" color="textSecondary">
          <TextSpan>第{program?.week}回</TextSpan>
          <TextSpan>{program?.date}</TextSpan>
        </Typography>
        <Typography className={classes.title} variant="body1">
          <AppLink to={program?.fields?.slug ?? '#'}>{program?.title}</AppLink>
        </Typography>
      </div>
      <div>{program?.playlist?.map((tune) => <Tune key={tune?.id} tune={tune} />) ?? null}</div>
    </div>
  );
}

export default TunesByProgram;

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
