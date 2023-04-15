import { useLocation } from 'react-router-dom';
import qs from 'qs';

export const useRoute = () => {
  const { pathname, search } = useLocation();

  const getSearch = <T>() => qs.parse(search, { ignoreQueryPrefix: true }) as T;

  return { getSearch, pathname };
};
