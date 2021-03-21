import hamburgerOrange from 'Assets/icons/hamburger-orange.svg';
import hamburgerWhite from 'Assets/icons/hamburger-white.svg';
// Common Area
import { Category as AreaCategory } from 'Pages/Areas';
import {
  Activity as CommonActivity,
  Areas as CommonArea,
  Sport as CommonSport,
  TypesWSport as CommonAreaTypes,
} from 'Pages/Areas/Common';
import {
  Areas as MeetingArea,
  FormClub as MeetingFormClub,
  FormMeeting as MeetingFormMeeting,
} from 'Pages/Areas/Common/Meeting';
import { Category as SportCategory, Page as SportPage } from 'Pages/Sport';
import React, { useEffect, useState } from 'react';
import Loadable from 'react-loadable';
import { useDispatch } from 'react-redux';
import { Route, Router, Switch, useHistory } from 'react-router';
import { u } from 'Services/user';
import { setButtonActionLayout } from 'Store/reducers/layout/layout.action';
import appHistory from './history';
import RouteGuard from './RouteGuard';

const LoginPage = Loadable({
  loader: () => import('Pages/Login'),
  loading: () => null,
});
const Home = Loadable({
  loader: () => import('Pages/Home'),
  loading: () => null,
});
const LogoutPage = Loadable({
  loader: () => import('Pages/Logout'),
  loading: () => null,
});

const AppDrawer = Loadable({
  loader: () => import('Components/AppDrawer'),
  loading: () => null,
});
const MyReservePage = Loadable({
  loader: () => import('Pages/MyReserve/MyReservePage'),
  loading: () => null,
});
const MyReserveEditPage = Loadable({
  loader: () => import('Pages/MyReserve/MyReservationEdit'),
  loading: () => null,
});

type UserRouter = {
  drawer: boolean;
  onHome: boolean;
  onLogin: boolean;
};

const UserRouter = () => {
  const [routerState, setRouterState] = useState<UserRouter>({
    drawer: false,
    onHome: true,
    onLogin: false,
  });
  const history = useHistory();
  const dispatch = useDispatch();

  //   onmount
  useEffect(() => {
    const { location } = history;

    // preload other components
    Home.preload();
    AppDrawer.preload();

    // when first lunch
    const onHome = location.pathname === '/';
    if (!onHome) setRouterState(prev => ({ ...prev, onHome }));

    // set layout styles
    dispatch(setButtonActionLayout({ style: 'base' }));
  }, []);

  //   navbar styles change and auth
  useEffect(() => {
    const { location } = history;
    const validUser = u.GetUser().group === 'requestor';
    if (!validUser && location.pathname !== '/login')
      return history.replace('/login');
    const onHome = location.pathname === '/';
    const onLogin = location.pathname === '/login';
    setRouterState(prev => ({ ...prev, onLogin, onHome }));
  }, [history.location]);

  const onDrawer = () => {
    setRouterState(prev => ({ ...prev, drawer: !prev.drawer }));
  };

  return (
    <Router history={appHistory}>
      {/* hamburger */}
      {!routerState.onLogin && (
        <div onClick={onDrawer}>
          <img
            style={{
              zIndex: 2,
              position: 'fixed',
              marginTop: '24px',
              marginLeft: '20px',
              cursor: 'pointer',
            }}
            src={routerState.onHome ? hamburgerWhite : hamburgerOrange}
            alt="hamburger"
          />
        </div>
      )}

      {/* AppDrawer */}
      <AppDrawer onDrawer={onDrawer} drawer={routerState.drawer} />

      <Route path="/login">
        <LoginPage />
      </Route>

      <Route exact={true} path="/">
        <RouteGuard>
          <Home />
        </RouteGuard>
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
            <CommonSport />
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
          <Route path="*/edit/:id">
            <MyReserveEditPage />
          </Route>

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
};

export default UserRouter;
