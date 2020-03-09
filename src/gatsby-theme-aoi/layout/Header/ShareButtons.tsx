import * as React from 'react';
import Box from '@material-ui/core/Box';
import IconButton, { IconButtonProps } from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import YouTubeIcon from '@material-ui/icons/YouTube';
import { useSiteMetadata } from 'gatsby-theme-aoi/src/graphql-hooks';
import useSocialShare from 'gatsby-theme-aoi/src/utils/useSocialShare';

type Props = {
  className?: string;
  title?: string;
} & Partial<Pick<IconButtonProps, 'color'>>;

function ShareButtons({ className, title, color = 'default' }: Props) {
  const { youtube } = useSiteMetadata().social;
  const twitterUrl = useSocialShare('twitter', title);
  const fbUrl = useSocialShare('facebook');
  return (
    <Box className={className}>
      <Tooltip title="Twitterでシェア">
        <IconButton
          color={color}
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <TwitterIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Facebookでシェア">
        <IconButton
          color={color}
          href={fbUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FacebookIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="YouTube">
        <IconButton
          color={color || 'default'}
          href={`https://www.youtube.com/${youtube}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <YouTubeIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
}

export default ShareButtons;
