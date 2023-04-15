export interface OrderParamRequest {
  orderDateFrom: Date | string | null;
  orderDateTo: Date | string | null;
  orderStatusId: string;
  labelOrderStatus: string
  phrase: string;
  periods: number;
  labelPeriods: string;
}
