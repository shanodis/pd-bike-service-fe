import React, { FC } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home/Home';
import Navbar from '../../components/Navbar/Navbar';
import UserSettings from './UserSettings/UserSettings';
import Customers from './Customers/Customers';
import AddCustomer from './AddCustomer/AddCustomer';
import CustomerDetails from './CustomerDetails/CustomerDetails';
import EditBike from './CustomerDetails/EditBike/EditBike';
import Orders from './Orders/Orders';
import AddOrder from './AddOrder/AddOrder';
import OrderDetails from './OrderDetails/OrderDetails';
import Employees from './Employees/Employees';
import AddEmployee from './AddEmployee/AddEmployee';
import EmployeeDetails from './EmployeeDetails/EmployeeDetails';

const AuthorisedViews: FC = () => (
  <>
    <Navbar />

    <Switch>
      <Route exact path="/" component={Home} />

      <Route exact path="/customers" component={Customers} />

      <Route path="/customers/new" component={AddCustomer} />

      <Route path="/customers/:customerId" component={CustomerDetails} />

      <Route path="/edit-bike/:customerId/:bikeId" component={EditBike} />

      <Route exact path="/orders" component={Orders} />

      <Route path="/orders/new" component={AddOrder} />

      <Route path="/orders/:orderId" component={OrderDetails} />

      <Route path="/user/:userId/settings" component={UserSettings} />

      <Route exact path="/employees" component={Employees} />

      <Route path="/employees/new" component={AddEmployee} />

      <Route path="/employees/:employeeId" component={EmployeeDetails} />
    </Switch>
  </>
);

export default AuthorisedViews;
