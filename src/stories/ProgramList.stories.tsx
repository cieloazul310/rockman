import * as React from "react";
import List from "@mui/material/List";
import type { ComponentMeta } from "@storybook/react";
import ProgramListItem from "@/components/program-list/item";
import programs from "./data/programs";

export default {
  title: "ProgramList",
  component: ProgramListItem,
} as ComponentMeta<typeof ProgramListItem>;

export function Item() {
  return <ProgramListItem program={programs[0]} />;
}

export function ProgramList() {
  return (
    <List>
      {programs.map((program) => (
        <ProgramListItem key={program.id} program={program} />
      ))}
    </List>
  );
}
