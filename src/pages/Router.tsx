import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router';
import history from './history';
import Loadable from 'react-loadable';

const Home = Loadable({
  loader: () => import('./Home'),
  loading: () => null,
});

import Page from './Page';
import { Category as SportCategory, Page as SportPage } from './Sport';

export default class PageRouter extends Component {
  render() {
    return (
      <Router history={history}>
        <Route exact={true} path="/">
          <Home />
        </Route>
        <Route path="/page">
          <Page />
        </Route>

        <Route path="/reserve/sport">
          <Switch>
            <Route path="*/category">
              <SportCategory />
            </Route>
            <Route path="*/([0-9])">
              <SportPage />
            </Route>
          </Switch>
        </Route>
      </Router>
    );
  }
}
