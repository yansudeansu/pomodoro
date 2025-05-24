import { StatusBarItem } from '../../atoms/StatusBarItem/StatusBarItem';
import styles from './StatusBar.module.css';

interface StatusBarProps {
  history: { status: 'up' | 'down'; timestamp: string }[];
}

export const StatusBar: React.FC<StatusBarProps> = ({ history }) => {
  const first = history[history.length - 1];

  return (
    <div className={styles.bar}>
      <span className={styles.label}>
        {Math.round((Date.now() - new Date(first.timestamp).getTime()) / 60000)}m ago
      </span>

      {[...history].reverse().map((entry, index) => (
        <StatusBarItem
          key={index}
          status={entry.status}
          title={new Date(entry.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          })}
        />
      ))}

      <span className={styles.label}>Now</span>
    </div>
  );
};
