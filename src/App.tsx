import React, { Component } from 'react';
import './App.css';
import PageRouter from './pages/Router';

// hotfix
import { GetUserToken } from './models/user';
import i from './models/axios.interface';

export default class App extends Component {
  componentDidMount() {
    try {
      // get token before initial app
      const exceptPath = window.location.pathname === '/login';
      if (exceptPath) return;
      i.addToken(GetUserToken());
    } catch (err) {
      window.location.replace('/login');
    }
  }

  render() {
    return <PageRouter />;
  }
}
