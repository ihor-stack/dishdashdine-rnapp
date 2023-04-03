import {API_BASE_URL} from '@/constants';
import axios from 'axios';

const axiosInstance = () => {
  return axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000,
    transformResponse: data => {
      try {
        return JSON.parse(data);
      } catch (error) {
        return error;
      }
    },
  });
};

export default axiosInstance;
