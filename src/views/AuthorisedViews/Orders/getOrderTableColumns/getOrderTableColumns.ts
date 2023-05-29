import { ColumnDescription } from 'react-bootstrap-table-next';
import { TFunction } from 'react-i18next';
import { tableColumnsProps } from '../../../../consts/tableColumnsProps';
import { dateFormatter } from '../../../../utils/dateFormatter';
import { Roles } from '../../../../enums/Roles';
import { serviceHandler } from '../../../../utils/serviceHandler';
import progressHandler from '../../../../utils/progressHandler';
import { bikeHandler } from '../../../../utils/bikeHandler';

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
      formatter: bikeHandler,
      style: { maxWidth: 150, ...tableColumnsProps }
    },
    {
      dataField: 'createdOn',
      text: i18n('orders.dateOfEntry'),
      sort: true,
      formatter: dateFormatter,
      style: { maxWidth: 150, ...tableColumnsProps }
    },
    {
      dataField: 'servicesNames',
      text: i18n('orders.typeOfServiceTrans'),
      formatter: serviceHandler,
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
      formatter: progressHandler,
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
