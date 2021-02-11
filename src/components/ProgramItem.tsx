import * as React from 'react';
import Avatar from '@material-ui/core/Avatar';
import ListItemLink from 'gatsby-theme-aoi/src/components/ListItemLink';
import { useAvatarStyles } from '../styles';
import { Maybe, Program } from '../../graphql-types';

interface Props {
  program: Maybe<Pick<Program, 'fields' | 'title' | 'week' | 'date'>>;
  last?: boolean;
}

function ProgramItem({ program, last }: Props) {
  const classes = useAvatarStyles();
  return (
    <ListItemLink
      avatar={<Avatar className={classes.avatar} src={program?.fields?.image ?? undefined} variant="square" />}
      to={program?.fields?.slug ?? '#'}
      primaryText={program?.title ?? 'タイトル'}
      secondaryText={`第${program?.week}回 ${program?.date}`}
      divider={!last}
      inset
    />
  );
}

export default ProgramItem;
