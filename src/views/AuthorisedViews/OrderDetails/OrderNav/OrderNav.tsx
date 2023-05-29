import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation, useRouteMatch } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const OrderNav = () => {
  const { t } = useTranslation();
  const { url } = useRouteMatch();
  const { pathname } = useLocation();

  const isActive = (currentPath: string) => pathname === currentPath;

  const tabFontStyle = (currentPath: string) => (isActive(currentPath) ? 'fw-bold' : 'fw-normal');
  const buttonActiveStyle = (currentPath: string) =>
    isActive(currentPath)
      ? 'scale-up text-white border-primary-lighter rounded-top'
      : 'scale-down rounded-top';

  return (
    <Nav variant="tabs">
      <Nav.Item className="primary-pills">
        <Nav.Link
          active={isActive(`${url}/information`)}
          as={Link}
          to={`${url}/information`}
          className={`border  ${buttonActiveStyle(`${url}/information`)} ${tabFontStyle(
            `${url}/information`
          )}`}>
          {t('servicePanel.informationsTab')}
        </Nav.Link>
      </Nav.Item>
      <Nav.Item className="primary-pills">
        <Nav.Link
          active={isActive(`${url}/invoice`)}
          as={Link}
          to={`${url}/invoice`}
          className={`border  ${buttonActiveStyle(`${url}/invoice`)} ${tabFontStyle(
            `${url}/invoice`
          )}`}>
          {t('servicePanel.invoiceTab')}
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default OrderNav;
