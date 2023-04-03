import React, {ReactNode, useEffect} from 'react';
import {showWarningMessage} from './components/DishFlashMessage';
import {forceSignOut} from './utils/app-actions';
import {captureErrorException} from './utils/error-handler';
import storage from '@/utils/storage';
import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
import {AUTH_TOKEN} from './constants';
import {isEmpty} from 'lodash';
import {showMessage} from 'react-native-flash-message';
import ConnectService from './api/refresh_token';

interface Props {
  children: ReactNode;
}

let isRefreshing = false;
let isNotVerified = false;

const AxiosProviders: React.FC<Props> = (props: Props) => {
  useEffect(() => {
    axios.interceptors.request.use(
      async (config: AxiosRequestConfig) => {
        const authToken = await storage.getItem(AUTH_TOKEN);

        // isNotVerified = false;

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

        config.headers = headers;
        return config;
      },
      (error: any) => {
        captureErrorException(error);
        Promise.reject(error);
      },
    );

    axios.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      async (error: AxiosError) => {
        if (error) {
          if (__DEV__) {
            console.log('AxiosError response: ', error.status);
          }

          const authToken = await storage.getItem(AUTH_TOKEN);
          if (error && error.code === 'ECONNABORTED') {
            return showMessage({
              message: 'Connection Aborted!',
              description: error.message,
              type: 'warning',
            });
          } else if (error && error.code === 'ERR_NETWORK') {
            return showMessage({
              message: error.message,
              description: 'Internet connection is not available',
              type: 'warning',
            });
          }

          const originalRequest: any = error.config;
          if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
              return;
            }

            if (isEmpty(authToken)) {
              // Logout here
              await forceSignOut((global as any).dispath);
            } else {
              try {
                isRefreshing = true;
                originalRequest._retry = true;
                const response = await ConnectService.refreshToken({
                  client_id: 'dishdashdine_app',
                  grant_type: 'refresh_token',
                  refresh_token: authToken?.refreshToken,
                });

                if (response) {
                  await storage.setItem(AUTH_TOKEN, {
                    accessToken: response.access_token,
                    expiresIn: response.expires_in,
                    refreshToken: response.refresh_token,
                  });

                  axios.defaults.headers.common.Authorization =
                    'Bearer ' + response?.access_token;
                  // instance.defaults.headers.common['Authorization'] =
                  //   'Bearer ' + response?.access_token;
                  isRefreshing = false;
                }
                return axios(originalRequest);
              } catch (err: any) {
                isRefreshing = false;
                captureErrorException(err);
                if (
                  err.response?.status === 400 &&
                  err.response?.data?.error === 'invalid_grant'
                ) {
                  await forceSignOut((global as any).dispath);
                }
              }
            }
          } else if (error.response?.status === 403) {
            showWarningMessage(
              'Please verify your account',
              'We noticed your account has not been verified. You must verify your account to continue using this app',
              false,
            );
          }

          if (error && error.response) {
            return Promise.reject(error.response.data);
          } else {
            return Promise.reject(error);
          }
        }
      },
    );
  }, []);

  return <>{props.children}</>;
};

export default AxiosProviders;
