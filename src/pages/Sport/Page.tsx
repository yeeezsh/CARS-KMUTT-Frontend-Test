import React, { Component } from 'react';
import { Row, Col } from 'antd';
import moment, { Moment } from 'moment';
import { Route, Switch, withRouter, RouteComponentProps } from 'react-router';

import styles from './styles.module.css';

import TimePage from './Time';
import FormPage from './Form';
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
  };

  onSelectDate = (date: Moment) => {
    console.log('ddd', date.format('DD'));
    return this.setState({
      dateSelected: date,
    });
  };

  onSelectTime = (time: TimeNode) => {
    console.log('ttt', time.value.format('hh.mm'));
    if (time.type === 'disabled') {
      return this.setState(prevState => {
        return {
          status: prevState.status.map((e, i) => (i === 0 ? false : e)),
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
    const { badge, status } = this.state;
    let canNext = false;
    status.forEach((e, i) => {
      if (n - 1 === i && e) canNext = true;
    });

    if (!canNext) return;
    return this.setState({ step: n }, () =>
      this.props.history.push({
        pathname: n.toString(),
        state: {
          label: [badge],
        },
      }),
    );
  };

  onSelectArea = (area: Area['area']) => {
    console.log('aaa', area.id, area.required);
    return this.setState({ areaSelected: area });
  };

  onForm = (d: { status: boolean; users: string[] }) => {
    console.log(d);
  };

  onBackCard = () => {
    return this.setState(
      prevState => {
        const { step, timeSelected } = prevState;
        return {
          step: step - 1,
          timeSelected: step === 2 ? undefined : timeSelected,
          areaSelected: DEFAULT_SELECTED_AREA,
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

    return (
      <React.Fragment>
        <PageLayout titile={'จองสนามกีฬา'}>
          <div style={{ height: '25px' }} />

          {/* steps */}
          <Col offset={2} span={20}>
            <Row type="flex" justify="center">
              <Col span={22}>
                <StateSteps onClick={this.onClickStep} current={this.state.step - 1} steps={stepLists} />
              </Col>
            </Row>
          </Col>

          {/* spacing */}
          <div style={{ height: '10px' }} />

          <BackCard onClick={() => this.onBackCard()}>{this.state.backCard[this.state.step - 1]}</BackCard>

          {/* spacing */}
          <div style={{ height: '10px' }} />

          {/* Badge */}
          <Col span={24}>
            <Row type="flex" justify="start">
              <Badge>{this.state.badge}</Badge>
              <span className={styles.sideLabel}>{this.state.areaSelected && this.state.areaSelected.label}</span>
            </Row>
          </Col>

          <Switch>
            <Route path="*/1">
              <TimePage
                onSelectDate={this.onSelectDate}
                onSelectTime={this.onSelectTime}
                onSelectArea={this.onSelectArea}
                date={{
                  start: moment(),
                  stop: moment().add(12, 'hour'),
                  selected: this.state.dateSelected,
                }}
                areas={areas}
              />
            </Route>

            <Route path="*/2">
              <FormPage required={this.state.areaSelected.required} onSubmit={this.onForm} />
            </Route>
          </Switch>
        </PageLayout>
      </React.Fragment>
    );
  }
}

export default withRouter<RouteComponentProps, any>(SportPage);
