import * as React from 'react';
import Avatar, { AvatarProps } from '@material-ui/core/Avatar';
import { makeStyles, createStyles } from '@material-ui/core/styles';

export const useAvatarStyles = makeStyles((theme) =>
  createStyles({
    avatar: {
      width: theme.spacing(7),
      height: theme.spacing(7),
      [theme.breakpoints.up('md')]: {
        width: theme.spacing(11),
        height: theme.spacing(11),
      },
    },
  })
);

function MyAvatar(props: Omit<AvatarProps, 'variant'>) {
  const classes = useAvatarStyles();
  return <Avatar className={classes.avatar} variant="square" {...props} />;
}

export default MyAvatar;
