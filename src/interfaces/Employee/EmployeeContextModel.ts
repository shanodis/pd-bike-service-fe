import { EmployeeRequest } from './EmployeeRequest';

export interface EmployeeContextModel {
  employeeData?: EmployeeRequest;
  fetchEmployeeData: () => Promise<void>;
  loading: boolean;
}
