import styles from './StatusBarItem.module.css';

interface StatusBarItemProps {
  status: 'up' | 'down';
  title?: string;
}

export const StatusBarItem: React.FC<StatusBarItemProps> = ({ status, title }) => {
  return (
    <div
      className={`${styles.item} ${styles[status]}`}
      data-testid={`status-${status}`}
      title={title}
    />
  );
};
