import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'The `Button` component is a reusable UI element for handling user interactions. Supports size and visual variants.',
      },
    },
  },
  argTypes: {
    onClick: { action: 'clicked' },
    size: {
      control: 'radio',
      options: ['default', 'large'],
      description: 'Sets the button size',
    },
    variant: {
      control: 'radio',
      options: ['default', 'active'],
      description: 'Controls the visual style of the button',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button if true',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Default Button',
    variant: 'default',
    size: 'default',
  },
};

export const Active: Story = {
  args: {
    children: 'Active Button',
    variant: 'active',
    size: 'default',
  },
};

export const Large: Story = {
  args: {
    children: 'Large Button',
    size: 'large',
    variant: 'default',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    disabled: true,
  },
};
