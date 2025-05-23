import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { StatusDot } from './StatusDot';

describe('StatusDot', () => {
  it('renders with the "up" status class', () => {
    const { container } = render(<StatusDot status="up" />);
    const dot = container.firstChild as HTMLElement;

    expect(dot).toBeInTheDocument();
    expect(dot.className).toContain('dot');
    expect(dot.className).toContain('up');
  });

  it('renders with the "down" status class', () => {
    const { container } = render(<StatusDot status="down" />);
    const dot = container.firstChild as HTMLElement;

    expect(dot).toBeInTheDocument();
    expect(dot.className).toContain('dot');
    expect(dot.className).toContain('down');
  });

  it('renders with the "unknown" status class', () => {
    const { container } = render(<StatusDot status="unknown" />);
    const dot = container.firstChild as HTMLElement;

    expect(dot).toBeInTheDocument();
    expect(dot.className).toContain('dot');
    expect(dot.className).toContain('unknown');
  });
});
