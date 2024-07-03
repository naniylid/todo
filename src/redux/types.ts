export type Holidays = {
  date: string;
  name: string;
};

export interface DataState {
  day: string;
  data: Holidays[];
}
