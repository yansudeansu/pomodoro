import { AppIcons, IconName } from '../Icons/Icons';
import styles from './IconButton.module.css';

export interface IconButtonProps {
  icon: IconName;
  onClick: () => void;
  label?: string;
  size?: 'small' | 'medium' | 'big';
  variant?: 'default' | 'success' | 'danger' | 'link';
  disabled?: boolean;
  active?: boolean;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onClick,
  label = 'icon button',
  size = 'medium',
  variant = 'default',
  disabled = false,
  active = false,
  ...rest
}) => {
  const Icon = AppIcons[icon];

  return (
    <button
      className={`${styles.button} ${styles[size]} ${styles[variant]} ${disabled ? styles.disabled : ''} ${active ? styles.active : ''}`}
      onClick={onClick}
      title={label}
      aria-label={label}
      disabled={disabled}
      {...rest}
    >
      <span className={styles.iconWrapper}>
        <Icon size={size === 'small' ? 16 : size === 'big' ? 24 : 20} />
      </span>
    </button>
  );
};
