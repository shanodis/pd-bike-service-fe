import React, { FC } from 'react';
import BootstrapTable, { ColumnDescription } from 'react-bootstrap-table-next';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useTableProps from '../../../../hooks/useTableProps';
import { OrderListResponse } from '../../../../interfaces/Order/OrderListResponse';
import useRole from '../../../../hooks/useRole';
import { tableColumnsProps } from '../../../../consts/tableColumnsProps';
import progressTableFormatter from '../../../../utils/progressTableFormatter';
import { serviceTableFormatter } from '../../../../utils/serviceTableFormatter';
import { concatStrings } from '../../../../utils/concatStrings';
import { getDate } from '../../../../utils/getDate';

const OrderTable: FC = () => {
  const { tableProps } = useTableProps<OrderListResponse>('/orders');
  const { t } = useTranslation();
  const history = useHistory();

  const hasRole = useRole();

  const columns: ColumnDescription[] = [
    {
      dataField: 'bike.bikeName',
      text: t('orders.bikeModel'),
      sort: true,
      formatter: (cell, row) => (
        <span>{concatStrings([row.bikeName, row.bikeMake, row.bikeModel], ' ')}</span>
      ),
      style: { maxWidth: 150, ...tableColumnsProps }
    },
    {
      dataField: 'createdOn',
      text: t('orders.dateOfEntry'),
      sort: true,
      formatter: getDate,
      style: { maxWidth: 150, ...tableColumnsProps }
    },
    {
      dataField: 'servicesNames',
      text: t('orders.typeOfServiceTrans'),
      formatter: serviceTableFormatter,
      style: { maxWidth: 140, ...tableColumnsProps, whiteSpace: 'pre-line' }
    },
    // {
    //   dataField: "firstName",
    //   hidden: hasRole(Roles.Customer),
    //   text: t('orders.aboutClient'),
    //   formatter: aboutClientHandler,
    //   sort: true,
    //   style: { maxWidth: 150, ...tableColumnsProps },
    // },
    {
      dataField: 'orderStatus.orderStatusName',
      text: t('orders.progress'),
      sort: true,
      formatter: progressTableFormatter,
      style: { maxWidth: 130, ...tableColumnsProps }
    },
    {
      dataField: 'orderId',
      text: '',
      style: { maxWidth: 100, ...tableColumnsProps },
      formatter: (cell: string) => (
        <Button
          type="button"
          className="details-button-style float-end"
          onClick={() => history.push(`/orders/${cell}/invoice`)}>
          {t('orders.details')}
        </Button>
      )
    }
  ];

  return <BootstrapTable {...tableProps} keyField="orderId" columns={columns} />;
};

export default OrderTable;
