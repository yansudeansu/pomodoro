import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { StatusBarItem } from './StatusBarItem';

describe('StatusBarItem', () => {
  it('renders with the "up" status class', () => {
    const { container } = render(<StatusBarItem status="up" />);
    const div = container.firstChild as HTMLElement;

    expect(div).toBeInTheDocument();
    expect(div.className).toContain('item');
    expect(div.className).toContain('up');
  });

  it('renders with the "down" status class', () => {
    const { container } = render(<StatusBarItem status="down" />);
    const div = container.firstChild as HTMLElement;

    expect(div).toBeInTheDocument();
    expect(div.className).toContain('item');
    expect(div.className).toContain('down');
  });
});
