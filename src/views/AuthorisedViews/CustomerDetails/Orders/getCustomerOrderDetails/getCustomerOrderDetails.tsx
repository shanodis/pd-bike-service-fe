import React from 'react';
import { ColumnDescription } from 'react-bootstrap-table-next';
import { TFunction } from 'i18next';
import { tableColumnsProps } from '../../../../../consts/tableColumnsProps';
import { OrderListResponse } from '../../../../../interfaces/Order/OrderListResponse';
import { concatStrings } from '../../../../../utils/concatStrings';
import { getDate } from '../../../../../utils/getDate';
import { serviceTableFormatter } from '../../../../../utils/serviceTableFormatter';
import progressTableFormatter from '../../../../../utils/progressTableFormatter';

export function getCustomerOrderDetails(
  i18n: TFunction<'translation'>,
  detailsFormatter: (cell: string, row: OrderListResponse) => JSX.Element
) {
  const columns: ColumnDescription[] = [
    {
      dataField: 'bikeName',
      text: i18n('orders.bikeModel'),
      sort: true,
      formatter: (cell, row) => (
        <span>{concatStrings([row.bikeName, row.bikeMake, row.bikeModel], ' ')}</span>
      ),
      style: { maxWidth: 150, ...tableColumnsProps }
    },
    {
      dataField: 'createdOn',
      text: i18n('orders.dateOfEntry'),
      sort: true,
      formatter: getDate,
      searchable: false,
      style: { maxWidth: 150, ...tableColumnsProps }
    },
    {
      dataField: 'servicesNames',
      text: i18n('orders.typeOfServiceTrans'),
      formatter: serviceTableFormatter,
      style: { maxWidth: 200, overflow: 'hidden', whiteSpace: 'pre-line', textOverflow: 'ellipsis' }
    },
    {
      dataField: 'orderSort',
      text: i18n('orders.progress'),
      sort: true,
      formatter: progressTableFormatter,
      style: { maxWidth: 150, ...tableColumnsProps }
    },
    { dataField: 'userId', text: '', formatter: detailsFormatter }
  ];
  return columns;
}
