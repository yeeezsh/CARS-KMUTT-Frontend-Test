import React, { Component } from 'react';
import { Col, Row } from 'antd';
import { Moment } from 'moment';

import styles from './styles.module.css';

import Outline from '../../components/Outline';
import Button from '../../components/Button';

export default class ConfirmPage extends Component<
  {
    onConfirm?: any;
    areaLabel: string | undefined;
    time: Moment | undefined;
    interval: number;
    date: Moment;
    users: string[];
  },
  {}
> {
  render() {
    const { users, areaLabel, time, interval, date } = this.props;
    return (
      <React.Fragment>
        <Col className={styles.overview} span={24}>
          <Row type="flex" justify="center">
            <Col span={20}>
              <Outline style={{ color: '#1890FF' }}>ข้อมูลการจอง</Outline>
            </Col>

            <Col style={{ marginTop: '-14px' }} span={20}>
              <span className={styles.overviewHeader}>สนามกีฬา</span>
              <span>{areaLabel}</span>
            </Col>
            <Col span={20}>
              <span className={styles.overviewHeader}>วันที่จอง</span>
              <span>วันที่ {date.format('DD MMMM YYYY')}</span>
            </Col>
            <Col span={20}>
              <span className={styles.overviewHeader}>เวลา</span>
              <span>
                เวลา {time && time.format('hh.mm')} - {time && time.add(interval, 'minute').format('hh.mm')}
              </span>
            </Col>

            <Col style={{ marginTop: '6px' }} span={20}>
              <span className={styles.overviewStudentIds}>รหัสนักศึกษา</span>
              {users &&
                users.map((e, i) => (
                  <p className={styles.studentId} key={i}>
                    {i + 1}) {e}
                  </p>
                ))}
            </Col>
          </Row>

          {/* Button */}
          <Col style={{ marginTop: '16px' }} span={24}>
            <Row type="flex" justify="center">
              <Col span={22}>
                <Button style={{ backgroundColor: '#1890FF' }} onClick={this.props.onConfirm}>
                  {users?.length > 1 ? 'ส่งรีเควสไปให้เพื่อน' : 'ยืนยันการจอง'}
                </Button>
              </Col>
            </Row>
          </Col>
        </Col>
      </React.Fragment>
    );
  }
}
