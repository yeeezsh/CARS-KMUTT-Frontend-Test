import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router';
import Loadable from 'react-loadable';
import history from './history';

const Home = Loadable({
  loader: () => import('../pages/Staff/Home'),
  loading: () => null,
});
const Login = Loadable({
  loader: () => import('../pages/Staff/Login'),
  loading: () => null,
});

export default class PageStaffRouter extends Component {
  render() {
    // console.log('staff render laew jaa');
    return (
      <Switch>
        <Route path="**/login">
          <Login />
          {/* <Home /> */}
        </Route>

        <Route path="**/">
          <Home />
        </Route>
      </Switch>
    );
  }
}
