import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import ListItemLink from './ListItemLink';
import { ProgramList } from '../../types';

type ProgramItemProps = {
  program: ProgramList;
  last?: boolean;
};

function ProgramItem({ program, last }: ProgramItemProps) {
  return (
    <ListItemLink
      avatar={
        <Avatar
          sx={{ width: ({ spacing }) => spacing(11), height: ({ spacing }) => spacing(11) }}
          src={program.image ?? undefined}
          variant="square"
        />
      }
      to={program.slug}
      primaryText={program.title}
      secondaryText={`第${program.week}回 ${program.date}`}
      divider={!last}
    />
  );
}

ProgramItem.defaultProps = {
  last: false,
};

export default ProgramItem;
