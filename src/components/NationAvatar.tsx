import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';
import useNationColor from '../utils/useNationColor';

interface StyleProps {
  background: string;
  color: string;
}

const useStyles = makeStyles<Theme, StyleProps>(() =>
  createStyles({
    nation: ({ background, color }) => ({
      background,
      color,
      border: `1px solid ${background}`,
    }),
  })
);

interface Props {
  nation: string;
  img?: string;
  alt?: string;
}

function NationAvatar({ nation, img, alt }: Props): JSX.Element {
  const [background, color] = useNationColor(nation);
  const classes = useStyles({ background, color });
  return (
    <Avatar className={classes.nation} src={img} alt={alt} aria-label="avatar">
      {nation}
    </Avatar>
  );
}

NationAvatar.defaultProps = {
  img: undefined,
  alt: undefined,
};

export default NationAvatar;
