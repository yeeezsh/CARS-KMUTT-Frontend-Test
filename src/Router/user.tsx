import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router';
import Loadable from 'react-loadable';
import history from './history';

import hamburgerWhite from 'Assets/icons/hamburger-white.svg';
import hamburgerOrange from 'Assets/icons/hamburger-orange.svg';

const LoginPage = Loadable({
  loader: () => import('Pages/Login'),
  loading: () => null,
});
const Home = Loadable({
  loader: () => import('Pages/Home'),
  loading: () => null,
});
const Page = Loadable({
  loader: () => import('Pages/Page'),
  loading: () => null,
});
const LogoutPage = Loadable({
  loader: () => import('Pages/Logout'),
  loading: () => null,
});

import { Category as SportCategory, Page as SportPage } from 'Pages/Sport';
import { u } from 'Models/user';

// Common Area
import { Category as AreaCategory } from 'Pages/Areas';
import {
  Areas as CommonArea,
  TypesWSport as CommonAreaTypes,
  Activity as CommonActivity,
  Sport as CommonSport,
} from 'Pages/Areas/Common';
import {
  Areas as MeetingArea,
  FormClub as MeetingFormClub,
  FormMeeting as MeetingFormMeeting,
} from 'Pages/Areas/Common/Meeting';

const AppDrawer = Loadable({
  loader: () => import('../components/AppDrawer'),
  loading: () => null,
});
const MyReservePage = Loadable({
  loader: () => import('../pages/MyReserve'),
  loading: () => null,
});

export default class PageUserRouter extends Component<
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
    // check authorized first
    const { location } = history;
    const validUser = u.GetUser().permission === 'requestor';
    if (!validUser && location.pathname !== '/login')
      return history.push('/login');

    // preload other components
    Home.preload();
    AppDrawer.preload();
    // SportCategory.preload();
    // SportPage.preload();

    // when first lunch
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

        <Route path="/login">
          <LoginPage />
        </Route>

        <Route exact={true} path="/">
          <Home />
        </Route>
        <Route path="/page">
          <Page />
        </Route>

        {/* Area */}
        <Route path="/reserve/area">
          <Switch>
            <Route path="*/category">
              <AreaCategory />
            </Route>
          </Switch>
        </Route>

        {/* Meeting Area */}
        <Route path="/reserve/area/meeting">
          <Switch>
            <Route path="*/areas">
              <MeetingArea />
            </Route>
            <Route path="*/meeting-club/:id">
              <MeetingFormClub />
            </Route>
            <Route path="*/meeting-room/:id">
              <MeetingFormMeeting />
            </Route>
          </Switch>
        </Route>

        {/* Common Area */}
        <Route path="/reserve/area/common">
          <Switch>
            <Route path="*/">
              <CommonArea />
            </Route>
          </Switch>
        </Route>

        <Route path="/reserve/common">
          <Switch>
            <Route path="**typesSport">
              <CommonAreaTypes allowSport={true} />
            </Route>
            <Route path="**types">
              <CommonAreaTypes />
            </Route>
            <Route path="*/activity">
              <CommonActivity />
            </Route>
            <Route path="*/sport">
              <CommonSport />{' '}
            </Route>
          </Switch>
        </Route>

        {/* Sport  */}
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
              <MyReservePage key={'history'} type="history" />
            </Route>
            <Route path="*/wait">
              <MyReservePage key={'wait'} type="wait" />
            </Route>
            <Route path="*/requested">
              <MyReservePage key={'requested'} type="requested" />
            </Route>
          </Switch>
        </Route>

        <Route path="/logout">
          <LogoutPage />
        </Route>
      </Router>
    );
  }
}
