import React, { Component } from 'react';
import { Router, Route } from 'react-router';
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
    return (
      <Router history={history}>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
      </Router>
    );
  }
}
