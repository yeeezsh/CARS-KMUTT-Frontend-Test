import React from 'react';
import { Redirect } from 'react-router-dom';
import { userService } from 'Services/user/user.service';

const LogoutPage: React.FunctionComponent = () => {
  userService.UserLogout();
  return <Redirect to="/staff/login" />;
};

export default LogoutPage;
