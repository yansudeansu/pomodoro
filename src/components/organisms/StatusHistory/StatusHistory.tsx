import { StatusDot } from '../../atoms/StatusDot/StatusDot';
import { StatusBar } from '../../molecules/StatusBar/StatusBar';
import { Text } from '../../atoms/Text/Text';
import styles from './StatusHistory.module.css';

export type StatusEntry = {
  timestamp: string;
  status: 'up' | 'down';
};

interface Props {
  history: StatusEntry[];
}

const StatusHistory: React.FC<Props> = ({ history }) => {
  if (!history || history.length === 0) return null;

  const last = history[0];
  const upCount = history.filter((h) => h.status === 'up').length;
  const uptime = Math.round((upCount / history.length) * 100);
  const overallStatus = upCount === history.length ? 'up' : upCount === 0 ? 'down' : 'unknown';

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Text variant="heading" className={styles.statusHeader}>
          Pomodoro App Status
        </Text>
        <div className={styles.statusRow}>
          <StatusDot status={overallStatus} />
          <Text variant="label" className={styles.uptime}>
            {uptime}% uptime (last hour)
          </Text>
        </div>
      </div>
      <StatusBar history={history} />
      <Text variant="body" className={styles.timestamp}>
        Last checked: {new Date(last.timestamp).toLocaleTimeString()}
      </Text>
    </div>
  );
};

export default StatusHistory;
