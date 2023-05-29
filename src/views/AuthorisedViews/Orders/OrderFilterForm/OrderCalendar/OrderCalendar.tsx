import React from 'react';
import { useFormikContext } from 'formik';
import { InputGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { OrderParamRequest } from '../../../../../interfaces/Order/OrderParamRequest';
import orderPeriodSelectOptions from '../orderPeriodSelectOptions/orderPeriodSelectOptions';
import { OrderPeriods } from '../../../../../enums/OrderPeriods';
import CalendarInput from '../../../../../components/Inputs/CalendarInput/CalendarInput';

const OrderCalendar = () => {
  const { t } = useTranslation();
  const { handleSubmit, values, setFieldValue } = useFormikContext<OrderParamRequest>();

  const initWithMoment = (date: Date, isEndDate?: boolean) => {
    const setTime = isEndDate ? moment(date).endOf('day') : moment(date).startOf('day');
    return setTime.toISOString(true);
  };

  const startDateHourInit = initWithMoment(new Date(values?.orderDateFrom?.toString()!));
  const endDateHourInit = initWithMoment(new Date(values?.orderDateTo?.toString()!), true);

  const isStartDateHigher = (startDate: string) => {
    if (!endDateHourInit) return false;
    return new Date(startDate) >= new Date(endDateHourInit);
  };

  const handlePeriodChange = () => {
    const customOption = orderPeriodSelectOptions.find(
      (item: any) => item.id === OrderPeriods.Custom
    );
    setFieldValue('periods', customOption?.id);
    setFieldValue('labelPeriods', customOption?.name);
  };

  const handleStartDateChange = (date: Date) => {
    const initStartDate = initWithMoment(date);
    const initEndDate = initWithMoment(date, true);

    isStartDateHigher(initEndDate) && setFieldValue('orderDateTo', initEndDate);
    setFieldValue('orderDateFrom', initStartDate);
    handlePeriodChange();
    handleSubmit();
  };

  const handleEndDateChange = (date: Date) => {
    const initEndDate = initWithMoment(date, true);
    setFieldValue('orderDateTo', initEndDate);
    handlePeriodChange();
    handleSubmit();
  };

  return (
    <InputGroup className="flex-nowrap">
      <CalendarInput name="orderDateFrom" onChange={handleStartDateChange} roundSide="start" />

      <InputGroup.Text className="rounded-0 w-50 text-white bg-primary-bright justify-content-center">
        {t('ordersTable.calendarToLabel')}
      </InputGroup.Text>

      <CalendarInput
        name="orderDateTo"
        onChange={handleEndDateChange}
        minDate={new Date(startDateHourInit)}
        roundSide="end"
      />
    </InputGroup>
  );
};

export default OrderCalendar;
