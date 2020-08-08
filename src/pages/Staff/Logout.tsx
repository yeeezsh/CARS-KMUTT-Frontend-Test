import React from 'react';
import { Redirect } from 'react-router-dom';
import { u } from 'Services/user';

const LogoutPage: React.FunctionComponent = () => {
  u.UserLogout();
  return <Redirect to="/staff/login" />;
};

export default LogoutPage;
