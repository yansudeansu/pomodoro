import React, { useEffect } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { PomodoroTimer } from "./PomodoroTimer";
import {
  PomodoroProvider,
  usePomodoroContext,
} from "../../../context/PomodoroContext";

const WithMockedContext: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <PomodoroProvider>
      <MockedValues>{children}</MockedValues>
    </PomodoroProvider>
  );
};

const MockedValues: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { setTimeLeft, setTasks, setActiveTaskId } = usePomodoroContext();

  useEffect(() => {
    setTimeLeft(1500);
    setTasks([
      {
        id: "1",
        title: "Design UI for Timer",
        completed: false,
        pomodoros: 2,
        completedPomodoros: 1,
      },
    ]);
    setActiveTaskId("1");
  }, [setTimeLeft, setTasks, setActiveTaskId]);

  return <>{children}</>;
};

const meta: Meta<typeof PomodoroTimer> = {
  title: "Organisms/PomodoroTimer",
  component: PomodoroTimer,
  decorators: [
    (Story) => (
      <WithMockedContext>
        <Story />
      </WithMockedContext>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          "`PomodoroTimer` is the central UI component displaying the current mode, timer, controls, and helpful planning tips. It hooks into the timer logic and task management context.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof PomodoroTimer>;

export const Default: Story = {};
