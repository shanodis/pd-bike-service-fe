import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import { Button, Col, Row } from 'react-bootstrap';
import { PencilFill, TrashFill } from 'react-bootstrap-icons';
import Axios from 'axios';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import AddPartRow from '../AddPartRow/AddPartRow';
import { partsTableValidation } from '../partsTableValidation';
import { useOrder } from '../../../../../../contexts/OrderContext';
import ConfirmModal from '../../../../../../components/ConfrimModal/ConfirmModal';
import { OrderParts } from '../../../../../../interfaces/Order/OrderResponse';

interface AddedPartInterface {
  part: OrderParts;
  onDelete: () => Promise<void>;
}

interface PartInterface {
  orderCode: string;
  orderName: string;
  orderPrice: number;
}

const AddedPart: React.FC<AddedPartInterface> = ({ part, onDelete }) => {
  const { orderId }: { orderId: string } = useParams();
  const [edit, setEdit] = useState(false);
  const [showModal, setModal] = useState(false);
  const { invoice } = useOrder();
  const { fetchData, isReadOnly } = invoice || {};
  const { t } = useTranslation();

  const handleEdit = async (values: PartInterface) => {
    try {
      await Axios.put(`/orders/${orderId}/order-parts/${part.orderPartId}`, {
        ...values,
        orderPrice: Number(values.orderPrice)
      });
      fetchData();
      setEdit(false);
    } catch (error: any) {
      const { orderPrice, orderName } = error?.response?.data?.errors || {};
      orderPrice && toast.error(orderPrice[0]);
      orderName && toast.error(orderName[0]);
    }
  };
  const handleCancel = () => {
    setEdit(false);
  };
  return (
    <Row className="m-1">
      {!edit && (
        <>
          <Col>{part.orderCode}</Col>
          <Col>{part.orderName}</Col>
          <Col>{part.orderPrice}</Col>
          <Col className="buttonWrapper">
            {!isReadOnly && (
              <>
                <Button
                  variant="info"
                  className="rounded-circle btn-circle"
                  type="submit"
                  onClick={() => setEdit(true)}>
                  <PencilFill />
                </Button>
                <Button
                  variant="danger"
                  className="rounded-circle btn-circle"
                  onClick={() => setModal(true)}>
                  <TrashFill />
                </Button>
              </>
            )}
          </Col>
        </>
      )}
      {part.orderPartId && edit && (
        <Formik
          validationSchema={partsTableValidation}
          initialValues={{
            orderCode: part.orderCode,
            orderName: part.orderName,
            orderPrice: part.orderPrice
          }}
          onSubmit={handleEdit}>
          <Form>
            <AddPartRow onCancel={handleCancel} />
          </Form>
        </Formik>
      )}
      <ConfirmModal
        showModal={showModal}
        confirmButtonLabel={t('orders.orderModalConfirm')}
        backButtonLabel={t('orders.orderModalBack')}
        modalHeader={t('orders.orderModalBody')}
        handleConfirm={async () => {
          await onDelete();
          setModal(false);
        }}
        handleHide={() => setModal(false)}>
        <p className="mt-3">
          {t('orders.name')}: {part.orderName}
        </p>
        <p>
          {t('orders.price')}: {part.orderPrice} PLN
        </p>
      </ConfirmModal>
    </Row>
  );
};

export default AddedPart;
