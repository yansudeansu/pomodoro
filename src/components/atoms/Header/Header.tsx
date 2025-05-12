import { IconButton } from '../../atoms/IconButton/IconButton';
import { Link } from '../../atoms/Link/Link';
import styles from './Header.module.css';

interface HeaderProps {
  onChartClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onChartClick }) => (
  <header className={styles.header}>
    <IconButton
      icon="chart"
      label="Show Weekly Statistics"
      onClick={onChartClick ?? (() => {})}
      size="medium"
      variant="link"
    />
    <Link
      href="https://github.com/yansudeansu/pomodoro"
      external
      showIcon
      aria-label="View source on GitHub"
    >
      GitHub
    </Link>
  </header>
);
