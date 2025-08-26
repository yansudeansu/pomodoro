import React, { Suspense } from 'react';
import { Header } from '../../atoms/Header/Header';
import { Toast } from '../../atoms/Toast/Toast';
import { PomodorosToday } from '../../molecules/PomodorosToday/PomodorosToday';
import { Modal } from '../../molecules/Modal/Modal';
import { PomodoroTimer } from '../../organisms/PomodoroTimer/PomodoroTimer';
import { TaskManager } from '../../organisms/TaskManager/TaskManager';
import { getWeeklySummary } from '../../../utils/dates';
import { usePomodoroContext } from '../../../context/PomodoroContext';
import { useTaskManager } from '../../../hooks/useTaskManager';
import { useStatusHistory } from '../../../hooks/useStatusHistory';
import { useChartVisibility } from '../../../hooks/useChartVisibility';
import styles from './PomodoroPage.module.css';

const LazyWeeklyChart = React.lazy(() => import('../../molecules/WeeklyChart/WeeklyChart'));
const LazyStatusHistory = React.lazy(() => import('../../organisms/StatusHistory/StatusHistory'));

export const PomodoroPage: React.FC = () => {
  const { mode, globalPomodoros } = usePomodoroContext();
  const { inputValue, toast, handleAddTask, handleDeleteTask, handleKeyDown, handleInputChange } =
    useTaskManager();
  const { showStatus, statusHistory, handleStatusClick, handleCloseStatusModal } =
    useStatusHistory();
  const { showChart, toggleChart } = useChartVisibility();

  return (
    <>
      {toast && <Toast {...toast} />}
      <Header
        onChartClick={toggleChart}
        onStatusClick={handleStatusClick}
        isChartActive={showChart}
      />

      {showChart && (
        <div className={styles.chartWrapper}>
          <Suspense fallback={<div style={{ height: 200 }}>Loading chart...</div>}>
            <LazyWeeklyChart
              data={getWeeklySummary(globalPomodoros).map((d) => ({
                name: d.date.toLocaleDateString(undefined, { weekday: 'short' }),
                Pomodoros: d.count,
              }))}
            />
          </Suspense>
        </div>
      )}

      <main className={`${styles.page} ${styles[mode]}`}>
        <PomodoroTimer />
        <PomodorosToday />
        <TaskManager
          inputValue={inputValue}
          onInputChange={handleInputChange}
          onAddTask={handleAddTask}
          onDeleteTask={handleDeleteTask}
          onKeyDown={handleKeyDown}
        />
      </main>

      {showStatus && (
        <Modal isOpen={true} onClose={handleCloseStatusModal} position="top">
          <Suspense fallback={<div data-testid="status-loading">Loading status...</div>}>
            <LazyStatusHistory history={statusHistory ?? []} onClose={handleCloseStatusModal} />
          </Suspense>
        </Modal>
      )}
    </>
  );
};
