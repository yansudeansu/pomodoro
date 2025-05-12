import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { WeeklyChart } from './WeeklyChart';

const mockData = [
  { name: 'Mon', Pomodoros: 0 },
  { name: 'Tue', Pomodoros: 2 },
  { name: 'Wed', Pomodoros: 5 },
  { name: 'Thu', Pomodoros: 9 },
];

vi.mock('recharts', async () => {
  const original = await vi.importActual<typeof import('recharts')>('recharts');

  return {
    ...original,
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
      <div style={{ width: 500, height: 200 }}>{children}</div>
    ),
    BarChart: ({ children }: { children: React.ReactNode }) => (
      <svg data-testid="barchart">{children}</svg>
    ),
    XAxis: () => <g data-testid="x-axis" />,
    YAxis: () => <g data-testid="y-axis" />,
    Tooltip: () => null,
    Bar: ({ children }: { children: React.ReactNode }) => (
      <g className="recharts-bar-rectangle">{children}</g>
    ),
    Cell: ({ fill }: { fill: string }) => (
      <rect data-testid="bar" fill={fill} width="10" height="50" />
    ),
  };
});

describe('WeeklyChart', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    const { container } = render(<WeeklyChart data={mockData} />);
    expect(container.querySelector('[data-testid="barchart"]')).toBeTruthy();
  });

  it('renders one bar per data item', () => {
    const { container } = render(<WeeklyChart data={mockData} />);
    const bars = container.querySelectorAll('[data-testid="bar"]');
    expect(bars.length).toBe(mockData.length);
  });

  it('applies correct fill colors based on Pomodoro count', () => {
    const { container } = render(<WeeklyChart data={mockData} />);
    const bars = container.querySelectorAll('[data-testid="bar"]');

    expect(bars[0]).toHaveAttribute('fill', 'var(--color-border-muted)');
    expect(bars[1]).toHaveAttribute('fill', 'var(--color-primary)');
    expect(bars[2]).toHaveAttribute('fill', 'var(--color-warning)');
    expect(bars[3]).toHaveAttribute('fill', 'var(--color-success)');
  });
});
