import { Form, Formik } from 'formik';
import React from 'react';
import Axios from 'axios';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { Alert, Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { showErrorResponses } from '../../../utils/showErrorResponses';
import UserForm from '../../../components/UserForm/UserForm';
import { Roles } from '../../../enums/Roles';
import Breadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs';
import { formColProps } from '../../../consts/formColProps';
import { polandId } from '../../../consts/polandId';
import SubmitButton from '../../../components/SubmitButton/SubmitButton';
import { CustomerRequest } from '../../../interfaces/Customer/CustomerRequest';
import { AddClientFormWithInvoiceFormValidationSchema } from '../../../validation/validation';
import { i18n } from '../../../assets/i18next/i18n';

const formikValues: CustomerRequest = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  phoneNumberPrefix: '+48',
  note: '',
  companyName: '',
  taxNumber: '',
  streetName: '',
  city: '',
  postCode: '',
  countryId: polandId,
  countryName: i18n.t('addNewCustomer.countryPoland'),
  addInvoice: false,
  redirectPath: '',
  roleId: Roles.Customer
};

const AddCustomer = () => {
  const history = useHistory();
  const { t } = useTranslation();

  const handlePost = async ({
    addInvoice,
    redirectPath,
    ...values
  }: CustomerRequest): Promise<void> => {
    try {
      const dataWithoutInvoice = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phoneNumber: values.phoneNumber,
        phoneNumberPrefix: values.phoneNumberPrefix,
        note: values.note,
        roleId: Roles.Customer
      };
      const postValues = addInvoice ? values : dataWithoutInvoice;

      const { data: clientId } = await Axios.post<string>('/users/add-customer', postValues);
      toast.success(t('addNewCustomer.successToast'));

      const customerName = `${values.firstName} ${values.lastName}`;

      const finalRedirectPath =
        redirectPath === '/customers'
          ? redirectPath
          : `${redirectPath}?customerId=${clientId}&customerName=${customerName}&customerPhone=${values.phoneNumber}`;
      history.push(finalRedirectPath);
    } catch (e) {
      showErrorResponses(e);
    }
  };

  const addCustomerBreadcrumbs = [
    { href: '/', name: t('breadcrumbs.dashboard') },
    { href: '/clients', name: t('breadcrumbs.customers') },
    { href: '/clients/new', name: t('breadcrumbs.addNewCustomer') }
  ];

  return (
    <Container as="main">
      <Row as="header">
        <Breadcrumbs items={addCustomerBreadcrumbs} />
      </Row>

      <Row>
        <Col {...formColProps} as="section" className="mt-4 mb-5">
          <Alert variant="warning" className="p-3 float-start text-nowrap text-center">
            {t('addNewCustomer.rodoHeader')}
          </Alert>
        </Col>
      </Row>

      <Formik<CustomerRequest>
        initialValues={formikValues}
        validationSchema={AddClientFormWithInvoiceFormValidationSchema}
        onSubmit={handlePost}>
        {({ handleSubmit, setFieldValue }) => (
          <Form>
            <UserForm />
            <Row className="text-end" as="section">
              <Col className="mt-5 mb-3">
                <SubmitButton
                  variant="info"
                  type="button"
                  className="ms-3 text-white"
                  onClick={() => {
                    setFieldValue('redirectPath', '/customers');
                    handleSubmit();
                  }}>
                  {t('addNewCustomer.save')}
                </SubmitButton>

                <SubmitButton
                  variant="success-lighter"
                  type="submit"
                  className="ms-3 text-white"
                  onClick={() => setFieldValue('redirectPath', '/orders/new')}>
                  {t('addNewCustomer.saveAndProceed')}
                </SubmitButton>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default AddCustomer;
