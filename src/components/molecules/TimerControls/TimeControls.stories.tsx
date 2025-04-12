import React, { useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TimerControls } from './TimerControls';
import { PomodoroProvider, usePomodoroContext } from '../../../context/PomodoroContext';

const WithMockedContext: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <PomodoroProvider>
      <MockedContext>{children}</MockedContext>
    </PomodoroProvider>
  );
};

const MockedContext: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { setTasks, setActiveTaskId } = usePomodoroContext();

  useEffect(() => {
    setTasks([
      {
        id: '1',
        title: 'Write documentation',
        completed: false,
        pomodoros: 2,
        completedPomodoros: 1,
      },
    ]);

    setActiveTaskId(null);
  }, [setTasks, setActiveTaskId]);

  return <>{children}</>;
};

const meta: Meta<typeof TimerControls> = {
  title: 'Molecules/TimerControls',
  component: TimerControls,
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
          '`TimerControls` toggles the Pomodoro timer between running and paused states. When starting, it also selects the next unfinished task.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof TimerControls>;

export const Default: Story = {};
