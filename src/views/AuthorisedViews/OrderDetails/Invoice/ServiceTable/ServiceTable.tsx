import React, { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Form, Formik, FormikHelpers } from 'formik';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AddServiceRow from './AddServiceRow/AddServiceRow';
import AddedService from './AddedService/AddedService';
import { serviceTableValidation } from './serviceTableValidation';
import { showErrorResponses } from '../../../../../utils/showErrorResponses';
import { useOrder } from '../../../../../contexts/OrderContext';

interface ServiceInterface {
  serviceId: string;
  serviceName: string;
  serviceLabel: string;
  orderPrice: string;
}

const ServiceTable = () => {
  const { orderId }: { orderId: string } = useParams();
  const { t } = useTranslation();
  const [showAddButton, setShowAddButton] = useState(false);
  const { invoice } = useOrder();
  const { fetchData, isReadOnly, data } = invoice || {};

  const handleSubmit = async (
    values: ServiceInterface,
    helpers: FormikHelpers<ServiceInterface>
  ) => {
    try {
      await Axios.post(`/orders/${orderId}/order-services`, {
        serviceId: values.serviceName,
        serviceName: values.serviceLabel,
        servicePrice: Number(values.orderPrice)
      });
      setShowAddButton(false);
      await fetchData();
    } catch (e) {
      showErrorResponses(e);
    } finally {
      helpers.resetForm();
    }
  };

  const handleDelete = async (orderServiceId: string) => {
    try {
      await Axios.delete(`/orders/${orderId}/order-services/${orderServiceId}`);
      await fetchData();
    } catch (e) {
      showErrorResponses(e);
    }
  };

  const handleCancelAdding = () => {
    setShowAddButton(false);
  };

  return (
    <>
      <h5 className="mx-1">{t('orders.tableServiceHeader')}</h5>
      <div className="parts-table">
        <Row className="m-1 fw-bolder">
          <Col xs={6}>{t('orders.typeOfService')}*</Col>
          <Col xs={3}>{t('orders.price')}(PLN)*</Col>
        </Row>
        {data?.orderServices?.map((service) => (
          <AddedService
            key={service.orderServiceId}
            service={service}
            onDelete={() => handleDelete(service.orderServiceId)}
          />
        ))}
        <Row className="m-1">
          <Formik
            validationSchema={serviceTableValidation}
            initialValues={{
              serviceId: '',
              serviceName: '',
              serviceLabel: '',
              orderPrice: ''
            }}
            onSubmit={handleSubmit}>
            <Form>{showAddButton && <AddServiceRow onCancel={handleCancelAdding} />}</Form>
          </Formik>
        </Row>
      </div>
      {!showAddButton && !isReadOnly && (
        <Button
          className="w-auto mx-1 mt-1"
          variant="primary-lighter"
          onClick={() => setShowAddButton(true)}>
          +{t('orders.addServiceButton')}
        </Button>
      )}
    </>
  );
};

export default ServiceTable;
