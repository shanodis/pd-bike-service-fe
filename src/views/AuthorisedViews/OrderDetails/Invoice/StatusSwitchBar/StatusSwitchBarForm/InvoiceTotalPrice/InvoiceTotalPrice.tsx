import React from 'react';
import { Alert } from 'react-bootstrap';
import { useOrder } from '../../../../../../../contexts/OrderContext';

const InvoiceTotalPrice = () => {
  const { invoice } = useOrder();
  const { data } = invoice || {};
  return (
    <>
      <Alert className="fw-bold text-center bg-light text-nowrap p-2">
        {data?.totalPrice && `${data.totalPrice} PLN`}
      </Alert>
    </>
  );
};

export default InvoiceTotalPrice;
