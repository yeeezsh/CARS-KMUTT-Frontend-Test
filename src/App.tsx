// import { hot } from 'react-hot-loader/root';
import React, { Component } from 'react';
import RootRouter from './Router/';
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
  }

  render() {
    return <RootRouter />;
  }
}
// export default hot(App);
export default App;
