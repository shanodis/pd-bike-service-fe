import { OrderPeriods } from '../../../../../enums/OrderPeriods';
import { i18n } from '../../../../../assets/i18next/i18n';

const orderPeriodSelectOptions = [
  { id: OrderPeriods.AllPeriods, name: i18n.t('ordersTable.periodDropdownAllPeriods') },
  { id: OrderPeriods.LastWeek, name: i18n.t('ordersTable.periodDropdownLastWeek') },
  { id: OrderPeriods.ThisWeek, name: i18n.t('ordersTable.periodDropdownThisWeek') },
  { id: OrderPeriods.LastMonth, name: i18n.t('ordersTable.periodDropdownLastMonth') },
  { id: OrderPeriods.Last3Months, name: i18n.t('ordersTable.periodDropdownLast3Months') },
  { id: OrderPeriods.LastYear, name: i18n.t('ordersTable.periodDropdownLastYear') },
  { id: OrderPeriods.Custom, name: i18n.t('ordersTable.periodDropdownCustom') }
];

export default orderPeriodSelectOptions;
