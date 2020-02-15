import React, { Component } from 'react';
import { Router, Route } from 'react-router';
import history from './history';

export default class PageStaffRouter extends Component {
  render() {
    return (
      <Router history={history}>
        <Route path="/">home staff ja</Route>
        <Route path="/login">home staff ja</Route>
      </Router>
    );
  }
}
