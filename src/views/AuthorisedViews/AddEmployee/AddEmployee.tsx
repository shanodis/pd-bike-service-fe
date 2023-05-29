import { Form, Formik } from 'formik';
import React from 'react';
import Axios from 'axios';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { showErrorResponses } from '../../../utils/showErrorResponses';
import UserForm from '../../../components/UserForm/UserForm';
import Breadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs';
import SubmitButton from '../../../components/SubmitButton/SubmitButton';
import { AddEmployeeFormValidationSchema } from '../../../validation/validation';
import { EmployeeRequest } from '../../../interfaces/Employee/EmployeeRequest';

const formikValues: EmployeeRequest = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  phoneNumberPrefix: '+48',
  note: ''
};

const AddEmployee = () => {
  const history = useHistory();
  const { t } = useTranslation();

  const handlePost = async (values: EmployeeRequest): Promise<void> => {
    try {
      await Axios.post('/auth/employee-create', values);
      toast.success(t('addNewEmployee.successToast'));
      history.push('/employees');
    } catch (e) {
      showErrorResponses(e);
    }
  };

  const addEmployeeBreadcrumbs = [
    { href: '/', name: t('breadcrumbs.dashboard') },
    { href: '/employees', name: t('breadcrumbs.employees') },
    { href: '/employees/new', name: t('breadcrumbs.addNewEmployee') }
  ];

  return (
    <Container as="main">
      <Row as="header" className="mb-5">
        <Breadcrumbs items={addEmployeeBreadcrumbs} />
      </Row>

      <Formik<EmployeeRequest>
        initialValues={formikValues}
        validationSchema={AddEmployeeFormValidationSchema}
        onSubmit={handlePost}>
        <Form>
          <UserForm hideInvoice hideCheckboxInput />
          <Row className="text-end" as="section">
            <Col className="mt-5 mb-3">
              <SubmitButton variant="success-lighter" type="submit" className="ms-3 text-white">
                {t('addNewEmployee.save')}
              </SubmitButton>
            </Col>
          </Row>
        </Form>
      </Formik>
    </Container>
  );
};

export default AddEmployee;
