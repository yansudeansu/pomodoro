import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  size?: 'default' | 'large';
  variant?: 'default' | 'active';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  disabled = false,
  size,
  variant,
}) => {
  const sizeClass = styles[size ?? 'default'];
  const variantClass = styles[variant ?? 'default'];

  return (
    <button
      className={`${styles.button} ${sizeClass} ${variantClass}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
