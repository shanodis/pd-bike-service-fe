import { ColumnDescription, ColumnFormatter } from 'react-bootstrap-table-next';
import { TFunction } from 'react-i18next';
import { tableNumberFormatter } from '../../../../utils/tableNumberFormatter';
import { tableColumnsProps } from '../../../../consts/tableColumnsProps';
import { CustomerListResponse } from '../../../../interfaces/Customer/CustomerListResponse';
import { dateFormatter } from '../../../../utils/dateFormatter';

export function getUsersTableColumns(
  nameFormatter: ReturnType<
    (cell: string, row: CustomerListResponse) => ColumnFormatter<CustomerListResponse>
  >,
  i18n: TFunction<'translation'>,
  detailsFormatter: ReturnType<(cell: string) => ColumnFormatter<string>>
) {
  const columns: ColumnDescription[] = [
    {
      dataField: 'lastName',
      text: i18n('userTable.firstName'),
      sort: true,
      formatter: nameFormatter,
      searchable: true,
      style: { maxWidth: 350, ...tableColumnsProps }
    },
    {
      dataField: 'phoneNumber',
      text: i18n('userTable.phoneNumber'),
      formatter: tableNumberFormatter,
      searchable: true
    },
    {
      dataField: 'email',
      text: i18n('userTable.email'),
      sort: true,
      searchable: true
    },
    {
      dataField: 'createdOn',
      text: i18n('userTable.createdOn'),
      sort: true,
      formatter: dateFormatter,
      searchable: false
    },
    {
      dataField: 'lastServiceOn',
      text: i18n('userTable.lastServiceCreatedOn'),
      sort: true,
      formatter: dateFormatter,
      searchable: false
    },
    {
      dataField: 'userId',
      text: '',
      formatter: detailsFormatter
    }
  ];
  return columns;
}
