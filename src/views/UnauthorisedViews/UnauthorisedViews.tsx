import React from 'react';
import {Route, Routes as RouterRoutes} from "react-router-dom";
import SignIn from "./SingIn/SignIn";
import CompleteRegister from "./CompleteRegister/CompleteRegister";
import Register from "./Register/Register";
import CheckEmail from "./CheckEmail/CheckEmail";

const UnauthorisedViews = () => (
  <>
    <RouterRoutes>
      <Route path='/register' element={<Register/>} />

      <Route path='/check-email' element={<CheckEmail/>} />

      <Route path='/set-password' element={<CompleteRegister/>} />

      <Route path='/' element={<SignIn/>} />
    </RouterRoutes>
  </>
);

export default UnauthorisedViews;
