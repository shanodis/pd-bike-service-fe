import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import useRole from '../../../../hooks/useRole';
import { Roles } from '../../../../enums/Roles';
import NoteComponent from './NoteComponent/NoteComponent';
import PartsTable from './PartsTable/PartsTable';
import ServiceTable from './ServiceTable/ServiceTable';
import StatusSwitchBar from './StatusSwitchBar/StatusSwitchBar';
import { useOrder } from '../../../../contexts/OrderContext';
import { OrderStatuses } from '../../../../enums/OrderStatuses';
import { useRoute } from '../../../../hooks/useRoute';

const Invoice = () => {
  const hasRole = useRole();
  const { orderId }: { orderId: string } = useParams();
  const { invoice } = useOrder();
  const { data } = invoice || {};
  const { t } = useTranslation();
  const { getSearch } = useRoute();
  const { payment_intent: isOrderPaid } = getSearch<{ payment_intent: string }>();

  useEffect(() => {
    if (isOrderPaid) {
      toast.success(t('orders.orderPaid'));
    }
  }, [isOrderPaid, t]);

  return (
    <Container as="main">
      <Row
        hidden={
          hasRole(Roles.Customer) ||
          !data?.totalPrice ||
          data?.isPaid ||
          data?.orderStatusId === OrderStatuses.Done
        }>
        <Col className="mt-4">
          <Button
            className="fw-bold custom-w-100 text-white"
            as={Link as any}
            to={`/payments/${orderId}`}
            variant="info">
            {t('orders.payForOrder')}
          </Button>
        </Col>
      </Row>

      {!hasRole(Roles.Customer) && (
        <Row>
          <Col>
            <NoteComponent />
          </Col>
        </Row>
      )}

      <Row>
        <Col className="mt-4">
          <PartsTable />
        </Col>
      </Row>

      <Row>
        <Col className="mt-4">
          <ServiceTable />
        </Col>
      </Row>

      <StatusSwitchBar />
    </Container>
  );
};

export default Invoice;
