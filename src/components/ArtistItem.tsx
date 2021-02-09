import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import AppLink from 'gatsby-theme-aoi/src/components/AppLink';
import { Maybe, Artist } from '../../graphql-types';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
    },
    image: {},
    name: {},
  })
);

interface Props {
  artist?: Maybe<Pick<Artist, 'name' | 'image'>>;
}

function ArtistItem({ artist }: Props) {
  const classes = useStyles();
  return (
    <AppLink to={`/artsit/${artist?.name}`} color="inherit">
      <div className={classes.root}>
        <div className={classes.image}></div>
        <div className={classes.name}>{artist?.name}</div>
      </div>
    </AppLink>
  );
}

export default ArtistItem;
