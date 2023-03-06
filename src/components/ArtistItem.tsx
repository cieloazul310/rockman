import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { AppLink } from '@cieloazul310/gatsby-theme-aoi';
import { MinimumArtist } from '../../types';

type ArtistItemProps = {
  artist: MinimumArtist;
};

function isolateTouch(event: React.TouchEvent) {
  event.stopPropagation();
}

function ArtistItem({ artist }: ArtistItemProps) {
  const { slug, name, program } = artist;
  const { image, programsCount, tunesCount } = program;

  return (
    <AppLink
      href={slug}
      color="inherit"
      sx={{ display: 'flex', padding: 1 }}
      onTouchMove={isolateTouch}
      onTouchStart={isolateTouch}
      onTouchEnd={isolateTouch}
    >
      <Box sx={{ display: 'flex', flexGrow: 1, flexDirection: 'column' }}>
        <Box sx={{ width: '100%', display: 'flex', position: 'relative' }}>
          <Box
            sx={{
              bgcolor: ({ palette }) => palette.grey[palette.mode === 'light' ? 300 : 700],
              backgroundImage: image ? `url(${image})` : undefined,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              pb: '100%',
              width: '100%',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              color: 'common.white',
              bgcolor: 'primary.dark',
              px: 1,
            }}
          >
            <Typography variant="caption">
              {tunesCount}曲/{programsCount}回
            </Typography>
          </Box>
        </Box>
        <Box py={1}>
          <Typography variant="body2" component="span" lineHeight={1}>
            {name}
          </Typography>
        </Box>
      </Box>
    </AppLink>
  );
}

export default ArtistItem;
