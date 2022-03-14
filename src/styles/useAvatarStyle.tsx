import * as React from 'react';
import Avatar, { AvatarProps } from '@mui/material/Avatar';
import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';

export const useAvatarStyles = makeStyles((theme) =>
  createStyles({
    avatar: {
      width: theme.spacing(11),
      height: theme.spacing(11),
    },
  })
);

function MyAvatar(props: Omit<AvatarProps, 'variant'>): JSX.Element {
  const classes = useAvatarStyles();
  return <Avatar className={classes.avatar} variant="square" {...props} />;
}

export default MyAvatar;
