import { CustomerResponse } from './CustomerResponse';

export interface CustomerRequest extends CustomerResponse {
  countryId: string;
  countryName: string;
  addInvoice?: boolean;
  redirectPath?: string;
  roleId?: string;
  isUsing2FA?: boolean;
}
