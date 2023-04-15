import qs from 'qs';

export const getSearchParams = <T>() =>
  qs.parse(window.location.search, { ignoreQueryPrefix: true }) as T;
