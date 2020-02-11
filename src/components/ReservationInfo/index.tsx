import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { task } from '../../models/task';
import Outline from '../Outline';
import { Row, Col } from 'antd';

import styles from './styles.module.css';
import Badge from '../Badge';
import StateCardIconColor from '../StateCard/icon';
import { Task } from '../../models/task/task.interface';
import stateDesc from '../../models/task/helpers/state.desc';

// const initState

export default class ReservationInfo extends Component<
  RouteComponentProps,
  {
    reserve: Array<any>;
    state: Task['state'][0];
    area: object;
    requestor: [];
    loading: boolean;
  }
> {
  constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
      reserve: [],
      state: 'drop',
      area: {},
      requestor: [],
      loading: true,
    };
  }
  componentDidMount = async () => {
    const { match } = this.props;
    const params: any = match.params;
    const id = params.id;
    if (!id) throw new Error('invalid id');
    console.log(id);
    const data = await task.getTaskById(id);
    console.log(data);
    if (!data) return;
    const state = data.state;
    return this.setState({
      loading: false,
      reserve: data?.reserve || [],
      state: (state && state[state.length - 1]) || [],
      area: data?.area,
      requestor: [],
    });
  };
  render() {
    console.log('this', this.state);
    const { state } = this.state;
    return (
      <React.Fragment>
        <Row>
          <Col span={24} className={styles.overview}>
            <Outline>ข้อมูลการจอง</Outline>
            {/* sub header */}
            <Row>
              <Col span={10}>
                <Badge>
                  <span className={styles.statusBadge}>สถานะการจอง</span>
                </Badge>
              </Col>
              <Col offset={1} span={12}>
                <div className={styles.status}>
                  <StateCardIconColor type={state} desc={stateDesc(state)} />
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}
