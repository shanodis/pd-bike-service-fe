import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import { Button, Col, Row } from 'react-bootstrap';
import { PencilFill, TrashFill } from 'react-bootstrap-icons';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AddServiceRow from '../AddServiceRow/AddServiceRow';
import { serviceTableValidation } from '../serviceTableValidation';
import { showErrorResponses } from '../../../../../../utils/showErrorResponses';
import { useOrder } from '../../../../../../contexts/OrderContext';
import { OrderServices } from '../../../../../../interfaces/Order/OrderResponse';
import ConfirmModal from '../../../../../../components/ConfrimModal/ConfirmModal';

interface AddedPartInterface {
  service: OrderServices;
  onDelete: () => Promise<void>;
}

interface ServiceInterface {
  serviceId: string;
  serviceName: string;
  serviceLabel: string;
  orderPrice: number;
}

const AddedPart: React.FC<AddedPartInterface> = ({ service, onDelete }) => {
  const { orderId }: { orderId: string } = useParams();
  const [edit, setEdit] = useState(false);
  const [showModal, setModal] = useState(false);
  const { invoice } = useOrder();
  const { fetchData, isReadOnly } = invoice || {};
  const { t } = useTranslation();

  const handleEdit = async (values: ServiceInterface) => {
    try {
      await Axios.put(`/orders/${orderId}/order-services/${service.orderServiceId}`, {
        serviceId: values.serviceId ? values.serviceName : null,
        serviceName: values.serviceLabel,
        servicePrice: Number(values.orderPrice)
      });
      setEdit(false);
      await fetchData();
    } catch (e) {
      showErrorResponses(e);
    }
  };
  const handleCancel = () => {
    setEdit(false);
  };
  return (
    <Row className="m-1">
      {!edit && (
        <Row>
          <Col xs={6}>{service.serviceName}</Col>
          <Col>{service.orderPrice}</Col>
          <Col className="buttonWrapper">
            {!isReadOnly && (
              <>
                <Button
                  variant="info"
                  className="btn-circle rounded-circle"
                  type="submit"
                  onClick={() => setEdit(true)}>
                  <PencilFill />
                </Button>
                <Button
                  variant="danger"
                  className="btn-circle rounded-circle"
                  onClick={() => setModal(true)}>
                  <TrashFill />
                </Button>
              </>
            )}
          </Col>
        </Row>
      )}
      {service.serviceName && edit && (
        <Formik
          validationSchema={serviceTableValidation}
          initialValues={{
            serviceId: service.serviceId,
            serviceName: service.serviceId,
            serviceLabel: service.serviceName,
            orderPrice: service.orderPrice
          }}
          onSubmit={handleEdit}>
          <Form>
            <AddServiceRow onCancel={handleCancel} />
          </Form>
        </Formik>
      )}
      <ConfirmModal
        showModal={showModal}
        confirmButtonLabel={t('orders.orderModalConfirm')}
        backButtonLabel={t('orders.orderModalBack')}
        modalHeader={t('orders.orderModalBody')}
        handleConfirm={onDelete}
        handleHide={() => setModal(false)}>
        <p className="mt-3">
          {t('orders.typeOfService')}: {service.serviceName}
        </p>
        <p>
          {t('orders.price')}: {service.orderPrice} PLN
        </p>
      </ConfirmModal>
    </Row>
  );
};

export default AddedPart;
