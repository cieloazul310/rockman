import * as React from 'react';
import IconButton, { IconButtonProps } from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { IconProps } from '@material-ui/core/Icon';
import {
  faTwitter,
  faFacebookF,
  faYoutube
} from '@fortawesome/free-brands-svg-icons';
import FabIcon from 'gatsby-theme-typescript-material-ui/src/components/FabIcon';
import useSocialShare from 'gatsby-theme-typescript-material-ui/src/utils/useSocialShare';

type Props = {
  className?: string;
  title?: string;
} & Partial<Pick<IconProps, 'fontSize'>> &
  Partial<Pick<IconButtonProps, 'color'>>;

function ShareButtons({
  className,
  title,
  fontSize = 'default',
  color = 'default'
}: Props) {
  const twitterUrl = useSocialShare('twitter', title);
  const fbUrl = useSocialShare('facebook');
  return (
    <div className={className}>
      <Tooltip title="Twitterでシェア">
        <IconButton
          color={color}
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FabIcon icon={faTwitter} fontSize={fontSize} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Facebookでシェア">
        <IconButton
          color={color}
          href={fbUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FabIcon icon={faFacebookF} fontSize={fontSize} />
        </IconButton>
      </Tooltip>
      <Tooltip title="YouTube">
        <IconButton
          color={color || 'default'}
          href="https://www.youtube.com/playlist?list=PLGqFsFmePh4xxQjnjCpBLYsJY-VecUzdJ"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FabIcon icon={faYoutube} fontSize={fontSize || 'default'} />
        </IconButton>
      </Tooltip>
    </div>
  );
}

export default ShareButtons;