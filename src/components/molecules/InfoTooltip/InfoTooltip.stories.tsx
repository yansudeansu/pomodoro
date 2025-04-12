import type { Meta, StoryObj } from '@storybook/react';
import { InfoTooltip } from './InfoTooltip';

const meta: Meta<typeof InfoTooltip> = {
  title: 'Molecules/InfoTooltip',
  component: InfoTooltip,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'The `InfoTooltip` provides contextual guidance for planning tasks using the Pomodoro technique. Click the icon to toggle the tooltip. It auto-closes on blur.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof InfoTooltip>;

export const Default: Story = {};
