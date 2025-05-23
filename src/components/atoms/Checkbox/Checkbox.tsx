import React from 'react';
import styles from './Checkbox.module.css';

interface CheckboxProps {
  id: string;
  checked: boolean;
  onChange: () => void;
  mode: 'pomodoro' | 'short_break' | 'long_break';
  label?: string;
  showLabel?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  id,
  checked,
  onChange,
  mode,
  label,
  showLabel = false,
}) => {
  return (
    <div className={styles.wrapper}>
      <label htmlFor={id} className={showLabel ? styles.label : styles.visuallyHidden}>
        {label}
      </label>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className={`${styles.checkbox} ${styles[mode]}`}
      />
    </div>
  );
};
