import React, { useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import FiltersForm from './FiltersForm/FiltersForm';
import { CustomerListResponse } from '../../../interfaces/Customer/CustomerListResponse';
import useTableProps from '../../../hooks/useTableProps';
import Breadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs';
import { getUsersTableColumns } from './getUsersTableColumns/getUsersTableColumns';

const filterFormikValues = {
  phrase: ''
};

interface SearchValues {
  phrase: string;
}

const Customers = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const [customersFilters, setCustomersFilters] = useState<SearchValues>(filterFormikValues);

  const { tableProps } = useTableProps('/users/customers/page', {
    initialSortBy: 'lastName',
    params: customersFilters
  });

  const handleSubmit = (values: SearchValues) => {
    setCustomersFilters(values);
  };

  const nameFormatter = (cell: string, row: CustomerListResponse) => (
    <span>
      {[row.lastName, row.firstName, row.companyName, row.taxNumber].filter(Boolean).join(' ')}
    </span>
  );

  const detailsFormatter = (cell: string) => (
    <Button
      className="details-button-style float-end"
      onClick={() => {
        history.push(`/customers/${cell}/about-customer`);
      }}>
      {t('userTable.details')}
    </Button>
  );

  const clientsTableBreadcrumbs = [
    { href: '/', name: t('breadcrumbs.dashboard') },
    { href: '/customers', name: t('breadcrumbs.customers') }
  ];

  return (
    <Container className="table-decorators text-nowrap search-form-style">
      <div>
        <Breadcrumbs items={clientsTableBreadcrumbs} />

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
              to="/customers/new">
              {t('userTable.addClient')}
            </Button>
          </Col>
        </Row>

        <Row className="mt-5 mb-3">
          <BootstrapTable
            {...tableProps}
            keyField="userId"
            columns={getUsersTableColumns(nameFormatter, t, detailsFormatter)}
          />
        </Row>
      </div>
    </Container>
  );
};

export default Customers;
