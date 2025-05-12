import React from 'react';
import styles from './Input.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  borderless?: boolean;
}

export const Input: React.FC<InputProps> = ({ className = '', borderless = false, ...props }) => {
  const borderlessClass = borderless ? styles.borderless : '';
  return (
    <input type="text" className={`${styles.input} ${borderlessClass} ${className}`} {...props} />
  );
};
