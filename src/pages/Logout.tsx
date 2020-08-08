import React from 'react';
import { Redirect } from 'react-router-dom';
import { u } from 'Services/user';

const LogoutPage: React.FunctionComponent = () => {
  u.UserLogout();
  return <Redirect to="/login" />;
};

export default LogoutPage;
