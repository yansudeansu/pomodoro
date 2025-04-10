import { describe, it, vi, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TaskList } from "./TaskList";
import { usePomodoroContext } from "../../../context/PomodoroContext";
import styles from "./TaskList.module.css";

vi.mock("../../../context/PomodoroContext", async () => {
  const actual = await vi.importActual("../../../context/PomodoroContext");
  return {
    ...actual,
    usePomodoroContext: vi.fn(),
  };
});

type Task = {
  id: string;
  title: string;
  completed: boolean;
  pomodoros: number;
  completedPomodoros: number;
};

const mockSetTasks = vi.fn();
const mockTasks = [
  {
    id: "1",
    title: "Test Task",
    completed: false,
    pomodoros: 2,
    completedPomodoros: 1,
  },
];

vi.mock("../../atoms/Icons/Icons", () => {
  const PomodoroIcon = () => <svg data-testid="pomodoro-icon" />;
  const DonePomodoroIcon = () => <svg data-testid="done-pomodoro-icon" />;
  const TrashIcon = () => <svg data-testid="trash-icon" />;
  const AddIcon = () => <svg data-testid="add-icon" />;
  const InfoIcon = () => <svg data-testid="info-icon" />;
  const BrainIcon = () => <svg data-testid="brain-icon" />;
  const CalendarIcon = () => <svg data-testid="calendar-icon" />;
  const SplitIcon = () => <svg data-testid="split-icon" />;

  return {
    AppIcons: {
      sparkle: PomodoroIcon,
      sparkles: DonePomodoroIcon,
      trash: TrashIcon,
      add: AddIcon,
      info: InfoIcon,
      brain: BrainIcon,
      calendar: CalendarIcon,
      split: SplitIcon,
    },
  };
});

beforeEach(() => {
  mockSetTasks.mockClear();
  vi.mocked(usePomodoroContext).mockReturnValue({
    tasks: [...mockTasks],
    setTasks: mockSetTasks,
    mode: "pomodoro",
  } as any);
});

