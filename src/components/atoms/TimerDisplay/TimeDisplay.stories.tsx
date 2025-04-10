import type { Meta, StoryObj } from "@storybook/react";
import { TimerDisplay } from "./TimerDisplay";

const meta: Meta<typeof TimerDisplay> = {
  title: "Atoms/TimerDisplay",
  component: TimerDisplay,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "The `TimerDisplay` component formats and displays time in `MM:SS` format, using the `Text` atom with a `timer` variant.",
      },
    },
  },
  argTypes: {
    time: {
      control: { type: "number", min: 0 },
      description: "Time in seconds to be formatted and displayed",
    },
  },
};

export default meta;
type Story = StoryObj<typeof TimerDisplay>;

export const Default: Story = {
  args: {
    time: 1500,
  },
};

export const AlmostDone: Story = {
  args: {
    time: 61,
  },
};

export const ZeroTime: Story = {
  args: {
    time: 0,
  },
};

export const ShortTime: Story = {
  args: {
    time: 7,
  },
};
