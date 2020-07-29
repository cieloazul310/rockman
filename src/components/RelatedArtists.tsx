import * as React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import Button from '@material-ui/core/Button';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { ArtistTemplateQuery } from '../../graphql-types';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: 0,
    },
    item: {
      display: 'inline-block',
      padding: 0,
      marginRight: theme.spacing(1),
    },
  })
);

interface Props {
  edges: ArtistTemplateQuery['allProgram']['edges'];
}

function RelatedArtists({ edges }: Props) {
  const classes = useStyles();
  return (
    <ul className={classes.root}>
      {getRelatedArtists(edges).map((artist) => (
        <li key={artist} className={classes.item}>
          <Button component={GatsbyLink} to={`/artist/${artist}/`}>
            {artist}
          </Button>
        </li>
      ))}
    </ul>
  );
}

function getRelatedArtists(edges: ArtistTemplateQuery['allProgram']['edges']): string[] {
  const playlist = edges.map(({ node }) => node.playlist ?? []).reduce((accum, curr) => (accum && curr ? [...accum, ...curr] : accum), []);

  return Array.from(new Set(playlist.map((tune) => tune?.artist ?? ''))).sort((a, b) => a.localeCompare(b));
}

export default RelatedArtists;
