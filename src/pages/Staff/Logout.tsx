import { u } from 'Models/user';
import React from 'react';
import { Redirect } from 'react-router-dom';

const LogoutPage: React.FunctionComponent = () => {
  u.UserLogout();
  return <Redirect to="/staff/login" />;
};

export default LogoutPage;
