import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { AppLink } from '@cieloazul310/gatsby-theme-aoi';
import NationLabel from './NationLabel';
import TextSpan from './TextSpan';
import { ProgramIcon, ArtistIcon } from '../icons';
import { useParseNation } from '../utils/graphql-hooks';
import type { ProgramBrowser, ArtistBrowser } from '../../types';

type PageHeaderProps = {
  variant: 'program' | 'artist';
  image?: string | null;
  children: React.ReactNode;
  label?: React.ReactNode;
};

function PageHeader({ variant, image, children, label }: PageHeaderProps) {
  return (
    <Container maxWidth="md" disableGutters>
      <Box sx={{ display: 'flex', height: 240, py: 2, bgcolor: 'background.paper' }}>
        <Box sx={{ width: 1 / 2, maxWidth: 280, px: 1, display: 'flex', flexShrink: 0 }}>
          <Box
            sx={{
              bgcolor: ({ palette }) => palette.grey[palette.mode === 'light' ? 400 : 700],
              backgroundImage: image ? `url(${image})` : undefined,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              flexGrow: 1,
              position: 'relative',
            }}
          >
            {!image ? (
              <Box
                sx={{
                  width: 1,
                  height: 1,
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: 56,
                  color: 'background.paper',
                }}
              >
                {variant === 'program' ? (
                  <ProgramIcon fontSize="inherit" color="inherit" />
                ) : (
                  <ArtistIcon fontSize="inherit" color="inherit" />
                )}
              </Box>
            ) : null}
            {label ? <Box sx={{ position: 'absolute', top: 0, left: 0 }}>{label}</Box> : null}
          </Box>
        </Box>
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', px: 1, justifyContent: 'space-between' }}>{children}</Box>
      </Box>
    </Container>
  );
}

PageHeader.defaultProps = {
  image: undefined,
  label: undefined,
};

export function ProgramPageHeader({
  program,
}: {
  program: Pick<ProgramBrowser, 'week' | 'date' | 'title' | 'categories' | 'image' | 'subtitle'> & {
    playlist: unknown[];
  };
}) {
  return (
    <PageHeader image={program.image} variant="program">
      <Box>
        <Typography variant="body2" color="textSecondary">
          <TextSpan label={`第${program.week}回`} />
          <TextSpan label={program.date} />
          <TextSpan label={`全${program.playlist.length}曲`} />
        </Typography>
        <Typography fontWeight="bold" variant="h6" component="h2" lineHeight={1.2}>
          {program.title}
        </Typography>
        {program.subtitle ? <Typography variant="body2">{program.subtitle}</Typography> : null}
      </Box>
      <Typography variant="body2">
        {program.categories.map((category) => (
          <TextSpan
            key={category}
            label={
              <AppLink to="/categories/" state={{ category }}>
                {category}
              </AppLink>
            }
          />
        ))}
      </Typography>
    </PageHeader>
  );
}

export function ArtistPageHeader({
  artist,
}: {
  artist: Pick<ArtistBrowser, 'name' | 'nation'> & {
    program: Pick<ArtistBrowser['program'], 'image' | 'programsCount' | 'tunesCount'>;
  };
}) {
  const { country } = useParseNation(artist.nation);
  return (
    <PageHeader variant="artist" image={artist.program.image} label={<NationLabel nation={artist.nation} fontSize="large" />}>
      <Box>
        <Typography fontWeight="bold" lineHeight={1.2} variant="h6" component="h2">
          {artist.name}
        </Typography>
        <Typography variant="body2">{country}</Typography>
      </Box>
      <Typography variant="body1">
        {artist.program.tunesCount}曲/{artist.program.programsCount}回
      </Typography>
    </PageHeader>
  );
}

export default PageHeader;
