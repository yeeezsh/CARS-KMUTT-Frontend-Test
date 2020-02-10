// import { hot } from 'react-hot-loader/root';
import React, { Component } from 'react';
import PageRouter from './pages/Router';
import './App.css';
import { u } from './models/user';

class App extends Component {
  componentDidMount() {
    try {
      // get token before initial app
      const exceptPath = window.location.pathname === '/login';
      if (exceptPath) return;
      u.RestoreUser();
      if (!u.GetUser()._id) throw Error('user need login');
    } catch (err) {
      window.location.replace('/login');
    }

    // u.GetQuota();
  }

  render() {
    return <PageRouter />;
  }
}
// export default hot(App);
export default App;
