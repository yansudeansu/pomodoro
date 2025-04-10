import React from "react";
import styles from "./Checkbox.module.css";

interface CheckboxProps {
  id?: string;
  checked: boolean;
  onChange: () => void;
  mode: "pomodoro" | "short_break" | "long_break";
}

export const Checkbox: React.FC<CheckboxProps> = ({
  id,
  checked,
  onChange,
  mode,
}) => {
  return (
    <input
      id={id}
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className={`${styles.checkbox} ${styles[mode]}`}
    />
  );
};
