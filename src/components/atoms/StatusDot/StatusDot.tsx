import styles from './StatusDot.module.css';

interface StatusDotProps {
  status: 'up' | 'down' | 'unknown';
}

export const StatusDot: React.FC<StatusDotProps> = ({ status }) => {
  return (
    <span className={`${styles.dot} ${styles[status]}`} data-testid={`status-dot-${status}`} />
  );
};
