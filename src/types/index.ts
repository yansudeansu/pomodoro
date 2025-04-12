export type Mode = 'pomodoro' | 'short_break' | 'long_break';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  pomodoros: number;
  completedPomodoros: number;
}
