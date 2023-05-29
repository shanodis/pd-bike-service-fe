import React, {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState
} from 'react';
import { useParams } from 'react-router-dom';
import { useFetchData } from '../hooks/useFetchData';
import { BikeListResponse } from '../interfaces/Bike/BikeListResponse';

interface RegisteredBikesContextModel {
  bikesInfo?: BikeListResponse[];
  phrase: string;
  setPhrase: Dispatch<SetStateAction<string>>;
  fetchBikesInfo: () => Promise<void>;
  loading: boolean;
}

const RegisteredBikesContext = createContext<RegisteredBikesContextModel | undefined>(undefined);

export const useRegisteredBikes = () => useContext(RegisteredBikesContext)!;

interface RegisteredBikesContextProviderProps {
  children: ReactNode;
}

const RegisteredBikesProvider: FC<RegisteredBikesContextProviderProps> = ({ children }) => {
  const { customerId } = useParams<{ customerId: string }>();
  const [phrase, setPhrase] = useState<string>('');
  const params = useMemo(() => ({ phrase }), [phrase]);

  const [bikesInfo, fetchBikesInfo, loading] = useFetchData<BikeListResponse[]>(
    `/users/${customerId}/bikes`,
    { params }
  );

  return (
    <RegisteredBikesContext.Provider
      value={{ bikesInfo, fetchBikesInfo, loading, phrase, setPhrase }}>
      {children}
    </RegisteredBikesContext.Provider>
  );
};

export default RegisteredBikesProvider;
