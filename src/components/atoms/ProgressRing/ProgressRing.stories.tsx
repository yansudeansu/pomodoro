import type { Meta, StoryObj } from '@storybook/react';
import { ProgressRing } from './ProgressRing';

const meta: Meta<typeof ProgressRing> = {
  title: 'Atoms/ProgressRing',
  component: ProgressRing,
  args: {
    radius: 60,
    stroke: 6,
    progress: 0.75,
  },
  parameters: {
    docs: {
      description: {
        component:
          '`ProgressRing` renders a circular progress bar using SVG. It visually indicates progress by calculating stroke offset and supports optional centered content.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProgressRing>;

export const Default: Story = {};

export const WithContent: Story = {
  args: {
    children: <span style={{ fontSize: '1.2rem' }}>75%</span>,
  },
};
