import styles from './ProgressRing.module.css';

interface ProgressRingProps {
  radius: number;
  stroke: number;
  progress: number;
  children?: React.ReactNode;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
  radius,
  stroke,
  progress,
  children,
}) => {
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div className={styles.wrapper}>
      <svg height={radius * 2} width={radius * 2} className={styles.ring}>
        <circle
          className={styles.track}
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          className={`${styles.progress}`}
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
      <div className={styles.centeredContent}>{children}</div>
    </div>
  );
};
