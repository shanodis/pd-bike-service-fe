import { ColumnDescription } from 'react-bootstrap-table-next';
import { TFunction } from 'react-i18next';
import { bikeHandler } from '../../../../../utils/bikeHandler';
import { tableColumnsProps } from '../../../../../consts/tableColumnsProps';
import { dateFormatter } from '../../../../../utils/dateFormatter';
import { serviceHandler } from '../../../../../utils/serviceHandler';
import progressHandler from '../../../../../utils/progressHandler';
import { OrderListResponse } from '../../../../../interfaces/Order/OrderListResponse';

export function getCustomerOrderDetails(
  i18n: TFunction<'translation'>,
  detailsFormatter: (cell: string, row: OrderListResponse) => JSX.Element
) {
  const columns: ColumnDescription[] = [
    {
      dataField: 'bikeName',
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
      searchable: false,
      style: { maxWidth: 150, ...tableColumnsProps }
    },
    {
      dataField: 'servicesNames',
      text: i18n('orders.typeOfServiceTrans'),
      formatter: serviceHandler,
      style: { maxWidth: 200, overflow: 'hidden', whiteSpace: 'pre-line', textOverflow: 'ellipsis' }
    },
    {
      dataField: 'orderSort',
      text: i18n('orders.progress'),
      sort: true,
      formatter: progressHandler,
      style: { maxWidth: 150, ...tableColumnsProps }
    },
    { dataField: 'userId', text: '', formatter: detailsFormatter }
  ];
  return columns;
}
