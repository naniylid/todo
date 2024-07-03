import axios from 'axios';

export const fetchHolidays = async (year: number) => {
  try {
    const response = await axios.get(`/api/v1/holidays?country=ru&year=${year}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch holidays', error);
    throw error;
  }
};
