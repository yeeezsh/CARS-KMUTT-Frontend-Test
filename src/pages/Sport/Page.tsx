import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loadable from 'react-loadable';
import { Row, Col } from 'antd';
import moment, { Moment } from 'moment';
import {
  Route,
  Switch,
  withRouter,
  RouteComponentProps,
} from 'react-router';

const PageLayout = Loadable({
  loader: () => import('Components/Layout/Page'),
  loading: () => null,
});
const TimePage = Loadable({
  loader: () => import('./Time'),
  loading: () => null,
});
const FormPage = Loadable({
  loader: () => import('./Form'),
  loading: () => null,
});
const ConfirmPage = Loadable({
  loader: () => import('./Confirm'),
  loading: () => null,
});
const Snackbar = Loadable({
  loader: () => import('Components/Snackbar'),
  loading: () => null,
});
const ConfirmModal = Loadable({
  loader: () => import('Components/AcceptedModal'),
  loading: () => null,
});
const Badge = Loadable({
  loader: () => import('Components/Badge'),
  loading: () => null,
});
const StateSteps = Loadable({
  loader: () => import('Components/StateSteps'),
  loading: () => null,
});
const BackCard = Loadable({
  loader: () => import('Components/BackCard'),
  loading: () => null,
});

import TimeNode from 'Components/TimeTable/timetable.interface';
import Area from 'Models/area/area.interface';
import { TaskSport } from 'Models/task/sport/sport.interface';

// import { stepLists, areas } from 'Models/sport';
import { stepLists } from 'Models/sport';
import { Mutate } from 'Models/task/sport';
import { u } from 'Models/user';

import styles from './styles.module.css';

import {
  setDateSelected,
  setTimeSelected,
  setAreaSelected,
  setOwner,
  setAreaId,
  queryArea,
  setUsers,
  resetState,
} from '../../store/reducers/sports/actions';

const CATEGORY_PAGE = '/reserve/sport/category';
const FIRST_STEP_PAGE = '/reserve/sport/1';

interface MaptoDispatchI {
  setDateSelected: (d: Moment) => void;
  setTimeSelected: (d: Moment) => void;
  setAreaSelected: (area: Area['area']) => void;
  setOwner: (u: string) => void;
  setAreaId: (areaId: string) => void;
  queryArea: () => any;
  setUsers: (users: string[]) => any;
  resetState: () => void;
}
interface MapToStateI {
  dateSelected: Moment;
  areaSelected: Area['area'];
  timeSelected: Moment;
  areas: Area[];
  maxForward: number;
  owner: string;
  users: string[];
  interval: number;
  username: string;
}

class SportPage extends Component<
  RouteComponentProps<any> & MapToStateI & MaptoDispatchI,
  {
    step: number;
    badge: string | undefined;
    status: boolean[];
    backCard: string[];
    confirmModal: boolean;
    quota: boolean;
  }
