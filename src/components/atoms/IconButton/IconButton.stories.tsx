import type { Meta, StoryObj } from "@storybook/react";
import { IconButton } from "./IconButton";
import { IconName } from "../Icons/Icons";

const meta: Meta<typeof IconButton> = {
  title: "Atoms/IconButton",
  component: IconButton,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "The `IconButton` renders an icon-only button that supports variants and sizes. Ideal for compact actions like delete or add.",
      },
    },
  },
  argTypes: {
    icon: {
      control: "select",
      options: [
        "trash",
        "add",
        "sparkle",
        "sparkles",
        "info",
      ] satisfies IconName[],
      description: "Name of the icon from AppIcons",
    },
    variant: {
      control: "radio",
      options: ["default", "success", "danger"],
      description: "Styling variant of the button",
    },
    size: {
      control: "radio",
      options: ["small", "medium"],
      description: "Size of the button and icon",
    },
    label: {
      control: "text",
      description: "Aria-label for accessibility",
    },
    onClick: { action: "clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  args: {
    icon: "add",
    size: "medium",
    variant: "default",
    label: "Add something",
  },
};

export const SmallSuccess: Story = {
  args: {
    icon: "add",
    size: "small",
    variant: "success",
    label: "Add task",
  },
};

export const MediumDanger: Story = {
  args: {
    icon: "trash",
    size: "medium",
    variant: "danger",
    label: "Delete task",
  },
};

export const InfoIcon: Story = {
  args: {
    icon: "info",
    size: "small",
    variant: "default",
    label: "More information",
  },
};
