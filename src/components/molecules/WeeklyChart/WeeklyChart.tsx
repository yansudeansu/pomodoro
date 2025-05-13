import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from 'recharts';
import styles from './WeeklyChart.module.css';

interface WeeklyChartProps {
  data: { name: string; Pomodoros: number }[];
}

const WeeklyChart: React.FC<WeeklyChartProps> = ({ data }) => {
  const getBarColor = (count: number) => {
    if (count >= 8) return 'var(--color-success)';
    if (count >= 4) return 'var(--color-warning)';
    if (count > 0) return 'var(--color-primary)';
    return 'var(--color-border-muted)';
  };

  return (
    <div className={styles.chartContainer} data-testid="weekly-chart">
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--color-tooltip-bg)',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              fontSize: 'var(--font-size-sm)',
              boxShadow: '0 0 10px rgba(0,0,0,0.2)',
              color: 'var(--color-tooltip-text)',
            }}
            itemStyle={{
              color: 'var(--color-tooltip-text)',
            }}
            cursor={{ fill: 'transparent' }}
          />
          <Bar dataKey="Pomodoros" isAnimationActive={false} activeBar={false}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(entry.Pomodoros)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeeklyChart;
