# Pomodoro Timer

A minimalist and focused time management tool with task tracking, built using React and modern best practices.
Designed to help you stay productive with a time-based approach — work in focused 25-minute intervals, take breaks, and keep track of tasks and time spent.

---

## 🚀 Get Started

### 1. Clone the repository

```bash
git clone https://github.com/yansudeansu/pomodoro.git
cd pomodoro
```

### 2. Install dependencies

```bash
yarn install
# or
npm install
```

### 3. Run the development server

```bash
yarn dev
# or
npm run dev
```

Visit `http://localhost:5173` in your browser to start using the app.

---

## ✨ Features

- Pomodoro, short break, and long break modes
- Task manager with per-task Pomodoro tracking
- Auto-switching between work and break sessions
- Sound alerts for session transitions
- Info tooltip with Pomodoro planning tips
- Responsive and dark-mode friendly UI
- Built using Atomic Design principles

---

## 🧪 Testing

This project uses [Vitest](https://vitest.dev/) and [Testing Library](https://testing-library.com/) for comprehensive unit and integration tests.

```bash
# Run tests
yarn test
# or
npm run test

# Run tests with coverage report
yarn test:coverage
# or
npm run test:coverage
```

---

## 📖 Storybook (Optional)

To preview and document UI components:

```bash
yarn storybook
# or
npm run storybook
```

Then visit: [http://localhost:6006](http://localhost:6006)

---

## 📁 Project Structure

This project follows the Atomic Design methodology:

```
src/
├── atoms/          # Small, reusable UI elements (Button, Text, Icon)
├── molecules/      # Composed components (e.g. TaskItem, InfoTooltip)
├── organisms/      # Large components (e.g. PomodoroTimer, TaskManager)
├── templates/      # Page-level layouts (PomodoroPage)
├── context/        # Global state (PomodoroContext)
├── hooks/          # Custom React hooks (e.g. useTimer)
├── utils/          # Utility functions (e.g. sound playback)
├── types/          # Shared TypeScript types
```

---

## 🎵 Credits

**Sounds used:**

- **Game Start**  
  [foxboytails on Pixabay](https://pixabay.com/users/foxboytails-49447089/)

- **8-bit Blast**  
  [freesound_community on Pixabay](https://pixabay.com/users/freesound_community-46691455/)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
