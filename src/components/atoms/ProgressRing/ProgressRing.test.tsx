import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProgressRing } from './ProgressRing';

describe('ProgressRing', () => {
  it('renders SVG with correct size and structure', () => {
    const { container } = render(<ProgressRing radius={50} stroke={4} progress={0.5} />);
    const svg = container.querySelector('svg');
    const circles = container.querySelectorAll('circle');

    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('height', '100');
    expect(svg).toHaveAttribute('width', '100');
    expect(circles.length).toBe(2);
  });

  it('applies correct radius and stroke to circles', () => {
    const radius = 50;
    const stroke = 4;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const expectedOffset = circumference * (1 - 0.75);

    const { container } = render(<ProgressRing radius={radius} stroke={stroke} progress={0.75} />);
    const [track, progressCircle] = container.querySelectorAll('circle');

    expect(track).toHaveAttribute('r', normalizedRadius.toString());
    expect(progressCircle).toHaveAttribute('stroke-dasharray', circumference.toString());
    expect(progressCircle).toHaveAttribute('stroke-dashoffset', expectedOffset.toString());
  });

  it('renders children inside the ring', () => {
    render(
      <ProgressRing radius={40} stroke={6} progress={1}>
        <span data-testid="child">Centered</span>
      </ProgressRing>
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.getByText('Centered')).toBeVisible();
  });
});
