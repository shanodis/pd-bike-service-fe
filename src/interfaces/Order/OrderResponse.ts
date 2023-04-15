export interface OrderParts {
  orderPartId: string;
  orderCode: string;
  orderName: string;
  orderPrice: number;
}

export interface OrderServices {
  orderServiceId: string;
  serviceId: string;
  serviceName: string;
  orderPrice: number;
}

export interface OrderResponse {
  orderParts?: OrderParts[];
  orderServices?: OrderServices[];
  note?: string;
  orderStatusId?: string;
  orderStatusName?: string;
  totalPrice?: number;
  isPaid?: boolean;
}
