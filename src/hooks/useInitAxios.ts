import Axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { useCurrentUser } from '../contexts/UserContext';
import { showErrorResponses } from '../utils/showErrorResponses';
import { toast } from 'react-toastify';

// Axios.defaults.baseURL = 'https://bike-service-be.herokuapp.com/api/v1';
Axios.defaults.baseURL = 'http://localhost:8080/api/v1';
const token = localStorage.getItem('JWT_USER_TOKEN');
token && (Axios.defaults.headers.common['Authorization'] = token);

const refreshTokenCache = localStorage.getItem('JWT_REFRESH_TOKEN');
refreshTokenCache && (Axios.defaults.headers.common['authorization-refresh'] = refreshTokenCache);

const updateAccessToken = async () => {
  try {
    const { headers } = await Axios.get('/auth/refresh-access');
    const accessToken = headers.authorization;
    Axios.defaults.headers.common.Authorization = accessToken;
    localStorage.setItem('JWT_USER_TOKEN', accessToken);
  } catch (e) {
    showErrorResponses(e);
  }
};

export const useInitAxios = () => {
  const [errorCode, setErrorCode] = useState();
  const { onClearUser, fetchUserData } = useCurrentUser();

  useEffect(() => {
    const fulfillHandler = (response: AxiosResponse) => response;

    const rejectHandler = async (error: any) => {
      const status = error?.response?.status;
      const method = error?.response?.config?.method;

      if (status === 406) {
        await updateAccessToken();
        await fetchUserData(false);
        toast.dismiss();
      } else if ([403, 404].includes(status) && method === 'get') {
        setErrorCode(status);
      } else if (status === 401) {
        onClearUser();
      }

      return Promise.reject(error);
    };

    Axios.interceptors.response.use(fulfillHandler, rejectHandler);
  }, [fetchUserData, onClearUser]);

  return errorCode;
};
