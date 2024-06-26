import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import dayjs from 'dayjs';
import { Dayjs } from 'dayjs';

type Holidays = {
  date: string;
  name: string;
};

interface DataState {
  day: Dayjs;
  data: Holidays[];
}

const initialState: DataState = {
  day: dayjs(new Date()),
  data: [],
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setDay: (state, action: PayloadAction<Dayjs>) => {
      state.day = action.payload;
    },
    setData: (state, action: PayloadAction<Holidays[]>) => {
      state.data = action.payload;
    },
  },
});

export const { setDay, setData } = dataSlice.actions;

export const selectDataSlice = (state: RootState) => state.dataSlice;

export default dataSlice.reducer;
