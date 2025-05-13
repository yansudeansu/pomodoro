import styles from './Input.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  borderless?: boolean;
  width?: string | number;
}

export const Input: React.FC<InputProps> = ({
  className = '',
  borderless = false,
  width,
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
      style={props.style || width ? { width, ...props.style } : undefined}
      {...props}
    />
  );
};
