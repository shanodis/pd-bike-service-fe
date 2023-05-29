import React, { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import { useTranslation } from 'react-i18next';
import { Link, useHistory, useParams } from 'react-router-dom';
import useTableProps from '../../../../hooks/useTableProps';
import { useCustomer } from '../../../../contexts/CustomerContext';
import { OrderListResponse } from '../../../../interfaces/Order/OrderListResponse';
import { getCustomerOrderDetails } from './getCustomerOrderDetails/getCustomerOrderDetails';

const Orders = () => {
  const { t } = useTranslation();
  const { customerId }: { customerId: string } = useParams();
  const history = useHistory();

  const [filters] = useState({
    userId: customerId
  });

  const { tableProps } = useTableProps('/orders', { params: filters });
  const { customerData } = useCustomer();

  const detailsFormatter = (cell: string, row: OrderListResponse) => (
    <Button
      className="details-button-style float-end"
      onClick={() => {
        history.push(`/orders/${row?.orderId}/invoice`);
      }}>
      {t('userTable.details')}
    </Button>
  );

  return (
    <Container>
      <Row className="justify-content-center justify-content-lg-end mb-5">
        <Col className="text-center text-sm-end">
          <Button
            className="mt-5 mb-sm-0 bg-primary-lighter border-primary-lighter"
            as={Link}
            to={{
              pathname: '/orders/new',
              search: `?customerId=${customerId}&customerName=${customerData?.lastName} ${customerData?.firstName}&customerPhone=${customerData?.phoneNumber}`
            }}>
            {t('ordersTable.makeAnAppointmentButton')}
          </Button>
        </Col>
      </Row>

      <Row>
        <Col className="table-decorators">
          <BootstrapTable
            {...tableProps}
            keyField="orderId"
            columns={getCustomerOrderDetails(t, detailsFormatter)}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Orders;
