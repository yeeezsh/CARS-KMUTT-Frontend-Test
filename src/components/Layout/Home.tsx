import React, { Component } from 'react';
import { Row, Col } from 'antd';
import moment from 'moment';
import Loadable from 'react-loadable';

import styles from './home.module.css';
const StateCard = Loadable({
  loader: () => import('../StateCard'),
  loading: () => null,
});

export default class Home extends Component<{}, { day: moment.Moment }> {
  state = {
    // day: moment('30/11/20', 'DD-MM-YY'),
    day: moment(),
  };

  render() {
    const { day } = this.state;
    const dayName = day.format('ddd');
    const date = day.format('D');
    const month = day.format('MMMM');
    const year = day.format('YYYY');
    return (
      <React.Fragment>
        <Row type="flex" justify="center" className={styles.header}>
          <Col className={styles.title} span={12}>
            <p className={styles.white}>หน้าแรก</p>
          </Col>
        </Row>

        {/* spacing */}
        <div style={{ height: 325 }}></div>

        {/* bg color */}
        <div
          style={{
            backgroundColor: '#ff682b',
            position: 'fixed',
            height: '335px',
            width: '100%',
            top: 0,
          }}
        ></div>

        {/* date and time */}
        <Row className={styles.date}>
          <div className={styles.textDate}>Today</div>
          <div className={styles.textDate}>
            {dayName}, {date} {month} {year}
          </div>
        </Row>

        {/* card */}
        <Row className={styles.card}>
          <Col span={24}>
            <StateCard
              name={'Badminton 1'}
              reserve={{
                date: moment(),
                start: moment(),
                stop: moment().add(1, 'hour'),
                state: {
                  type: 'wait',
                  desc: 'รอการยืนยัน',
                },
              }}
            />
          </Col>
        </Row>

        {/* content */}
        <Row style={{ marginTop: 30, padding: 0 }}>
          <Col className={styles.content}>{this.props.children}</Col>
        </Row>
      </React.Fragment>
    );
  }
}
