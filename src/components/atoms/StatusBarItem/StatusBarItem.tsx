import styles from './StatusBarItem.module.css';

interface StatusBarItemProps {
  status: 'up' | 'down';
}

export const StatusBarItem: React.FC<StatusBarItemProps> = ({ status }) => {
  return <div className={`${styles.item} ${styles[status]}`} data-testid={`status-${status}`} />;
};
