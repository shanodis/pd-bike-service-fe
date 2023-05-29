import moment from 'moment';

const todayStartDate = moment(new Date()).startOf('day');
const todayEndDate = moment(new Date()).endOf('day');

export const orderPeriods = [
  {
    startDate: null,
    endDate: null
  },
  {
    startDate: moment(todayStartDate).subtract(1, 'weeks').startOf('isoWeek').toISOString(true),
    endDate: moment(todayEndDate).subtract(1, 'weeks').endOf('isoWeek').toISOString(true)
  },
  {
    startDate: moment(todayStartDate).startOf('isoWeek').toISOString(true),
    endDate: moment(todayEndDate).endOf('isoWeek').toISOString(true)
  },
  {
    startDate: moment(todayStartDate).add(-1, 'months').toISOString(true),
    endDate: moment(todayEndDate).toISOString(true)
  },
  {
    startDate: moment(todayStartDate).add(-3, 'months').toISOString(true),
    endDate: moment(todayEndDate).toISOString(true)
  },
  {
    startDate: moment(todayStartDate).add(-1, 'years').toISOString(true),
    endDate: moment(todayEndDate).toISOString(true)
  },
  {
    startDate: null,
    endDate: null
  }
];
