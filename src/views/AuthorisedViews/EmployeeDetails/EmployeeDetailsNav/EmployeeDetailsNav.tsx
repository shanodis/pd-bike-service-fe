import React from 'react';
import { Redirect, Route, Switch, useParams, useRouteMatch } from 'react-router-dom';
import { Col, Container, Row, Tab } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import EmployeeDetailsTabs from '../EmployeeDetailsTabs/EmployeeDetailsTabs';
import AboutEmployee from '../AboutEmployee/AboutEmployee';
import Breadcrumbs from '../../../../components/Breadcrumbs/Breadcrumbs';
import { useEmployee } from '../../../../contexts/EmployeeContext';

const EmployeeDetailsNav = () => {
  const { path } = useRouteMatch();
  const { employeeId }: { employeeId: string } = useParams();
  const { t } = useTranslation();
  const { employeeData } = useEmployee();

  const employeeDetailsBreadcrumbs = [
    { href: '/', name: t('breadcrumbs.dashboard') },
    { href: '/employees', name: t('breadcrumbs.employees') },
    {
      href: `/employees/${employeeId}`,
      name: [employeeData?.firstName, employeeData?.lastName].filter(Boolean).join(' ')
    }
  ];

  return (
    <>
      {employeeData && (
        <Container as="main">
          <Breadcrumbs items={employeeDetailsBreadcrumbs} />
          <Tab.Container>
            <Row className="justify-content-center justify-content-lg-between">
              <Col className="mt-5">
                <EmployeeDetailsTabs />
              </Col>
            </Row>
          </Tab.Container>
        </Container>
      )}

      <Tab.Content>
        <Switch>
          <Route path={`${path}/about-employee`}>
            <AboutEmployee />
          </Route>

          <Route path="*">
            <Redirect to={`${path}/about-employee`} />
          </Route>
        </Switch>
      </Tab.Content>
    </>
  );
};

export default EmployeeDetailsNav;
