import React from 'react';
import { Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useFetchData } from '../../../hooks/useFetchData';
import { OrderResponse } from '../../../interfaces/Order/OrderResponse';

const detailsClassName = 'fs-4';

const InvoiceDetails = () => {
  const { orderId }: { orderId: string } = useParams();
  const [data] = useFetchData<OrderResponse>(`/orders/${orderId}/invoice`);
  const { totalPrice } = data || {};
  const { t } = useTranslation();

  return (
    <>
      {data ? (
        <>
          <h1 className="text-center">{t('orders.orderDetails')}</h1>

          <h2 className="text-center">{`${t('orders.tablePartsHeader')}:`}</h2>
          <div className="w-50 ms-auto me-auto">
            {data.orderParts?.map((item) => (
              <div key={item.orderPartId} className="d-flex justify-content-between">
                <div>
                  <span className={detailsClassName}>
                    <span className="fw-bold">{t('orders.part')}:</span> {item.orderName}
                  </span>

                  <div className="w-100" />

                  <span className={detailsClassName}>
                    <span className="fw-bold">{t('orders.code')}:</span> {item.orderCode}
                  </span>
                </div>

                <div>
                  <span className={`${detailsClassName} fw-bold`}>{`${item.orderPrice} PLN`}</span>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-center">{`${t('orders.tableServiceHeader')}:`}</h2>
          <div className="w-50 ms-auto me-auto">
            {data.orderServices?.map((item) => (
              <div key={item.serviceId} className="d-flex justify-content-between">
                <div>
                  <span className={detailsClassName}>
                    <span className="fw-bold">{t('orders.typeOfServiceTrans')}:</span>{' '}
                    {item.serviceName}
                  </span>
                </div>

                <div>
                  <span className={`${detailsClassName} fw-bold`}>{`${item.orderPrice} PLN`}</span>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-center">{`${t('orders.totalSum')}: ${totalPrice} PLN`}</h2>
        </>
      ) : (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      )}
    </>
  );
};

export default InvoiceDetails;
