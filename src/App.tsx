import React from 'react';
import { PomodoroProvider } from './context/PomodoroContext';
import { PomodoroPage } from './components/templates/PomodoroPage/PomodoroPage';

const App: React.FC = () => {
  return (
    <PomodoroProvider>
      <PomodoroPage />
    </PomodoroProvider>
  );
};

export default App;
