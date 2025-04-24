import type { Preview } from '@storybook/react';
import '../src/global.css';

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: ['UI', 'Atoms', 'Molecules', 'Organisms', 'Pages'],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
