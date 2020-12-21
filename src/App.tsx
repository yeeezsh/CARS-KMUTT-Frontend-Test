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
      u.RestoreUser();
      if (process.env.REACT_APP_GA_KEY) {
        ReactGA.initialize(process.env.REACT_APP_GA_KEY);
        ReactGA.pageview(
          window.location.pathname + window.location.search,
        );
      }
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    return <RootRouter />;
  }
}

export default App;
