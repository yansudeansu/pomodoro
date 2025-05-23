import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('renders with the correct props', () => {
    render(<Checkbox id="custom-id" checked={true} onChange={() => {}} mode="pomodoro" />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toBeChecked();
  });

  it('calls onChange when clicked', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<Checkbox id="custom-id" checked={false} onChange={handleChange} mode="short_break" />);
    const checkbox = screen.getByRole('checkbox');

    await user.click(checkbox);

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('applies the correct class based on mode', () => {
    render(<Checkbox id="custom-id" checked={false} onChange={() => {}} mode="long_break" />);
    const checkbox = screen.getByRole('checkbox');

    expect(checkbox.className).toContain('checkbox');
    expect(checkbox.className).toContain('long_break');
  });

  it('accepts an id prop', () => {
    render(<Checkbox id="custom-id" checked={false} onChange={() => {}} mode="pomodoro" />);
    const checkbox = screen.getByRole('checkbox');

    expect(checkbox).toHaveAttribute('id', 'custom-id');
  });

  it('hides the label visually when showLabel is false (default)', () => {
    render(
      <Checkbox
        id="hidden-label"
        checked={false}
        onChange={() => {}}
        mode="pomodoro"
        label="Hidden Label"
      />
    );
    const label = screen.getByLabelText('Hidden Label');
    expect(label).toBeInTheDocument();
    expect(label.tagName).toBe('INPUT');
    const labelEl = document.querySelector('label[for="hidden-label"]')!;
    expect(labelEl.className).toContain('visuallyHidden');
  });

  it('shows the label visually when showLabel is true', () => {
    render(
      <Checkbox
        id="visible-label"
        checked={false}
        onChange={() => {}}
        mode="pomodoro"
        label="Visible Label"
        showLabel={true}
      />
    );
    const labelEl = document.querySelector('label[for="visible-label"]')!;
    expect(labelEl.className).toContain('label');
  });
});
