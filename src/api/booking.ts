import axios from 'axios';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_REACT_API_BOOKING_URL}/v1/`,
  method: 'get, post, put, delete, patch',
  headers: {
    'Content-Type': 'application/json',
    'x-rapidapi-key': import.meta.env.VITE_REACT_API_KEY,
    'x-rapidapi-host': import.meta.env.VITE_REACT_API_BOOKING_HOST,
  },
});

export default api;
