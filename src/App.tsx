import { message } from 'antd';
import React, { Component } from 'react';
import Loadable from 'react-loadable';
import adapter from 'Services/adapter';
import { u } from 'Services/user';
import './App.css';
import history from './routers/history';

const RootRouter = Loadable({
  loader: () => import('./routers/RootRouter'),
  loading: () => null,
});

adapter.instance.interceptors.response.use(
  res => {
    return res;
  },
  err => {
    console.log('interceptors err');
    console.log(err);
    const logs = err.message as string;
    const unathorized = logs.includes('401');
    const path = history.location.pathname;
    if (unathorized) {
      u.UserLogout();
      message.info('กำลังพากลับสู่หน้าล็อกอิน ...');
      if (path.includes('/staff')) history.replace('staff/login');
      else history.replace('/login');
    }
  },
);

class App extends Component {
  componentDidMount() {
    try {
      u.RestoreUser();
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    return <RootRouter />;
  }
}

export default App;
