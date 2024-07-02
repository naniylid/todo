import React, { useEffect, useState } from 'react';
import { Calendar, Alert, Badge } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { selectDataSlice, setData, setDay } from '../redux/slice';

interface Task {
  completed: boolean;
  text: string;
}

interface TasksByDateAndProfile {
  [key: string]: {
    [key: string]: Task[];
  };
}

const getTasksForDate = (
  tasksByDateAndProfile: TasksByDateAndProfile,
  profile: string,
  date: Dayjs,
): Task[] => {
  return tasksByDateAndProfile[profile]?.[date.format('YYYY-MM-DD')] || [];
};

export const CalendarComponent: React.FC<{ selectedProfile: string }> = ({ selectedProfile }) => {
  const dispatch = useDispatch();
  const { day, data } = useSelector(selectDataSlice);
  const [tasksByDateAndProfile, setTasksByDateAndProfile] = useState<TasksByDateAndProfile>({});

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasksByDateAndProfile');
    if (savedTasks) {
      setTasksByDateAndProfile(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    axios
      .get(`https://api.11holidays.com/v1/holidays?country=ru&year=${dayjs(day).year()}`)
      .then((resp) => {
        dispatch(setData(resp.data));
      })
      .catch((e) => {
        console.error('API request error:', e);
      });
  }, [day, dispatch]);

  useEffect(() => {
    // Обновление tasksByDateAndProfile при изменении day или selectedProfile
    const updatedTasks = localStorage.getItem('tasksByDateAndProfile');
    if (updatedTasks) {
      setTasksByDateAndProfile(JSON.parse(updatedTasks));
    }
  }, [day, selectedProfile]);

  const onSelect = (newValue: Dayjs) => {
    dispatch(setDay(newValue));
  };

  const onPanelChange = (newValue: Dayjs) => {
    dispatch(setDay(newValue));
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getTasksForDate(tasksByDateAndProfile, selectedProfile, value);
    return (
      <ul className='events'>
        {listData.map((item, index) => (
          <li key={index}>
            <Badge status={item.completed ? 'success' : 'error'} text={item.text} />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <Alert
        message={
          data.length > 0 ? (
            <>
              {data.map((holiday, index) =>
                holiday.date === dayjs(day).format('YYYY-MM-DD') ? (
                  <p key={index}>{holiday.name}</p>
                ) : null,
              )}
            </>
          ) : (
            ''
          )
        }
      />
      <Calendar
        value={day}
        onSelect={onSelect}
        onPanelChange={onPanelChange}
        cellRender={dateCellRender}
      />
    </>
  );
};
