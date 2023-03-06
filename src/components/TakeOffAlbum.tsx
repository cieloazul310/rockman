import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { AppLink } from '@cieloazul310/gatsby-theme-aoi';
import TextSpan from './TextSpan';
import type { ProgramBrowser, SpitzAlbumBrowser, SpitzTune } from '../../types';

type TakeOffAlbumProps = {
  album: Pick<SpitzAlbumBrowser, 'id' | 'albumIdNum' | 'title' | 'year'> & {
    tunes: (SpitzTune & {
      program: Pick<ProgramBrowser, 'id' | 'date' | 'slug' | 'title' | 'subtitle' | 'week' | 'image'>[];
    })[];
  };
};

function TakeOffAlbum({ album }: TakeOffAlbumProps) {
  return (
    <section>
      {album.tunes.map((tune) => (
        <Box key={tune.id} py={1}>
          <Box display="flex">
            <Typography sx={{ width: '2em', display: 'flex', justifyContent: 'flex-end', pr: '.5em' }}>{tune.index}.</Typography>
            <Typography>{tune.title}</Typography>
          </Box>
          <div>
            {tune.program.map((program) => (
              <Box pl={4} key={program.id}>
                <Typography variant="caption" color="textSecondary">
                  <TextSpan label={`第${program.week}回`} />
                  <TextSpan label={program.date} />
                </Typography>
                <Typography variant="body2" fontWeight="bold">
                  <AppLink href={program.slug}>{program.title}</AppLink>
                </Typography>
              </Box>
            ))}
          </div>
        </Box>
      ))}
    </section>
  );
}

export default TakeOffAlbum;

type TakeOffOthersProps = {
  albums: {
    edges: {
      node: Pick<SpitzAlbumBrowser, 'id' | 'albumIdNum' | 'title' | 'year'> & {
        tunes: (SpitzTune & {
          program: Pick<ProgramBrowser, 'id' | 'date' | 'slug' | 'title' | 'subtitle' | 'week' | 'image'>[];
        })[];
      };
    }[];
  };
};

export function TakeOffOthers({ albums }: TakeOffOthersProps) {
  return (
    <Box py={1}>
      {albums.edges.map(({ node }) => (
        <Box key={node.id} py={2}>
          <Box px={1}>
            <Typography variant="body2" color="textSecondary">
              {node.year}
            </Typography>
            <Typography variant="subtitle2">{node.title}</Typography>
          </Box>
          <TakeOffAlbum album={node} />
        </Box>
      ))}
    </Box>
  );
}
