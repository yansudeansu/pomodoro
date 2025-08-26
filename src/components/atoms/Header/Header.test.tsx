import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Header } from './Header';

describe('Header', () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

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

  it('renders the status icon button when VITE_STATUS_URL is set and handles click', async () => {
    import.meta.env.VITE_STATUS_URL = 'https://api.example.com/status';
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Header onStatusClick={onClick} />);

    const button = screen.getByRole('button', { name: /toggle status view/i });
    expect(button).toBeInTheDocument();

    await user.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not render the status icon button when VITE_STATUS_URL is not set', () => {
    vi.stubEnv('VITE_STATUS_URL', '');
    render(<Header onStatusClick={vi.fn()} />);

    expect(screen.queryByRole('button', { name: /toggle status view/i })).not.toBeInTheDocument();
  });

  it('renders without any callbacks and does not crash on button clicks when status URL is set', async () => {
    import.meta.env.VITE_STATUS_URL = 'https://api.example.com/status';
    const user = userEvent.setup();
    render(<Header />);

    const chartBtn = screen.getByRole('button', { name: /show weekly statistics/i });
    const statusBtn = screen.getByRole('button', { name: /toggle status view/i });

    await user.click(chartBtn);
    await user.click(statusBtn);
  });

  it('renders without any callbacks and does not crash on button clicks when status URL is not set', async () => {
    vi.stubEnv('VITE_STATUS_URL', '');
    const user = userEvent.setup();
    render(<Header />);

    const chartBtn = screen.getByRole('button', { name: /show weekly statistics/i });
    await user.click(chartBtn);

    expect(screen.queryByRole('button', { name: /toggle status view/i })).not.toBeInTheDocument();
  });
});
