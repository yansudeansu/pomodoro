import type { Meta, StoryObj } from '@storybook/react'
import { AppIcons, IconName } from './Icons'

const meta: Meta = {
  title: 'Atoms/Icons',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'This story showcases all available icons registered in `AppIcons`. Each icon can be reused across the application using the `icon` prop in `IconButton`, etc.',
      },
    },
  },
}

export default meta

export const AllIcons: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
      {(Object.keys(AppIcons) as IconName[]).map((key) => {
        const Icon = AppIcons[key]
        return (
          <div key={key} style={{ textAlign: 'center', width: '64px' }}>
            <Icon size={28} />
            <div style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>{key}</div>
          </div>
        )
      })}
    </div>
  ),
}
