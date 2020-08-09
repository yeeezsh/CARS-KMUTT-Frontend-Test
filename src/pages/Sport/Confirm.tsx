import { Col, Row } from 'antd';
import Button from 'Components/Button';
import Outline from 'Components/Outline';
import { Moment } from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
// interfaces & type
import Area from 'Services/area/area.interface';
// store
import { RootReducersType } from 'Store/reducers';
import styles from './styles.module.css';

type OwnProps = {
  onConfirm: () => void;
};

type Props = StateProps & OwnProps;

class ConfirmPage extends Component<Props, {}> {
  render() {
    const {
      users,
      areaSelected,
      timeSelected,
      interval,
      dateSelected,
    } = this.props;

    return (
      <React.Fragment>
        <Col className={styles.overview} span={24}>
          <Row type="flex" justify="center">
            <Col span={20}>
              <Outline style={{ color: '#1890FF' }}>ข้อมูลการจอง</Outline>
            </Col>

            <Col style={{ marginTop: '-14px' }} span={20}>
              <span className={styles.overviewHeader}>สนามกีฬา</span>
              <span>{areaSelected.label}</span>
            </Col>
            <Col span={20}>
              <span className={styles.overviewHeader}>วันที่จอง</span>
              <span>วันที่ {dateSelected.format('DD MMMM YYYY')}</span>
            </Col>
            <Col span={20}>
              <span className={styles.overviewHeader}>เวลา</span>
              <span>
                เวลา {timeSelected && timeSelected.format('HH.mm')} -{' '}
                {timeSelected &&
                  timeSelected.add(interval, 'minute').format('HH.mm')}
              </span>
            </Col>

            <Col style={{ marginTop: '6px' }} span={20}>
              <span className={styles.overviewStudentIds}>
                รหัสนักศึกษา
              </span>
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
                <Button
                  style={{ backgroundColor: '#1890FF' }}
                  onClick={this.props.onConfirm}
                >
                  {users?.length > 1
                    ? 'ส่งรีเควสไปให้เพื่อน'
                    : 'ยืนยันการจอง'}
                </Button>
              </Col>
            </Row>
          </Col>
        </Col>
      </React.Fragment>
    );
  }
}

type StateProps = {
  users: string[];
  dateSelected: Moment;
  timeSelected: Moment;
  areaSelected: Area['area'];
  interval: number;
};

const mapStateToProps = (rootReducers: RootReducersType) => {
  const { SportReducers } = rootReducers;

  return {
    ...SportReducers,
  };
};

export default connect<OwnProps, any, any>(
  mapStateToProps as any,
  null,
)(ConfirmPage);
