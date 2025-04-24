import { Meta } from '@storybook/react';
import { Text } from '../src/components/atoms/Text/Text';

export default {
  title: 'UI/Design System',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export const Overview = () => (
  <div
    style={{ padding: '2rem', background: 'var(--background-color)', color: 'var(--text-color)' }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
      <img src="/favicon.ico" alt="Pomodoro Icon" width={40} height={40} />
      <Text variant="heading">Pomodoro Design System</Text>
    </div>

    <Text variant="body">
      This page showcases the core design tokens used across the Pomodoro app. It includes color
      swatches, typography scale and foundational UI values.
    </Text>

    <section style={{ marginTop: '2rem' }}>
      <Text variant="label">🎨 Colors</Text>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1rem' }}>
        {[
          '--color-primary',
          '--color-success',
          '--color-info',
          '--color-warning',
          '--color-danger',
          '--color-muted',
          '--color-text',
          '--color-heading',
          '--background-color',
        ].map((token) => (
          <div key={token} style={{ textAlign: 'center' }}>
            <div
              style={{
                width: '3rem',
                height: '3rem',
                borderRadius: '0.5rem',
                backgroundColor: `var(${token})`,
                border: '1px solid var(--color-border)',
              }}
            />
            <Text variant="body">{token}</Text>
          </div>
        ))}
      </div>
    </section>

    <section style={{ marginTop: '2rem' }}>
      <Text variant="label">🔠 Typography</Text>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
        {[
          { name: 'XS', token: '--font-size-xs' },
          { name: 'SM', token: '--font-size-sm' },
          { name: 'Base', token: '--font-size-base' },
          { name: 'MD', token: '--font-size-md' },
          { name: 'LG', token: '--font-size-lg' },
          { name: 'XL', token: '--font-size-xl' },
          { name: '2XL', token: '--font-size-2xl' },
        ].map(({ name, token }) => (
          <span
            key={token}
            style={{
              fontSize: `var(${token})`,
              fontFamily: 'var(--font-family-base)',
              fontWeight: 'var(--font-weight-medium)',
              color: 'var(--color-text)',
            }}
          >
            {name} - {token}
          </span>
        ))}
      </div>
    </section>
  </div>
);
