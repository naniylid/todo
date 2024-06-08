import React from 'react';
import './styles/App.scss';
import { CalendarComponent } from './components/Calendar';
import { Profile } from './components/Profile';
import { TaskList } from './components/TaskList';

const App: React.FC = () => {
  const [selectedProfile, setSelectedProfile] = React.useState<string>('lucy');

  return (
    <>
      <nav>
        <Profile onSelectProfile={setSelectedProfile} />
      </nav>
      <h1>Планер дел и задач</h1>
      <main>
        <CalendarComponent />
        <TaskList selectedProfile={selectedProfile} />
      </main>
    </>
  );
};

export default App;
