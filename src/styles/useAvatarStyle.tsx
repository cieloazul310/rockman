import * as React from 'react';
import Avatar, { AvatarProps } from '@mui/material/Avatar';

function MyAvatar(props: Omit<AvatarProps, 'variant'>) {
  return <Avatar sx={{ width: ({ spacing }) => spacing(11), height: ({ spacing }) => spacing(11) }} variant="square" {...props} />;
}

export default MyAvatar;
