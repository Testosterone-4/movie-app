import axios from 'axios';

console.log('API Key:', import.meta.env.VITE_API_KEY); // Add this line

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: { api_key: import.meta.env.VITE_API_KEY },
});

export default api;