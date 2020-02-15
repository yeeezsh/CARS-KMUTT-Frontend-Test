import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router';
import history from './history';
import Loadable from 'react-loadable';

const PageUserRouter = Loadable({
  loader: () => import('./user'),
  loading: () => null,
});

const PageStaffRouter = Loadable({
  loader: () => import('./staff'),
  loading: () => null,
});

export default class RootRouter extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          {/* staff zone */}
          <Route path="/staff">
            <PageStaffRouter />
          </Route>

          {/* user zone */}
          <Route path="/">
            <PageUserRouter />
          </Route>
        </Switch>
      </Router>
    );
  }
}