describe("TaskList", () => {
  it("renders tasks", () => {
    render(<TaskList />);
    expect(screen.getByText("Test Task")).toBeInTheDocument();
  });

  it("toggles task completion", async () => {
    const user = userEvent.setup();
    render(<TaskList />);
    const checkbox = screen.getByRole("checkbox");
    await user.click(checkbox);

    const updater = mockSetTasks.mock.calls[0][0];
    const result = updater([{ ...mockTasks[0] }]);
    expect(result[0].completed).toBe(true);
  });

  it("deletes a task", async () => {
    const user = userEvent.setup();
    render(<TaskList />);
    const deleteButton = screen.getByLabelText(/delete task/i);
    await user.click(deleteButton);

    const updater = mockSetTasks.mock.calls[0][0];
    const result = updater([...mockTasks]);
    expect(result).toHaveLength(0);
  });

  it("adds a pomodoro", async () => {
    const user = userEvent.setup();

    vi.mocked(usePomodoroContext).mockReturnValue({
      tasks: [{ ...mockTasks[0], pomodoros: 2 }],
      setTasks: mockSetTasks,
      mode: "pomodoro",
    } as any);

    render(<TaskList />);
    const addButton = screen.getByLabelText(/add pomodoro/i);
    await user.click(addButton);

    const updater = mockSetTasks.mock.calls[0][0];
    const result = updater([{ ...mockTasks[0], pomodoros: 2 }]);
    expect(result[0].pomodoros).toBe(3);
  });

  it("does not show add button when pomodoros >= 4", () => {
    vi.mocked(usePomodoroContext).mockReturnValue({
      tasks: [{ ...mockTasks[0], pomodoros: 4 }],
      setTasks: mockSetTasks,
      mode: "pomodoro",
    } as any);

    render(<TaskList />);
    expect(screen.queryByLabelText(/add pomodoro/i)).not.toBeInTheDocument();
  });

  it("returns unchanged task if id does not match", async () => {
    const user = userEvent.setup();

    const unrelatedTask = {
      id: "99",
      title: "Other Task",
      completed: false,
      pomodoros: 1,
      completedPomodoros: 0,
    };

    const clickableTask = {
      id: "1",
      title: "Clickable Task",
      completed: false,
      pomodoros: 2,
      completedPomodoros: 1,
    };

    vi.mocked(usePomodoroContext).mockReturnValue({
      tasks: [clickableTask, unrelatedTask],
      setTasks: mockSetTasks,
      mode: "pomodoro",
    } as any);

    render(<TaskList />);
    const addButton = screen.getAllByLabelText(/add pomodoro/i)[0];
    await user.click(addButton);

    const updateFn = mockSetTasks.mock.calls[0][0];
    const result = updateFn([clickableTask, unrelatedTask]);

    expect(result).toContainEqual(unrelatedTask);
  });

  it("does not change unrelated tasks on toggle", async () => {
    const user = userEvent.setup();
    const tasks = [
      { ...mockTasks[0], id: "1", completed: false },
      {
        id: "2",
        title: "Other",
        completed: false,
        pomodoros: 2,
        completedPomodoros: 0,
      },
    ];

    vi.mocked(usePomodoroContext).mockReturnValue({
      tasks,
      setTasks: mockSetTasks,
      mode: "pomodoro",
    } as any);

    render(<TaskList />);
    const checkbox = screen.getAllByRole("checkbox")[0];
    await user.click(checkbox);

    const updater = mockSetTasks.mock.calls[0][0];
    const result = updater([...tasks]);

    expect(result.find((t: Task) => t.id === "2")?.completed).toBe(false);
  });

  it("applies no extra class if task is not completed", () => {
    render(<TaskList />);
    const text = screen.getByText("Test Task");
    expect(text.className).not.toContain("completed");
  });

  it("renders completed and incomplete pomodoro icons correctly", () => {
    const task = {
      id: "1",
      title: "Test Task",
      completed: false,
      pomodoros: 4,
      completedPomodoros: 2,
    };

    vi.mocked(usePomodoroContext).mockReturnValue({
      tasks: [task],
      setTasks: mockSetTasks,
      mode: "pomodoro",
    } as any);

    const { container } = render(<TaskList />);
    const pomodoroIconsContainer = container.querySelector(
      `.${styles.pomodoroIcons}`
    );
    const svgs = pomodoroIconsContainer?.querySelectorAll("svg") || [];

    expect(svgs.length).toBe(4);
  });

  it("applies completed class if task is completed", () => {
    vi.mocked(usePomodoroContext).mockReturnValue({
      tasks: [{ ...mockTasks[0], completed: true }],
      setTasks: mockSetTasks,
      mode: "pomodoro",
    } as any);

    render(<TaskList />);
    const text = screen.getByText("Test Task");
    expect(text.className).toContain(styles.completed);
  });

  it("renders completed and incomplete pomodoro icons correctly", () => {
    const task = {
      id: "1",
      title: "Test Task",
      completed: false,
      pomodoros: 4,
      completedPomodoros: 2,
    };

    vi.mocked(usePomodoroContext).mockReturnValue({
      tasks: [task],
      setTasks: mockSetTasks,
      mode: "pomodoro",
    } as any);

    render(<TaskList />);

    expect(screen.getAllByTestId("done-pomodoro-icon")).toHaveLength(2);
    expect(screen.getAllByTestId("pomodoro-icon")).toHaveLength(2);
  });

  it("renders fallback pomodoro icons when completedPomodoros is undefined", () => {
    const task = {
      id: "1",
      title: "Fallback Test",
      completed: false,
      pomodoros: 3,
      completedPomodoros: undefined,
    };

    vi.mocked(usePomodoroContext).mockReturnValue({
      tasks: [task],
      setTasks: mockSetTasks,
      mode: "pomodoro",
    } as any);

    render(<TaskList />);

    expect(screen.queryAllByTestId("done-pomodoro-icon")).toHaveLength(0);
    expect(screen.getAllByTestId("pomodoro-icon")).toHaveLength(3);
  });
});
