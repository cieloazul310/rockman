import * as React from "react";
import List from "@mui/material/List";
import type { Meta, StoryObj } from "@storybook/react";
import programs from "./data/programs";
import ProgramListItem from "../components/ProgramList/Item";

const meta: Meta<typeof ProgramListItem> = {
  title: "Components/ProgramListItem",
  component: ProgramListItem,
};

export default meta;

type Story = StoryObj<typeof ProgramListItem>;

export const Item: Story = {
  render: () => <ProgramListItem program={programs[0]} />,
};

export const ProgramList: Story = {
  render: () => (
    <List>
      {programs.map((program) => (
        <ProgramListItem key={program.id} program={program} />
      ))}
    </List>
  ),
};
