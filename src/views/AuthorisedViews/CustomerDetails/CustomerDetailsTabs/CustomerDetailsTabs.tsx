import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useRouteMatch } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

const CustomerDetailsTabs = () => {
  const { t } = useTranslation();
  const { url } = useRouteMatch();
  const { pathname } = useLocation();

  const isActive = (currentPath: string) => pathname === currentPath;
  const buttonActiveStyle = (currentPath: string) =>
    isActive(currentPath)
      ? 'scale-up text-white border-primary-lighter rounded-top fw-bold'
      : 'scale-down rounded-top fw-normal';

  return (
    <Nav
      variant="tabs"
      className="justify-content-start justify-content-lg-start mobile-nav text-sm-start">
      <Nav.Item className="primary-pills">
        <Nav.Link
          active={isActive(`${url}/about-customer`)}
          as={Link}
          to={`${url}/about-customer`}
          className={`${buttonActiveStyle(`${url}/about-customer`)} border`}>
          {t('customerDetails.aboutCustomerTab')}
        </Nav.Link>
      </Nav.Item>

      <Nav.Item className="primary-pills">
        <Nav.Link
          active={isActive(`${url}/bikes`)}
          as={Link}
          to={`${url}/bikes`}
          className={`${buttonActiveStyle(`${url}/bikes`)} border`}>
          {t('customerDetails.registeredBikesTab')}
        </Nav.Link>
      </Nav.Item>

      <Nav.Item className="primary-pills">
        <Nav.Link
          active={isActive(`${url}/orders`)}
          as={Link}
          to={`${url}/orders`}
          className={`${buttonActiveStyle(`${url}/orders`)} border`}>
          {t('customerDetails.ordersTab')}
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default CustomerDetailsTabs;
