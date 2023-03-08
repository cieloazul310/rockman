import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import MuiLink from '@mui/material/Link';
import Skeleton from '@mui/material/Skeleton';
import { AppLink } from '@cieloazul310/gatsby-theme-aoi';
import PlayCircleIcon from '@mui/icons-material/PlayCircleOutline';
import TextSpan from '../TextSpan';
import NationLabel from '../NationLabel';
import { TuneIcon } from '../../icons';
import useIsMobile from '../../utils/useIsMobile';
import type { TuneItemFragment } from '../../../types';

type YouTubeLinkProps = {
  href: string;
  title?: string;
  children: React.ReactNode;
};

function YouTubeLink({ href, title, children }: YouTubeLinkProps) {
  const isMobile = useIsMobile();
  const linkTitle = title ? `YouTubeで${title}を再生する` : `YouTubeで再生する`;
  return (
    <MuiLink href={href} sx={{ position: 'relative' }} title={linkTitle} target="_blank" rel="noopener noreferrer">
      {children}
      <Box
        sx={{
          position: 'absolute',
          width: 1,
          height: 1,
          top: 0,
          left: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          opacity: !isMobile ? 0 : 0.4,
          color: '#fff',
          fontSize: 48,
          transition: ({ transitions }) => transitions.create('opacity'),
          '&:hover': {
            opacity: 0.8,
          },
        }}
      >
        <PlayCircleIcon fontSize="inherit" color="inherit" />
      </Box>
    </MuiLink>
  );
}

YouTubeLink.defaultProps = {
  title: undefined,
};

type TuneBareProps = {
  image?: string;
  nation?: string;
  href?: string;
  alt?: string;
  headerText?: React.ReactNode;
  title?: React.ReactNode;
  footerText?: React.ReactNode;
};

export function TuneBare({
  image,
  nation,
  href,
  alt,
  headerText = <Skeleton width={100} />,
  title = <Skeleton width={160} />,
  footerText = <Skeleton width={100} />,
}: TuneBareProps) {
  const avatar = (
    <Box position="relative">
      <Avatar
        sx={{
          width: ({ spacing }) => ({ xs: spacing(11), sm: spacing(13), md: spacing(15) }),
          height: ({ spacing }) => ({ xs: spacing(11), sm: spacing(13), md: spacing(15) }),
          borderRadius: 2,
          overflow: 'hidden',
        }}
        variant="square"
        src={image}
        alt={alt}
      >
        <TuneIcon />
      </Avatar>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      >
        {nation ? <NationLabel nation={nation} /> : null}
      </Box>
    </Box>
  );
  return (
    <Box sx={{ display: 'flex', borderRadius: 2, overflow: 'hidden', bgcolor: 'background.paper' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 0, borderRadius: 2, overflow: 'hidden' }}>
        {href ? (
          <YouTubeLink href={href} title={alt}>
            {avatar}
          </YouTubeLink>
        ) : (
          avatar
        )}
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', px: 2, py: 1, flexGrow: 1 }}>
        <Typography component="div" variant="body2" color="textSecondary" fontSize={{ md: 'body1.fontSize' }}>
          {headerText}
        </Typography>
        <Box pt={{ xs: 0, sm: 1 }}>
          <Typography component="div" fontSize={{ xs: 'body1.fontSize', sm: 'h6.fontSize', md: 'h5.fontSize' }}>
            {title}
          </Typography>
          <Typography component="div" fontSize={{ xs: 'body2.fontSize', sm: 'body1.fontSize' }}>
            {footerText}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

TuneBare.defaultProps = {
  image: undefined,
  href: undefined,
  alt: undefined,
  nation: undefined,
  title: <Skeleton width={160} />,
  headerText: <Skeleton width={100} />,
  footerText: <Skeleton width={100} />,
};

export type TuneProps = {
  tune: TuneItemFragment;
};

function Tune({ tune }: TuneProps) {
  const { title, indexInWeek, artist, corner, selector, year, youtube, nation } = tune;
  return (
    <TuneBare
      title={title}
      headerText={
        <>
          <TextSpan label={`M${indexInWeek}.`} />
          <TextSpan label={corner} />
          {selector && selector !== '草野マサムネ' ? <TextSpan label={`${selector}選曲`} /> : null}
        </>
      }
      footerText={
        <>
          <TextSpan
            label={
              artist.name !== 'スピッツ' ? (
                <AppLink href={artist.slug} color="inherit">
                  {artist.name}
                </AppLink>
              ) : (
                'スピッツ'
              )
            }
          />
          <TextSpan color="textSecondary" label={`(${year.toString()})`} />
        </>
      }
      image={youtube ? `https://i.ytimg.com/vi/${youtube}/0.jpg` : undefined}
      href={youtube ? `https://youtu.be/${youtube}` : undefined}
      alt={`${artist.name} "${title}"`}
      nation={nation}
    />
  );
}

export default Tune;

export function TuneSkeleton() {
  return <TuneBare title={<Skeleton width={160} />} headerText={<Skeleton width={100} />} footerText={<Skeleton width={100} />} />;
}
