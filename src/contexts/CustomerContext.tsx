import { createContext, FC, ReactNode, useContext } from 'react';
import { CustomerRequest } from '../interfaces/Customer/CustomerRequest';
import { useFetchData } from '../hooks/useFetchData';
import { CustomerContextModel } from '../interfaces/Customer/CustomerContextModel';
import { polandId } from '../consts/polandId';

const CustomerContext = createContext<CustomerContextModel | undefined>(undefined);

export const useCustomer = () => useContext(CustomerContext)!;

interface CustomerProviderProps {
  children: ReactNode;
  customerId: string;
}

const customerDataMapper = (data: CustomerRequest) => ({
  ...data,
  addInvoice: !!data.companyName,
  countryId: data.countryId ? data.countryId : polandId
});

export const CustomerProvider: FC<CustomerProviderProps> = ({ children, customerId }) => {
  const [customerData, fetchCustomerData, loading] = useFetchData<CustomerRequest>(
    `/users/${customerId}/details`,
    { dataMapper: customerDataMapper }
  );
  return (
    <CustomerContext.Provider value={{ customerData, fetchCustomerData, loading }}>
      {children}
    </CustomerContext.Provider>
  );
};
