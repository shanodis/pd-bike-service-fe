import React, { useMemo } from 'react';
import { Form, useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';
import { Button, Col, Row } from 'react-bootstrap';
import orderPeriodSelectOptions from './orderPeriodSelectOptions/orderPeriodSelectOptions';
import { orderPeriods } from './orderPeriods/orderPeriods';
import SelectInput from '../../../../components/Inputs/SelectInput/SelectInput';
import TextInput from '../../../../components/Inputs/TextInput/TextInput';
import { OrderParamRequest } from '../../../../interfaces/Order/OrderParamRequest';
import OrderCalendar from './OrderCalendar/OrderCalendar';
import { useFetchData } from '../../../../hooks/useFetchData';
import { SelectOptionModel } from '../../../../interfaces/SelectOption/SelectOptionModel';
import { getSelectFetchDataParams } from '../../../../utils/getSelectFetchDataParams';
import { i18n } from '../../../../assets/i18next/i18n';

const orderStatusTranslations = [
  i18n.t('ordersTable.done'),
  i18n.t('ordersTable.in-progress'),
  i18n.t('ordersTable.received'),
  i18n.t('ordersTable.todo')
];

const orderStatusMapper = (data: { content: SelectOptionModel[] }) =>
  data.content.map((item, index) => ({ id: item.id, name: orderStatusTranslations[index] }));

const OrderFilterForm = () => {
  const { handleSubmit, handleChange, setFieldValue, resetForm } =
    useFormikContext<OrderParamRequest>();
  const { t } = useTranslation();

  const params = useMemo(() => ({ ...getSelectFetchDataParams('orderStatusName') }), []);

  const [orderStatuses] = useFetchData<SelectOptionModel[]>(
    '/dictionaries/order-statuses',
    dataMapper: orderStatusMapper,
    params
  );

  const handlePeriodChange = (arg: number) => {
    setFieldValue('orderDateFrom', orderPeriods[arg].startDate);
    setFieldValue('orderDateTo', orderPeriods[arg].endDate);
  };

  return (
    <Form>
      <Row as="section">
        <Col
          xs={12}
          md={6}
          lg={3}
          className='mt-5'
        >
          <TextInput
            name="phrase"
            className="shadow-none"
            onChange={(e) => {
              handleSubmit();
              handleChange(e);
            }}
            placeholder={t('ordersTable.searchPlaceholder')}
          />
        </Col>
        <Col
          xs={12}
          md={3}
          lg={2}
          className='mt-4 mt-md-5'
        >
          <SelectInput
            valueName="orderStatusId"
            labelName="labelOrderStatus"
            options={orderStatuses}
            placeholder={orderStatuses && orderStatuses[0]?.name}
            className="bg-white shadow-none"
            setSubmit
          />
        </Col>
        <Col
          xs={12}
          md={3}
          lg={2}
          className='mt-4 mt-md-5'
        >
          <SelectInput
            valueName="periods"
            labelName="labelPeriods"
            options={orderPeriodSelectOptions}
            placeholder={orderPeriodSelectOptions[0]?.name}
            className="bg-white shadow-none"
            onChange={handlePeriodChange}
            setSubmit
          />
        </Col>
        <Col
          xs={12}
          md={12}
          lg={5}
          xl={5}
          className='mt-4 mt-md-4 mt-lg-5'
        >
          <OrderCalendar />
        </Col>
        <Col>
          <Button
            type="submit"
            variant="primary"
            className="bg-primary-lighter border-primary-lighter fw-bold w-auto mt-2"
            onClick={() => resetForm()}
          >
            {t('ordersTable.clearFilters')}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default OrderFilterForm;
