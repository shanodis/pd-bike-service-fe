import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { OrderListResponse } from '../interfaces/Order/OrderListResponse';

const btnClasses =
  'customer-details p-0 text-truncate overflow-hidden text-nowrap w-100 text-start';

export const aboutClientHandler = (cell: string, row: OrderListResponse) => (
  <Button
    as={Link as any}
    className={
      row.userArchivedOn === null ? `${btnClasses}` : `${btnClasses} button-disabled-style`
    }
    to={row.userArchivedOn === null ? `/customers/${row.userId}/about-customer` : ''}>
    <b>{[row.firstName, row.lastName].filter(Boolean).join(' ')}</b>
  </Button>
);
