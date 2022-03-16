import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { ListItemLink } from '@cieloazul310/gatsby-theme-aoi';
import { ProgramBrowser } from '../../types';
/*
const useStyles = makeStyles((theme) =>
  createStyles({
    inset: {
      paddingLeft: theme.spacing(2),
    },
  })
);
*/
type ProgramItemProps = {
  program: Pick<ProgramBrowser, 'title' | 'week' | 'date' | 'slug' | 'image'>;
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
      inset
    />
  );
}

ProgramItem.defaultProps = {
  last: false,
};

export default ProgramItem;
