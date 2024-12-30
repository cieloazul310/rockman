import * as React from "react";
import Avatar from "@mui/material/Avatar";
import type { ProgramListFragment } from "types";
import ListItemLink from "./list-item-link";

type ProgramListItemProps = {
  program: ProgramListFragment;
  last?: boolean;
};

function ProgramListItem({ program, last = false }: ProgramListItemProps) {
  return (
    <ListItemLink
      avatar={
        <Avatar
          sx={{
            width: ({ spacing }) => spacing(11),
            height: ({ spacing }) => spacing(11),
            borderRadius: 2,
            overflow: "hidden",
          }}
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

ProgramListItem.defaultProps = {
  last: false,
};

export default ProgramListItem;
