import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Skeleton from '@mui/material/Skeleton';
import { AppLink, ExternalLink } from '@cieloazul310/gatsby-theme-aoi';
import TextSpan from './TextSpan';
import NationLabel from './NationLabel';
import { TuneIcon } from '../icons';
import { TuneBrowser } from '../../types';

type TuneBareProps = {
  image?: string;
  nation?: string;
  href?: string;
  headerText: React.ReactNode;
  title: React.ReactNode;
  footerText: React.ReactNode;
};

function TuneBare({ image, nation, href, headerText, title, footerText }: TuneBareProps) {
  const avatar = (
    <Box position="relative">
      <Avatar
        sx={{
          width: ({ spacing }) => ({ xs: spacing(11), sm: spacing(13) }),
          height: ({ spacing }) => ({ xs: spacing(11), sm: spacing(13) }),
        }}
        variant="square"
        src={image}
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
    <Box sx={{ display: 'flex', py: 1 }}>
      <Box sx={{ display: 'flex', px: 1, alignItems: 'center', flexShrink: 0 }}>
        {href ? <ExternalLink href={href}>{avatar}</ExternalLink> : avatar}
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', px: 1, flexGrow: 1 }}>
        <Typography variant="body2" color="textSecondary">
          {headerText}
        </Typography>
        <Box pt={{ xs: 0, sm: 1 }}>
          <Typography fontSize={{ xs: 'body1.fontSize', sm: 'h6.fontSize' }}>{title}</Typography>
          <Typography fontSize={{ xs: 'body2.fontSize', sm: 'body1.fontSize' }}>{footerText}</Typography>
        </Box>
      </Box>
    </Box>
  );
}

TuneBare.defaultProps = {
  image: undefined,
  href: undefined,
  nation: undefined,
};

export type TuneProps = {
  tune: Pick<TuneBrowser, 'id' | 'title' | 'indexInWeek' | 'artist' | 'corner' | 'selector' | 'year' | 'youtube' | 'nation'>;
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
                <AppLink to={artist.slug} color="inherit">
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
      href={`https://youtu.be/${youtube}`}
      nation={nation}
    />
  );
}

export default Tune;

export function TuneSkeleton() {
  return <TuneBare title={<Skeleton width={160} />} headerText={<Skeleton width={100} />} footerText={<Skeleton width={100} />} />;
}
