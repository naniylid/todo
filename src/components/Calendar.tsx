import React, { useEffect, useState } from 'react';
import { Calendar, Alert, Badge } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { selectDataSlice, setData, setDay } from '../redux/slice';
import { fetchHolidays } from '../api/holidays';

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
  const { day: dayString, data } = useSelector(selectDataSlice);
  const [tasksByDateAndProfile, setTasksByDateAndProfile] = useState<TasksByDateAndProfile>({});

  // Функция для загрузки данных при изменении day или selectedProfile
  const loadData = async (day: Dayjs, selectedProfile: string) => {
    try {
      const holidaysData = await fetchHolidays(day.year());
      dispatch(setData(holidaysData));

      // Загрузка tasksByDateAndProfile для выбранного профиля
      const updatedTasks = localStorage.getItem(`tasksByDateAndProfile_${selectedProfile}`);
      if (updatedTasks) {
        setTasksByDateAndProfile(JSON.parse(updatedTasks));
      }
    } catch (error) {
      console.error('Ошибка при запросе API:', error);
    }
  };

  useEffect(() => {
    loadData(dayjs(dayString), selectedProfile);
  }, [dayString, selectedProfile]);

  const onSelect = (newValue: Dayjs) => {
    dispatch(setDay(newValue.toISOString()));
    loadData(newValue, selectedProfile); // Обновляем данные при выборе дня
  };

  const onPanelChange = (newValue: Dayjs) => {
    dispatch(setDay(newValue.toISOString()));
    loadData(newValue, selectedProfile); // Обновляем данные при изменении панели
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
                holiday.date === dayjs(dayString).format('YYYY-MM-DD') ? (
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
        value={dayjs(dayString)}
        onSelect={onSelect}
        onPanelChange={onPanelChange}
        cellRender={dateCellRender}
      />
    </>
  );
};
