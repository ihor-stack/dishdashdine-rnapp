import {API_BASE_URL, AUTH_TOKEN} from '@/constants';
import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import {isEmpty} from 'lodash';
import storage from '../utils/storage';

const request = async (options: AxiosRequestConfig) => {
  const authToken = await storage.getItem(AUTH_TOKEN);

  let headers: any = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  if (authToken) {
    headers = {
      ...headers,
      Authorization: `Bearer ${
        isEmpty(authToken) ? '' : authToken?.accessToken
      }`,
    };
  }
  axios.defaults.baseURL = API_BASE_URL;
  axios.defaults.timeout = 30000;
  axios.defaults.transformResponse = data => {
    try {
      return JSON.parse(data);
    } catch (error) {
      return error;
    }
  };
  axios.defaults.headers.common = {
    ...headers,
  };

  const onSuccess = (response: AxiosResponse) => {
    if (response && response?.status === 200) {
      return response.data;
    }
  };

  return axios({
    ...options,
    headers,
  }).then(onSuccess);
};

export default request;
