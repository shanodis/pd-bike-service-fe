import React, { useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, useFormikContext } from 'formik';
import { Button, Col, Row, ToggleButtonGroup } from 'react-bootstrap';
import { OrderStatusRequest } from '../../../../../../interfaces/Order/OrderStatusRequest';
import useRole from '../../../../../../hooks/useRole';
import { i18n } from '../../../../../../assets/i18next/i18n';
import { getSelectFetchDataParams } from '../../../../../../utils/getSelectFetchDataParams';
import { useFetchData } from '../../../../../../hooks/useFetchData';
import { SelectOptionModel } from '../../../../../../interfaces/SelectOption/SelectOptionModel';
import RadioButton from '../../../../../../components/Inputs/RadioButton/RadioButton';
import { Roles } from '../../../../../../enums/Roles';
import { useOrder } from '../../../../../../contexts/OrderContext';
import InvoiceTotalPrice from './InvoiceTotalPrice/InvoiceTotalPrice';
import { OrderStatuses } from '../../../../../../enums/OrderStatuses';

const radioVariants = new Map([
  [i18n.t('orderStatuses.todo'), 'bg-primary-lighter border-primary-lighter'],
  [i18n.t('orderStatuses.received'), 'bg-info border-info'],
  [i18n.t('orderStatuses.done'), 'bg-success-lighter border-success-lighter'],
  [i18n.t('orderStatuses.in-progress'), 'bg-warning border-warning']
]);

const orderStatusTranslations = [
  { id: OrderStatuses.ToDo, name: i18n.t('orderStatuses.todo') },
  { id: OrderStatuses.InProgress, name: i18n.t('orderStatuses.in-progress') },
  { id: OrderStatuses.Received, name: i18n.t('orderStatuses.received') },
  { id: OrderStatuses.Done, name: i18n.t('orderStatuses.done') }
];

const orderStatusMapper = (data: { content: SelectOptionModel[] }) =>
  data.content.map((item) => {
    const foundOrderName = orderStatusTranslations.find(
      (translation) => translation.id === item.id
    )?.name;
    return { id: item.id, name: foundOrderName || '' };
  });

const StatusSwitchBarForm = () => {
  const { values, handleChange, handleSubmit } = useFormikContext<OrderStatusRequest>();
  const history = useHistory();
  const { invoice } = useOrder();
  const { setIsReadOnly } = invoice || {};
  const hasRole = useRole();

  const params = useMemo(() => ({ ...getSelectFetchDataParams('orderStatusName') }), []);

  const [orderStatuses] = useFetchData<SelectOptionModel[]>('/dictionaries/order-statuses', {
    dataMapper: orderStatusMapper,
    params
  });

  const radioStyleChange = (variant: string, radioState: string) =>
    radioState === values.orderStatusId ? `${variant} text-white` : 'bg-white text-dark';

  return (
    <Form className="statuses-spacing">
      <Row className="text-nowrap align-items-baseline">
        <Col className="mt-2" xs={12} lg={6}>
          <ToggleButtonGroup name="orderStatusId" type="radio" defaultValue={values.orderStatusId}>
            {orderStatuses?.map(({ name, id }) => (
              <RadioButton
                disabled={hasRole(Roles.Customer)}
                key={id}
                id={`${name}Radio`}
                name="orderStatusId"
                variant="outline-secondary-dark"
                className={`${radioStyleChange(radioVariants.get(name)!, String(id))} shadow-none`}
                value={id}
                onChange={(e) => {
                  handleChange(e);
                  setIsReadOnly(e.target.id === 'ReceivedRadio');
                  handleSubmit();
                }}>
                {name}
              </RadioButton>
            ))}
          </ToggleButtonGroup>
        </Col>

        <Col className="mt-2" xs={3} lg={3}>
          <InvoiceTotalPrice />
        </Col>

        <Col className="mt-2 text-lg-end" xs={9} lg={3}>
          <Button
            className="bg-success-lighter border-success-lighter"
            onClick={() => history.push('/orders')}>
            {i18n.t('orderStatuses.BackButton')}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default StatusSwitchBarForm;
