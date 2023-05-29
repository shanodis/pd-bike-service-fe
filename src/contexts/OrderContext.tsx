import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from 'react';
import { useParams } from 'react-router-dom';
import { OrderResponse } from '../interfaces/Order/OrderResponse';
import { useFetchData } from '../hooks/useFetchData';
import useRole from '../hooks/useRole';
import { Roles } from '../enums/Roles';
import { OrderRequest } from '../interfaces/Order/OrderRequest';

interface InvoiceModel {
  isReadOnly: boolean;
  setIsReadOnly: Dispatch<SetStateAction<boolean>>;
  fetchData: () => Promise<void>;
  data: OrderResponse;
}

interface InformationModel {
  fetchData: () => Promise<void>;
  data: OrderRequest;
}

interface OrderContextReturnModel {
  invoice: InvoiceModel;
  informations: InformationModel;
}

const OrderContext = createContext<OrderContextReturnModel | undefined>(undefined);

export const useOrder = () => useContext(OrderContext)!;

interface OrderContextProviderProps {
  children: ReactNode;
}

const useFetchInvoice = () => {
  const [isReadOnly, setIsReadOnly] = useState(false);
  const { orderId } = useParams<{ orderId: string }>();
  const hasRole = useRole();
  const [data, fetchData] = useFetchData<OrderResponse>(`/orders/${orderId}/invoice`);

  useEffect(() => {
    if (data?.orderStatusName === 'Received') {
      setIsReadOnly(true);
    }

    if (hasRole(Roles.Customer)) {
      setIsReadOnly(true);
    }
  }, [data?.orderStatusName, hasRole]);

  return { data, fetchData, setIsReadOnly, isReadOnly };
};

const informationMapper = (data: OrderRequest) => ({
  ...data,
  userName: `${data.lastName} ${data.firstName}`,
  formChange: 'customerBike'
});

const useFetchInformations = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [data, fetchData] = useFetchData<OrderRequest>(`/orders/${orderId}/information`, {
    dataMapper: informationMapper
  });
  return { data, fetchData };
};

const OrderProvider: FC<OrderContextProviderProps> = ({ children }) => {
  const invoice = useFetchInvoice();
  const informations = useFetchInformations();

  return (
    <OrderContext.Provider value={{ invoice, informations }}>{children}</OrderContext.Provider>
  );
};

export default OrderProvider;
