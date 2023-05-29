import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useRouteMatch } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

const EmployeeDetailsTabs = () => {
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
          active={isActive(`${url}/about-employee`)}
          as={Link}
          to={`${url}/about-employee`}
          className={`${buttonActiveStyle(`${url}/about-employee`)} border`}>
          {t('employeeDetails.aboutEmployeeTab')}
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default EmployeeDetailsTabs;
