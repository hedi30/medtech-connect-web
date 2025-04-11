
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://209.38.178.0/api/user/get-users', // Replace with your backend URL
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
