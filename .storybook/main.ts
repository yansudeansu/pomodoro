import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-essentials', '@chromatic-com/storybook'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
}
export default config
