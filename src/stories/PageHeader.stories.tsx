import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import ProgramPageHeader from "../templates/program/PageHeader";
import program from "./data/program";

const meta: Meta<typeof ProgramPageHeader> = {
  title: "Components/ProgramPageHeader",
  component: ProgramPageHeader,
};

export default meta;

type Story = StoryObj<typeof ProgramPageHeader>;

export const Program: Story = {
  render: () => <ProgramPageHeader program={program} />,
};
