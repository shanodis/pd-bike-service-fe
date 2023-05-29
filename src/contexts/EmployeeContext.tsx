import { createContext, FC, ReactNode, useContext } from 'react';
import { useFetchData } from '../hooks/useFetchData';
import { EmployeeContextModel } from '../interfaces/Employee/EmployeeContextModel';
import { EmployeeRequest } from '../interfaces/Employee/EmployeeRequest';

const EmployeeContext = createContext<EmployeeContextModel | undefined>(undefined);

export const useEmployee = () => useContext(EmployeeContext)!;

interface EmployeeProviderProps {
  children: ReactNode;
  employeeId: string;
}

export const EmployeeProvider: FC<EmployeeProviderProps> = ({ children, employeeId }) => {
  const [employeeData, fetchEmployeeData, loading] = useFetchData<EmployeeRequest>(
    `/users/${employeeId}/details`
  );
  return (
    <EmployeeContext.Provider value={{ employeeData, fetchEmployeeData, loading }}>
      {children}
    </EmployeeContext.Provider>
  );
};
