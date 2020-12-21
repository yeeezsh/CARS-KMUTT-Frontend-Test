import React, { Component } from 'react';
import ReactGA from 'react-ga';
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
      ReactGA.initialize('G-VSK5G6Y1LF');
      ReactGA.pageview(window.location.pathname + window.location.search);
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
