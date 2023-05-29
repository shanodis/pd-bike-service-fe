import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import { Button, Col, Container, Row } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import { Link, useHistory } from 'react-router-dom';
import useRole from '../../../hooks/useRole';
import { Roles } from '../../../enums/Roles';
import { i18n } from '../../../assets/i18next/i18n';
import { OrderParamRequest } from '../../../interfaces/Order/OrderParamRequest';
import useTableProps from '../../../hooks/useTableProps';
import { OrderListResponse } from '../../../interfaces/Order/OrderListResponse';
import Breadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs';
import OrderFilterForm from './OrderFilterForm/OrderFilterForm';
import { getOrderTableColumns } from './getOrderTableColumns/getOrderTableColumns';

const initialValues: OrderParamRequest = {
  orderDateFrom: null,
  orderDateTo: null,
  orderStatusId: '',
  labelOrderStatus: i18n.t('orderStatuses.All progressLabel'),
  periods: 0,
  labelPeriods: i18n.t('ordersTable.periodDropdownAllPeriods'),
  phrase: ''
};

const Orders = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const [orderFilters, setOrderFilters] = useState<OrderParamRequest>();
  const hasRole = useRole();

  const { tableProps } = useTableProps<OrderListResponse>('/orders', { params: orderFilters });

  const handleSubmit = (values: OrderParamRequest) => {
    setOrderFilters(values);
  };

  const detailsHandler = (cell: string) => (
    <Button
      type="button"
      className="details-button-style float-end"
      onClick={() => history.push(`/orders/${cell}/invoice`)}>
      {t('orders.details')}
    </Button>
  );

  const orderListBreadcrumbs = [
    { href: '/', name: t('breadcrumbs.dashboard') },
    { href: '/orders', name: t('breadcrumbs.servicePanel') }
  ];

  return (
    <Container as="main" className="table-decorators text-nowrap">
      <Row as="section" className="justify-content-end text-nowrap">
        <Breadcrumbs items={orderListBreadcrumbs} />
        <Col className="mt-3 text-center text-md-end" xs={12} md={4} lg={3} xxl={2}>
          {!hasRole(Roles.Customer) && (
            <Button
              className="fw-bold custom-w-100"
              as={Link as any}
              to="/orders/new"
              variant="primary-lighter">
              {t('ordersTable.makeAnAppointmentButton')}
            </Button>
          )}
        </Col>
      </Row>

      <Row className="mb-5">
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <OrderFilterForm />
        </Formik>
      </Row>

      <BootstrapTable
        {...tableProps}
        keyField="orderId"
        columns={getOrderTableColumns(detailsHandler, t, hasRole)}
      />
    </Container>
  );
};

export default Orders;
