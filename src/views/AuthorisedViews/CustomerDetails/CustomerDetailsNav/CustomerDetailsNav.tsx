import React from 'react';
import { Redirect, Route, Switch, useParams, useRouteMatch } from 'react-router-dom';
import { Col, Container, Row, Tab } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import CustomerDetailsTabs from '../CustomerDetailsTabs/CustomerDetailsTabs';
import AboutCustomer from '../AboutCustomer/AboutCustomer';
import RegisteredBikes from '../RegisteredBikes/RegisteredBikes';
import Orders from '../Orders/Orders';
import Breadcrumbs from '../../../../components/Breadcrumbs/Breadcrumbs';
import { Roles } from '../../../../enums/Roles';
import RegisteredBikesProvider from '../../../../contexts/RegisteredBikesContext';
import useRole from '../../../../hooks/useRole';
import { useCustomer } from '../../../../contexts/CustomerContext';

const CustomerDetailsNav = () => {
  const { path } = useRouteMatch();
  const { customerId }: { customerId: string } = useParams();
  const { t } = useTranslation();
  const { customerData } = useCustomer();
  const hasRole = useRole();

  const customerDetailsBreadcrumbs = [
    { href: '/', name: t('breadcrumbs.dashboard') },
    { href: '/customers', name: t('breadcrumbs.customers') },
    {
      href: `/customers/${customerId}`,
      name: [customerData?.firstName, customerData?.lastName].filter(Boolean).join(' ')
    }
  ];

  return !hasRole(Roles.Customer) ? (
    <>
      {customerData && (
        <Container as="main">
          <Breadcrumbs items={customerDetailsBreadcrumbs} />
          <Tab.Container>
            <Row className="justify-content-center justify-content-lg-between">
              <Col className="mt-5">
                <CustomerDetailsTabs />
              </Col>
            </Row>
          </Tab.Container>
        </Container>
      )}

      <Tab.Content>
        <Switch>
          <Route path={`${path}/about-customer`}>
            <AboutCustomer />
          </Route>

          <Route path={`${path}/bikes`}>
            <RegisteredBikesProvider>
              <RegisteredBikes />
            </RegisteredBikesProvider>
          </Route>

          <Route path={`${path}/orders`}>
            <Orders />
          </Route>

          <Route path="*">
            <Redirect to={`${path}/about-customer`} />
          </Route>
        </Switch>
      </Tab.Content>
    </>
  ) : (
    <Tab.Content>
      <Route path={`${path}/bikes`}>
        <Switch>
          <RegisteredBikesProvider>
            <RegisteredBikes />
          </RegisteredBikesProvider>
        </Switch>
      </Route>
    </Tab.Content>
  );
};

export default CustomerDetailsNav;
