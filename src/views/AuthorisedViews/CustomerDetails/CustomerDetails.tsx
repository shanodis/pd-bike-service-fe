import React from 'react';
import { useParams } from 'react-router-dom';
import CustomerDetailsNav from './CustomerDetailsNav/CustomerDetailsNav';
import { CustomerProvider } from '../../../contexts/CustomerContext';

const CustomerDetails = () => {
  const { customerId }: { customerId: string } = useParams();
  return (
    <CustomerProvider customerId={customerId}>
      <CustomerDetailsNav />
    </CustomerProvider>
  );
};

export default CustomerDetails;
