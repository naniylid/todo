import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Input } from 'antd';
import dayjs from 'dayjs';
import { selectDataSlice } from '../../redux/slice';
import { TaskItem } from '../TaskItem/index';
import { Task, TaskListProps, TasksByDateAndProfile } from './types';

export const TaskList: React.FC<TaskListProps> = ({ selectedProfile }) => {
  const [task, setTask] = useState<string>('');
  const [tasksByDateAndProfile, setTasksByDateAndProfile] = useState<TasksByDateAndProfile>({});
  const { day: dayString } = useSelector(selectDataSlice);
  const day = dayjs(dayString);

  useEffect(() => {
    const savedTasks = localStorage.getItem(`tasksByDateAndProfile_${selectedProfile}`);
    if (savedTasks) {
      setTasksByDateAndProfile(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      `tasksByDateAndProfile_${selectedProfile}`,
      JSON.stringify(tasksByDateAndProfile),
    );
  }, [tasksByDateAndProfile]);

  const handleAddTask = () => {
    if (task.trim() !== '') {
      const dateStr = day.format('YYYY-MM-DD');
      const newTask: Task = { text: task, completed: false };

      setTasksByDateAndProfile((prevTasksByDateAndProfile) => {
        const updatedTasks = { ...prevTasksByDateAndProfile };
        const tasksForDate = updatedTasks[selectedProfile]?.[dateStr] || [];

        updatedTasks[selectedProfile] = {
          ...updatedTasks[selectedProfile],
          [dateStr]: [...tasksForDate, newTask],
        };

        return updatedTasks;
      });

      setTask('');
    }
  };

  const handleToggleComplete = (date: string, index: number) => {
    setTasksByDateAndProfile((prevTasksByDateAndProfile) => {
      const updatedTasks = { ...prevTasksByDateAndProfile };

      if (updatedTasks[selectedProfile] && updatedTasks[selectedProfile][date]) {
        updatedTasks[selectedProfile][date] = [
          ...updatedTasks[selectedProfile][date].slice(0, index),
          {
            ...updatedTasks[selectedProfile][date][index],
            completed: !updatedTasks[selectedProfile][date][index].completed,
          },
          ...updatedTasks[selectedProfile][date].slice(index + 1),
        ];
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
        <Input
          placeholder='Задача'
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onPressEnter={handleAddTask}
        />
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
