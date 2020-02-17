import React, { Component } from 'react';
import { Router, Route } from 'react-router';
import Loadable from 'react-loadable';
import history from './history';
import StaffSiderLayout from 'Components/Layout/Staff/Sider';

const Home = Loadable({
  loader: () => import('Pages/Staff/Home'),
  loading: () => null,
});
const Reject = Loadable({
  loader: () => import('Pages/Staff/Reject'),
  loading: () => null,
});
const Login = Loadable({
  loader: () => import('Pages/Staff/Login'),
  loading: () => null,
});

export default class PageStaffRouter extends Component {
  render() {
    // console.log('staff render laew jaa');
    return (
      <Router history={history}>
        <Route path="/">
          <StaffSiderLayout />
        </Route>
        <Route path="**/login">
          <Login />
          {/* <Home /> */}
        </Route>

        <Route path="**/reject">
          <Reject />
        </Route>

        {/* home */}
        <Route path="/staff" exact>
          <Home />
        </Route>
      </Router>
    );
  }
}
