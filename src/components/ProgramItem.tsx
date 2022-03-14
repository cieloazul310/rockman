import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';
import ListItemLink from './ListItemAppLink';
import { useAvatarStyles } from '../styles';
import { Maybe, Program } from '../../graphql-types';

const useStyles = makeStyles((theme) =>
  createStyles({
    inset: {
      paddingLeft: theme.spacing(2),
    },
  })
);

interface Props {
  program: Maybe<Pick<Program, 'fields' | 'title' | 'week' | 'date'>>;
  last?: boolean;
}

function ProgramItem({ program, last }: Props): JSX.Element {
  const classes = useAvatarStyles();
  const textClasses = useStyles();
  return (
    <ListItemLink
      avatar={<Avatar className={classes.avatar} src={program?.fields?.image ?? undefined} variant="square" />}
      to={program?.fields?.slug ?? '#'}
      primaryText={program?.title ?? 'タイトル'}
      secondaryText={`第${program?.week}回 ${program?.date}`}
      divider={!last}
      inset
      textClasses={textClasses}
    />
  );
}

ProgramItem.defaultProps = {
  last: false,
};

export default ProgramItem;
