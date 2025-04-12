import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { PomodoroPage } from './PomodoroPage'
import { usePomodoroContext, PomodoroContextType } from '../../../context/PomodoroContext'

vi.mock('../../../context/PomodoroContext', async () => {
  const actual = await vi.importActual<typeof import('../../../context/PomodoroContext')>(
    '../../../context/PomodoroContext'
  )
  return {
    ...actual,
    usePomodoroContext: vi.fn(),
  }
})

vi.mock('../../organisms/PomodoroTimer/PomodoroTimer', () => ({
  PomodoroTimer: () => <div data-testid="pomodoro-timer" />,
}))

vi.mock('../../organisms/TaskManager/TaskManager', () => ({
  TaskManager: () => <div data-testid="task-manager" />,
}))

const mockedUsePomodoroContext = vi.mocked(usePomodoroContext)

const createMockContext = (overrides: Partial<PomodoroContextType>): PomodoroContextType => ({
  mode: 'pomodoro',
  setMode: vi.fn(),
  isRunning: false,
  setIsRunning: vi.fn(),
  timeLeft: 1500,
  setTimeLeft: vi.fn(),
  resetTimer: vi.fn(),
  tasks: [],
  setTasks: vi.fn(),
  pomodoroCount: 0,
  setPomodoroCount: vi.fn(),
  activeTaskId: null,
  setActiveTaskId: vi.fn(),
  incrementCompletedPomodoros: vi.fn(),
  ...overrides,
})

beforeEach(() => {
  mockedUsePomodoroContext.mockReturnValue(createMockContext({ mode: 'pomodoro' }))
})

describe('PomodoroPage', () => {
  it('renders PomodoroTimer and TaskManager', () => {
    render(<PomodoroPage />)
    expect(screen.getByTestId('pomodoro-timer')).toBeInTheDocument()
    expect(screen.getByTestId('task-manager')).toBeInTheDocument()
  })

  it('applies mode class based on current mode', () => {
    const { container } = render(<PomodoroPage />)
    const main = container.querySelector('main')
    expect(main?.className).toContain('pomodoro')
  })

  it.each(['short_break', 'long_break'] as const)(
    "applies correct mode class for mode '%s'",
    (mode) => {
      mockedUsePomodoroContext.mockReturnValue(createMockContext({ mode }))
      const { container } = render(<PomodoroPage />)
      const main = container.querySelector('main')
      expect(main?.className).toContain(mode)
    }
  )
})
