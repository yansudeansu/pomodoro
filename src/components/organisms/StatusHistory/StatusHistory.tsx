import { StatusDot } from '../../atoms/StatusDot/StatusDot';
import { StatusBar } from '../../molecules/StatusBar/StatusBar';
import { Text } from '../../atoms/Text/Text';
import { IconButton } from '../../atoms/IconButton/IconButton';
import styles from './StatusHistory.module.css';

export type StatusEntry = {
  timestamp: string;
  status: 'up' | 'down';
};

interface Props {
  history: StatusEntry[];
  onClose: () => void;
}

const StatusHistory: React.FC<Props> = ({ history, onClose }) => {
  if (!history || history.length === 0) return null;

  const last = history[0];
  const upCount = history.filter((h) => h.status === 'up').length;
  const uptime = Math.round((upCount / history.length) * 100);
  const overallStatus = upCount === history.length ? 'up' : upCount === 0 ? 'down' : 'unknown';

  return (
    <div className={styles.modalContent}>
      <div className={styles.header}>
        <div className={styles.modalHeader}>
          <Text variant="heading" className={styles.statusHeader}>
            Pomodoro App Status
          </Text>
          <IconButton icon="close" onClick={onClose} label="Close status modal" size="big" />
        </div>
        <div className={styles.statusRow}>
          <StatusDot status={overallStatus} />
          <Text variant="label" className={styles.uptime}>
            {uptime}% uptime (last hour)
          </Text>
        </div>
      </div>
      <StatusBar history={history} />
      <Text variant="body" className={styles.timestamp}>
        Last checked:{' '}
        {new Date(last.timestamp).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })}
      </Text>
    </div>
  );
};

export default StatusHistory;
