import { hot } from 'react-hot-loader/root';
import React, { Component } from 'react';
import PageRouter from './pages/Router';
import './App.css';

// hotfix
import { GetUserToken } from './models/user';
import i from './models/axios.interface';

class App extends Component {
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
export default hot(App);
