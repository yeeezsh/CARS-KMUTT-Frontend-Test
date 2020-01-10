import React, { Component } from 'react';
import { Row, Col } from 'antd';
import moment, { Moment } from 'moment';
import { Route, Switch, withRouter, RouteComponentProps } from 'react-router';

import styles from './styles.module.css';

import TimePage from './Time';
import FormPage from './Form';
import ConfirmPage from './Confirm';
import PageLayout from '../../components/Layout/Page';
import Badge from '../../components/Badge';
import StateSteps from '../../components/StateSteps';

import TimeNode from '../../components/TimeTable/timetable.interface';
import Area from './area.interface';

import { areas, stepLists } from '../../models/sport';
import BackCard from '../../components/BackCard';

const CATEGORY_PAGE = '/reserve/sport/category';
const FIRST_STEP_PAGE = '/reserve/sport/1';
const DEFAULT_SELECTED_AREA = {
  id: '',
  label: '',
  required: 0,
};

class SportPage extends Component<
  RouteComponentProps<any>,
  {
    dateSelected: Moment;
    timeSelected: Moment | undefined;
    areaSelected: Area['area'];
    step: number;
    badge: string | undefined;
    status: boolean[];
    users: string[];
    backCard: string[];
    interval: number;
  }
> {
  state = {
    dateSelected: moment().startOf('day'),
    timeSelected: undefined,
    areaSelected: DEFAULT_SELECTED_AREA,
    users: [],
    step: 1,
    badge: '',
    status: [],
    backCard: ['เลือกประเภทกีฬา', 'เลือกช่วงเวลา', 'กรอกรหัสนักศึกษา'],
    interval: 0,
  };

  onSelectDate = (date: Moment) => {
    return this.setState({
      dateSelected: date,
    });
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
    let { step } = this.state;
    const { badge } = this.state;
    return this.setState(
      prevState => {
        return {
          timeSelected: time.value,
          step: ++step,
          status: prevState.status.map((e, i) => (i === 0 ? true : e)),
        };
      },
      () => {
        return this.props.history.push({
          pathname: step.toString(),
          state: {
            label: [badge],
          },
        });
      },
    );
  };

  onClickStep = (n: number) => {
    const { status } = this.state;
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
    const interval = areas.find(e => e.area.id === area.id)?.time.interval || 60;
    return this.setState({ areaSelected: area, interval });
  };

  onForm = (d: { status: boolean; users: string[] }) => {
    if (!d.status) return;

    return this.setState(
      prevState => {
        const { step, status } = prevState;
        return {
          step: step + 1,
          status: status.map((e, i) => (i === 1 ? true : e)),
          users: d.users,
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
        const { step, timeSelected, areaSelected } = prevState;
        return {
          step: step - 1,
          //   all reset when step 2 cause selected area, time is the same
          timeSelected: step === 2 ? undefined : timeSelected,
          areaSelected: step === 2 ? DEFAULT_SELECTED_AREA : areaSelected,
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

  componentDidMount = () => {
    // for setting badge
    const { history, location } = this.props;
    const status = stepLists.map(e => false);
    const badge = history.location.state?.label[0];
    if (!badge) return history.replace(CATEGORY_PAGE);
    return this.setState({ badge, status }, () => {
      const paths = location.pathname.split('/');
      const step = paths[paths.length - 1];
      if (step !== '1') return history.replace(FIRST_STEP_PAGE);
    });
  };

  render() {
    console.log(this.state);
    const { users, step, backCard, areaSelected, dateSelected, timeSelected, interval } = this.state;

    return (
      <React.Fragment>
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
                  start: moment(),
                  stop: moment().add(12, 'hour'),
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
              />
            </Route>
          </Switch>
        </PageLayout>
      </React.Fragment>
    );
  }
}

export default withRouter<RouteComponentProps, any>(SportPage);
