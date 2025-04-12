import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Link } from './Link'

describe('Link', () => {
  it('renders link with correct text', () => {
    render(<Link href="/test">Test Link</Link>)
    const link = screen.getByRole('link', { name: /test link/i })
    expect(link).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(
      <Link href="/test" className="custom-class">
        Test Link
      </Link>
    )
    const link = screen.getByRole('link', { name: /test link/i })
    expect(link.className).toContain('custom-class')
  })

  it('opens in same tab for internal links by default', () => {
    render(<Link href="/internal">Internal</Link>)
    const link = screen.getByRole('link', { name: /internal/i })
    expect(link).not.toHaveAttribute('target')
    expect(link).not.toHaveAttribute('rel')
  })

  it('adds target and rel for external links', () => {
    render(
      <Link href="https://example.com" external>
        External
      </Link>
    )
    const link = screen.getByRole('link', { name: /external/i })
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders icon when showIcon is true and link is external', () => {
    render(
      <Link href="https://example.com" external showIcon>
        External
      </Link>
    )
    const link = screen.getByRole('link', { name: /external/i })
    const icon = link.querySelector('svg')
    expect(icon).toBeInTheDocument()
  })

  it('does not render icon for internal links even if showIcon is true', () => {
    render(
      <Link href="/internal" showIcon>
        Internal
      </Link>
    )
    const icon = screen.queryByRole('img', { hidden: true })
    expect(icon).not.toBeInTheDocument()
  })
})
