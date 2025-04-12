import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from './Header';

describe('Header', () => {
  it('renders a link to the GitHub repository', () => {
    render(<Header />);
    const link = screen.getByRole('link', { name: /github/i });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://github.com/yansudeansu/pomodoro');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders an icon inside the GitHub link', () => {
    render(<Header />);
    const link = screen.getByRole('link', { name: /github/i });
    const icon = link.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });
});
