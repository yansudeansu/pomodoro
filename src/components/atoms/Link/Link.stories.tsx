import type { Meta, StoryObj } from "@storybook/react";
import { Link } from "./Link";

const meta: Meta<typeof Link> = {
  title: "Atoms/Link",
  component: Link,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "The `Link` component renders a styled anchor (`<a>`) tag. It supports both internal and external links, and optionally displays an external link icon when `showIcon` is set to `true`.",
      },
    },
  },
  argTypes: {
    href: {
      control: "text",
      description: "The destination URL of the link",
      defaultValue: "https://example.com",
    },
    children: {
      control: "text",
      description: "Link text or content",
      defaultValue: "Click me",
    },
    external: {
      control: "boolean",
      description:
        "If true, opens the link in a new tab and adds appropriate `rel` attributes",
    },
    showIcon: {
      control: "boolean",
      description:
        "If true, shows an external link icon (only for external links)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Link>;

export const InternalLink: Story = {
  args: {
    href: "/about",
    children: "Go to About Page",
    external: false,
    showIcon: false,
  },
};

export const ExternalLink: Story = {
  args: {
    href: "https://github.com/yansudeansu/pomodoro",
    children: "View on GitHub",
    external: true,
    showIcon: true,
  },
};

export const ExternalNoIcon: Story = {
  args: {
    href: "https://example.com",
    children: "Visit external site (no icon)",
    external: true,
    showIcon: false,
  },
};
