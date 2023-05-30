import NumberFormat from 'react-number-format';
import { CustomerListResponse } from '../interfaces/Customer/CustomerListResponse';

export const tableNumberFormatter = (cell: string, row: CustomerListResponse) => (
  <div>
    <span>{row.phoneNumberPrefix} </span>
    {cell ? <NumberFormat value={cell} displayType="text" format="### ### ###" /> : '-'}
  </div>
);
