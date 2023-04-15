export const getSelectFetchDataParams = (sortBy: string) => ({
  page: 1,
  pageLimit: -1,
  sortDir: 'asc',
  sortBy
});
