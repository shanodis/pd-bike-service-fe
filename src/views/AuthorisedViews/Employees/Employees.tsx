import React, { useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import FiltersForm from './FiltersForm/FiltersForm';
import useTableProps from '../../../hooks/useTableProps';
import Breadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs';
import { getEmployeeTableColumns } from './getEmployeeTableColumns/getEmployeeTableColumns';
import { EmployeeListResponse } from '../../../interfaces/Employee/EmployeeListResponse';

const filterFormikValues = {
  phrase: ''
};

interface SearchValues {
  phrase: string;
}

const Employees = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const [employeeFilters, setEmployeeFilters] = useState<SearchValues>(filterFormikValues);

  const { tableProps } = useTableProps('/users/employees/page', {
    initialSortBy: 'lastName',
    params: employeeFilters
  });

  const handleSubmit = (values: SearchValues) => {
    setEmployeeFilters(values);
  };

  const nameFormatter = (cell: string, row: EmployeeListResponse) => (
    <span>{[row.lastName, row.firstName].filter(Boolean).join(' ')}</span>
  );

  const detailsFormatter = (cell: string) => (
    <Button
      className="details-button-style float-end"
      onClick={() => {
        history.push(`/employees/${cell}/about-employee`);
      }}>
      {t('userTable.details')}
    </Button>
  );

  const employeesTableBreadcrumbs = [
    { href: '/', name: t('breadcrumbs.dashboard') },
    { href: '/employees', name: t('breadcrumbs.employees') }
  ];

  return (
    <Container className="table-decorators text-nowrap search-form-style">
      <div>
        <Breadcrumbs items={employeesTableBreadcrumbs} />

        <Row className="mt-5">
          <Col xs={12} md={6}>
            <Formik<SearchValues> initialValues={filterFormikValues} onSubmit={handleSubmit}>
              <FiltersForm />
            </Formik>
          </Col>

          <Col xs={12} md={6} className="add-new-client-button-align mb-2">
            <Button
              variant="primary-lighter"
              className="text-white new-customer-button"
              as={Link as any}
              to="/employees/new">
              {t('userTable.addNewEmployee')}
            </Button>
          </Col>
        </Row>

        <Row className="mt-5 mb-3">
          <BootstrapTable
            {...tableProps}
            keyField="userId"
            columns={getEmployeeTableColumns(nameFormatter, t, detailsFormatter)}
          />
        </Row>
      </div>
    </Container>
  );
};

export default Employees;
