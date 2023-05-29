import Axios, { AxiosResponse } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useCurrentUser } from '../contexts/UserContext';
import { showErrorResponses } from '../utils/showErrorResponses';

// Axios.defaults.baseURL = 'https://bike-service-be.herokuapp.com/api/v1';
Axios.defaults.baseURL = 'http://localhost:8080/api/v1';
const token = localStorage.getItem('JWT_USER_TOKEN');
token && (Axios.defaults.headers.common['Authorization'] = token);

export const useInitAxios = () => {
  const [errorCode, setErrorCode] = useState();
  const { onClearUser } = useCurrentUser();

  const setNewAccessToken = useCallback(async () => {
    try {
      const { headers } = await Axios.get('/auth/refresh-access');
      const accessToken = headers.authorization;
      Axios.defaults.headers.common.Authorization = accessToken;
      localStorage.removeItem('JWT_USER_TOKEN');
      localStorage.setItem('JWT_USER_TOKEN', accessToken);
    } catch (e) {
      showErrorResponses(e);
    }
  }, []);

  useEffect(() => {
    const fulfillHandler = (response: AxiosResponse) => response;

    const rejectHandler = async (error: any) => {
      const status = error?.response?.status;

      if (status === 401) {
        onClearUser();
      } else if (status === 406) {
        // await setNewAccessToken();
        // window.location.reload();
      } else if ([403, 404].includes(status) && error.response.config.method === 'get') {
        setErrorCode(status);
      }

      return Promise.reject(error);
    };

    Axios.interceptors.response.use(fulfillHandler, rejectHandler);
  }, [onClearUser, setNewAccessToken]);

  return errorCode;
};
