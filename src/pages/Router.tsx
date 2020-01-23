import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router';
import Loadable from 'react-loadable';
import history from './history';

import hamburgerWhite from '../assets/icons/hamburger-white.svg';
import hamburgerOrange from '../assets/icons/hamburger-orange.svg';

const Home = Loadable({
  loader: () => import('./Home'),
  loading: () => null,
});
const Page = Loadable({
  loader: () => import('./Page'),
  loading: () => null,
});
import { Category as SportCategory, Page as SportPage } from './Sport';

const AppDrawer = Loadable({
  loader: () => import('../components/AppDrawer'),
  loading: () => null,
});
const MyReservePage = Loadable({
  loader: () => import('./MyReserve'),
  loading: () => null,
});
const LoginPage = Loadable({
  loader: () => import('./Login'),
  loading: () => null,
});

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

  onDrawer = () => {
    return this.setState(prevState => {
      return {
        drawer: !prevState.drawer,
      };
    });
  };

  componentDidMount = () => {
    // preload other components
    LoginPage.preload();
    Home.preload();
    AppDrawer.preload();
    // SportCategory.preload();
    // SportPage.preload();

    // when first lunch
    const { location } = history;
    const onHome = location.pathname === '/';
    if (!onHome) this.setState({ onHome });

    // on subscribe
    return history.listen(({ pathname }) => {
      const currentHome = pathname === '/';
      return this.setState({ onHome: currentHome });
    });
  };

  render() {
    const { drawer, onHome } = this.state;
    const { location } = history;
    const onLogin = location.pathname === '/login';
    return (
      <Router history={history}>
        {/* hamburger */}
        {!onLogin && (
          <div onClick={this.onDrawer}>
            <img
              style={{
                zIndex: 2,
                position: 'fixed',
                marginTop: '24px',
                marginLeft: '20px',
              }}
              src={onHome ? hamburgerWhite : hamburgerOrange}
              alt="hamburger"
            />
          </div>
        )}

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

        <Route path="/my/reserve/">
          <Switch>
            <Route path="*/history">
              <MyReservePage type="history" />
            </Route>
            <Route path="*/wait">
              <MyReservePage type="wait" />
            </Route>
            <Route path="*/request">
              <MyReservePage type="request" />
            </Route>
          </Switch>
        </Route>

        <Route path="/login">
          <LoginPage />
        </Route>
      </Router>
    );
  }
}
