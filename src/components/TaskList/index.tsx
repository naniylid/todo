import React from 'react';
import { Input, Button } from 'antd';
import { TaskItem } from '../TaskItem';
import { useSelector } from 'react-redux';
import { selectDataSlice } from '../../redux/slice';

export const TaskList: React.FC = () => {
  const [task, setTask] = React.useState<string>('');
  const [tasks, setTasks] = React.useState<string[]>([]);
  const { day } = useSelector(selectDataSlice);

  const handleAddTask = () => {
    if (task.trim() !== '') {
      setTasks([...tasks, task]);
      setTask(''); // Очистка поля ввода после добавления задачи
    }
  };

  return (
    <div className='task-list'>
      <h2>Список задач на {day.format('YYYY-MM-DD')}</h2>
      <div className='task-list__add-task'>
        <Input placeholder='Задача' value={task} onChange={(e) => setTask(e.target.value)} />
        <Button type='primary' onClick={handleAddTask}>
          Добавить
        </Button>
      </div>

      {tasks.map((t, index) => (
        <TaskItem key={index} task={t} index={index} />
      ))}
    </div>
  );
};
