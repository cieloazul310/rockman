import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MuiLink from '@mui/material/Link';
import Avatar from '@mui/material/Avatar';
import { AppLink } from '@cieloazul310/gatsby-theme-aoi';
import TextSpan from './TextSpan';
import NationLabel from './NationLabel';
import { TuneIcon } from '../icons';
import { TuneBrowser } from '../../types';

export type TuneProps = {
  tune: Pick<TuneBrowser, 'id' | 'title' | 'indexInWeek' | 'artist' | 'corner' | 'selector' | 'year' | 'youtube' | 'nation'>;
};

function Tune({ tune }: TuneProps) {
  const avatar = (
    <Box position="relative">
      <Avatar
        sx={{
          width: ({ spacing }) => ({ xs: spacing(11), sm: spacing(13) }),
          height: ({ spacing }) => ({ xs: spacing(11), sm: spacing(13) }),
        }}
        variant="square"
        src={tune.youtube ? `https://i.ytimg.com/vi/${tune.youtube}/0.jpg` : undefined}
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
        <NationLabel nation={tune.nation} />
      </Box>
    </Box>
  );
  return (
    <Box sx={{ display: 'flex', py: 1 }}>
      <Box sx={{ display: 'flex', px: 1, alignItems: 'center', flexShrink: 0 }}>
        {tune.youtube ? (
          <MuiLink href={`https://youtu.be/${tune?.youtube}`} target="_blank" rel="noopener noreferrer">
            {avatar}
          </MuiLink>
        ) : (
          avatar
        )}
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', px: 1, flexGrow: 1 }}>
        <Typography variant="body2" color="textSecondary">
          <TextSpan label={`M${tune.indexInWeek}.`} />
          <TextSpan label={tune.corner} />
          {tune?.selector && tune.selector !== '草野マサムネ' ? <TextSpan label={`${tune.selector}選曲`} /> : null}
        </Typography>
        <Box pt={{ xs: 0, sm: 1 }}>
          <Typography fontSize={{ xs: 'body1.fontSize', sm: 'h6.fontSize' }}>{tune.title}</Typography>
          <Typography fontSize={{ xs: 'body2.fontSize', sm: 'body1.fontSize' }}>
            <TextSpan
              label={
                tune.artist.name !== 'スピッツ' ? (
                  <AppLink to={tune?.artist?.slug ?? '#'} color="inherit">
                    {tune?.artist?.name}
                  </AppLink>
                ) : (
                  'スピッツ'
                )
              }
            />
            <TextSpan color="textSecondary" label={`(${tune?.year})`} />
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Tune;
/*
export function TuneSkeleton(): JSX.Element {
  const classes = useStyles({});
  const avatarClass = useAvatarStyles();
  return (
    <div className={classes.root}>
      <div className={classes.left}>
        <Avatar className={avatarClass.avatar} variant="square" src={undefined}>
          <TuneIcon />
        </Avatar>
      </div>
      <div className={classes.right}>
        <Typography variant="body2" color="textSecondary">
          <TextSpan>
            <Skeleton width={100} />
          </TextSpan>
        </Typography>
        <div>
          <Typography>
            <Skeleton width={160} />
          </Typography>
          <Typography variant="body2">
            <TextSpan>
              <Skeleton width={100} />
            </TextSpan>
          </Typography>
        </div>
      </div>
    </div>
  );
}
*/
