import axios from 'axios';

const instance = axios.create({
  baseURL: '/api', // <--- Nginx will forward this
  withCredentials: true, // only if using cookies/session auth
});

export default instance;
