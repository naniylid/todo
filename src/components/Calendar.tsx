import React from 'react';
import { Calendar, Alert } from 'antd';
import axios from 'axios';
import { Dayjs } from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { selectDataSlice, setData, setDay } from '../redux/slice';

export const CalendarComponent: React.FC = () => {
  const dispatch = useDispatch();
  const { day, data } = useSelector(selectDataSlice);

  React.useEffect(() => {
    axios
      .get(`https://api.11holidays.com/v1/holidays?country=ru&year=${day.year()}`)
      .then((resp) => {
        dispatch(setData(resp.data));
      })
      .catch((e) => {
        console.error('API request error:', e);
      });
  }, [day]);

  const onSelect = (newValue: Dayjs) => {
    dispatch(setDay(newValue));
  };

  const onPanelChange = (newValue: Dayjs) => {
    dispatch(setDay(newValue));
  };

  return (
    <>
      <Alert
        message={
          data.length > 0 ? (
            <>
              {data.map((holiday, index) =>
                holiday.date === day.format('YYYY-MM-DD') ? (
                  <p key={index}>{holiday.name}</p>
                ) : null,
              )}
            </>
          ) : (
            ''
          )
        }
      />

      <Calendar value={day} onSelect={onSelect} onPanelChange={onPanelChange} />
    </>
  );
};
