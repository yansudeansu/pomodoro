import styles from './Input.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  borderless?: boolean;
}

export const Input: React.FC<InputProps> = ({
  className = '',
  borderless = false,
  value,
  ...props
}) => {
  const borderlessClass = borderless ? styles.borderless : '';
  const title = borderless && typeof value === 'string' ? value : undefined;

  return (
    <input
      type="text"
      className={`${styles.input} ${borderlessClass} ${className}`}
      value={value}
      title={title}
      {...props}
    />
  );
};
