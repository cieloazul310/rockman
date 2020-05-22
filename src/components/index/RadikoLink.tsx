import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      padding: theme.spacing(2, 0),
    },
    banner: {
      maxWidth: '100%',
    },
  })
);

interface Props {
  date: string;
}

function RadikoLink({ date }: Props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <a href={`http://radiko.jp/#!/ts/FMT/${date.split('-').join('')}210000`} target="_blank" rel="noopener noreferrer">
        <img className={classes.banner} alt="最新回をradikoで聞く" src="http://radiko.jp/static/image/full_banner.gif" />
      </a>
    </div>
  );
}

export default RadikoLink;
