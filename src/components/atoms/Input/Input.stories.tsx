import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Atoms/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'The `Input` component is a styled wrapper around a standard text input. It supports all native input props and allows custom styling via `className`.',
      },
    },
  },
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
      defaultValue: 'Enter text...',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    value: {
      control: 'text',
      description: 'The current value',
    },
    onChange: { action: 'changed' },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Type something...',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Can't type here",
    disabled: true,
  },
};

export const WithValue: Story = {
  args: {
    value: 'Pre-filled text',
  },
};

export const Borderless: Story = {
  args: {
    placeholder: 'Borderless input',
    borderless: true,
  },
};
