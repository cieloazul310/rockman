import * as React from 'react';
import classNames from 'classnames';
import IconButton, { IconButtonProps } from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { useLocation } from '@reach/router';
import FabIcon from 'gatsby-theme-typescript-material-ui/src/components/FabIcon';
import { faTwitter, faFacebookF, faYoutube } from '@fortawesome/free-brands-svg-icons';
import {
  shareOnFacebook,
  useTwitterShareUrl
} from 'gatsby-theme-typescript-material-ui/src/utils/sharer';
import { IconProps } from '@material-ui/core/Icon';

type Props = {
  className?: string;
  title?: string;
} & Partial<Pick<IconProps, 'fontSize'>> &
  Partial<Pick<IconButtonProps, 'color'>>;

function ShareButtons({ className, title, fontSize, color }: Props) {
  const location = useLocation();
  const twitterShareUrl = useTwitterShareUrl(location.href, title);
  return (
    <div className={classNames(className)}>
      <Tooltip title="Twitterでシェア">
        <IconButton
          color={color || 'default'}
          href={twitterShareUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FabIcon icon={faTwitter} fontSize={fontSize || 'default'} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Facebookでシェア">
        <IconButton
          color={color || 'default'}
          href={shareOnFacebook({ url: location.href })}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FabIcon icon={faFacebookF} fontSize={fontSize || 'default'} />
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
