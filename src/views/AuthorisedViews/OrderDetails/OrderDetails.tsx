import React, { FC } from 'react';
import { Col, Container, Row, Tab } from 'react-bootstrap';
import { Redirect, Route, Switch, useParams, useRouteMatch } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import OrderProvider from '../../../contexts/OrderContext';
import Breadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs';
import OrderNav from './OrderNav/OrderNav';
import Invoice from './Invoice/Invoice';
import Informations from './Informations/Informations';
import { useCurrentUser } from '../../../contexts/UserContext';

const OrderDetails: FC = () => {
  const { path } = useRouteMatch();
  const { t } = useTranslation();
  const { currentUser } = useCurrentUser();
  const { orderId }: { orderId: string } = useParams();

  const orderBreadcrumbs = [
    { href: '/', name: t('breadcrumbs.dashboard') },
    { href: '/orders', name: t('breadcrumbs.servicePanel') },
    {
      href: `/customers/${currentUser?.userId}/about-customer`,
      name: [currentUser?.firstName, currentUser?.lastName].filter(Boolean).join(' ')
    },
    { href: `/orders/${orderId}`, name: t('breadcrumbs.orderDetails') }
  ];

  return (
    <OrderProvider>
      <Container as="main">
        <Breadcrumbs items={orderBreadcrumbs} />
        <Tab.Container>
          <Row>
            <Col className="mt-5">
              <OrderNav />
            </Col>
          </Row>
        </Tab.Container>
      </Container>

      <Tab.Content>
        <Switch>
          <Route path={`${path}/invoice`}>
            <Invoice />
          </Route>

          <Route path={`${path}/information`}>
            <Informations />
          </Route>

          <Route path="*">
            <Redirect to={`${path}/invoice`} />
          </Route>
        </Switch>
      </Tab.Content>
    </OrderProvider>
  );
};

export default OrderDetails;
