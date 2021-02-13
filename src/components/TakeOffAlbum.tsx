import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import AppLink from 'gatsby-theme-aoi/src/components/AppLink';
import TextSpan from './TextSpan';
import { TakeOffQuery } from '../../graphql-types';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      padding: theme.spacing(1, 0),
    },
    tune: {
      padding: theme.spacing(1),
    },
    tuneTitle: {
      display: 'flex',
    },
    titleIndex: {
      width: '2em',
      display: 'flex',
      justifyContent: 'flex-end',
      paddingRight: '.5em',
    },
    appendProgram: {
      paddingLeft: theme.spacing(4),
    },
    albumTitle: {
      padding: theme.spacing(0, 1),
    },
    programTitle: {
      fontWeight: theme.typography.fontWeightBold,
    },
  })
);

interface Props {
  album: TakeOffQuery['albums']['edges'][number]['node'];
}

export function TakeOffAlbumItem({ album }: Props) {
  const classes = useStyles();
  return (
    <div>
      {album.tunes.map((tune) => (
        <div key={tune.id} className={classes.tune}>
          <div className={classes.tuneTitle}>
            <Typography className={classes.titleIndex}>{tune.index}.</Typography>
            <Typography>{tune.title}</Typography>
          </div>
          <div>
            {tune.append?.map((program) => (
              <div className={classes.appendProgram} key={program?.id}>
                <Typography variant="caption" color="textSecondary">
                  <TextSpan>第{program?.week}回</TextSpan>
                  <TextSpan>{program?.date}</TextSpan>
                </Typography>
                <Typography variant="body2" className={classes.programTitle}>
                  <AppLink to={program?.fields?.slug ?? '#'}>{program?.title}</AppLink>
                </Typography>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function TakeOffAlbum({ album }: Props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <TakeOffAlbumItem album={album} />
    </div>
  );
}

export default TakeOffAlbum;

interface TakeOffOthersProps {
  albums: TakeOffQuery['albums'];
}

export function TakeOffOthers({ albums }: TakeOffOthersProps) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {albums.edges.map(({ node }) => (
        <div key={node.id} className={classes.root}>
          <div className={classes.albumTitle}>
            <Typography variant="body2" color="textSecondary">
              {node.year}
            </Typography>
            <Typography variant="subtitle2">{node.title}</Typography>
          </div>
          <TakeOffAlbumItem album={node} />
        </div>
      ))}
    </div>
  );
}
