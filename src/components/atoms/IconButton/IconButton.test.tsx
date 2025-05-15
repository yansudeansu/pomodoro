import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IconButton } from './IconButton';

describe('IconButton', () => {
  it('renders the button with correct aria-label', () => {
    render(<IconButton icon="add" onClick={() => {}} />);
    const icon = screen.getByLabelText(/icon button/i);
    expect(icon).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<IconButton icon="add" onClick={handleClick} />);
    const button = screen.getByRole('button');
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('uses the provided label as aria-label', () => {
    render(<IconButton icon="add" onClick={() => {}} label="Add item" />);
    const button = screen.getByLabelText('Add item');
    expect(button).toBeInTheDocument();
  });

  it('applies correct class names for size and variant', () => {
    render(<IconButton icon="add" onClick={() => {}} size="small" variant="success" />);
    const button = screen.getByRole('button');
    expect(button.className).toContain('button');
    expect(button.className).toContain('small');
    expect(button.className).toContain('success');
  });

  it('renders the correct icon component for "remove"', () => {
    render(<IconButton icon="remove" onClick={() => {}} label="Remove item" />);
    const button = screen.getByLabelText('Remove item');
    expect(button).toBeInTheDocument();
  });

  it('applies "big" size class and sets icon size to 24', () => {
    render(<IconButton icon="add" onClick={() => {}} size="big" />);
    const button = screen.getByRole('button');
    expect(button.className).toContain('big');
  });

  it('renders as disabled and does not call onClick', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<IconButton icon="add" onClick={handleClick} disabled />);
    const button = screen.getByRole('button');

    expect(button).toBeDisabled();
    expect(button.className).toContain('disabled');

    await user.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });
});
