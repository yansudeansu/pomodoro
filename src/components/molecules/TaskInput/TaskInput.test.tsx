import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TaskInput } from './TaskInput';

describe('TaskInput', () => {
  const setup = (props = {}) => {
    const onChange = vi.fn();
    const onKeyDown = vi.fn();
    const utils = render(
      <TaskInput
        id="task-input"
        value="Test task"
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder="What are you working on?"
        mode="pomodoro"
        {...props}
      />
    );
    const input = screen.getByPlaceholderText(/what are you working on/i) as HTMLInputElement;
    return { input, onChange, onKeyDown, ...utils };
  };

  it('renders the input with correct value', () => {
    const { input } = setup();
    expect(input.value).toBe('Test task');
  });

  it('calls onChange when typing', async () => {
    const user = userEvent.setup();
    const { input, onChange } = setup();
    await user.type(input, 'a');
    expect(onChange).toHaveBeenCalled();
  });

  it('calls onKeyDown when a key is pressed', async () => {
    const user = userEvent.setup();
    const { input, onKeyDown } = setup();

    input.focus();
    await user.keyboard('{Enter}');

    expect(onKeyDown).toHaveBeenCalled();
  });

  it('applies the correct mode-specific class', () => {
    const { input } = setup({ mode: 'short_break' });
    expect(input.className).toContain('short_break');
  });
});
