import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import StatusHistory, { StatusEntry } from './StatusHistory';

const fixedNow = new Date('2024-01-01T12:00:00Z');
beforeAll(() => {
  vi.useFakeTimers();
  vi.setSystemTime(fixedNow);
});

afterAll(() => {
  vi.useRealTimers();
});

describe('StatusHistory', () => {
  it('renders nothing when history is empty', () => {
    const { container } = render(<StatusHistory history={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('displays the correct heading', () => {
    const history: StatusEntry[] = [{ status: 'up', timestamp: '2024-01-01T11:59:00Z' }];
    render(<StatusHistory history={history} />);
    expect(screen.getByText(/Pomodoro App Status/i)).toBeInTheDocument();
  });

  it('displays correct uptime and status dot for 100% uptime', () => {
    const history: StatusEntry[] = [
      { status: 'up', timestamp: '2024-01-01T11:59:00Z' },
      { status: 'up', timestamp: '2024-01-01T11:58:00Z' },
    ];
    render(<StatusHistory history={history} />);
    expect(screen.getByText('100% uptime (last hour)')).toBeInTheDocument();
    expect(screen.getByTestId('status-dot-up')).toBeInTheDocument();
  });

  it('displays correct uptime and status dot for 0% uptime', () => {
    const history: StatusEntry[] = [
      { status: 'down', timestamp: '2024-01-01T11:59:00Z' },
      { status: 'down', timestamp: '2024-01-01T11:58:00Z' },
    ];
    render(<StatusHistory history={history} />);
    expect(screen.getByText('0% uptime (last hour)')).toBeInTheDocument();
    expect(screen.getByTestId('status-dot-down')).toBeInTheDocument();
  });

  it('displays "unknown" status when mix of up and down', () => {
    const history: StatusEntry[] = [
      { status: 'up', timestamp: '2024-01-01T11:59:00Z' },
      { status: 'down', timestamp: '2024-01-01T11:58:00Z' },
    ];
    render(<StatusHistory history={history} />);
    expect(screen.getByText('50% uptime (last hour)')).toBeInTheDocument();
    expect(screen.getByTestId('status-dot-unknown')).toBeInTheDocument();
  });

  it('shows the correct last checked time', () => {
    const history: StatusEntry[] = [{ status: 'up', timestamp: '2024-01-01T11:45:00Z' }];
    render(<StatusHistory history={history} />);
    const time = new Date('2024-01-01T11:45:00Z').toLocaleTimeString();
    expect(screen.getByText(`Last checked: ${time}`)).toBeInTheDocument();
  });
});
