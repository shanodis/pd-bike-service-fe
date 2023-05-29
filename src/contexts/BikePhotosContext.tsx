import { createContext, FC, ReactNode, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { SelectOptionModel } from '../interfaces/SelectOption/SelectOptionModel';
import { useFetchData } from '../hooks/useFetchData';
import { BikePhotoListResponse } from '../interfaces/Bike/BikePhotoListResponse';

interface BikePhotosContextModel {
  bikePhotos?: BikePhotoListResponse[];
  fetchBikePhotos: () => void;
}

const BikePhotosContext = createContext<BikePhotosContextModel | undefined>(undefined);

export const useBikePhotos = () => useContext(BikePhotosContext)!;

interface BikePhotosProviderProps {
  children: ReactNode;
}

export const BikePhotosProvider: FC<BikePhotosProviderProps> = ({ children }) => {
  const { bikeId } = useParams<{ bikeId: string }>();
  const [bikePhotos, fetchBikePhotos] = useFetchData<BikePhotoListResponse[]>(
    `/bikes/${bikeId}/files`
  );

  return (
    <BikePhotosContext.Provider value={{ bikePhotos, fetchBikePhotos }}>
      {children}
    </BikePhotosContext.Provider>
  );
};
