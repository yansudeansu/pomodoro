import React from "react";
import styles from "./Text.module.css";

interface TextProps {
  children: React.ReactNode;
  variant?: "heading" | "label" | "timer" | "body";
  className?: string;
}

export const Text: React.FC<TextProps> = ({
  children,
  variant = "body",
  className = "",
}) => {
  const combinedClassName =
    `${styles.text} ${styles[variant]} ${className}`.trim();

  return <span className={combinedClassName}>{children}</span>;
};
