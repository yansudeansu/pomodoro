import React, { useEffect } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TaskList } from "./TaskList";
import {
  PomodoroProvider,
  usePomodoroContext,
} from "../../../context/PomodoroContext";

const WithMockedContext: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <PomodoroProvider>
      <MockedTasksInjector>{children}</MockedTasksInjector>
    </PomodoroProvider>
  );
};

const MockedTasksInjector: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { setTasks } = usePomodoroContext();

  useEffect(() => {
    setTasks([
      {
        id: "1",
        title: "Write user stories",
        completed: true,
        pomodoros: 2,
        completedPomodoros: 2,
      },
      {
        id: "2",
        title: "Fix login bug",
        completed: false,
        pomodoros: 1,
        completedPomodoros: 0,
      },
    ]);
  }, [setTasks]);

  return <>{children}</>;
};

const meta: Meta<typeof TaskList> = {
  title: "Molecules/TaskList",
  component: TaskList,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <WithMockedContext>
        <Story />
      </WithMockedContext>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof TaskList>;

export const Default: Story = {};
