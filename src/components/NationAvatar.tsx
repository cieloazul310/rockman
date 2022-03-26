import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import useNationColor from '../utils/useNationColor';

type NationAvatarProps = {
  nation: string;
  img?: string;
  alt?: string;
};

function NationAvatar({ nation, img, alt }: NationAvatarProps) {
  const { bgcolor, color } = useNationColor(nation);
  return (
    <Avatar sx={{ bgcolor, color, border: `1px solid ${bgcolor}` }} src={img} alt={alt} aria-label="avatar">
      {nation}
    </Avatar>
  );
}

NationAvatar.defaultProps = {
  img: undefined,
  alt: undefined,
};

export default NationAvatar;
