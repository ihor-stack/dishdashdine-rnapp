import axiosInstance from './axios';
import {IRefreshData} from './identity';
import qs from 'qs';

const ConnectService = {
  async refreshToken(data: IRefreshData) {
    const instance = axiosInstance();
    const response = await instance({
      url: '/connect/token',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: qs.stringify(data),
    });
    return response.data;
  },
};

export default ConnectService;
