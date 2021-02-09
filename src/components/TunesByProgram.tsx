import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import AppLink from 'gatsby-theme-aoi/src/components/AppLink';
import Tune from './Tune';
import TextSpan from './TextSpan';
import { Maybe, Program, ProgramPlaylist, Artist } from '../../graphql-types';

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

interface Props {
  program: Maybe<
    Pick<Program, 'week' | 'date' | 'fields' | 'title'> & {
      playlist: Maybe<
        Pick<ProgramPlaylist, 'id' | 'title' | 'year' | 'indexInWeek' | 'corner' | 'youtube' | 'selector'> & {
          artist: Maybe<Pick<Artist, 'name'>>;
        }
      >[];
    }
  >;
}

function TunesByProgram({ program }: Props) {
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
