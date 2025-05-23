import { IconButton } from '../../atoms/IconButton/IconButton';
import { Link } from '../../atoms/Link/Link';
import styles from './Header.module.css';

interface HeaderProps {
  onChartClick?: () => void;
  onStatusClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onChartClick, onStatusClick }) => (
  <header className={styles.header}>
    <IconButton
      icon="chart"
      label="Show Weekly Statistics"
      onClick={onChartClick ?? (() => {})}
      size="medium"
      variant="link"
    />
    {import.meta.env.VITE_STATUS_URL && (
      <IconButton
        icon="status"
        label="Toggle Status View"
        onClick={onStatusClick ?? (() => {})}
        size="medium"
        variant="link"
      />
    )}
    <Link
      href="https://github.com/yansudeansu/pomodoro"
      title="View source on GitHub"
      external
      showIcon
      aria-label="View source on GitHub"
    >
      GitHub
    </Link>
  </header>
);
