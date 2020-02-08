import React, { Component } from 'react';
import { Row, Col } from 'antd';
import moment, { Moment } from 'moment';
import { Route, Switch, withRouter, RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import Loadable from 'react-loadable';

import styles from './styles.module.css';

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

import PageLayout from '../../components/Layout/Page';
import Badge from '../../components/Badge';
import StateSteps from '../../components/StateSteps';
import ConfirmModal from '../../components/ConfirmModal';

import TimeNode from '../../components/TimeTable/timetable.interface';
import Area from '../../models/area/area.interface';

// import { stepLists, areas } from '../../models/sport';
import { stepLists } from '../../models/sport';
import BackCard from '../../components/BackCard';
import { sport } from '../../models/area/sport';
import { Mutate } from '../../models/task/sport';
import { TaskSport } from '../../models/task/sport/sport.interface';
import { u } from '../../models/user';
import { SportPagesStore, DEFAULT_SELECTED_AREA } from '../../store/reducers/sports';
import {
  setDateSelected,
  setTimeSelected,
  setAreaSelected,
  setOwner,
  setAreaId,
  queryArea,
  setUsers,
} from '../../store/reducers/sports/actions';

const CATEGORY_PAGE = '/reserve/sport/category';
const FIRST_STEP_PAGE = '/reserve/sport/1';

interface MaptoDispatchI {
  setDateSelected: any;
  setTimeSelected: any;
  setAreaSelected: any;
  setOwner: any;
  setAreaId: any;
  queryArea: () => any;
  setUsers: (users: string[]) => any;
}
interface MapToStateI {
  dateSelected: Moment;
  areaSelected: Area['area'];
  timeSelected: Moment;
  areas: Area[];
  maxForward: number;
  owner: string;
  users: string[];
}

class SportPage extends Component<
  RouteComponentProps<any> & MapToStateI & MaptoDispatchI,
  {
    // timeSelected: Moment;
    step: number;
    badge: string | undefined;
    status: boolean[];
    // users: string[];
    backCard: string[];
    // interval: number;
    confirmModal: boolean;
    // maxForward: number;
    // owner: string;
  }
> {
  state = {
    dateSelected: moment().startOf('day'),
    timeSelected: moment().startOf('day'),
    // areaSelected: DEFAULT_SELECTED_AREA,
    users: [],
    step: 1,
    badge: '',
    status: [],
    backCard: ['เลือกประเภทกีฬา', 'เลือกช่วงเวลา', 'กรอกรหัสนักศึกษา'],
    interval: 0,
    confirmModal: false,
    areas: [],
    // maxForward: 2,
    // owner: '',
  };

  onSelectDate = async (date: Moment) => {
    const { setDateSelected: setSelectedDate } = this.props;
    const areaId = location.pathname.split('/')[3];
    setSelectedDate(date);
    // await this.queryAreaDate(areaId, date);
    // return this.setState({
    //   dateSelected: date,
    // });
  };

  onSelectTime = (time: TimeNode) => {
    if (time.type === 'disabled') {
      return this.setState(prevState => {
        const { status } = prevState;
        return {
          status: status.map((e, i) => (i === 0 ? false : e)),
        };
      });
    }
    const { badge } = this.state;
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
    // console.log('on sleected area', area);
    // const areas: Area[] = this.state.areas;
    // const interval = areas.find(e => e.area.id === area.id)?.time.interval || 60;
    // return this.setState({ areaSelected: area, interval });
  };

  onForm = (d: { status: boolean; users: string[] }) => {
    if (!d.status) return;
    const { setUsers } = this.props;
    // console.log('set users', d.users);
    setUsers(d.users);
    return this.setState(
      prevState => {
        const { status } = prevState;
        return {
          step: 3,
          status: status.map((e, i) => (i === 1 ? true : e)),
          // users: d.users,
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
    console.log('confirm kaa');
    const { interval } = this.state;
    const { areaSelected, owner, users, dateSelected, timeSelected } = this.props;
    const startTime = moment(
      `${dateSelected.format('DD-MM-YYYY')}-${timeSelected.format('HH:mm')}`,
      'DD-MM-YYYY-HH:mm',
    ).subtract(interval, 'minute');
    const stopTime = moment(startTime).add(interval, 'minute');
    console.log('sssssssssss');
    console.log('start time', startTime.format('DD'));
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

  queryAreaDate = async (id: string, date: Moment) => {
    const areas = await sport.getFields(id, date);
    const maxForward = areas.reduce((prev, cur) => (prev.time.forward > cur.time.forward ? prev : cur)).time.forward;
    // return this.setState({ areas, maxForward });
  };

  componentDidMount = async () => {
    TimePage.preload();
    FormPage.preload();
    ConfirmPage.preload();

    const { history, location, setAreaId, setOwner, queryArea } = this.props;

    const owner = u.GetUser()?.username || '';
    const areaId = location.pathname.split('/')[3];
    setOwner(owner);
    setAreaId(areaId);
    queryArea();
    // await this.queryAreaDate(areaId, dateSelected);
    // const areas = await sport.getFields(areaId, this.state.dateSelected);
    // const maxForward = areas.reduce((prev, cur) => (prev.time.forward > cur.time.forward ? prev : cur)).time.forward;
    // this.setState({ owner });

    // for setting badge
    const status = stepLists.map(() => false);
    const badge = history.location.state?.label[0];
    if (!badge) return history.replace(CATEGORY_PAGE);
    return this.setState({ badge, status }, () => {
      const paths = location.pathname.split('/');
      const step = paths[paths.length - 1];
      if (step !== '1') return history.replace(FIRST_STEP_PAGE);
    });
  };

  render() {
    console.log('page sport states', this.props.dateSelected.format('DD-MM-YYYY'));
    console.log('page sport states', this.props);
    const {
      confirmModal,
      users,
      step,
      backCard,
      // areaSelected,
      // dateSelected,
      timeSelected,
      interval,
      // maxForward,
    } = this.state;

    const { dateSelected, areas, areaSelected, maxForward } = this.props;

    return (
      <React.Fragment>
        <ConfirmModal visible={confirmModal} onClick={this.onModal} />

        <PageLayout titile={'จองสนามกีฬา'}>
          <Row type="flex" justify="center" className={styles.innerFixedHeader}>
            {/* steps */}
            <Col style={{ marginTop: '-12px' }} offset={2} span={18}>
              <Row type="flex" justify="center">
                <Col span={20}>
                  <StateSteps onClick={this.onClickStep} current={step - 1} steps={stepLists} />
                </Col>
              </Row>
            </Col>

            {/* back card */}
            <Col style={{ marginTop: '4px', marginBottom: '4px' }} span={10}>
              <BackCard onClick={() => this.onBackCard()}>{backCard[step - 1]}</BackCard>
            </Col>

            {/* Badge */}
            <Col style={{ marginBottom: '-8px' }} span={24}>
              <Row type="flex" justify="start">
                <Badge>{this.state.badge}</Badge>
                <span className={styles.sideLabel}>{areaSelected && areaSelected.label}</span>
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
                date={{
                  start: moment().startOf('day'),
                  stop: moment()
                    .startOf('day')
                    .add(maxForward - 1, 'day'),
                  selected: dateSelected,
                }}
                areas={areas}
              />
            </Route>

            <Route path="*/2">
              <FormPage required={areaSelected.required} onSubmit={this.onForm} />
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
            </Route>
          </Switch>
        </PageLayout>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (rootReducers: any) => {
  const { SportReducers } = rootReducers;
  return {
    ...SportReducers,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setDateSelected: (date: Moment) => dispatch(setDateSelected(date)),
    setTimeSelected: (time: Moment) => dispatch(setTimeSelected(time)),
    setAreaSelected: (area: Area['area']) => dispatch(setAreaSelected(area)),
    setOwner: (ownerId: string) => dispatch(setOwner(ownerId)),
    setAreaId: (areaId: string) => dispatch(setAreaId(areaId)),
    queryArea: () => dispatch(queryArea()),
    setUsers: (d: any) => dispatch(setUsers(d)),
  };
};

// export default connect(mapStateToProps, mapDispatchToProps)(withRouter<RouteComponentProps, any>(SportPage));
export default withRouter<RouteComponentProps, any>(connect(mapStateToProps, mapDispatchToProps)(SportPage));
