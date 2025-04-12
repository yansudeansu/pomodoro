import type { Meta, StoryObj } from '@storybook/react';
import { Text } from './Text';

const meta: Meta<typeof Text> = {
  title: 'Atoms/Text',
  component: Text,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'The `Text` component renders styled text using semantic variants such as `heading`, `label`, `timer`, and `body`. It supports custom styling via `className`.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['heading', 'label', 'timer', 'body'],
      description: 'Visual style variant of the text',
    },
    children: {
      control: 'text',
      description: 'Text content',
      defaultValue: 'This is a text component',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Heading: Story = {
  args: {
    variant: 'heading',
    children: 'Heading Text',
  },
};

export const Label: Story = {
  args: {
    variant: 'label',
    children: 'Label Text',
  },
};

export const Timer: Story = {
  args: {
    variant: 'timer',
    children: '25:00',
  },
};

export const Body: Story = {
  args: {
    variant: 'body',
    children: 'This is body text used for normal content.',
  },
};
