import React, { Component } from 'react';
import Loadable from 'react-loadable';
import { u } from 'Services/user';
import './App.css';

const RootRouter = Loadable({
  loader: () => import('./routers/RootRouter'),
  loading: () => null,
});

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
