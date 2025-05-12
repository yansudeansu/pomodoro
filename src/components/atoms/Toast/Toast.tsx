import React from 'react';
import { Button } from '../Button/Button';
import { IconButton } from '../IconButton/IconButton';
import styles from './Toast.module.css';

export interface ToastProps {
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, actionLabel, onAction, onClose }) => {
  return (
    <div className={styles.toast} data-testid="toast">
      <span>{message}</span>
      <div className={styles.buttons}>
        {actionLabel && onAction && (
          <Button size="default" variant="active" onClick={onAction}>
            {actionLabel}
          </Button>
        )}
        {onClose && (
          <IconButton
            icon="close"
            onClick={onClose}
            label="Close toast"
            size="small"
            variant="default"
          />
        )}
      </div>
    </div>
  );
};
