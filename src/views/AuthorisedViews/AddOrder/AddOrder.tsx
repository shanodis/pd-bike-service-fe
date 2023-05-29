import React, { useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import Axios from 'axios';
import { toast } from 'react-toastify';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import ReadOnlyOrderTabs from './ReadOnlyOrderTabs/ReadOnlyOrderTabs';
import { useRoute } from '../../../hooks/useRoute';
import Breadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs';
import InformationsForm from '../../../components/InformationsForm/InformationsForm';
import { OrderRequest } from '../../../interfaces/Order/OrderRequest';
import { AddOrderInformationsValidationSchema } from '../../../validation/validation';

interface SearchModel {
  customerId: string;
  customerName: string;
  customerPhone: string;
}

const AddOrder = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const { getSearch } = useRoute();
  const { customerId, customerName, customerPhone } = getSearch<SearchModel>();

  const customerFullName = useMemo(
    () => (customerId && customerName ? `${customerName}, ${customerPhone}` : ''),
    [customerId, customerName, customerPhone]
  );

  const formikValues: OrderRequest = useMemo(
    () => ({
      userId: customerId || '',
      userName: customerFullName,
      firstName: '',
      lastName: '',
      bikeId: '',
      bikeName: '',
      bikeMake: '',
      bikeModel: '',
      serialNumber: '',
      yearOfProduction: 0,
      labelYearOfProduction: '',
      note: '',
      formChange: 'customerBike'
    }),
    [customerFullName, customerId]
  );

  const handlePost = async (values: OrderRequest) => {
    try {
      const {
        bikeId,
        bikeName,
        bikeModel,
        bikeMake,
        serialNumber,
        yearOfProduction,
        note,
        userId,
        formChange
      } = values;

      const postValues =
        formChange === 'customerBike'
          ? { userId, bikeId, note }
          : { userId, bikeName, bikeModel, bikeMake, serialNumber, yearOfProduction, note };

      const { data: orderId } = await Axios.post('/orders', postValues);
      history.replace('/customers/new');
      history.push(`/orders/${orderId}/invoice`);
      toast.success(t('servicePanel.successToast'));
    } catch (e: any) {
      const message = e?.response?.data?.message;
      message && toast.error(t('servicePanel.errorToast'));
    }
  };

  const addOrderBreadcrumbs = [
    { href: '/', name: t('breadcrumbs.dashboard') },
    { href: '/orders', name: t('breadcrumbs.servicePanel') },
    { href: '/orders/new', name: t('breadcrumbs.createNewOrder') }
  ];

  return (
    <Container as="main">
      <Row>
        <Breadcrumbs items={addOrderBreadcrumbs} />
        <Col className="mt-4">
          <ReadOnlyOrderTabs />
        </Col>
      </Row>

      <Row>
        <Col className="mt-5 mb-3">
          <Formik
            initialValues={formikValues}
            onSubmit={handlePost}
            validationSchema={AddOrderInformationsValidationSchema}>
            <InformationsForm />
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default AddOrder;
