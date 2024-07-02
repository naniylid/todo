import { Dayjs } from 'dayjs';

export type Holidays = {
  date: string;
  name: string;
};

export interface DataState {
  day: Dayjs;
  data: Holidays[];
}
