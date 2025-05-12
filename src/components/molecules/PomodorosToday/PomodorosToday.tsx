import { Text } from '../../atoms/Text/Text';
import { usePomodoroContext } from '../../../context/PomodoroContext';
import { filterToday } from '../../../utils/dates';
import styles from './PomodorosToday.module.css';

export const PomodorosToday: React.FC = () => {
  const { globalPomodoros } = usePomodoroContext();
  const todayPomodoros = filterToday(globalPomodoros);
  const todayCount = todayPomodoros.length;

  return (
    <div className={styles.wrapper}>
      {todayCount > 0 ? (
        <Text variant="label" className={styles.inline}>
          #
          <Text variant="body" className={styles.inline}>
            {todayCount}
          </Text>
        </Text>
      ) : (
        <Text variant="label" className={styles.inline}>
          &nbsp;
        </Text>
      )}
    </div>
  );
};
