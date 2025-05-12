import { AppIcons, IconName } from '../Icons/Icons';
import styles from './IconButton.module.css';

export interface IconButtonProps {
  icon: IconName;
  onClick: () => void;
  label?: string;
  size?: 'small' | 'medium';
  variant?: 'default' | 'success' | 'danger' | 'link';
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onClick,
  label = 'icon button',
  size = 'medium',
  variant = 'default',
}) => {
  const Icon = AppIcons[icon];

  return (
    <button
      className={`${styles.button} ${styles[size]} ${styles[variant]}`}
      onClick={onClick}
      aria-label={label}
    >
      <Icon size={size === 'small' ? 16 : 20} />
    </button>
  );
};
