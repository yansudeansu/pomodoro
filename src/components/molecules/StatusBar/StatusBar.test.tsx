import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatusBar } from './StatusBar';

const fixedNow = new Date('2024-01-01T12:00:00Z');
beforeAll(() => {
  vi.useFakeTimers();
  vi.setSystemTime(fixedNow);
});

afterAll(() => {
  vi.useRealTimers();
});

describe('StatusBar', () => {
  it('renders timestamps correctly', () => {
    const history: { status: 'up' | 'down'; timestamp: string }[] = [
      { status: 'up', timestamp: '2024-01-01T11:55:00Z' },
      { status: 'down', timestamp: '2024-01-01T11:56:00Z' },
      { status: 'up', timestamp: '2024-01-01T11:58:00Z' },
    ];

    render(<StatusBar history={history} />);
    expect(screen.getByText('2m ago')).toBeInTheDocument();
    expect(screen.getByText('Now')).toBeInTheDocument();
  });

  it('renders one StatusBarItem per history entry', () => {
    const history: { status: 'up' | 'down'; timestamp: string }[] = [
      { status: 'up', timestamp: '2024-01-01T11:55:00Z' },
      { status: 'down', timestamp: '2024-01-01T11:56:00Z' },
      { status: 'up', timestamp: '2024-01-01T11:58:00Z' },
    ];

    const { container } = render(<StatusBar history={history} />);
    const items = container.querySelectorAll('div');
    const barItemCount = Array.from(items).filter((el) => el.className.includes('item')).length;

    expect(barItemCount).toBe(history.length);
  });

  it('renders correct class based on status', () => {
    const history: { status: 'up' | 'down'; timestamp: string }[] = [
      { status: 'up', timestamp: '2024-01-01T11:58:00Z' },
      { status: 'down', timestamp: '2024-01-01T11:59:00Z' },
    ];

    render(<StatusBar history={history} />);

    expect(screen.getByTestId('status-up')).toBeInTheDocument();
    expect(screen.getByTestId('status-down')).toBeInTheDocument();
  });
});
