import React from 'react';
import { useParams } from 'react-router-dom';
import EmployeeDetailsNav from './EmployeeDetailsNav/EmployeeDetailsNav';
import { EmployeeProvider } from '../../../contexts/EmployeeContext';

const EmployeeDetails = () => {
  const { employeeId }: { employeeId: string } = useParams();
  return (
    <EmployeeProvider employeeId={employeeId}>
      <EmployeeDetailsNav />
    </EmployeeProvider>
  );
};

export default EmployeeDetails;
