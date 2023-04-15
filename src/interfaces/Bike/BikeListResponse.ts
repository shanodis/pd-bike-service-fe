import { BikePhotoListResponse } from './BikePhotoListResponse';

export interface BikeListResponse {
  bikeId: string;
  bikeName: string;
  bikeMake: string;
  bikeModel: string;
  bikePhotosUrls: BikePhotoListResponse[];
  serialNumber: string;
  yearOfProduction: string;
}
