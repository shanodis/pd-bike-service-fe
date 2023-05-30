import { ColumnDescription } from 'react-bootstrap-table-next';
import { TFunction } from 'i18next';
import { tableColumnsProps } from '../../../../consts/tableColumnsProps';
import { Roles } from '../../../../enums/Roles';
import { concatStrings } from '../../../../utils/concatStrings';
import React from 'react';
import { getDate } from '../../../../utils/getDate';
import { serviceTableFormatter } from '../../../../utils/serviceTableFormatter';
import progressTableFormatter from '../../../../utils/progressTableFormatter';

export const getOrderTableColumns = (
  detailsHandler: (cell: string) => JSX.Element,
  i18n: TFunction<'translation'>,
  hasRole: (...role: Roles[]) => boolean
) => {
  const columns: ColumnDescription[] = [
    {
      dataField: 'bike.bikeName',
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
      style: { maxWidth: 150, ...tableColumnsProps }
    },
    {
      dataField: 'servicesNames',
      text: i18n('orders.typeOfServiceTrans'),
      formatter: serviceTableFormatter,
      style: { maxWidth: 140, overflow: 'hidden', whiteSpace: 'pre-line', textOverflow: 'ellipsis' }
    },
    // {
    //   dataField: "firstName",
    //   hidden: hasRole(Roles.Customer),
    //   text: i18n('orders.aboutClient'),
    //   formatter: aboutClientHandler,
    //   sort: true,
    //   style: { maxWidth: 150, ...tableColumnsProps },
    // },
    {
      dataField: 'orderStatus.orderStatusName',
      text: i18n('orders.progress'),
      sort: true,
      formatter: progressTableFormatter,
      style: { maxWidth: 130, ...tableColumnsProps }
    },
    {
      dataField: 'orderId',
      text: '',
      formatter: detailsHandler,
      style: { maxWidth: 100, ...tableColumnsProps }
    }
  ];
  return columns;
};
