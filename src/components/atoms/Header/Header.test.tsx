import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

  it('renders the chart icon button and handles click', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Header onChartClick={onClick} />);

    const button = screen.getByRole('button', { name: /show weekly statistics/i });
    expect(button).toBeInTheDocument();

    await user.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders without onChartClick and does not crash on click', async () => {
    const user = userEvent.setup();
    render(<Header />);

    const button = screen.getByRole('button', { name: /show weekly statistics/i });
    expect(button).toBeInTheDocument();

    await user.click(button);
  });
});
