import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { task } from '../../models/task';
import Outline from '../Outline';
import { Row, Col } from 'antd';

import styles from './styles.module.css';
import Badge from '../Badge';

// const initState

export default class ReservationInfo extends Component<
  RouteComponentProps,
  {
    reserve: Array<any>;
    state: string;
    area: object;
    requestor: [];
    loading: boolean;
  }
> {
  constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
      reserve: [],
      state: '',
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
    return (
      <React.Fragment>
        <Row>
          <Col span={24} className={styles.overview}>
            <Outline>ข้อมูลการจอง</Outline>

            {/* sub header */}
            <Row>
              <Col span={10}>
                <Badge>
                  <span style={{ fontSize: '16px' }}>สถานะการจอง</span>
                </Badge>
              </Col>
            </Row>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}
