import qs from 'qs';

export const getSearchParams = <T extends unknown>() => qs.parse(window.location.search, { ignoreQueryPrefix: true }) as T;
