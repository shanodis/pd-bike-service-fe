export interface OrderListResponse {
  orderId: string,
  bikeName: string,
  bikeModel: string,
  bikeMake: string,
  createdOn: string,
  servicesNames: [string],
  userId: string,
  firstName: string,
  lastName: string,
  orderStatusName: string,
  userArchivedOn: string,
}
