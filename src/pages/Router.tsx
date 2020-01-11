import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router';
import Loadable from 'react-loadable';
import history from './history';

import hamburgerWhite from '../assets/icons/hamburger-white.svg';
import hamburgerOrange from '../assets/icons/hamburger-orange.svg';

import Home from './Home';
import Page from './Page';
import { Category as SportCategory, Page as SportPage } from './Sport';
import AppDrawer from '../components/AppDrawer';

export default class PageRouter extends Component<
  {},
  {
    drawer: boolean;
    onHome: boolean;
  }
> {
  state = {
    drawer: false,
    onHome: true,
  };

  // onHome = () => {
  //   const { location } = history;
  //   const onHome = location.pathname === '/';
  //   return this.setState({ onHome });
  // };

  onDrawer = () => {
    return this.setState(prevState => {
      return {
        drawer: !prevState.drawer,
      };
    });
  };

  componentDidMount = () => {
    // when first lunch
    const { location } = history;
    const onHome = location.pathname === '/';
    console.log('onHone', onHome);
    if (!onHome) this.setState({ onHome });

    // on subscribe
    return history.listen(({ pathname }) => {
      console.log('sub', pathname);
      const currentHome = pathname === '/';
      return this.setState({ onHome: currentHome });
    });
  };

  render() {
    const { drawer, onHome } = this.state;
    return (
      <Router history={history}>
        {/* hamburger */}
        <div onClick={this.onDrawer}>
          <img
            style={{
              zIndex: 2,
              position: 'absolute',
              marginTop: '24px',
              marginLeft: '20px',
            }}
            src={onHome ? hamburgerWhite : hamburgerOrange}
            alt="hamburger"
          />
        </div>

        {/* AppDrawer */}
        <AppDrawer onDrawer={this.onDrawer} drawer={drawer} />

        <Route exact={true} path="/">
          <Home />
        </Route>
        <Route path="/page">
          <Page />
        </Route>

        <Route path="/reserve/sport">
          <Switch>
            <Route path="*/category">
              <SportCategory />
            </Route>
            <Route path="*/([0-9])">
              <SportPage />
            </Route>
          </Switch>
        </Route>
      </Router>
    );
  }
}
