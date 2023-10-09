import * as React from "react";
import List from "@mui/material/List";
import type { ComponentMeta } from "@storybook/react";
import programs from "./data/programs";
import ProgramListItem from "../components/ProgramList/Item";

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
