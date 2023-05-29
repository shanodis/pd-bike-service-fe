import React, { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Form, Formik, FormikHelpers } from 'formik';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AddPartRow from './AddPartRow/AddPartRow';
import AddedPart from './AddedPart/AddedPart';
import { partsTableValidation } from './partsTableValidation';
import { useOrder } from '../../../../../contexts/OrderContext';
import { showErrorResponses } from '../../../../../utils/showErrorResponses';

interface PartInterface {
  orderCode: string;
  orderName: string;
  orderPrice: string;
}

const PartsTable = () => {
  const { orderId }: { orderId: string } = useParams();
  const { t } = useTranslation();
  const [showAddButton, setShowAddButton] = useState(false);
  const { invoice } = useOrder();
  const { fetchData, isReadOnly, data } = invoice || {};

  const handleSubmit = async (values: PartInterface, helpers: FormikHelpers<PartInterface>) => {
    try {
      await Axios.post(`/orders/${orderId}/order-parts`, {
        ...values,
        orderPrice: Number(values.orderPrice) || 0
      });
      setShowAddButton(false);
      await fetchData();
    } catch (e) {
      showErrorResponses(e);
    } finally {
      helpers.resetForm();
    }
  };

  const handleDelete = async (orderPartId: string) => {
    try {
      await Axios.delete(`/orders/${orderId}/order-parts/${orderPartId}`);
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
      <h5 className="mx-1">{t('orders.tablePartsHeader')}</h5>
      <div className="parts-table">
        <Row className="m-1 fw-bolder">
          <Col xs={3}>{t('orders.code')}</Col>
          <Col xs={3}>{t('orders.name')}*</Col>
          <Col xs={3}>{t('orders.price')}(PLN)*</Col>
        </Row>
        {data?.orderParts?.map((part) => (
          <AddedPart
            key={part.orderPartId}
            part={part}
            onDelete={() => handleDelete(part.orderPartId)}
          />
        ))}
        <Row className="m-1">
          <Formik
            initialValues={{
              orderCode: '',
              orderName: '',
              orderPrice: ''
            }}
            validationSchema={partsTableValidation}
            onSubmit={handleSubmit}>
            <Form>{showAddButton && <AddPartRow onCancel={handleCancelAdding} />}</Form>
          </Formik>
        </Row>
      </div>
      {!showAddButton && !isReadOnly && (
        <Button
          className="w-auto mx-1 mt-1"
          variant="primary-lighter"
          onClick={() => setShowAddButton(true)}>
          +{t('orders.addPartButton')}
        </Button>
      )}
    </>
  );
};

export default PartsTable;
