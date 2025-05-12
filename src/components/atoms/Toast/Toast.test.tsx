import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Toast, ToastProps } from './Toast';
import { ButtonProps } from '../Button/Button';
import { IconButtonProps } from '../IconButton/IconButton';

vi.mock('../IconButton/IconButton', () => ({
  IconButton: (props: IconButtonProps) => (
    <button onClick={props.onClick} aria-label={props.label}>
      {props.icon}
    </button>
  ),
}));

vi.mock('../Button/Button', () => ({
  Button: (props: ButtonProps) => <button onClick={props.onClick}>{props.children}</button>,
}));

describe('Toast', () => {
  const baseProps: ToastProps = {
    message: 'This is a toast message',
  };

  it('renders the message', () => {
    render(<Toast {...baseProps} />);
    expect(screen.getByTestId('toast')).toHaveTextContent('This is a toast message');
  });

  it('renders the action button when actionLabel and onAction are provided', () => {
    render(<Toast {...baseProps} actionLabel="Undo" onAction={() => {}} />);
    expect(screen.getByRole('button', { name: /undo/i })).toBeInTheDocument();
  });

  it('does not render action button if onAction is missing', () => {
    render(<Toast {...baseProps} actionLabel="Undo" />);
    expect(screen.queryByRole('button', { name: /undo/i })).not.toBeInTheDocument();
  });

  it('calls onAction when action button is clicked', async () => {
    const user = userEvent.setup();
    const onAction = vi.fn();

    render(<Toast {...baseProps} actionLabel="Undo" onAction={onAction} />);

    const button = screen.getByRole('button', { name: /undo/i });
    await user.click(button);
    expect(onAction).toHaveBeenCalled();
  });

  it('renders close button when onClose is provided', () => {
    render(<Toast {...baseProps} onClose={() => {}} />);
    expect(screen.getByRole('button', { name: /close toast/i })).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(<Toast {...baseProps} onClose={onClose} />);
    const closeButton = screen.getByRole('button', { name: /close toast/i });

    await user.click(closeButton);
    expect(onClose).toHaveBeenCalled();
  });
});
