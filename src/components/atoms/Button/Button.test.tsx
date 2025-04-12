import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('<Button />', () => {
  it('renders with correct text', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    const button = screen.getByRole('button', { name: /click/i });

    await user.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(
      <Button onClick={handleClick} disabled>
        Click
      </Button>
    );
    const button = screen.getByRole('button', { name: /click/i });

    await user.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('has correct type attribute', () => {
    render(<Button type="submit">Submit</Button>);
    const button = screen.getByRole('button', { name: /submit/i });
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('applies size and variant classes', () => {
    render(
      <Button size="large" variant="active">
        Styled
      </Button>
    );
    const button = screen.getByRole('button', { name: /styled/i });
    expect(button.className).toMatch(/large/);
    expect(button.className).toMatch(/active/);
  });

  it('uses default size and variant when none are provided', () => {
    render(<Button>Default</Button>);
    const button = screen.getByRole('button', { name: /default/i });
    expect(button.className).toMatch(/default/);
  });

  it('falls back to default size if size is not provided', () => {
    render(<Button variant="active">No size</Button>);
    const button = screen.getByRole('button', { name: /no size/i });
    expect(button.className).toMatch(/default/);
  });

  it('falls back to default variant if variant is not provided', () => {
    render(<Button size="large">No variant</Button>);
    const button = screen.getByRole('button', { name: /no variant/i });
    expect(button.className).toMatch(/default/);
  });

  it('handles undefined size and variant (nullish coalescing coverage)', () => {
    render(
      <Button size={undefined} variant={undefined}>
        Nullish
      </Button>
    );
    const button = screen.getByRole('button', { name: /nullish/i });
    expect(button.className).toMatch(/default/);
  });
});
