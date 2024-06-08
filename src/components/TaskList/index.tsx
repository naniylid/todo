import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Input } from 'antd';
import { selectDataSlice } from '../../redux/slice';
import { TaskItem } from '../TaskItem';
import { Task, TaskListProps, TasksByDateAndProfile } from './types';

export const TaskList: React.FC<TaskListProps> = ({ selectedProfile }) => {
  const [task, setTask] = React.useState<string>('');
  const [tasksByDateAndProfile, setTasksByDateAndProfile] = React.useState<TasksByDateAndProfile>(
    {},
  );
  const { day } = useSelector(selectDataSlice);

  // Загрузка задач из localStorage при инициализации компонента
  React.useEffect(() => {
    const savedTasks = localStorage.getItem('tasksByDateAndProfile');
    if (savedTasks) {
      setTasksByDateAndProfile(JSON.parse(savedTasks));
    }
  }, []);

  // Сохранение задач в localStorage при изменении задач
  React.useEffect(() => {
    localStorage.setItem('tasksByDateAndProfile', JSON.stringify(tasksByDateAndProfile));
  }, [tasksByDateAndProfile]);

  const handleAddTask = () => {
    if (task.trim() !== '') {
      const dateStr = day.format('YYYY-MM-DD');
      const newTask: Task = { text: task, completed: false };
      setTasksByDateAndProfile((prevTasksByDateAndProfile) => {
        const updatedTasks = { ...prevTasksByDateAndProfile };
        if (!updatedTasks[selectedProfile]) {
          updatedTasks[selectedProfile] = {};
        }
        if (!updatedTasks[selectedProfile][dateStr]) {
          updatedTasks[selectedProfile][dateStr] = [];
        }
        updatedTasks[selectedProfile][dateStr].push(newTask);
        return updatedTasks;
      });
      setTask(''); // Очистка поля ввода после добавления задачи
    }
  };

  const handleToggleComplete = (date: string, index: number) => {
    setTasksByDateAndProfile((prevTasksByDateAndProfile) => {
      const updatedTasks = { ...prevTasksByDateAndProfile };
      if (updatedTasks[selectedProfile] && updatedTasks[selectedProfile][date]) {
        updatedTasks[selectedProfile][date][index].completed =
          !updatedTasks[selectedProfile][date][index].completed;
      }
      return updatedTasks;
    });
  };

  const tasksForSelectedDate =
    tasksByDateAndProfile[selectedProfile]?.[day.format('YYYY-MM-DD')] || [];

  return (
    <div className='task-list'>
      <h2>Список задач на {day.format('YYYY-MM-DD')}</h2>
      <div className='task-list__add-task'>
        <Input placeholder='Задача' value={task} onChange={(e) => setTask(e.target.value)} />
        <Button type='primary' onClick={handleAddTask}>
          Добавить
        </Button>
      </div>

      {tasksForSelectedDate.map((t, index) => (
        <TaskItem
          key={index}
          task={t.text}
          index={index}
          completed={t.completed}
          onToggleComplete={() => handleToggleComplete(day.format('YYYY-MM-DD'), index)}
        />
      ))}
    </div>
  );
};
