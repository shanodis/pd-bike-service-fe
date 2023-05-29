import React, { FC } from 'react';
import { Route, Route as RouterRoutes } from 'react-router-dom';
import Home from './Home/Home';
import Navbar from '../../components/Navbar/Navbar';
import UserSettings from './UserSettings/UserSettings';

const AuthorisedViews: FC = () => (
  <>
    <Navbar />

    <RouterRoutes>
      <Route path="/" element={<Home />} />
      <Route path="/user/:userId/settings" element={<UserSettings />} />
    </RouterRoutes>
  </>
);

export default AuthorisedViews;
