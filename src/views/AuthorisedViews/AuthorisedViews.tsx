import React, { FC } from 'react';
import { Route, Routes as RouterRoutes } from 'react-router-dom';
import Home from './Home/Home';
import Navbar from '../../components/Navbar/Navbar';

const AuthorisedViews: FC = () => (
  <>
    <Navbar />

    <RouterRoutes>
      <Route path="/" element={<Home />} />
    </RouterRoutes>
  </>
);

export default AuthorisedViews;
