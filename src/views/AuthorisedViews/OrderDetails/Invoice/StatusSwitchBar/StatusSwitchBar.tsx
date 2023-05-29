import React from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { Formik, FormikHelpers } from 'formik';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import StatusSwitchBarForm from './StatusSwitchBarForm/StatusSwitchBarForm';
import { useOrder } from '../../../../../contexts/OrderContext';
import { OrderStatusRequest } from '../../../../../interfaces/Order/OrderStatusRequest';

const StatusSwitchBar = () => {
  const { orderId }: { orderId: string } = useParams();
  const { t } = useTranslation();
  const { invoice } = useOrder();
  const { data, fetchData } = invoice || {};
  const { orderStatusId } = data || {};

  const handlePost = async (
    values: OrderStatusRequest,
    { resetForm }: FormikHelpers<OrderStatusRequest>
  ) => {
    try {
      await Axios.patch(`/orders/${orderId}/order-status/${values.orderStatusId}`);
      await fetchData();
    } catch (e) {
      resetForm();
      toast.error(t('orderStatuses.BadPathToast'));
    }
  };

  if (!orderStatusId) {
    return null;
  }

  return (
    <Formik<OrderStatusRequest> initialValues={{ orderStatusId }} onSubmit={handlePost}>
      <StatusSwitchBarForm />
    </Formik>
  );
};

export default StatusSwitchBar;
