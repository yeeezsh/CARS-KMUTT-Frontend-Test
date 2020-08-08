import { u } from 'Models/user';
import React, { Component } from 'react';
import Loadable from 'react-loadable';
import './App.css';

const RootRouter = Loadable({
  loader: () => import('./router/'),
  loading: () => null,
});

const EXCEPION_PATH = ['/login', '/staff/login', '/staff'];

class App extends Component {
  componentDidMount() {
    try {
      // get token before initial app
      // const exceptPath = EXCEPION_PATH.includes(window.location.pathname);
      // if (exceptPath) return;
      u.RestoreUser();
      // if (!u.GetUser()._id) throw Error('user need login');
    } catch (err) {
      // const staffPath = window.location.pathname.includes('staff');
      // if (staffPath) return window.location.replace('/staff/login');
      // return window.location.replace('/login');
    }
  }

  render() {
    return <RootRouter />;
  }
}

export default App;
