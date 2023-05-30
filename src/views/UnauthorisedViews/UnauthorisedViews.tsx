import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SignIn from './SingIn/SignIn';
import CompleteRegister from './CompleteRegister/CompleteRegister';
import Register from './Register/Register';
import CheckEmail from './CheckEmail/CheckEmail';

const UnauthorisedViews = () => (
  <>
    <Switch>
      <Route path="/register" component={Register} />

      <Route path="/check-email" component={CheckEmail} />

      <Route path="/set-password" component={CompleteRegister} />

      <Route path="/" component={SignIn} />
    </Switch>
  </>
);

export default UnauthorisedViews;
