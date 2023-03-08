import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { AppLink } from '@cieloazul310/gatsby-theme-aoi';
import { ArtistIcon } from '../../icons';
import { MinimumArtist } from '../../../types';

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
      sx={{ display: 'flex' }}
      onTouchMove={isolateTouch}
      onTouchStart={isolateTouch}
      onTouchEnd={isolateTouch}
    >
      <Box sx={{ display: 'flex', flexGrow: 1, flexDirection: 'column' }}>
        <Box sx={{ width: '100%', display: 'flex', position: 'relative', borderRadius: 2, overflow: 'hidden', aspectRatio: 1 }}>
          <Box
            sx={{
              bgcolor: ({ palette }) => palette.grey[palette.mode === 'light' ? 400 : 600],
              backgroundImage: image ? `url(${image})` : undefined,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              pb: '100%',
              width: '100%',
            }}
          />
          {!image ? (
            <Box
              position="absolute"
              top={0}
              left={0}
              width={1}
              height={1}
              display="flex"
              justifyContent="center"
              alignItems="center"
              color="background.default"
              fontSize={{ xs: 'h4.fontSize', md: 'h3.fontSize' }}
            >
              <ArtistIcon fontSize="inherit" />
            </Box>
          ) : null}
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
        <Box minHeight="2em" lineHeight="initial">
          <Typography variant="body2" component="span" lineHeight={1}>
            {name}
          </Typography>
        </Box>
      </Box>
    </AppLink>
  );
}

export default ArtistItem;
