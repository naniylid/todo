import React from 'react';
import './styles/App.scss';
import { CalendarComponent } from './components/Calendar';
import { Profile } from './components/Profile';
import { TaskList } from './components/TaskList';

const App: React.FC = () => {
  return (
    <>
      <nav>
        <Profile />
      </nav>
      <h1>Планер дел и задач</h1>
      <main>
        <CalendarComponent />
        <TaskList />
      </main>
    </>
  );
};

export default App;
