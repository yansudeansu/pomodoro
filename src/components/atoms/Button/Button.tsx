import React from 'react';
import styles from './Button.module.css';

export interface ButtonProps {
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
  ...props
}) => {
  const sizeClass = styles[size ?? 'default'];
  const variantClass = styles[variant ?? 'default'];

  return (
    <button
      className={`${styles.button} ${sizeClass} ${variantClass}`}
      {...props}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
