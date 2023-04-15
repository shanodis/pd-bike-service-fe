import { CustomerRequest } from "./CustomerRequest";

export interface CustomerContextModel {
  customerData?: CustomerRequest;
  fetchCustomerData: () => Promise<void>;
  loading: boolean;
}