> {
  state = {
    dateSelected: moment().startOf('day'),
    timeSelected: moment().startOf('day'),
    step: 1,
    badge: '',
    status: [],
    backCard: ['เลือกประเภทกีฬา', 'เลือกช่วงเวลา', 'กรอกรหัสนักศึกษา'],
    interval: 0,
    confirmModal: false,
    areas: [],
    quota: true,
  };

  onSelectDate = async (date: Moment) => {
    const { setDateSelected, queryArea } = this.props;
    setDateSelected(date);
    queryArea();
  };

  onSelectTime = (time: TimeNode) => {
    const { badge, quota } = this.state;
    if (time.type === 'disabled' || quota) {
      return this.setState(prevState => {
        const { status } = prevState;
        return {
          status: status.map((e, i) => (i === 0 ? false : e)),
        };
      });
    }

    const { setTimeSelected } = this.props;
    setTimeSelected(time.value);

    return this.setState(
      prevState => {
        return {
          // timeSelected: time.value,
          step: 2,
          status: prevState.status.map((e, i) => (i === 0 ? true : e)),
        };
      },
      () => {
        return this.props.history.push({
          pathname: '2',
          state: {
            label: [badge],
          },
        });
      },
    );
  };

  onClickStep = (n: number) => {
    // const { status } = this.state;
    const canNext = false;
    // status.forEach((e, i) => {
    //   if (n - 1 === i && e) canNext = true;
    // });

    if (!canNext) return;
    return this.setState({ step: n }, () =>
      this.props.history.push({
        pathname: n.toString(),
      }),
    );
  };

  onSelectArea = (area: Area['area']) => {
    const { setAreaSelected } = this.props;
    setAreaSelected(area);
  };

  onForm = (d: { status: boolean; users: string[] }) => {
    if (!d.status) return;
    const { setUsers } = this.props;

    // set to store
    setUsers(d.users);
    return this.setState(
      prevState => {
        const { status } = prevState;
        return {
          step: 3,
          status: status.map((e, i) => (i === 1 ? true : e)),
        };
      },
      () => {
        const { step } = this.state;
        return this.props.history.push({
          pathname: step.toString(),
        });
      },
    );
  };

  onBackCard = () => {
    return this.setState(
      prevState => {
        const { step } = prevState;
        // const { timeSelected } = this.props;
        return {
          step: step - 1,
          //   all reset when step 2 cause selected area, time is the same
          // timeSelected: step === 2 ? moment() : timeSelected,
          // areaSelected: step === 2 ? DEFAULT_SELECTED_AREA : areaSelected,
        };
      },
      () => {
        const { history, location } = this.props;
        const paths = location.pathname.split('/');
        const step = paths[paths.length - 1];
        if (step === '1') return history.replace(CATEGORY_PAGE);
        return history.goBack();
      },
    );
  };

  onConfirm = () => {
    // on send
    const {
      areaSelected,
      owner,
      users,
      dateSelected,
      timeSelected,
      interval,
    } = this.props;
    const startTime = moment(
      `${dateSelected.format('DD-MM-YYYY')}-${timeSelected.format(
        'HH:mm',
      )}`,
      'DD-MM-YYYY-HH:mm',
    );
    const stopTime = moment(startTime).add(interval, 'minute');
    console.log('sssssssssss');
    console.log('start time', startTime.format('DD HH mm'));
    // console.log('start', startTime.format('HH:mm'));
    // console.log('stop', stopTime.format('HH:mm'));
    const parse: TaskSport = {
      owner,
      area: areaSelected.id,
      time: [{ start: startTime, stop: stopTime }],
      requestor: users,
    };
    Mutate.create(parse);
    return this.setState({ confirmModal: true });
  };

  onModal = () => this.props.history.replace('/');

  componentDidMount = async () => {
    TimePage.preload();
    FormPage.preload();
    ConfirmPage.preload();

    const {
      history,
      location,
      setAreaId,
      setOwner,
      queryArea,
      username,
    } = this.props;

    const fetchQuota = await u.GetQuota();
    const quota = fetchQuota.n < 1;

    const owner = username;
    const areaId = location.pathname.split('/')[3];
    setOwner(owner);
    setAreaId(areaId);
    queryArea();

    // for setting badge
    const status = stepLists.map(() => false);
    const locationState: any = history.location.state;
    const badge = locationState.label[0];
    if (!badge) return history.replace(CATEGORY_PAGE);
    return this.setState({ badge, status, quota }, () => {
      const paths = location.pathname.split('/');
      const step = paths[paths.length - 1];
      if (step !== '1') return history.replace(FIRST_STEP_PAGE);
    });
  };

  componentWillUnmount() {
    const { resetState } = this.props;
    resetState();
  }

  render() {
    const {
      confirmModal,
      step,
      backCard,
      timeSelected,
      interval,
      quota,
    } = this.state;

    const { dateSelected, areaSelected, users } = this.props;

    return (
      <React.Fragment>
        <PageLayout titile={'จองสนามกีฬา'}>
          <Row
            type="flex"
            justify="center"
            className={styles.innerFixedHeader}
          >
            {/* steps */}
            <Col style={{ marginTop: '-12px' }} offset={2} span={18}>
              <Row type="flex" justify="center">
                <Col span={20}>
                  <StateSteps
                    onClick={this.onClickStep}
                    current={step - 1}
                    steps={stepLists}
                  />
                </Col>
              </Row>
            </Col>

            {/* back card */}
            <Col
              style={{ marginTop: '4px', marginBottom: '4px' }}
              span={10}
            >
              <BackCard onClick={() => this.onBackCard()}>
                {backCard[step - 1]}
              </BackCard>
            </Col>

            {/* Badge */}
            <Col style={{ marginBottom: '-8px' }} span={24}>
              <Row type="flex" justify="start">
                <Badge>{this.state.badge}</Badge>
                <span className={styles.sideLabel}>
                  {areaSelected && areaSelected.label}
                </span>
              </Row>
            </Col>
          </Row>

          {/* spacing between fixed inner header */}
          <div style={{ height: '145px' }} />

          <Switch>
            <Route path="*/1">
              <TimePage
                onSelectDate={this.onSelectDate}
                onSelectTime={this.onSelectTime}
                onSelectArea={this.onSelectArea}
              />

              {/* traling spaces */}
              <Col span={24} style={{ height: '150px' }} />
            </Route>

            <Route path="*/2">
              <FormPage
                key={areaSelected.id}
                required={areaSelected.required}
                onSubmit={this.onForm}
              />

              {/* traling spaces */}
              <Col span={24} style={{ height: '150px' }} />
            </Route>

            <Route path="*/3">
              <ConfirmPage
                users={users}
                areaLabel={areaSelected.label}
                time={timeSelected}
                interval={interval}
                date={dateSelected}
                onConfirm={this.onConfirm}
              />

              {/* traling spaces */}
              <Col span={24} style={{ height: '150px' }} />
            </Route>
          </Switch>
        </PageLayout>

        {/* overlay element */}
        <ConfirmModal visible={confirmModal} onClick={this.onModal} />
        {quota && (
          <Snackbar show={true}>
            <p style={{ fontWeight: 'bold' }}>
              สิทธิ์การจองสนามกีฬาของคุณเต็มแล้ว
            </p>{' '}
            <p>(1 คน /1 การจองสนามกีฬา)</p>
          </Snackbar>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (rootReducers: any) => {
  const { SportReducers, UserReducers } = rootReducers;
  return {
    ...SportReducers,
    username: UserReducers.username,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setDateSelected: (date: Moment) => dispatch(setDateSelected(date)),
    setTimeSelected: (time: Moment) => {
      return dispatch(setTimeSelected(time));
    },
    setAreaSelected: (area: Area['area']) =>
      dispatch(setAreaSelected(area)),
    setOwner: (ownerId: string) => dispatch(setOwner(ownerId)),
    setAreaId: (areaId: string) => dispatch(setAreaId(areaId)),
    queryArea: () => dispatch(queryArea()),
    setUsers: (d: any) => dispatch(setUsers(d)),
    resetState: () => dispatch(resetState()),
  };
};

export default withRouter<RouteComponentProps, any>(
  connect(mapStateToProps, mapDispatchToProps)(SportPage),
);
